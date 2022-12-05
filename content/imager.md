+++
title = "分析关于imager网站用到的技术"
date = 2022-12-05

[taxonomies]
categories = ["技术分析"]
tags = ["rust", "vue", "nginx", "docker"]
+++

# imager网站中用到的技术

- 后端使用`rust`语言的`actix-web`框架
- 前端使用`vue`框架
- 数据库使用`mysql`
- 分发与部署使用`docker`
- 版本控制与代码托管使用`git`
<!-- more -->

> [demo site](http://124.222.172.51)

## actix-web框架的特点

![actix-web](https://pic.imgdb.cn/item/638d5dafb1fccdcd36dd3138.jpg)

### imager网站的入口函数为main.rs中的main函数

```rust
// main.rs
pub mod service;
mod utils;
mod model;

use actix_web::{
    web,
    App,
    HttpServer,
    middleware,
};
use imager::service;
use std::{
    fs::File,
    io::Read,
    result
};
use serde::Deserialize;
use sqlx::mysql::MySqlPoolOptions;
use thiserror::Error;
use log::info;

// used to parse the config.toml file on conf directory
#[derive(Deserialize)]
struct Config {
    server: Server,
    database: Database,
}

#[derive(Deserialize)]
struct Server {
    address: String,
    port: u16,
    log_level: String,
}

#[derive(Deserialize)]
struct Database {
    database_url: String,
    max_connection: u32,
}

// my own runtime errors
#[derive(Error, Debug)]
enum RError {
    #[error("{0}")]
    Io(String),
    #[error("{0}")]
    Database(String),
}

type RResult<T> = result::Result<T, RError>;

#[actix_web::main]
async fn main() -> RResult<()> {
    // read config's path from environment
    let config_path = match std::env::var("CONFIG_PATH") {
        Ok(path) => path,
        Err(_) => "conf/config.toml".to_owned(),
    };

    let config_path = config_path.as_str();

    let mut file =
        File::open(config_path).map_err(|_| RError::Io(format!("can't find {}", config_path)))?;

    let mut config = String::new();

    let _ = file
        .read_to_string(&mut config)
        .map_err(|_| RError::Io(format!("can't read from {}", config_path)))?;

    // parse config with toml crate
    let config: Config = toml::from_str(&config)
        .map_err(|_| RError::Io(format!("a mistake found in {}", config_path)))?;

    // init env_logger crate with the value from config
    std::env::set_var("RUST_LOG", config.server.log_level);
    env_logger::init();

    let pool = MySqlPoolOptions::new()
        .max_connections(config.database.max_connection)
        .connect(&config.database.database_url)
        .await
        .map_err(|_| RError::Database("can't connect to database".into()))?;

    info!("server start...");

    // bind and start the server
    // the server will listen the signal Ctrl+C
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .wrap(middleware::Logger::default())
            .configure(service::route::init_route)
    })
    .bind((config.server.address, config.server.port))
    .map_err(|_| RError::Io("failed to bind the port".into()))?
    .run()
    .await
    .map_err(|_| RError::Io("can't run the server".into()))?;

    info!("server quit...");

    Ok(())
}
```

### imager使用统一的错误来处理请求中可能存在的错误

```rust
// utils/error.rs
use serde_json::json;
use thiserror::Error;
use actix_web::{
    ResponseError,
    http::StatusCode,
    HttpResponse
};
use std::result;

#[derive(Error, Debug)]
pub enum IError {
    #[error("database error")]
    Database,
}

pub type IResult<T> = result::Result<T, IError>;

// implement the trait to make the error could be parse into the response
impl ResponseError for IError {
    fn error_response(&self) -> HttpResponse {
        HttpResponse::BadRequest()
            .json(json!({
                "code": -1,
                "msg": self.to_string(),
            }))
    }

    fn status_code(&self) -> StatusCode {
        match *self {
            IError::Database => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }
}
```

### 返回图片数据的接口

```rust
// model/image.rs
use sqlx::{
    Pool,
    MySql,
    FromRow,
    mysql::MySqlRow, Row,
};
use crate::utils::error::{
    IError,
    IResult,
};
use serde::Serialize;
use rand::Rng;

#[derive(Debug, Serialize)]
pub struct Image {
    url: String,
}

// implement the trait to support Serialize from sql result
impl<'a> FromRow<'a, MySqlRow> for Image {
    fn from_row(row: &'a MySqlRow) -> Result<Self, sqlx::Error> {
        Ok(Self {
            url: row.try_get("url")?
        })
    }
}

// 获取所有图片url的方法
// 先计算所有图片的数量
// 在根据数量生成一个随机数，将随机数作为起始位置获取10张图片的url
// 之所以用`select url from image where id > ? limit 10`
// 而不是`select url from image offset ? limit 10`
// 是因为offset会获取结果并丢弃，这会拖慢sql的执行速度
pub async fn get_all_images(pool: &Pool<MySql>) -> IResult<Vec<Image>> {
    let sql = "select count(*) from image";

    let row = sqlx::query(sql)
        .fetch_one(pool)
        .await
        .map_err(|_| IError::Database)?;

    let total: i32 = row.get(0);

    let mut rng = rand::thread_rng();

    let begin = rng.gen_range(0..total);

    let sql = "select url from image where id > ? limit 10";

    let images: Vec<Image> = sqlx::query_as::<_, Image>(sql)
        .bind(begin)
        .fetch_all(pool)
        .await
        .map_err(|_| IError::Database)?;

    Ok(images)
}
```

## vue框架的特点

![vue](https://pic.imgdb.cn/item/638d5e09b1fccdcd36ddab6e.jpg)

### 前端加载数据的接口

```js
// src/components/MainController.js
export default {
  data() {
    return {
      images: [],
      is_load: false,
    };
  },
  methods: {
    // get image's url from backend
    load_images() {
      let that = this;
      get_images()
        .then((res) => {
          let data = res.data;
          let length = data.length;
          for (let i = 0; i < length; i++) {
            that.images.push(data[i]);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // control the function load_images will only be used when the scroll touch the end
    lazyLoading() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let clientHeight = document.documentElement.clientHeight;
      let scrollHeight = document.documentElement.scrollHeight;
      if (scrollTop + clientHeight >= scrollHeight - clientHeight * 3) {
        if (this.is_load) {
          return;
        }

        this.is_load = true;
        this.load_images();
        this.is_load = false;
      }
    },
    // defer the function with timeout to avoid too many call at a time
    debounce(func, dalay = 100) {
      let timer;
      return (...args) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func(...args);
        }, dalay);
      };
    },
  },
  created() {
    let that = this;
    this.$nextTick(() => {
      that.load_images();
      window.addEventListener("scroll", that.debounce(that.lazyLoading, 100));
    });
  },
  unmounted() {
    window.removeEventListener("scroll", this.lazyLoading);
  },
};
```

### 用来初始化数据库的sql文件

```sql
-- source.sql
drop table if exists image;
create table image(
    id bigint(20) unsigned not null auto_increment,
    url varchar(255) not null,
    primary key(id)
);
insert into image(url) values('https://pictu1.1plq.com/p1587/2021/02/21/p1587-5434-72063.jpg');
insert into image(url) values('https://pictu1.1plq.com/p1587/2021/02/21/p1587-5434-72064.jpg');

```

### 用来构建和分发镜像的Dockerfile

```docker
# Dockerfile
FROM ekidd/rust-musl-builder AS build

WORKDIR /app

ADD --chown=rust:rust . .

RUN sudo mkdir -p /.cargo \
&& sudo mv ./config /.cargo/config \
&& rustup target add x86_64-unknown-linux-musl \
&& cargo build --release --target=x86_64-unknown-linux-musl

FROM alpine:latest

WORKDIR /app

RUN mkdir conf
COPY --from=build /app/target/x86_64-unknown-linux-musl/release/imager ./

VOLUME [ "/app/conf" ]

EXPOSE 8000/tcp

CMD ["/app/imager"]
```

### nginx反向代理的配置文件

imager使用前后端分离方式部署项目，使用nginx作为代理服务器

```nginx
# http.conf in remote
# 后端接口服务器
# 使用nginx做服务分流和负载均衡
upstream imager_server {
    server 172.17.0.1:8001;
    server 172.17.0.1:8002;
    server 172.17.0.1:8003;
}

server {
    listen       80;
    server_name  localhost;

    # 前端静态文件代理
    location / {
        root   /usr/share/nginx/html/imager/dist;
        index  index.html;
    }

    # 后端api接口代理
    location /api {
	proxy_set_header Host $host;
	proxy_set_header X-Real-Ip $remote_addr;
	proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	proxy_set_header X-Forworded-For $http_x_forwarded_for;

    # 重写uri路径
	rewrite ^/api/?(.*)$ /$1 break;

	proxy_pass http://imager_server;
    }
}

```

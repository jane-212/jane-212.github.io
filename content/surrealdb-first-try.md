+++
title = "尝试一下surrealdb"
date = 2024-03-08

[taxonomies]
tags = ["rust", "database", "surrealdb"]

[extra]
description = "surrealdb初上手"
banner = "/static/surrealdb/logo.png"
+++

今天上手体验了一下surrealdb，可以很方便在内存，本地和远程切换的数据库

<!-- more -->

## 介绍

SurrealDB是一款让未来的开发更轻松，构建更快速，扩展更方便的云数据库。

![surrealdb logo](/surrealdb/logo.png)

## 使用方式

#### 将surrealdb添加到项目中

使用 `cargo` 添加。

```bash
# surrealdb
cargo add surrealdb --features kv-rocksdb
# serde derive
cargo add serde --features derive
# tokio runtime
cargo add tokio --features macros,rt-multi-thread
```

#### 连接数据库

使用 `Mem` 来创建一个内存数据库。

```rust
let db = Surreal::new::<Mem>("./main.db").await?;
```

使用 `RocksDb` 来创建一个基于 `RocksDb` 本地文件数据库。

```rust
let db = Surreal::new::<RocksDb>("./main.db").await?;
```

我使用的是第二个本地文件数据库。

#### 添加数据

使用 `use_ns` 方法来切换至 `example` 命名空间。
使用 `use_db` 方法来切换至 `test` 数据库。

```rust
db.use_ns("example").use_db("test").await?;
```

创建 `Person` 和 `Name` 结构体。

```rust
#[derive(Debug, Serialize)]
struct Name<'a> {
    first: &'a str,
    last: &'a str,
}

#[derive(Debug, Serialize)]
struct Person<'a> {
    title: &'a str,
    name: Name<'a>,
    marketing: bool,
}
```

在 `person` 表中添加一条记录。

```rust
let created: Vec<Record> = db
    .create("person") // 参数就是表名
    .content(Person {
        title: "Founder & CEO",
        name: Name {
            first: "Tobie",
            last: "Morgan Hitchcock",
        },
        marketing: true,
    }) // 参数就是需要插入的数据，如果是结构体的话，该结构体需要实现 `Serialize` Trait
    .await?;
dbg!(created);
```

输出如下，插入成功。

```bash
[src/main.rs:50:5] created = [
    Record {
        id: Thing {
            tb: "person",
            id: String(
                "iqieyqh2g9ek2cdwtnwo",
            ),
        },
    },
]
```

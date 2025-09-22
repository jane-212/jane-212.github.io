+++
title = "用SameSite实现CSRF防护以及如何在actix-web中实现"
date = 2024-10-19

[taxonomies]
tags = ["web", "actix-web", "csrf"]
+++

在前端开发中，如果我们需要在表单中发送一个CSRF防护的token，那么就需要在浏览器中存储这个token，并且在每次请求中都传递这个token。

这样做的好处是，如果我们在浏览器中存储了这个token，那么就可以在后端中验证这个token是否正确。

## 使用SameSite

但是现在可以使用`SameSite`实现CSRF防护。

具体可以查看
[Cross-Site Request Forgery is dead!](https://scotthelme.co.uk/csrf-is-dead/)

## 如何在actix-web中开启SameSite

```rust
use actix_web::{App, HttpServer}; // web server
use actix_session::{SessionMiddleware, storage::CookieSessionStore, config::CookieContentSecurity}; // store auth info in browser cookies
use actix_web::cookie::{Key, SameSite};
use dotenv::dotenv; // load .env file

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    HttpServer::new(move || {
        App::new()
            .wrap(SessionMiddleware::builder(CookieSessionStore::default(), Key::generate())
                    .cookie_content_security(CookieContentSecurity::Private)
                    .cookie_same_site(SameSite::Lax)
                    .build())
    })
    .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
```

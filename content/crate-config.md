+++
title = "[config]常用crate"
date = 2024-03-07

[taxonomies]
tags = ["rust", "config", "crate"]

[extra]
description = "Some rust crates about config"
banner = "/static/crate/logo.png"
+++

搜集一些rust开发中常用的crates

<!-- more -->

## Config

#### dotenv

This library is meant to be used on development or testing environments in which setting environment variables is not practical.

```rust
extern crate dotenv;

use dotenv::dotenv;
use std::env;

fn main() {
    dotenv().ok();

    for (key, value) in env::vars() {
        println!("{}: {}", key, value);
    }
}
```

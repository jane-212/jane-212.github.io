+++
title = "常用crate - error"
date = 2024-03-07

[taxonomies]
tags = ["rust", "error", "crate"]

[extra]
description = "Some rust crates about error"
banner = "/static/crate/logo.png"
+++

搜集一些rust开发中常用的crates

<!-- more -->

## Error

#### thiserror

This library provides a convenient derive macro for the standard library's `std::error::Error` trait.

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DataStoreError {
    #[error("data store disconnected")]
    Disconnect(#[from] io::Error),
    #[error("the data for key `{0}` is not available")]
    Redaction(String),
    #[error("invalid header (expected {expected:?}, found {found:?})")]
    InvalidHeader {
        expected: String,
        found: String,
    },
    #[error("unknown data store error")]
    Unknown,
}
```

#### anyhow

This library provides `anyhow::Error`, a trait object based error type for easy idiomatic error handling in Rust applications.

```rust
use anyhow::{anyhow, Result};

fn main() -> Result() {
    let a = 4;
    if a > 0 {
        return Err(anyhow!("error"));
    }

    Ok(())
}
```

+++
title = "当使用cross.rs来跨平台编译时遇到的问题"
date = 2024-04-23

[taxonomies]
tags = ["rust", "cross", "compile"]

[extra]
description = "当使用cross.rs来跨平台编译时遇到的问题"
banner = "/static/crate/logo.png"
+++

当使用cross.rs来跨平台编译时遇到的问题

<!-- more -->

在使用cross编译时，如果在项目中有如下代码。

```rust
env!("FOO");
```

该代码会在编译时寻找名为 `FOO` 的环境变量，但是cross是在docker中编译的，并不会将环境变量传递到docker中，如果想要指定传递的环境变量，可以在项目的根目录中创建 `Cross.toml` 文件。

```toml
[build.env]
passthrough = ["FOO"]
```

这样配置后，cross就会在编译时将 `FOO` 变量传递到docker中。

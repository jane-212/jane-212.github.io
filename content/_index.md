+++
+++

# Jane's Blog

## Helix配置文件

```toml
theme = "catppuccin_mocha"

[editor]
line-number = "relative"
cursorline = true
completion-timeout = 5
completion-trigger-len = 1
end-of-line-diagnostics = "hint"

[editor.statusline]
left = ["spacer", "version-control"]
center = ["mode"]
right = ["diagnostics", "position", "file-type"]
mode.normal = "NORMAL"
mode.insert = "INSERT"
mode.select = "SELECT"

[editor.auto-save.after-delay]
enable = true
timeout = 500

[editor.indent-guides]
render = true
```

## 常用软件

浏览器: Safari

终端: [Wezterm](https://wezfurlong.org/wezterm/index.html)

数据库管理: [DataGrip](https://www.jetbrains.com/zh-cn/datagrip/)

Docker: [OrbStack](https://orbstack.dev)

编辑器: [Zed](https://zed.dev)

## git无法 `clone` 和 `push` 的问题

> ~/.ssh/config

```
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
```

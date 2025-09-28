+++
title = "首页"
+++

备份一些常用的文件代码等

#### Helix配置文件

```toml
theme = "catppuccin_mocha"

[editor]
line-number = "relative"
completion-timeout = 5
completion-trigger-len = 1
end-of-line-diagnostics = "hint"
color-modes = true
default-yank-register = "+"
bufferline = "always"

[editor.statusline]
left = ["mode"]
center = ["file-name"]
right = [
  "diagnostics",
  "spacer",
  "version-control",
  "spacer",
]
mode.normal = "NORMAL"
mode.insert = "INSERT"
mode.select = "SELECT"

[editor.auto-save.after-delay]
enable = true
timeout = 500

[editor.indent-guides]
render = true
```

#### 常用软件

浏览器: Safari

终端: [Wezterm](https://wezfurlong.org/wezterm/index.html)

数据库管理: [DataGrip](https://www.jetbrains.com/zh-cn/datagrip/)

Docker: [OrbStack](https://orbstack.dev)

编辑器: [Zed](https://zed.dev)

#### git无法 `clone` 和 `push` 的问题

> ~/.ssh/config

```
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
```

#### 下载ShellCrash

```bash
export url='https://fastly.jsdelivr.net/gh/juewuy/ShellCrash@master' && sh -c "$(curl -kfsSl $url/install.sh)" && source /etc/profile &> /dev/null
```

#### 常用github actions

```yaml
# gitleaks
- uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

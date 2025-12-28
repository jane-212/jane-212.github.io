+++
title = "首页"
+++

备份一些常用的文件代码等

#### 壁纸

![Wallpaper](/wallpaper.jpg)

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
auto-info = false
popup-border = "all"

[editor.lsp]
display-progress-messages = true

[editor.statusline]
left = ["mode", "spacer", "version-control", "spacer", "diagnostics"]
center = ["file-name", "file-modification-indicator"]
right = ["position", "position-percentage", "file-type"]

[editor.auto-save.after-delay]
enable = true
timeout = 500

[editor.indent-guides]
render = true
```

#### Helix theme diff

```diff
69c69
< "ui.background" = { fg = "text", bg = "base" }
---
> "ui.background" = { fg = "text" }
74,75c74,75
< "ui.statusline" = { fg = "subtext1", bg = "mantle" }
< "ui.statusline.inactive" = { fg = "surface2", bg = "mantle" }
---
> "ui.statusline" = { fg = "subtext1" }
> "ui.statusline.inactive" = { fg = "surface2" }
80c80
< "ui.popup" = { fg = "text", bg = "surface0" }
---
> "ui.popup" = { fg = "text" }
82c82
< "ui.help" = { fg = "overlay2", bg = "surface0" }
---
> "ui.help" = { fg = "overlay2" }
89c89
< "ui.text.focus" = { fg = "text", bg = "surface0", modifiers = ["bold"] }
---
> "ui.text.focus" = { fg = "text", modifiers = ["bold"] }
117,118c117,118
< "ui.menu" = { fg = "overlay2", bg = "surface0" }
< "ui.menu.selected" = { fg = "text", bg = "surface1", modifiers = ["bold"] }
---
> "ui.menu" = { fg = "overlay2" }
> "ui.menu.selected" = { fg = "text", modifiers = ["bold"] }
```

#### Ghostty配置文件

```env
theme = Catppuccin Mocha
font-family = MonaspiceRn Nerd Font Mono
font-family = 圆体-简
font-style = Bold
font-style-bold = SemiBold
font-style-italic = Bold Italic
font-style-bold-italic = SemiBold Italic
font-size = 16
font-thicken = true
font-thicken-strength = 127
working-directory = /Users/jane/space
window-inherit-working-directory = false
background-opacity = 0.8
adjust-cell-height = 3
mouse-hide-while-typing = true
cursor-style-blink = false
shell-integration-features = no-cursor
window-padding-x = 5
maximize = true
macos-option-as-alt = true
macos-titlebar-style = hidden
keybind = clear
keybind = performable:super+v=paste_from_clipboard
```

#### Zellij配置文件

```env
theme "catppuccin-mocha"
default_layout "compact"
pane_frames false
show_startup_tips false
show_release_notes false

keybinds clear-defaults=true {
    normal {
        bind "Super t" {
            NewTab {
                cwd "~/space"
            }
        }
        bind "Super r" { SwitchToMode "RenameTab"; TabNameInput 0; }
        bind "Super 0" { GoToTab 0; }
        bind "Super 1" { GoToTab 1; }
        bind "Super 2" { GoToTab 2; }
        bind "Super 3" { GoToTab 3; }
        bind "Super 4" { GoToTab 4; }
        bind "Super 5" { GoToTab 5; }
        bind "Super 6" { GoToTab 6; }
        bind "Super 7" { GoToTab 7; }
        bind "Super 8" { GoToTab 8; }
        bind "Super 9" { GoToTab 9; }
    }
    renametab {
        bind "Enter" { SwitchToMode "Normal"; }
    }
}
```

#### starship配置文件

```toml
"$schema" = 'https://starship.rs/config-schema.json'

add_newline = false

format = """
$os\
$directory\
$username\
$hostname\
$git_branch\
$git_status\
$golang\
$lua\
$python\
$rust\
$cmd_duration\
$character
"""

[golang]
symbol = " "
format = "[$symbol($version )]($style)"

[lua]
symbol = "󰢱 "
format = "[$symbol($version )]($style)"

[python]
symbol = "󰌠 "
format = "[$symbol($version )]($style)"

[rust]
symbol = "󱘗 "
format = "[$symbol($version )]($style)"

[cmd_duration]
format = "[󱎫 $duration ]($style)"
style = "green bold"

[character]
success_symbol = '[#](white bold)'
error_symbol = '[#](red bold)'
vimcmd_symbol = "[#](green bold)"
vimcmd_replace_one_symbol = "[#](green bold)"
vimcmd_replace_symbol = "[#](green bold)"
vimcmd_visual_symbol = "[#](green bold)"

[directory]
format = "[$read_only$path ]($style)"
read_only = "󰪪 "
style = "blue bold"

[git_branch]
format = "[$symbol$branch]($style)"
symbol = "󰊤 "
style = "yellow bold"

[git_status]
format = '[$all_status$ahead_behind ]($style)'
style = "yellow bold"

[os]
style = "gray bold"
disabled = false

[os.symbols]
Macos = "󰀵 "
Windows = "󰖳 "
Linux = "󰌽 "
```

#### Zed配置文件

```json
// keymap.json

[
  {
    "bindings": {
      "shift-tab": "menu::SelectPrevious",
      "tab": "menu::SelectNext"
    }
  },
  {
    "context": "Workspace",
    "bindings": {
      "cmd-j": "workspace::ToggleRightDock",
      "cmd-b": "workspace::ToggleBottomDock"
    }
  },
  {
    "context": "Terminal",
    "bindings": {
      "cmd-j": "workspace::ToggleRightDock",
      "cmd-k": "agent::ToggleFocus"
    }
  },
  {
    "context": "AgentPanel",
    "bindings": {
      "cmd-j": "workspace::ToggleRightDock",
      "cmd-k": "terminal_panel::ToggleFocus"
    }
  },
  {
    "context": "ProjectPanel",
    "bindings": {
      "space w h": "workspace::ActivatePaneLeft",
      "space w l": "workspace::ActivatePaneRight",
      "space w k": "workspace::ActivatePaneUp",
      "space w j": "workspace::ActivatePaneDown"
    }
  },
  {
    "context": "Editor && vim_mode == helix_normal && !menu",
    "bindings": {
      "space z": "workspace::ToggleZoom",
      "space m": "markdown::OpenPreviewToTheSide",

      "shift-j": "editor::GoToDiagnostic",
      "shift-k": "editor::GoToPreviousDiagnostic",
      "shift-h": "pane::GoBack",
      "shift-l": "pane::GoForward",

      "enter": "editor::SelectLargerSyntaxNode",
      "backspace": "editor::SelectSmallerSyntaxNode",

      "-": "editor::MoveLineUp",
      "=": "editor::MoveLineDown"
    }
  },
  {
    "context": "Editor && (showing_code_actions || showing_completions)",
    "bindings": {
      "shift-tab": "editor::ContextMenuPrevious",
      "tab": "editor::ContextMenuNext"
    }
  }
]
```

```json
// settings.json

{
  // extensions
  "auto_install_extensions": {
    "catppuccin": true
  },

  // ui
  "theme": "Catppuccin Mocha",
  "show_whitespaces": "none",
  "gutter": {
    "folds": false
  },
  "project_panel": {
    "scrollbar": {
      "show": "never"
    }
  },
  "diagnostics": {
    "inline": {
      "enabled": true
    }
  },
  "collaboration_panel": {
    "button": false
  },
  "notification_panel": {
    "button": false
  },

  // ai
  "agent": {
    "default_model": {
      "provider": "deepseek",
      "model": "deepseek-reasoner"
    }
  },
  "features": {
    "edit_prediction_provider": "none"
  },

  // font
  "buffer_font_family": "Maple Mono NF CN",
  "buffer_font_weight": 500,
  "ui_font_family": "Maple Mono NF CN",
  "ui_font_size": 15,
  "ui_font_weight": 500,

  // autosave
  "autosave": {
    "after_delay": {
      "milliseconds": 500
    }
  },

  // helix
  "helix_mode": true,
  "relative_line_numbers": true,
  "cursor_blink": false,
  "vertical_scroll_margin": 5,
  "current_line_highlight": "none",

  // bar
  "toolbar": {
    "quick_actions": false,
    "breadcrumbs": false
  },
  "tab_bar": {
    "show_nav_history_buttons": false
  },
  "tabs": {
    "git_status": true,
    "file_icons": true,
    "show_diagnostics": "all"
  },

  // terminal
  "terminal": {
    "toolbar": {
      "breadcrumbs": false
    },
    "font_weight": 500,
    "dock": "right",
    "blinking": "off",
    "scrollbar": {
      "show": "never"
    }
  }
}
```

#### 常用软件

浏览器: Safari

终端: [Ghostty](https://ghostty.org)

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

#### shell启用vim模式

```shell
bindkey -v
export KEYTIMEOUT=1
bindkey "^H" backward-delete-char
bindkey "^?" backward-delete-char
```

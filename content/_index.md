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

[editor.lsp]
display-progress-messages = true

[editor.statusline]
left = [
  "mode",
  "spacer",
  "version-control",
  "spacer",
  "diagnostics",
]
center = [
  "file-name",
  "file-modification-indicator",
]
right = [
  "position",
  "position-percentage",
  "file-type",
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

_default:
    @just --list

alias s := sync

# commit and push to main
sync:
    git add .
    git commit -m update
    git push origin main

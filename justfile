_default:
    @just --list

# commit changes and push to main
push MSG:
    git add .
    git commit -m "{{MSG}}"
    git push origin main

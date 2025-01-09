_default:
    @just --list

# commit changes and push to main
push:
    git add .
    git commit
    git push origin main

# print this help message
default:
    just --list

# stash changes and push to main
push:
    git add .
    git commit
    git push origin main

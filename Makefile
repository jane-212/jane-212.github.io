.PHONY: help sync

all: help

help:
	@echo "sync - commit and push to remote"

sync:
	git add .
	git commit -m "update"
	git push origin main

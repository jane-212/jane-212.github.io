.PHONY: help sync

all: help

help:
	@echo "sync - commit and push to remote"

sync:
	git add .
	lumen draft | git commit -F -
	git push origin main

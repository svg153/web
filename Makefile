# web/Makefile – development helpers

.PHONY: serve

serve: ## Start local dev server on http://localhost:8000
	python3 -m http.server 8000

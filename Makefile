build:
	docker build -t report-renderer .

render:
	@docker run -i --rm --entrypoint ./src/render-pdf.js report-renderer
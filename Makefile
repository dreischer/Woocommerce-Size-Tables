BIN = node_modules/.bin

bootstrap:
	yarn install

build: clean lint
	$(BIN)/webpack -p --progress
	cp php/* dist/size-table
	zip -r dist/size-table.zip dist/size-table

watch:
	$(BIN)/webpack -p --progress --watch

lint:
	$(BIN)/standard "js/**/*.{js,jsx}" --verbose | $(BIN)/snazzy

clean:
	rm -rf ./dist

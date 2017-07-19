BIN = node_modules/.bin

bootstrap:
	yarn install

build:
	$(BIN)/webpack -p --progress

watch:
	$(BIN)/webpack -p --progress --watch

lint:
	$(BIN)/standard

clean:
	rm -rf ./dist

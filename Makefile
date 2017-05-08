NPM_BIN := ./node_modules/.bin

dev:
	$(NPM_BIN)/nodemon --ignore '*.test.js' dev-server.js

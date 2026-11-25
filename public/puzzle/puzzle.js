const Path = require("path");

function initPuzzle(app) {

	app.get("/puzzle", (request, response) => {
		response.sendFile(Path.join(__dirname, "./index.html"));
	});

	app.get("/puzzle/1006", (request, response) => {
		response.sendFile(Path.join(__dirname, "./2.html"));
	});

	app.get("/puzzle/1006/jason", (request, response) => {
		response.sendFile(Path.join(__dirname, "./3.html"));
	});

	app.get("/puzzle/1006/jason/newmarket", (request, response) => {
		response.sendFile(Path.join(__dirname, "./4.html"));
	});

	app.get("/puzzle/1006/jason/newmarket/nehutai", (request, response) => {
		response.sendFile(Path.join(__dirname, "./5.html"));
	});
}

module.exports = {
	initPuzzle
};
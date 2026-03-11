const Express = require("express");
const Path = require("path");
const FileSystem = require("fs");
const Sharp = require("sharp");

// Send a fancy as error page
function SendCustomError(statusText, status, response) {
	
	// Get the errors html page as a string
	const path = Path.join(__dirname, "public", "responses", `${status}.html`);
	let html = FileSystem.readFileSync(path, "utf8");

	// Replace the error text thing
	html = html.replace("{statusText}", statusText);

	// Send back the file and whatnot with
	// the status code also
	response.status(status).send(html);
}

function resizeImages(app) {
	app.get("/image/*path", async (request, response, next) => {

		// Check for if we have a ?size= attribute
		const size = request.query["size"];
		if (size == undefined) return next();

		// Get the image we're after
		// TODO: ensure the 404 still works
		const filePath = Path.join(__dirname, "assets", "image", ...request.params.path);
		if (FileSystem.existsSync(filePath) == false) return next();

		// Check for if we've asked for a correct size
		const sizes = {
			tiny: 200,
			medium: 600,
			large: 1200
		}
		if (sizes[size] == undefined) return next();

		// Tell the client what we're sending them (image)
		// then send the compressed thingy
		response.type(Path.extname(filePath));
		response.set("Cache-Control", "public, max-age=31536000, immutable");
		Sharp(filePath)
			.resize({ width: sizes[size] })
			.pipe(response);
		
	});
}

module.exports = {
	SendCustomError,
	resizeImages
};
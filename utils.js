const Express = require("express");
const Path = require("path");
const FileSystem = require("fs");

// Send a fancy as error page
// TODO: Maybe chuck this in a utils file/method thing
function SendCustomError(statusText, status, response) {
	
	// Get the errors html page as a string
	const path = Path.join(__dirname, "responses", `${status}.html`);
	let html = FileSystem.readFileSync(path, "utf8");

	// Replace the error text thing
	html = html.replace("{statusText}", statusText);

	// Send back the file and whatnot with
	// the status code also
	response.status(status).send(html);
}

module.exports = {
	SendCustomError
};
const Express = require("express");
const Path = require("path");
const FileSystem = require("fs");

// Setup express
const app = Express();
const port = process.env.PORT || 3000;

// Set the public folder for serving static
// stuff (normal plain html website thing)
app.use(Express.static(Path.join(__dirname, "public")));

// Endpoints and whatnot
app.get("/test", (request, response) => {
	// response.send("<h1>testing rn</h1>");

	SendCustomError("test", 403, response);
})

// Make it so that all pages don't have
// the .html part at the end of them
app.get("*", (request, response) => {

	// Get the stuff we're after
	const requestedContent = request.params[0];
	const page = Path.join(__dirname, "public", `${requestedContent}.html`);

	// Check for if the page exists. If it does then
	// send them the page. Otherwise pack a sad
	if (FileSystem.existsSync(page)) response.sendFile(page);
	else SendCustomError(requestedContent, 404, response);
});

// Run the express server
app.listen(port, () => console.log(`Server listening on port ${port}!`));



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
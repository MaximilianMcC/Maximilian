const Express = require("express");
const Path = require("path");
const FileSystem = require("fs");

// Setup express
const app = Express();
const port = process.env.PORT || 3000;

// Set the public folder for serving static
// stuff (normal plain html website thing)
app.use(Express.static(Path.join(__dirname, "public")));

// Set up all the routers so we can use stuff
// from other files (keeping clean fr)
app.get("/test", (request, response) => {
	response.send("<h1>testing rn</p>");
})

// Make it so that all pages don't have
// the .html part at the end of them
app.get("*", (request, response) => {

	// Get the stuff we're after
	const requestedContent = request.params[0];
	const page = Path.join(__dirname, "public", `${requestedContent}.html`);

	// Check for if the page exists. If it does then
	// send them the page. Otherwise pack a sad
	if (FileSystem.existsSync(page))
	{
		response.sendFile(page);
		return;
	}

	// dodgy error screen
	Send404(requestedContent, response);
});

// Run the express server
app.listen(port, () => console.log(`Server listening on port ${port}!`));



// Send a fancy as 404 page
function Send404(missingThing, response) {
	
	// Get the 404 html
	const path = Path.join(__dirname, "public", "responses", "404.html");
	let html = FileSystem.readFileSync(path, "utf8");

	// Replace the error text thing
	html = html.replace("{missingThing}", missingThing);

	// Send back the 404 file and whatnot with
	// the 404 status code also
	response.status(404).send(html);
}
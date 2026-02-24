const Express = require("express");
const Cors = require("cors");
const Path = require("path");
const FileSystem = require("fs");
const Utils = require("./utils");

// Setup express
const app = Express();
const port = process.env.PORT || 3000;

// Use cors (for json requests from browser or something)
// And use the json thingy so we can parse body commands
app.use(Cors());
app.use(Express.json());

// Set the public folder serving status web pages
// TODO: Do one for responses too
app.use(Express.static(Path.join(__dirname, "public")));

// Set the public folder serving assets (cdn)
app.use(Express.static(Path.join(__dirname, "assets")));

// Endpoints and whatnot
app.get("/test", (request, response) => {
	response.send("<h1>the test worked</h1>");
})

// Make it so that all pages don't have
// the .html part at the end of them
app.use((request, response) => {

	// Get the stuff we're after
	const requestedContent = request.path.slice(1);
	const page = Path.join(__dirname, "public", `${requestedContent}.html`);

	// Check for if the page exists. If it does then
	// send them the page. Otherwise pack a sad
	if (FileSystem.existsSync(page)) response.sendFile(page);
	else Utils.SendCustomError(requestedContent, 404, response);
});

// Run the express server
app.listen(port, () => console.log(`Server listening on port ${port}!\nVisit it at http://localhost:${port}`));
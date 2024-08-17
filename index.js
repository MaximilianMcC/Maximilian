const Express = require("express");
const Path = require("path");
const FileSystem = require("fs");
const Utils = require("./utils");

// Setup express
const app = Express();
const port = process.env.PORT || 3000;

// Set the public folder for serving static
// stuff (normal plain html website thing)
app.use(Express.static(Path.join(__dirname, "public")));

// Router endpoints (stuff from other files)
app.use("/apis/speedrun", require("./apis/speedrun/speedrun"));

// Endpoints and whatnot
app.get("/test", (request, response) => {
	response.send("<h1>testing rn</h1>");
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
	else Utils.SendCustomError(requestedContent, 404, response);
});

// Run the express server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
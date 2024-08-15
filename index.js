const Express = require("express");
const Path = require("path");
const FileSystem = require("fs");

// Setup express
const app = Express();
const port = process.env.PORT || 3000;

// Set the public folder for serving static
// stuff (normal plain html website thing)
app.use(Express.static(Path.join(__dirname, "public")));

// Make it so that all pages don't have
// the .html part at the end of them
app.get("/:page", (request, response) => {

	// Get the page we're after
	const pageName = request.params.page;
	const page = Path.join(__dirname, "public", `${pageName}.html`);

	// Check for if the page exists. If it does then
	// send them the page. Otherwise pack a sad
	if (FileSystem.existsSync(page))
	{
		response.sendFile(page);
		return;
	}

	// dodgy error screen
	response.send(`<h1>404 or something</h1><p>can't find whatever <i>${pageName}</i> is sorry (maybe you've got the dodgy spelling)</p>`);
});

// Set up all the routers so we can use stuff
// from other files (keeping clean fr)
app.get("/test", (request, response) => {
	response.send("<h1>testing rn</p>");
})

// Run the express server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
const Express = require("express");
const Cors = require("cors");
const Path = require("path");
const FileSystem = require("fs");
const Utils = require("./utils");
const Navbar = require("./dynamic/navbar");

// Setup express
const app = Express();
const port = process.env.PORT || 3000;

// Use cors (for json requests from browser or something)
// And use the json thingy so we can parse body commands
app.use(Cors());
app.use(Express.json());

// Serve static stuff
app.use(Express.static(Path.join(__dirname, "assets")));
app.use("/style", Express.static(Path.join(__dirname, "public", "style")));
app.use("/script", Express.static(Path.join(__dirname, "public", "script")));

// Endpoints and whatnot
app.get("/test", (request, response) => {
	response.send("<h1>the test worked</h1>");
})

// Make it so that all pages don't have
// the .html part at the end of them
app.use((request, response) => {

	// Get the stuff we're after
	const requestedContent = request.path.slice(1) || "index";
	const page = Path.join(__dirname, "public", `${requestedContent}.html`);

	// Check for if the page exists. If it does then
	// send them the page. Otherwise pack a sad
	if (FileSystem.existsSync(page))
	{
		// We have the right page. Add any dynamic content if needed
		// TODO: Do somewhere else
		let pageContents = FileSystem.readFileSync(page, "utf8");
		pageContents = pageContents.replaceAll("<DYNAMIC-SIDE-BAR/>", Navbar.generateSideNavHtml(requestedContent));
		pageContents = pageContents.replaceAll("<DYNAMIC-INTERESTS/>", Navbar.generateInterestsHtml());

		// Serve the page
		response.send(pageContents);
	}
	else Utils.SendCustomError(requestedContent, 404, response);
});

// Run the express server
app.listen(port, () => console.log(`Server listening on port ${port}!\nVisit it at http://localhost:${port}`));
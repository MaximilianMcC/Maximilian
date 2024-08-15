const Express = require("express");

// Setup express
const app = Express();
const port = process.env.PORT || 3000;

// Set the public folder for serving static
// stuff (normal plain html website thing)
app.use(Express.static(__dirname + "/public"));

// Set up all the routers so we can use stuff
// from other files (keeping clean fr)
app.get("/test", (request, response) => {
	response.send("<h1>testing rn</p>");
})

// Run the express server
app.listen(port, () => console.log(`Server listening on port ${port}!`));
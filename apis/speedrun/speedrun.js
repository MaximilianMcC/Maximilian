const Express = require("express");
const FileSystem = require("fs");
const Path = require("path");
const Utils = require("../../utils");

// Set up the express router
const router = Express.Router();

// Set the path to the json file
const path = Path.join(__dirname, "data-times.json");
if (!FileSystem.existsSync(path)) FileSystem.writeFileSync(path, "[]");


// Add a new run
router.post("/submit-run", (request, response) => {

	// Get the name and the run time then
	// chuck it into an object
	const currentRun = {
		name: request.query.name,
		time: Number(request.query.time)
	}
	
	// Get the JSON of the other runs
	const runs = getJson();
	
	// See where this current run sits in terms
	// of all of the other runs in the list
	let currentRunIndex = 0;
	for (let i = 0; i < runs.length; i++) {
		
		if (runs[i].time >= currentRun.time) continue;
		currentRunIndex = i + 1;
	}
	
	// Add the new run to the runs list at
	// the index we just found
	runs.splice(currentRunIndex, 0, currentRun);

	// Save the new runs list thing and
	// that the run has been submitted
	writeJson(runs);
	response.status(200).send("Run has been submitted.");
});
router.all("/submit-run", (request, response) => Utils.SendCustomError("test", 405, response));


// Get all of the runs
router.get("/get-runs", (request, response) => {

	// Get how many runs they want to see (10 default)
	runsToShow = request.query.count || 10;
	
	// Get all of the runs from the JSON
	let runs = getJson();

	// Remove everything so that we only have
	// however many runs bro wanted to get
	runs = runs.splice(0, runsToShow);

	// Send back the runs
	response.status(200).json(runs);
});

// Delete the runs (website)
router.get("/dashboard", (request, response) => {

	response.status(200).sendFile(Path.join(__dirname, "dashboard.html"));
});

// Delete the runs (actually delete them)
router.post("/delete-runs", (request, response) => {

	// Just replace the current json with a new empty one
	FileSystem.writeFileSync(path, "[]");

	response.status(200).send("deleted all runs");
});

function getJson() {
	
	// Open the JSON file and get its content, then
	// parse it to an object and return it
	const json = FileSystem.readFileSync(path, "utf8");
	return JSON.parse(json);
}

function writeJson(json) {
	
	// Serialize the JSON to a string then write
	// it back to the JSON file (4 space/tab indentation)
	json = JSON.stringify(json, null, "\t");
	FileSystem.writeFileSync(path, json);
}


// Send back the router or something
module.exports = router;
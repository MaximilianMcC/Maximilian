document.addEventListener("DOMContentLoaded", () => {

	// Get the terminal input box thingy
	const terminalInput = document.querySelector("#terminalInput");

	// Select it, and make sure it
	// can't be unselected ever
	// TODO: Only select if you click on the CRT
	terminalInput.focus();
	terminalInput.addEventListener("blur", (e) => {
		
		e.preventDefault();
		terminalInput.focus();
	});

});

let output = "Type 'help' for a list of commands\n\n\n";

// Check for if we wanna do a command
// TODO: Do in update loop like an actual game
terminalInput.addEventListener("keydown", (e) => {

	// Check for if we press enter
	if (e.key != "Enter") return;

	// Clean the input a bit
	const input = terminalInput.value.trim().toLowerCase();

	// Check for what the command is
	// TODO: Use switch
	// TODO: More commands. Use args or something
	if (input == "test") {

		output += "Testing 123\n";
		output += "\n";
	}
	else if (input == "help") {

		// Print the massive help menu thing
		// TODO: 'Line by line' animation
		output += "help     | Shows this command\n";
		output += "about    | Information about me\n";
		output += "contact  | My contact information\n";
		output += "projects | List of personal projects\n";	
		output += "cls      | Clear the screen\n";
		output += "\n";
	}
	else if (input == "about") {

		// TODO: HTTP GET request to get the content so it doesn't have to be written in two places. Maybe actually store in md or something
		// TODO: 'Typing' animation effect
		output += "My name is Max. I'm 18 and live in New Zealand\n";
		output += "I mostly spend my time coding, watching youtube, and occasionally playing games.\n";
		output += "I know heaps of Star Wars lore, and I also love British steam trains.\n";
		output += "I'm a self taught programmer, and my favorite language is C#.'\n";
		output += "Some of my favorite games are Minecraft, Portal, and Half-Life: Alyx.\n";
		output += "\n";
	}
	else if (input == "contact") {

		// TODO: HTTP GET request to get the content so it doesn't have to be written in two places. Maybe actually store in md or something
		// TODO: 'Line by line' animation
		output += "I don't really use traditional social media, but I do have an account on most to reserve my name. Discord is the best place to contact me, otherwise email.\n\n";
		output += "Discord: @MTMB\n";
		output += "Email: max@maximilian.co.nz\n";
		output += "Phone: +64 021 971711\n";
		output += "\n";
	}
	else if (input == "projects") {

		// TODO: HTTP GET request to get the content so it doesn't have to be written in two places. Maybe actually store in md or something
		// TODO: ^ Have different output based on web or terminal
		// TODO: 'Line by line' animation
		output += "I rarely finish any projects. About half of them live on GitHub, with the other half residing on my pc.\n";
		output += "GitHub: https://github.com/MaximilianMcC\n"
		output += "\n";
	}
	else if (input == "cls") {

		// Just fully get rid of the output
		output = "";
	}
	else if (input == "sweep") {
		
		// sweep();
		output += "                ┌───────┬───────┬───┬───────┬───────┐\n";
		output += "                │  000  │       │ ☺ │       │  000  │\n"
		output += "                └───────┴───────┴───┴───────┴───────┘\n"
		output += "                ┌───┬───┬───┬───┬───┬───┬───┬───┬───┐\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                ├───┼───┼───┼───┼───┼───┼───┼───┼───┤\n";
		output += "                │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │ 1 │\n";
		output += "                └───┴───┴───┴───┴───┴───┴───┴───┴───┘\n";
		output += "\n";
	}
	else {

		// Unknown command
		output += "Unknown command. Type 'help' for a list of commands.\n";
		output += "\n";
	}

	// We just ran a command. Reset the input thing
	// TODO: Add the command to the history
	terminalInput.value = "";
});

function update() {



}

function drawText(text, x, initialY, ctx) {
	
	// Get the line height and determine how
	// much to increase the Y from that
	// TODO: Use regex to get this in a nicer way
	const fontSize = ctx.font.split(" ")[0].replace("px", "");
	const lineHeight = fontSize * 1.2;

	// Split the text into different lines
	let y = initialY;
	text.split("\n").forEach(line => {
		
		// Draw the text
		ctx.fillText(line, x, y);

		// Increase the Y position
		y += lineHeight;
	});
}

// TODO: Don't call every second. Only if there is typing or something
function draw() {

	// Clear the screen
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, terminalCanvas.width, terminalCanvas.height);

	
	// Set the terminal font text stuff
	// TODO: Add bloom or something
	ctx.font = "9px monospace";
	ctx.fillStyle = "orange";

	// Draw the terminal output and input
	drawText(`${output}\n\n>${terminalInput.value}`, 15, 50, ctx);
	
	// Say that we gotta update the texture
	// and actually draw the screen thing yk
	screenTexture.needsUpdate = true;
}

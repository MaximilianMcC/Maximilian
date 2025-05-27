let commands;

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

	// Load all commands
	commands.push(
		helpCommand
	)
});

let output = "Type 'help' for a list of commands\n\n\n";

// Check for if we wanna do a command
// TODO: Do in update loop like an actual game
terminalInput.addEventListener("keydown", (e) => {

	// Check for if we press enter
	if (e.key != "Enter") return;

	// Get the input & clean it a bit
	const input = terminalInput.value.trim().toLowerCase();

	commands.forEach(command => {

		// Check for if we've found a command
		if (command.name == input)
		{
			// Get the args
			const args = input.replace(command.name, "");

			// We just ran a command. Reset the input thing
			// TODO: Add the command to the history
			terminalInput.value = "";

			// Run the command
			command.run(args);
			return;
		}
	});

	// Unknown command
	output += "Unknown command. Type 'help' for a list of commands.\n";
	output += "\n";
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

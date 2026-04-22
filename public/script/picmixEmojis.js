const inputBox = document.querySelector("#text-input");
const outputBox = document.querySelector("#text-output");

// Add a random mon vote thing
document.addEventListener("DOMContentLoaded", () => {

	const monVotes = [
		"Mon vote!!!",
		"Mon coup de  :x  :x ",
		"Sacré bleu!! :-O  :-O  :-O ",
		"Mon vote :D +5*****",
		"Mon vote est de 5 étoiles!",
		"Mon coup de (*)  (*)  (*)  (*)  (*) ",
		"Magnifique :D  :D ",
		"Une création magnifique, 5*****",
		"Beautiful Creation!  >:D< ",
		"Merci du partage!"
	];

	const randomMonVote = monVotes[Math.floor(Math.random() * monVotes.length)];
	inputBox.placeholder = randomMonVote;	
});


inputBox.addEventListener("input", () => {
	updateOutputBox();
});

let mappings = []
document.querySelectorAll("#picmix-emoji-button").forEach(button => {

	// Get the mappings of all ascii to image
	mappings.push({
		ascii: button.title,
		url: button.querySelector("img").src
	});

	// Check for if we are using the emoji
	button.addEventListener("click", () => {

		// Get the ascii representation of the emoji from the tooltip thing
		// then add it to the input box plaintext thingy
		// TODO: Maybe store it somewhere else
		inputBox.value += " " + button.title + " ";
		updateOutputBox();
	});
});

function updateOutputBox() {
	let newContent = ``;

	// Sort the emojis list so the longer ascii ones are first
	// to stop conflicts between stuff like :( and :((
	// TODO: Don't do this each time
	mappings = mappings.sort((a, b) => (b.ascii.length - a.ascii.length));

	// Loop over every character of the input box and check for if we've come across an emoji key
	for (let i = 0; i < inputBox.value.length; i++) {

		// Convert newlines into breaks
		if (inputBox.value[i] === "\n")
		{
			newContent += `<br>`;
			continue;
		}

		// TODO: Could lowk just do replaceAll on this ngl
		let foundEmoji = false;
		mappings.forEach(emoji => {

			// Get the characters from now til the end of the current emoji
			const endIndex = i + emoji.ascii.length;
			const potentialEmoji = inputBox.value.substring(i, endIndex);

			// Check for if we've found an emoji
			if (potentialEmoji == emoji.ascii)
			{
				// Add the html for the emoji
				newContent += `<img class="picmix-emoji" src="${emoji.url}" title="${emoji.ascii}"> `

				// Advance past the emoji so we don't 'doubly count it'
				// TODO: Add 1
				foundEmoji = true;
				i = endIndex;
			}
		});

		// If there was no emoji associated with this character
		// then just add the letter as a normal p string thing
		if (foundEmoji == false) newContent += inputBox.value[i];
	}

	outputBox.innerHTML = newContent;
	updateWordCount();
}

// Check for if we press the copy button
const copyButton = document.querySelector("#copy-button")
copyButton.addEventListener("click", async () => {

	// No playing silly buggers
	if (inputBox.value == "") return;

	//? try/catch because some browsers don't like this apparently
	try {
		// Copy the ascii stuff to clipboard
		await navigator.clipboard.writeText(inputBox.value);
	
		// Change the text
		copyButton.textContent = "copied!";

		// Make the text go back to copy after a second
		setTimeout(() => {
			copyButton.textContent = "copy";
		}, 1 * 1000);

	} catch (error) {
		console.log(error);
	}
});

// TODO: Make it say both limits
const maxDescriptionCharacters = 255;
const maxCommentCharacters = 1000;
function updateWordCount() {
	
	// Update the counter thingy
	let characters = inputBox.value.length;
	document.querySelector("#characterCount").innerText = `There is ${characters}`;
}
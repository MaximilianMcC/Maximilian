const inputBox = document.querySelector("#text-input");
const outputBox = document.querySelector("#text-output");



inputBox.addEventListener("input", () => updateOutputBox());

const mappings = []
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
				newContent += `<img class="picmix-emoji" src="${emoji.url}"> `

				// Advance past the emoji so we don't 'doubly count it'
				// TODO: Add 1
				foundEmoji = true;
				i = endIndex;
			}
		});

		// If there was no emoji associated with this character
		// then just add the character to the box normally
		if (foundEmoji == false) newContent += inputBox.value[i];
	}

	outputBox.innerHTML = newContent;
}
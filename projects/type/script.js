document.addEventListener("DOMContentLoaded", () => {

	

});



const testText = document.querySelector("#text");
document.addEventListener("keydown", (e) => {
	
	// Check for if they want to delete a letter
	if (e.key === "Backspace") {

		testText.innerHTML = testText.innerHTML.slice(0, -1);
		return;
	}

	// Add the new letter to the text
	// if its actually a real letter
	if (e.key.length !== 1) return;
	testText.innerHTML += e.key;
});





// Get a random word from the word list
function getRandomWord() {
	
	const index = Math.floor(Math.random() * words.length);
	return words[index];
}

// Get a random key from a numpad
function getRandomNumpad() {
	
	// TODO: Include enter key somehow
	const numpadCharacters = [
		"/", "*", "-", "+",
		"7", "8", "9", "4", "5", "6", "1", "2", "3", "0",
		"."
	];

	const index = Math.floor(Math.random() * numpadCharacters.length);
	return numpadCharacters[index];
}
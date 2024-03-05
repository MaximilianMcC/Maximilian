// Get a random word from the word list
function getRandomWord() {
	
	const index = Math.floor(Math.random() * words.length);
	return words[index];
}
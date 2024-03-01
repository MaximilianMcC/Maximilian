
// TODO: Hide the site and have a message that says "due to the table layout used this site is unavallible on a screen of your size" or something like that

document.addEventListener("DOMContentLoaded", () => {

	// Get all of the bit inputs for the table
	//? Might need to add an 'index' attribute to the HTML to order them
	const bitInputs = document.querySelectorAll("#binaryInput");

	// Get all of the bit displays for the table
	const bitDisplays = document.querySelectorAll("#bitDisplay");

	// Get the character input
	const characterInput = document.querySelector("#characterInput");

	// Get the maths explanation string
	const mathsExplanation = document.querySelector("#maths");




	characterInput.addEventListener("input", (e) => {
		
		// Get the ASCII value of the first
		// character in the input string		
		const asciiValue = characterInput.value.charCodeAt(0);
		
		// Figure out what numbers/bits are needed
		// to make the ascii number of the character
		const bitsRequired = getBitsRequired(asciiValue);

		// Write the maths explanation
		let equation = ``;
		for (let i = 0; i < bitsRequired.length; i++) {
			
			equation += `<span class="number">${bitsRequired[i]}</span>`;
			if (i < bitsRequired.length - 1) equation += ` + `;
		}
		mathsExplanation.innerHTML = `Because ${equation} = ${asciiValue}`;
	});

	for (let i = 0; i < bitInputs.length; i++) {

		// Get the current bit input
		const bitInput = bitInputs[i];
		bitInput.addEventListener("input", () => {

			// Set the corresponding bit display
			// to reflect this checbox
			bitDisplays[i].innerHTML = bitInput.checked ? '1' : '0';
		});
	};
});



function getBitsRequired(number) {

	let bitsRequired = [];
	let currentNumber = number;

	// Start at the highest power of 2 and work
	// our way down until we reach the right values
	for (let power = 7; power >= 0; power--) {

		// Get the current bit
		let currentBit = Math.pow(2, power);
		
		// Check for if we need to remove another bit
		if (currentNumber >= currentBit) {

			bitsRequired.push(currentBit);
			currentNumber -= currentBit;
		}
	}

	return bitsRequired;
}
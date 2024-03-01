document.addEventListener("DOMContentLoaded", () => {

	// Add the update event listener to everything
	document.querySelector("#characterInput").addEventListener("input", () => update());
});


// TODO: Get all elements first, not at runtime
function update() {
	
	console.log("Updating rn");

	// Get the ascii number
	// and update the text
	const asciiNumber = document.querySelector("#characterInput").value.charCodeAt(0);
	document.querySelector("#asciiNumber").innerHTML = asciiNumber;



	// Figure out what numbers/bits are needed
	// to make the ascii number of the character
	const bitsRequired = getBitsRequired(asciiNumber);



	// Write and update the maths equation
	let equation = ``;
	for (let i = 0; i < bitsRequired.length; i++) {
		
		equation += `<span class="number">${bitsRequired[i]}</span>`;
		if (i < bitsRequired.length - 1) equation += ` + `;
	}
	document.querySelector("#maths").innerHTML = `${equation} = ${asciiNumber}`;

	console.log(bitsRequired);


	// Update the bits in the table to
	// show the correct inputs
	const bitInputs = document.querySelectorAll("#bitInput");
	for (let i = 0; i < bitInputs.length; i++) {

		// Get the 'header' value
		//? 128, 64, 32, etc
		const header = Math.pow(2, i);

		// Check if the header needs to be toggled
		const newBit = bitsRequired.includes(header) ? "1" : "0";
		bitInputs[bitInputs.length - 1 - i].setAttribute("bit", newBit);

		// Update the text to reflect its bit state
		bitInputs[bitInputs.length - 1 - i].innerHTML = newBit;
	}
}



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
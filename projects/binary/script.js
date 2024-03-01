document.addEventListener("DOMContentLoaded", () => {

	// Update everything when a new character is added
	document.querySelector("#characterInput").addEventListener("input", () => characterUpdate());

	// Check for if the bits in the table are being
	// tampered with and update everything
	const bitInputs = document.querySelectorAll("#bitInput");
	for (let i = 0; i < bitInputs.length; i++) {
		bitInputs[i].addEventListener("click", () => {

			// Swap the bit that was clicked on
			//! Kinda confusing way of writing but makes sense ig
			const newBit = bitInputs[i].getAttribute("bit") == "1";
			bitInputs[i].setAttribute("bit", newBit ? "0" : "1");
			bitInputs[i].innerHTML = bitInputs[i].getAttribute("bit");



			// Get the bits required from the bit attribute of everything
			const bitsRequired = [];
			for (let j = 0; j < bitInputs.length; j++) {
				
				// Get the header thing
				const header = Math.pow(2, j);
				
				// See if the bit is 'used' (a 1)
				if (bitInputs[bitInputs.length - 1 - j].getAttribute("bit") == "1") bitsRequired.push(header);
			}
			
			

			// Get the new ascii number and write
			// the calculations
			let asciiNumber = 0;
			bitsRequired.forEach(bit => asciiNumber += bit);
			setCalculation(bitsRequired, asciiNumber);


			// Set the character input to be the ascii number
			// and the ascii number display under it
			const character = String.fromCharCode(asciiNumber);
			document.querySelector("#characterInput").value = character;
			document.querySelector("#asciiNumber").innerHTML = asciiNumber;
		});
	}
});


// TODO: Get all elements first, not at runtime
function characterUpdate() {
	
	console.log("Updating from the character rn");

	// Get the ascii number
	// and update the text
	const characterInput = document.querySelector("#characterInput").value;
	if (characterInput == "") return;
	const asciiNumber = characterInput.charCodeAt(0);
	document.querySelector("#asciiNumber").innerHTML = asciiNumber;



	// Figure out what numbers/bits are needed
	// to make the ascii number of the character
	// and write the equation
	const bitsRequired = getBitsRequired(asciiNumber);
	setCalculation(bitsRequired, asciiNumber);



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

	const bitsRequired = [];
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



function setCalculation(bitsRequired, asciiNumber) {

	let equation = ``;
	for (let i = 0; i < bitsRequired.length; i++) {
		
		equation += `<span class="number">${bitsRequired[i]}</span>`;
		if (i < bitsRequired.length - 1) equation += ` + `;
	}
	document.querySelector("#maths").innerHTML = `${equation} = <span class="number">${asciiNumber}</span>`;
}
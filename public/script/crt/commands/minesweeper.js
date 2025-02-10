const boardWidth = 9;
const boardHeight = 9;
const mineCount = 10;
let board = [];

function sweep() {
	
	// Generate all the mines
	minePositions = [];
	for (let i = 0; i < mineCount; i++) {
		
		let currentPosition = -1;
		do
		{
			// Get a random position for the mine to be at
			let currentPosition = randomInt(0, (boardWidth * boardHeight));
			minePositions.push(currentPosition);
		}
		while (minePositions.contains(currentPosition));
	}

	console.log(minePositions);
}



function randomInt(min, max) {

	return Math.floor((Math.random() * (max - (min + 1)) + min));
}
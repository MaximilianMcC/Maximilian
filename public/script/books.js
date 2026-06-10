document.addEventListener("DOMContentLoaded", async () => {

	// Get all of the books
	const url = `${window.location.origin}/apis/books`;
	const data = await fetch(url);
	if (data.status != 200) console.log(`error while fetching book list`);
	const json = await data.json();

	const bookshelf = document.querySelector(".bookshelf");

	// Every three books are wrapped in a .row
	//? this 3 comes from css
	let booksPerRow = 3;
	let currentBookCount = 0;
	let rowHtml = `<div class="row">`;

	// Loop over every book and make its html
	json.forEach(book => {
		
		// Check for if we need to begin or end a row
		currentBookCount++;
		if (currentBookCount > booksPerRow) {
			
			// Reset our progress
			currentBookCount = 1;

			// End the current row and
			// add it to the bookshelf
			rowHtml += `</div>`;
			bookshelf.innerHTML += rowHtml;

			// Create a new row
			rowHtml = `<div class="row">`;
		}

		// Format the dates nicely
		let releaseYear = new Date(book["released"]).getFullYear();
		if (!releaseYear) releaseYear = "unknown";

		const readTime = `${new Date(book["beginReading"]).getMonth()} ${new Date(book["beginReading"]).getFullYear()}`;
		
		// Get the format the book is in
		let format = `${book["format"]}`;
		if (book["formatInformation"] != null) format += ` (${book["formatInformation"]})`;

		rowHtml += `
			<div class="book">
				<img class="cover foreground" src="/image/books/${book["cover"]}" alt="${book["title"]}">
				<div class="content ${book["textColor"]}">
					<h2>${book["title"]}</h2>
					<p><strong>Released:</strong> ${releaseYear}, <strong>Read:</strong> ${readTime}</p>
					<p><strong>Estimated Reading Time:</strong> ${book["estimatedTimeReading"]}</p>
					<p><strong>Format:</strong>${format}</p>
					<div class="rating">
						<p><strong>My Rating:</strong></p>
						<span>⭐</span>
						<span>⭐</span>
						<span>⭐</span>
						<span>⭐</span>
						<span>⭐</span>
					</div>
				</div>
				<img class="cover background" src="/image/books/${book["cover"]}" alt="${book["title"]}">
			</div>
		`;
	});
});
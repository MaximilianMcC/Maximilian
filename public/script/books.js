document.addEventListener("DOMContentLoaded", async () => {

	// Get all of the books
	const url = `${window.location.origin}/apis/books`;
	const data = await fetch(url);
	if (data.status != 200) console.log(`error while fetching book list`);
	const json = await data.json();

	const bookshelf = document.querySelector(".bookshelf");

	// Loop over every book and make its html
	json.forEach(book => {
		
		// Format the dates nicely
		const releaseYear = new Date(book["released"]).getFullYear();
		const readTime = `${new Date(book["beginReading"]).getMonth()} ${new Date(book["beginReading"]).getFullYear()}`;
		
		// Get the format the book is in
		let format = `${book["format"]}`;
		if (book["formatInformation"] != null) format += `(${book["formatInformation"]})`;

		bookshelf.innerHTML += `
			<div class="book">
				<img class="cover foreground" src="/image/books/${book["cover"]}" alt="${book["title"]}">
				<div class="content">
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

document.querySelectorAll("img#openImageWhenClicked").forEach(image => {
	image.addEventListener("click", () => {

		// Extract the link to the image then open it in a new tab
		const link = image.src;
		window.open(link, "_blank");
	});
});

document.querySelectorAll("img#openImageWhenClicked").forEach(image => {
	image.addEventListener("click", () => {

		// Extract the link to the image then open it in a new tab
		// also remove the size attribute thingy if it has one
		const link = new URL(image.src);
		link.searchParams.delete("size");

		window.open(link, "_blank");
	});
});
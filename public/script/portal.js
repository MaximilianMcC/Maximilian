
// Toggle the icons on/off when we click on them
document.querySelectorAll(".icons img").forEach(icon => {
	icon.addEventListener("click", () => {

		// Toggle the on/off state
		icon.classList.toggle("off");
	});
});

// const digits = document.querySelectorAll("#chamberIndex");
// digits.forEach(digit => digit.addEventListener("input", () => {

// 	// Combine the two digits into one number
// 	const chamberIndex = digits[0].value + digits[1].value;
// }));

const progressText = document.querySelector("#progressText");
progressText.addEventListener("input", () => {

	// If we have a malformed input then set it to be full
	if (progressText.value.includes("/") == false) {
		setProgressBar(1, 1);
		return;
	}

	// Parse the text to get the x/y
	const segments = progressText.value.split("/");
	const currentChamber = Number(segments[0]);
	const totalChambers = Number(segments[1]);

	// If we're not looking at numbers then set the thing to be filled
	if (!Number.isFinite(currentChamber) || !Number.isFinite(totalChambers)) {
		setProgressBar(1, 1);
		return;
	}

	setProgressBar(currentChamber, totalChambers);
});

function setProgressBar(currentChamber, maxChambers) {
	
	// TODO: Have this defined in the html instead of js
	const maxProgressBars = 23; 
	const minProgressBars = 1;
	const progressBarHtml = `<img src="/image/portal/chamber-progress-bars.png" alt="|">`;

	// Figure out how many progress bars we need
	const percent = currentChamber / maxChambers;
	let barsNeeded = clamp(maxProgressBars * percent, minProgressBars, maxProgressBars);

	// Clear however many bars we had before
	const progressBars = document.querySelector(".progress-bars");
	progressBars.innerHTML = "";

	// Add our new bars
	for (let i = 0; i < barsNeeded; i++) {
		progressBars.innerHTML += progressBarHtml;
	}
}

function clamp(value, min, max) {
	if (value > max) return max;
	if (value < min) return min;
	return value;
}
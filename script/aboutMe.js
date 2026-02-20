// My birthday (in gmt/utc)
const birthday = new Date(Date.UTC(2006, 11, 16, 11));

function getAge() {

	// Get the difference between the years
	const timeRnUtc = new Date();
	let age = timeRnUtc.getFullYear() - birthday.getUTCFullYear();

	// Check for if my birthday has passed
	const hadBirthdayThisYear = 
		(timeRnUtc.getMonth() > birthday.getUTCMonth()) ||
		(timeRnUtc.getMonth() === birthday.getUTCMonth() &&
		timeRnUtc.getDate() >= birthday.getUTCDate());

	// If my birthday hasn't passed we need to take off a year
	// since the birth day has not arrived yk
	if (hadBirthdayThisYear == false) age--;
	return age;
}


// My age
document.querySelectorAll("span#age").forEach(element => {
	element.innerText = getAge();
});

// My birthday in NZST
document.querySelectorAll("span#birthday").forEach(element => {
	element.innerText = birthday.toLocaleDateString("en-NZ", {
		timeZone: "Pacific/Auckland",
		day: "numeric",
		month: "long",
		year: "numeric"
	});
});

// My birthday in the viewers timezone
document.querySelectorAll("span#birthdayForViewer").forEach(element => {
	element.innerText = birthday.toLocaleString(undefined, {
		dateStyle: "long",
		timeStyle: "short"
	});
});

// The timezone the viewer is in
// TODO: add the name of it
document.querySelectorAll("span#viewerTimezone").forEach(element => {

	// Get the date rn and extract its timezone
	// then convert it to a number from gmt
	const offsetInMinutes = new Date().getTimezoneOffset();
	const offsetInHours = -offsetInMinutes / 60;
	
	// Check for if its plus or minus
	element.innerText = ((offsetInHours >= 0) ? "+" : "-") + offsetInHours;
});
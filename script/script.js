document.addEventListener("DOMContentLoaded", () => {

	// Log the GitHub repo because idk why else
	// people would be snooping in inspect
	console.log("All the website code is on GitHub:\nhttps://github.com/MaximilianMcC/Maximilian");
	console.log("If you're looking for something that is no-longer here, check the commit history. I tend to redesign this site every couple months.");


	// Set my age
	const age = getAge();
	document.querySelectorAll("#age").forEach(element => {
		element.innerHTML = age;
	});
});


function getAge() {
	
	// Get the current date, and my birth date
	const today = new Date;
	const birthday = new Date("2006-11-17");

	// Get my age 
	const currentYear = today.getFullYear();
	const birthYear = birthday.getFullYear();
	let age = currentYear - birthYear;

	// If the current month is before this month, one
	// needs to be subtracted from the age because the
	// birthday hasn't happened yet
	const currentMonth = today.getMonth();
	const birthMonth = birthday.getMonth();
	month = currentMonth - birthMonth;
	if (month < 0 || (month === 0) && today - birthday) age--;

	// Return my current age
	return age;
}
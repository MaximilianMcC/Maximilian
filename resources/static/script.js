

document.addEventListener("DOMContentLoaded", () => {

	// Give people who open devtools some info
	console.log("I used https://www.typeitjs.com/ to make the typing animation btw");

	// Add Twemoji
	twemoji.parse(document.body);

	// Run the typing effect
	headerCode();


});

// Make a writing code effect
function headerCode() {
	
	let codeStrings = [
		"echo Maximilian",
		"&lt;h1&gt;Maximilian&lt;/h1&gt;",
		"print(\"Maximilian\")",
		"Console.WriteLine(\"Maximilian\");",
		"System.out.println(\"Maximilian\");",
		"console.log(\"Maximilian\");"
	];

	new TypeIt("#code", {
		strings: codeStrings,
		speed: 95,
		nextStringDelay: 2500,
		lifeLife: true,
		waitUntilVisible: true,
		loop: true,
		breakLines: false
	}).go();

}
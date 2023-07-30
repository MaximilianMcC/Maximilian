document.addEventListener("DOMContentLoaded", () => {
	console.log("I used https://www.typeitjs.com/ to make the typing animation if you're wondering btw");



	
	// Add Twemoji emojis
	twemoji.parse(document.body);

	// Run the typing effect
	headerCode();
});




// Make a writing code effect
function headerCode() {
	
	const text = "Maximilian";
	const codeStrings = [
		`<span class="keyword">echo</span> <span class="content">${text}</span>`,
		`<span class="grey">&lt;</span><span class="keyword">h1</span><span class="grey">&gt;</span><span class="content">${text}</span><span class="grey">&lt;/</span><span class="keyword">h1</span><span class="grey">&gt;</span>`,
		`<span class="method">print</span><span class="content">(</span><span class="string">"${text}"</span><span class="content">)</span>`,
		`Console<span class="content">.</span><span class="method">WriteLine</span><span class="content">(</span><span class="string">"${text}"</span><span class="content">);</span>`,
		`System<span class="content">.</span>out<span class="content">.</span><span class="method">println</span><span class="content">(</span><span class="string">"${text}"</span><span class="content">);</span>`,
		`console<span class="content">.</span><span class="method">log</span><span class="content">(</span><span class="string">"${text}"</span><span class="content">);</span>`
	];

	new TypeIt("#code", {
		strings: codeStrings,
		speed: 100,
		nextStringDelay: 2500,
		lifeLife: true,
		waitUntilVisible: true,
		loop: true,
		breakLines: false
	}).go();

}
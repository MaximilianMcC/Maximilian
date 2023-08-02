document.addEventListener("DOMContentLoaded", () => {
	console.log("I used https://www.typeitjs.com/ to make the typing animation if you're wondering btw");


	// Run the typing effect
	headerCode();

	// Get the GitHub stats
	updateGitHubStats();

	// Add Twemoji emojis
	twemoji.parse(document.body);
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

// Get my responsory statistics from GitHub
async function updateGitHubStats() {
	const username = "MaximilianMcC";
	const repoSection = document.querySelector(".repos");

	// Get the github repo info
	const repoStats = await get(`https://api.github.com/users/${username}/repos`);
	let repos = []
	repoStats.forEach(repo => {

		// Get when it was last updated
		repos.push({
			timestamp: Date.parse(repo["pushed_at"]),
			repoDetails: repo
		});
	});

	// Only get the first 3 most updated so the old crusty ones don't show up
	repos.sort((repo1, repo2) => repo2.timestamp - repo1.timestamp);
	repos.length = 4;
	repos.forEach(repoObject => {
		const repo = repoObject["repoDetails"];
		
		// Get some of the repos info
		const name = repo["name"].replaceAll("-", " ");
		const description = repo["description"];
		const language = repo["language"];
		const topics = repo["topics"];
		const stars = repo["stargazers_count"];
		const private = repo["private"];
		const url = repo["html_url"];
		
		// Skip the current repo if its not public
		if (private == true) return;

		// Create the HTML
		let tags = ``;
		if (topics.length > 0) tags = `<li><i class="fa-solid fa-tag"></i> ${topics.join(", ")}</li>`;

		const html = `
				<div class="repo">
					<a href="${url}" target="_blank">
						<h1>${name}</h1>
						<p>${description}</p>
						
						<ul class="info">
							<li><i class="fa-solid fa-code"></i> ${language}</li>
							${tags}
							<li><i class="fa-solid fa-star"></i> ${stars}</li>
						</ul>
					</a>
				</div>`;

		// Add the HTML to the DOM
		repoSection.innerHTML += html;
	});

}
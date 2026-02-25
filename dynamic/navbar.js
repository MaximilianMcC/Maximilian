const FileSystem = require("fs");

function generateSideNavHtml() {
	
	// Open the pages file to see what goes where
	// TODO: Use path.join
	const pages = getJson("./dynamic/pages.json");

	// Generate all the article links
	let articles = ``;
	pages["articles"].forEach(article => {
		if (article["showInSideNavBar"] == false) return;

		articles += `<li><a href="/articles/${article["page"]}">${article["displayName"]}</a></li>`;
	});

	// Generate all the interest links
	let interests = ``;
	pages["interests"].forEach(interest => {
		if (interest["showInSideNavBar"] == false) return;

		interests += `<li><a href="/interests/${interest["page"]}">${interest["displayName"]}</a></li>`;
	});

	// Chuck them together and add the headers
	return `
	<nav>
		<h1>Articles</h1>
		<ul class="vertical-nav">${articles}</ul>

		<h1>Interests</h1>
		<ul class="vertical-nav">${interests}</ul>
	</nav>
	`;
}

function generateInterestsHtml() {

	// Open the pages file to see what goes where
	// TODO: Use path.join
	const pages = getJson("./dynamic/pages.json");

	// Generate all the interest banners
	let interests = ``;
	pages["interests"].forEach(interest => {
		if (interest["showOnHomePage"] == false) return;
		
		// TODO: Make this dynamic based on time
		const isNew = interest["new"] ? "new" : "";

		interests += `<a class="interest-banner ${isNew}" href="/interests/${interest["page"]}"><img src="/image/interest-banners/${interest["imageBanner"]}" alt="${interest["displayName"]}"></a>`;
	});

	return interests;
}

function getJson(path) {
	
	// Open the JSON file and get its content, then
	// parse it to an object and return it
	const json = FileSystem.readFileSync(path, "utf8");
	return JSON.parse(json);
}

module.exports = {
	generateSideNavHtml,
	generateInterestsHtml
};
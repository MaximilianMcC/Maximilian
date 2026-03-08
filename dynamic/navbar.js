const FileSystem = require("fs");

function generateSideNavHtml(page) {
	
	// Open the pages file to see what goes where
	// TODO: Use path.join
	const pages = getJson("./dynamic/pages.json");

	// Generate all the article links
	let articles = ``;
	pages["articles"].forEach(article => {
		if (article["showInSideNavBar"] == false) return;

		// Check for if we need to add a new sticker thingy
		const newSticker = isNew(article, page) ? `class="new-small"` : ``;

		articles += `<li><a ${newSticker} href="/articles/${article["page"]}">${article["displayName"]}</a></li>`;
	});

	// Generate all the interest links
	let interests = ``;
	pages["interests"].forEach(interest => {
		if (interest["showInSideNavBar"] == false) return;

		// Check for if we need to add a new sticker thingy.
		// If we are on the home page then don't show it though
		let newSticker = ``;
		if (page != "index") {
			
			newSticker = isNew(interest, page) ? `class="new-small"` : ``;
		}

		interests += `<li><a ${newSticker} href="/interests/${interest["page"]}">${interest["displayName"]}</a></li>`;
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
		
		// Check for if we need to add a new sticker thingy
		const newSticker = isNew(interest) ? `new` : ``;

		interests += `<a class="interest-banner ${newSticker}" href="/interests/${interest["page"]}"><img src="/image/interest-banners/${interest["imageBanner"]}" alt="${interest["displayName"]}"></a>`;
	});

	return interests;
}

function isNew(thing, page) {

	// If the page we're on is potentially new then don't show it
	// TODO: Do this some other way
	if (page == `interests/${thing["page"]}`) return false;
	if (page == `articles/${thing["page"]}`) return false;

	// Check for if we should be showing the sticker at all
	if (thing["lastUpdated"] != null || thing["ignoreNew"] != true)
	{
		// Get the ms in between rn and the last updated time is less than a week
		const week = 7 * 24 * 60 * 60 * 1000;
		const lessThanWeek = (Date.now() - new Date(thing["lastUpdated"])) < week;

		// If the page is less than a week old then add a new sticker
		if (lessThanWeek) return true;
	}

	return false;
}

// TODO: Don't do this maybe because there's nothing actually dynamic about it
function generatePhoneNavHtml(page) {
	
	return `
	<div class="phone-navbar-button">
		<button>
			<img src="/image/buttons/phone-navigation-button.gif" alt="Navigation">
		</button>
	</div>

	<div class="phone-navbar hidden">
		${generateSideNavHtml(page)}
		<hr>
		<a href="/" class="home-button"></a>
	</div>
	`;
}

function getJson(path) {
	
	// Open the JSON file and get its content, then
	// parse it to an object and return it
	const json = FileSystem.readFileSync(path, "utf8");
	return JSON.parse(json);
}

module.exports = {
	generateSideNavHtml,
	generatePhoneNavHtml,
	generateInterestsHtml
};
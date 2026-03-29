const Express = require("express");
const Axios = require("axios");
const JsDom = require("jsdom");
const Utils = require("../../../utils");

const picmixBaseUrl = "https://www.picmix.com";
const headers = {
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
};

// TODO: Add a 10 minute cache or something
async function scrapeWebsite(url) {
	try {

		// Get the website
		const response = await Axios.get(url, {
			headers,
			validateStatus: () => true
		});

		if (response.status !== 200) {
			return {
				error: true,
				httpStatus: response.status,
				response: response.data
			}
		}
		
		// Hook into the dom
		const dom = new JsDom.JSDOM(response.data);
		return dom.window.document;
	}
	catch (error) {

		console.log("Failed to scrape:", error.message);
		return null;
	}
}

function convertHtmlEmojisToPlainText(paragraph) {
	let result = "";

	//? this is some super rinky thing but I've gotta use it I think
	// TODO: Don't do this
	const ELEMENT_NODE = 1;
	const TEXT_NODE = 3;

	// Loop over everything in the paragraph and only use the emoji alt text
	paragraph.childNodes.forEach(child => {
		
		// Check for what we're looking at
		if (child.nodeType === TEXT_NODE) result += child.textContent;
		else if (child.nodeType == ELEMENT_NODE) {

			// Add the text representation of the emoji
			//? tag names must be caps
			if (child.tagName === "IMG") result += child.alt;
		}
	});

	return result;
}

function initPicmixApi(app) {

	// Get information about a user (profile)
	app.get("/api/picmix/profile", async (request, response) => {

		// Get the users name
		const requestedUsername = request.query.username;
		if (!requestedUsername) return Utils.SendCustomError("Please supply a ?username parameter", 400, response);

		// Get the site
		const url = `${picmixBaseUrl}/profile/${requestedUsername}`;
		const website = await scrapeWebsite(url);
		if (website.error)
		{
			console.log(`couldn't scape (got ${website.httpStatus} from ${url})`);

			if (website.httpStatus === 404) return Utils.SendCustomError(`No user with the name ${requestedUsername}`, 404, response);
			if (website.httpStatus === 403) return Utils.SendCustomError(`Picmix blocked the request <pre>${result.html.slice(0, 500)}</pre>`, 500, response);
			return Utils.SendCustomError(`Could not scrape picmix for some reason.`, 500, response);
		}

		const dom = website;
		if (!dom) return Utils.SendCustomError("Issue on my end whilst tryna scrape the picmix website", 500, response);

		// Place where we're gonna store the data
		let apiResponse = {}

		// Get the gender
		{
			const male = dom.querySelector("span.pMale") != undefined;
			const female = dom.querySelector("span.pFemale") != undefined;

			if (male) apiResponse["gender"] = "Male";
			if (female) apiResponse["gender"] = "Female";
		}

		// Get the username (using the gender)
		apiResponse["username"] = dom.querySelector(`span.p${apiResponse.gender}`).textContent;

		// Get the bio
		apiResponse["bio"] = convertHtmlEmojisToPlainText(dom.querySelector("div#pMe p"));

		// Get the language
		apiResponse["language"] = dom.querySelector("span.pLang").title;

		// Get the special url
		apiResponse["specialUrl"] = "https://" + dom.querySelector("a.pAddressLink").textContent;

		// Get the join date
		apiResponse["joinDate"] = new Date(dom.querySelector("div#pDateRegister span").title).toISOString();

		// Get if they have vip or not
		apiResponse["vip"] = dom.querySelector("div#pVipIcon") != undefined;

		// Get the avatar
		apiResponse["avatarPicmixId"] = (dom.querySelector("div#pAvatar a").href).split("/").pop();
		apiResponse["avatarPicmixUrl"] = dom.querySelector("div#pAvatar a img").src;

		// Get the total picmix count (up to 36)
		apiResponse["totalPicmix"] = Number((dom.querySelector("div#pPics h3.pTitle span").textContent).replace("(", "").replace(")", ""));
		// apiResponse["mostRecentPicmix"] = 

		// Get the total friends count
		apiResponse["totalFriends"] = Number((dom.querySelector("div#pFriends h3.pTitle span").textContent).replace("(", "").replace(")", ""));

		// Get the total received gifts
		apiResponse["totalRecievedGifts"] = Number((dom.querySelector("div#pGifts h3.pTitle span").textContent).replace("(", "").replace(")", ""));

		// Get the total contest entries
		apiResponse["totalContestEntries"] = Number((dom.querySelector("div#pContests h3.pTitle span").textContent).replace("(", "").replace(")", ""));

		// Get the total sticker count
		// TODO: Rename to stamps because that's french or whatever
		apiResponse["totalStickers"] = Number((dom.querySelector("div#pStamps h3.pTitle span").textContent).replace("(", "").replace(")", ""));

		// Get the total comments count
		apiResponse["totalComments"] = Number((dom.querySelector("div#pComments h3.pTitle span").textContent).replace("(", "").replace(")", ""));

		return response.json(apiResponse);
	});
}


module.exports = {
	initPicmixApi
};
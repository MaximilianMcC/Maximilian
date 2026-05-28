const Express = require("express");
const Axios = require("axios");
const JsDom = require("jsdom");
const Utils = require("../../../utils");

const picmixBaseUrl = "https://www.picmix.com";
const headers = {
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
	"Accept": "text/html,application/xhtml+xml",
	"Accept-Language": "en-US,en;q=0.9",
	"Connection": "keep-alive"
};

// TODO: Add a 10 minute cache or something
async function scrapeWebsite(url) {
	try {

		// Get the website
		const response = await Axios.get(url, {
			headers,
			maxRedirects: 5,
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

function convertPicmixToBasicObject(anchor) {
	const image = anchor.querySelector("img");

	// Check for if we're looking at a thumbnail or the full size thing
	// TODO: Don't do this ever this might just be the worst code ive ever written ever
	const url = image.src;
	let thumbnailUrl = url;
	let normalUrl = url;

	//? worst code ever bruh
	//! PLEASE FIX!!!!!
	if (url.includes("/thumb/"))
	{
		normalUrl = url.replace("/thumb/", "/normal/");
	}
	else
	{
		thumbnailUrl = url.replace("/normal/", "/thumb/");
	}

	return {
		title: image.alt.replace(" - Free animated GIF", ""),
		id: anchor.href.split("/").pop(),
		urlThumbnail: thumbnailUrl,
		urlNormal: normalUrl
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

function removeBrackets(string) {
	return string.replace("(", "").replace(")", "");
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
			if (website.httpStatus === 403) return Utils.SendCustomError(`Picmix blocked the request <pre>${website}</pre>`, 500, response);
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

		// Get the urls
		apiResponse["specialUrl"] = "https://" + dom.querySelector("a.pAddressLink").textContent;
		apiResponse["regularUrl"] = `${picmixBaseUrl}/profile/${apiResponse.username}`;

		// Get the join date
		apiResponse["joinDate"] = new Date(dom.querySelector("div#pDateRegister span").title).toISOString();

		// Get if they have vip or not
		apiResponse["vip"] = dom.querySelector("div#pVipIcon") != undefined;

		// Get the avatar
		apiResponse["avatarPicmix"] = convertPicmixToBasicObject(dom.querySelector("div#pAvatar a"));

		// Get the total picmix count (up to 36)
		const picmixElement = dom.querySelector("div#pPics h3.pTitle span")?.textContent;
		let picmixCount = picmixElement == null ? 0 : Number(removeBrackets(picmixElement));
		apiResponse["totalPicmix"] = picmixCount;

		// Get all the picmixs
		{
			let recents = [];
			dom.querySelectorAll("div#pPics div.list-grid div.container a").forEach(picmix => {
				recents.push(convertPicmixToBasicObject(picmix));
			});
			apiResponse["mostRecentPicmix"] = recents;
		}

		// Get the total friends count
		const friendsElement = dom.querySelector("div#pFriends h3.pTitle span")?.textContent;
		let friends = friendsElement == null ? 0 : Number(removeBrackets(friendsElement));
		apiResponse["totalFriends"] = friends;

		// Get the total received gifts
		const giftsElement = dom.querySelector("div#pGifts h3.pTitle span")?.textContent;
		let gifts = giftsElement == null ? 0 : Number(removeBrackets(giftsElement));
		apiResponse["totalRecievedGifts"] = gifts;

		// Get the total contest entries
		const contestsElement = dom.querySelector("div#pContests h3.pTitle span")?.textContent;
		let contests = contestsElement == null ? 0 : Number(removeBrackets(contestsElement));
		apiResponse["totalContestEntries"] = contests;

		// Get the total sticker count
		// TODO: Rename to stamps because that's french or whatever
		const stickersElement = dom.querySelector("div#pStamps h3.pTitle span")?.textContent;
		let stickers = stickersElement == null ? 0 : Number(removeBrackets(stickersElement));
		apiResponse["totalStickers"] = stickers;

		// Get the total comments count
		const commentElement = dom.querySelector("div#p h3.pComments span")?.textContent;
		let comments = commentElement == null ? 0 : Number(removeBrackets(commentElement));
		apiResponse["totalComments"] = comments;

		return response.json(apiResponse);
	});

	// Get information about a user (profile)
	app.get("/api/picmix/profile", async (request, response) => {

		// Get the users name
		const requestedPicmixId = request.query.username;
		if (!requestedPicmixId) return Utils.SendCustomError("Please supply an ?id parameter", 400, response);

		// Get the site
		const url = `${picmixBaseUrl}/pic/${requestedPicmixId}`;
		const website = await scrapeWebsite(url);
		if (website.error)
		{
			console.log(`couldn't scape (got ${website.httpStatus} from ${url})`);
			
			if (website.httpStatus === 404) return Utils.SendCustomError(`No user with the name ${requestedPicmixId}`, 404, response);
			if (website.httpStatus === 403) return Utils.SendCustomError(`Picmix blocked the request <pre>${website}</pre>`, 500, response);
			return Utils.SendCustomError(`Could not scrape picmix for some reason.`, 500, response);
		}

		const dom = website;
		if (!dom) return Utils.SendCustomError("Issue on my end whilst tryna scrape the picmix website", 500, response);

		// Place where we're gonna store the data
		let apiResponse = {}

		

		return response.json(apiResponse);
	});
}


module.exports = {
	initPicmixApi
};
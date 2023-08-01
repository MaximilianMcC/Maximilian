// Send a HTTP GET request
async function get(url, body) {
	
	try {
		// Make the response
		const response = await fetch(url, { method: "GET", body: body });

		// Check for errors
		if (!response.ok)
		{
			console.error(`HTTP status error! (${response.status})\n${response.statusText}`);
			return undefined;
		}

		// Give back the response content
		return await response.json();

	} catch(error) {
		console.error(`Error while fetching data: ${error}`);
		return undefined;
	}
}
const axios = require("axios").default;
const { API_KEY } = require("./config.json");

async function main(searchTerm) {
	const query = searchTerm;
	const youtubeApiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=id&maxResults=1&q=${query}&key=${API_KEY}`;

	try {
		const response = await axios.get(youtubeApiUrl);

		if (response.status === 200) {
			const youtubeVideoId = response.data.items[0].id.videoId;
			return youtubeVideoId;
		} else {
			throw new Error(
				`It's not possible to get the YouTube response [${response.status}]`
			);
		}
	} catch (err) {
		console.error(err);
	}
}

module.exports = main;

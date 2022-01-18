const fs = require("fs");
const axios = require("axios").default;

async function downloader(url, path) {
	try {
		if (!url) throw new Error("url is missing");
		if (!path) throw new Error("path is missing");

		const response = await axios({
			method: "GET",
			url: url,
			responseType: "stream",
		});

		response.data.pipe(fs.createWriteStream(path));

		return new Promise((resolve, reject) => {
			response.data.on("end", () => {
				resolve();
			});

			response.data.on("error", (err) => {
				reject(err);
			});
		});
	} catch (err) {
		console.error(err);
	}
}

module.exports = downloader;

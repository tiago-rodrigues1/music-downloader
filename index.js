const fs = require("fs");
const path = require("path");
const searcher = require("./robots/searcher");
const linkGetter = require("./robots/linkGetter");
const downloader = require("./robots/downloader");

const songsString = fs.readFileSync("./songs.txt").toString();
const songs = songsString.split("\n");

async function run() {
	try {
		for (let i = 0; i < songs.length; i++) {
			const downloadPath = path
				.resolve(__dirname, "my_songs", `${songs[i]}.mp3`)
				.replace(/ /gi, "_");

			const youtubeVideoId = await searcher(songs[i]);
			const downloadLink = await linkGetter(youtubeVideoId);

			console.log(`- Downloading ${songs[i]}`);
			await downloader(downloadLink, downloadPath);
			console.log(`- ${songs[i]} [OK]`);
		}
	} catch (err) {
		console.error(err);
	}
}

run();

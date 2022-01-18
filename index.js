const fs = require("fs");
const path = require("path");
const searcher = require("./robots/searcher");
const linkGetter = require("./robots/linkGetter");
const downloader = require("./robots/downloader");

const songsString = fs.readFileSync("./songs.txt").toString();
const songs = songsString.split("\n");

function run() {
	try {
		songs.forEach(async (song) => {
			const downloadPath = path
				.resolve(__dirname, "my_songs", `${song}.mp3`)
				.replace(/ /gi, "_");

			const youtubeVideoId = await searcher(song);
			const downloadLink = await linkGetter(youtubeVideoId);

			console.log(`- Downloading ${song}`);
			downloader(downloadLink, downloadPath).then(() => {
				console.log(`- ${song} [OK]`);
			});
		});
	} catch (err) {
		console.error(err);
	}
}

run();

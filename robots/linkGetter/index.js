const puppeteer = require("puppeteer");

const audioInfo = {};

async function main(youtubeVideoId) {
	try {
		if (youtubeVideoId) {
			const url = `https://www.y2mate.com/youtube-mp3/${youtubeVideoId}`;
			await setAudioInfo(url);
		} else {
			throw new Error("youtubeVideoId prop is missing");
		}
		if (audioInfo.downloadLink) {
			download(audioInfo.downloadLink, songName, downloadPath);
		} else {
			throw new Error("downloadLink prop is missing");
		}
	} catch (err) {
		console.error(err);
	}
}

async function setAudioInfo(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	page.setDefaultNavigationTimeout(0);

	await page.goto(url);

	const downloadBtnQuery = "#process_mp3";
	await page.waitForSelector(downloadBtnQuery, { timeout: 0 });
	await page.click(downloadBtnQuery);

	const getLinkBtnQuery = ".form-group.has-success.has-feedback a";

	await page.waitForSelector(getLinkBtnQuery, { timeout: 0 });
	const downloadLink = await page.$eval(getLinkBtnQuery, (el) => el.href);

	audioInfo.downloadLink = downloadLink;

	await browser.close();
}

module.exports = main;

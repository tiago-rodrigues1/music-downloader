const puppeteer = require("puppeteer");

async function main(youtubeVideoId) {
	const url = "https://x2download.com/en26/download-youtube-to-mp3";

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto(url);

	await page.type(
		"#s_input",
		`https://www.youtube.com/watch?v=${youtubeVideoId}`
	);

	await page.click(".btn-red");

	const callDownloadBtnQuery = "#btn-action";
	await page.waitForSelector(callDownloadBtnQuery, {
		timeout: 0,
	});
	await page.click(callDownloadBtnQuery);

	const linkDownloadResponse = await page.waitForResponse(
		"https://backend.svcenter.xyz/api/convert-by-45fc4be8916916ba3b8d61dd6e0d6994"
	);

	linkDownloadResponse.ok() &&
		(await page.waitForSelector("#asuccess", {
			visible: true,
			timeout: 0,
		}));

	const downloadLinkElementHandle = await page.$("#asuccess");
	const downloadLink = await (
		await downloadLinkElementHandle.getProperty("href")
	)._remoteObject.value;

	await browser.close();

	return downloadLink;
}

module.exports = main;

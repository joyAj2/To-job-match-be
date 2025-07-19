const axios = require("axios");
const cheerio = require("cheerio");
const Job = require("../../models/Job");

async function scrapeJobs() {
	const { data } = await axios.get("https://remoteok.com/");
	const $ = cheerio.load(data);
	const jobs = [];

	$(".job").each((i, el) => {
		const title = $(el).find(".company h2").text();
		const description = $(el).find(".description").text();
		if (title && description) {
			jobs.push({ title, description });
		}
});

	for (let job of jobs) {
		await Job.updateOne({ title: job.title }, job, { upsert: true });
}
}

module.exports = { scrapeJobs };


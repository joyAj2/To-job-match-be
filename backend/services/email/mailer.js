const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
	username: "api",
	key: process.env.MAILGUN_API_KEY,
});

async function sendMatchEmail(to, subject, html) {
	await mg.messages.create(process.env.MAILGUN_DOMAIN, {
		from: `Job Matcher <noreply@${process.env.MAILGUN_DOMAIL}>`,
		to,
		subject,
		html,
	});
}

module.exports = { sendMatchEmail };

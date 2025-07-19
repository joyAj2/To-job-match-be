const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/client");

router.post("/signup", async (req, res) => {
	const { fullName, email, password } = req.body;
	const hash = await bcrypt.hash(password, 10);
	const user = await prisma.user.create({ data: { fullName, email, password: hash } });
	res.status(201).send({ message: "Registered" });
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await prisma.user.findUnique({ where: { email });
	if (!user || !(await bcrypt.compare(password, user.password))) {
		return res.status(401).send("Invalid");
	const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
	res.send({ token });
});

module.exports = router; 

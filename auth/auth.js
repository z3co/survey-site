const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const db = require("../db.js");

exports.register = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const users = db.readDB("db.json");

		const existingUser = users.find((user) => user.username === username);

		if (existingUser) {
			return res.status(400).json({
				message: "Username already exist",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		newUser = new User(db.findValidId(users), username, hashedPassword);

		users.push(newUser);

		db.writeDB(users, "db.json");

		const maxAge = 3 * 60 * 60;

		const token = jwt.sign({ id: newUser.id, username }, jwtSecret, {
			expiresIn: maxAge,
		});

		res.cookie("jwt", token, {
			httpOnly: true,
			maxAge: maxAge * 1000,
		});

		res.status(201).json({
			message: "User created successfully",
			user: newUser.id,
		});
	} catch (error) {
		console.error("Error registering user", error);

		res.status(401).json({
			message: "Error creating user",
			error: error.message,
		});
	}
};

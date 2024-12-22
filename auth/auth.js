const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;
const db = require("../db.js");

exports.register = async (req, res, next) => {
	const { username, password } = req.body;

	try {
		const users = db.readDB("db.json");

		if (password.length < 6) {
			return res.status(400).json({
				message: "Invalid password, password must be at least 6 characters",
			});
		}

		const existingUser = users.find((user) => user.username === username);

		if (existingUser) {
			return res.status(400).json({
				message: "Username already exist",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User(db.findValidId(users), username, hashedPassword);

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


exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401).json({
      message: "Invalid username or password",
      error: "User not found",
    });
  }

  try {
    const users = db.readDB("db.json");

    const user = users.find((user) => user.username === username);

    if (!user) {
      res.status(401).json({
        message: "Invalid username or password",
        error: "User not found",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({
        message: "Invalid username or password",
        error: "User not found",
      });
    }

    const maxAge = 3 * 60 * 60;
    const token = jwt.sign({ id: user.id, username }, jwtSecret, {
      expiresIn: maxAge,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({
      message: "User logged in successfully",
      user: user.id,
    });
  } catch (error) {
    res.status(400).json({
      message: "Server error",
      error: error.message,
    });
  }
};


const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

exports.userAuth = (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, jwtSecret, (err, decodedToken) => {
			if (err) {
				return res.status(401).json({ message: "Not authorized" });
				// biome-ignore lint/style/noUselessElse: <explanation>
			} else {
        req.decodedUsername = decodedToken.username;
				next();
			}
		});
	} else {
		return res.status(401).send("Not authorized");
	}
};

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = require("express").Router();

// importing files
const DevDesk = require("../devdesk/dev-model.js");
const { isValid } = require("../devdesk/dev-service.js");
const constants = require("../config/constants.js");

// REGISTER NEW USER
router.post("/register", (req, res) => {
	const credentials = req.body;

	if (isValid(credentials)) {
		const rounds = process.env.BCRYPT_ROUNDS || 8;

		// hash the password
		const hash = bcryptjs.hashSync(credentials.password, rounds);
		credentials.password = hash;

		// save the user to the database
		DevDesk.addUser(credentials)
			.then((user) => {
				res.status(201).json({ data: user });
			})
			.catch((error) => {
				res.status(500).json({
					message: "registry failed, this user already exists!",
				});
			});
	} else {
		res.status(400).json({
			message:
				"register - Username and Password cannot be null or an empty string!",
		});
	}
}); // WORKING

// LOGIN AN EXISTING USER -- NO LOGOUT IS REQUIRED SINCE LOGOUT IS CLIENT SIDE
router.post("/login", (req, res) => {
	const { username, password } = req.body;

	if (isValid(req.body)) {
		DevDesk.getUserByLogin({ username: username })
			.then(([user]) => {
				// compare the password the hash stored in the database
				if (user && bcryptjs.compareSync(password, user.password)) {
					const token = signToken(user);

					res.status(200).json({
						message: "Welcome to our API",
						token,
					});
				} else {
					res.status(401).json({
						message:
							"Invalid credentials number within Login POST, inside findUserBy",
					});
				}
			})
			.catch((error) => {
				res.status(500).json({ message: error.message }, "hello");
			});
	} else {
		res.status(400).json({
			message: "Username and Password cannot be null or an empty string!",
		});
	}
}); // WORKING

function signToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};

	const secret = constants.jwtSecret;

	const options = {
		expiresIn: "1d",
	};

	return jwt.sign(payload, secret, options);
}

module.exports = router;

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
				"please provide username and password and the password shoud be alphanumeric",
		});
	}
});

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
			message:
				"please provide username and password and the password shoud be alphanumeric",
		});
	}
});

// GET ALL USERS
router.get("/users", (req, res) => {
	DevDesk.getAllUsers()
		.then((users) => {
			res.status(201).json({ data: users });
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
});

// GET USER BY ID
router.get("/user/:id", (req, res) => {
	const { id } = req.params;

	DevDesk.getUserByID(id)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
});

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

// REGISTER NEW USER
// router.post("/register", (req, res) => {
// 	const credentials = req.body;

// 	if (isValid(credentials)) {
// 		const rounds = process.env.BCRYPT_ROUNDS || 8;

// 		// hash the password
// 		if (credentials.password < 5) {
// 			res.status(401).json({
// 				message: "Password invalid, must contain 6 or more characters",
// 			});
// 		} else {
// 			const hash = bcryptjs.hashSync(credentials.password, rounds);
// 			credentials.password = hash;
// 		}

// 		// save the user to the database
// 		if (credentials.username.length < 3) {
// 			res.status(401).json({
// 				message: "Username invalid, must contain 4 or more characters",
// 			});
// 		} else if (credentials.is_helper && credentials.is_student === false) {
// 			res.status(401).json({ message: "Must select at least one user type" });
// 		} else {
// 			DevDesk.addUser(credentials)
// 				.then((user) => {
// 					res.status(201).json("register success", { data: user });
// 				})
// 				.catch((err) => {
// 					res.status(500).json({ err });
// 				});
// 		}
// 	} else {
// 		res.status(400).json({
// 			message: "inValid error - username or password, fields cannot be empty",
// 		});
// 	}
// });

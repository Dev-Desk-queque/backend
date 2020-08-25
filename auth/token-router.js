const express = require("express");
const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

const router = express.Router();

// importing files
const DevDeskModel = require("../devdesk/dev-model.js");

// ------------------------------------------------------------------------------
// ALL GET REQUESTS
// ------------------------------------------------------------------------------

// GET ALL USERS AND GET USER BY ID
router.get("/users", (req, res) => {
	DevDeskModel.getAllUsers()
		.then((users) => {
			res.status(201).json({ data: users });
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
}); // WORKING
router.get("/user/:id", (req, res) => {
	const { id } = req.params;

	DevDeskModel.getUserByID(id)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((err) => {
			res.status(404).json({ message: "cannot find list of users" });
		});
}); // WORKING

// ------------------------------------------------------------------------------
// ALL POST REQUESTS
// ------------------------------------------------------------------------------

router.post("/questions", (req, res) => {
	const questionData = req.body;

	DevDeskModel.addQuestion(questionData)
		.then((question) => {
			res.status(201).json(question);
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to create new question" });
		});
}); // WORKING
router.post("/question/:id/answer", (req, res) => {
	const answerData = req.body;

	DevDeskModel.addAnswer(answerData)
		.then((answer) => {
			res.status(201).json(answer);
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to create new answer" });
		});
}); // WORKING

// ------------------------------------------------------------------------------
// ALL PUT REQUESTS
// ------------------------------------------------------------------------------

router.put("/question/:id", (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	DevDeskModel.getQuestionsByID(id)
		.then((question) => {
			if (question) {
				DevDeskModel.updateQuestion(id, changes).then((updatedQuestion) => {
					res.json(updatedQuestion);
				});
			} else {
				res
					.status(404)
					.json({ message: "Could not find question with given id" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to update question" });
		});
}); // WORKING

router.put("/question/:id/answer", (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	DevDeskModel.getAnswersByID(id)
		.then((answer) => {
			if (answer) {
				DevDeskModel.updateAnswer(id, changes).then((updatedAnswer) => {
					res.json(updatedAnswer);
				});
			} else {
				res
					.status(404)
					.json({ message: "Could not find answer with given id" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to update answer" });
		});
}); // WORKING

// ------------------------------------------------------------------------------
// ALL DELETE REQUESTS
// ------------------------------------------------------------------------------

router.delete("/question/:id", (req, res) => {
	const { id } = req.params;

	DevDeskModel.deleteQuestion(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res
					.status(404)
					.json({ message: "Could not find question with given id" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to delete question" });
		});
}); // WORKING

router.delete("/question/:id/answer", (req, res) => {
	const { id } = req.params;

	DevDeskModel.deleteAnswer(id)
		.then((deleted) => {
			if (deleted) {
				res.json({ removed: deleted });
			} else {
				res
					.status(404)
					.json({ message: "Could not find answer with given id" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to delete answer" });
		});
}); // WORKING

module.exports = router;

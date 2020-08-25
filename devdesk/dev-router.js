const express = require("express");

const DevDeskModel = require("./dev-model.js");

const router = express.Router();

// ------------------------------------------------------------------------------
// ALL GET REQUESTS
// ------------------------------------------------------------------------------

router.get("/questions", (req, res) => {
	DevDeskModel.getQuestions()
		.then((questions) => {
			res.json(questions);
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to get questions" });
		});
});

router.get("/answers", (req, res) => {
	DevDeskModel.getAnswers()
		.then((answers) => {
			res.json(answers);
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to get Answers" });
		});
});

router.get("/question/:id", (req, res) => {
	const { id } = req.params;

	DevDeskModel.getQuestionsByID(id)
		.then((question) => {
			if (question) {
				res.json(question);
			} else {
				res
					.status(404)
					.json({ message: "Could not find question with given id" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to get question" });
		});
});

router.get("/question/:id/answer", (req, res) => {
	const { id } = req.params;

	DevDeskModel.getAnswersByID(id)
		.then((answer) => {
			if (answer) {
				res.json(answer);
			} else {
				res
					.status(404)
					.json({ message: "Could not find answer with given id" });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to get answer" });
		});
});

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
});

router.post("/question/:id/answer", (req, res) => {
	const answerData = req.body;

	DevDeskModel.addAnswer(answerData)
		.then((answer) => {
			res.status(201).json(answer);
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to create new answer" });
		});
});

// ------------------------------------------------------------------------------
// ALL PUT REQUESTS
// ------------------------------------------------------------------------------

router.put("/question/id", (req, res) => {
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
});

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
});

// ------------------------------------------------------------------------------
// ALL DELETE REQUESTS
// ------------------------------------------------------------------------------

router.delete("/question/id", (req, res) => {
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
});

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
});

module.exports = router;

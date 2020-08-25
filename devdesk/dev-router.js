const express = require("express");

const DevDeskModel = require("./dev-model.js");

const router = express.Router();

// ------------------------------------------------------------------------------
// ALL GET REQUESTS for questions and answers
// ------------------------------------------------------------------------------

router.get("/questions", (req, res) => {
	DevDeskModel.getQuestions()
		.then((questions) => {
			res.json(questions);
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to get questions" });
		});
}); // WORKING

router.get("/answers", (req, res) => {
	DevDeskModel.getAnswers()
		.then((answers) => {
			res.json(answers);
		})
		.catch((error) => {
			res.status(500).json({ message: "Failed to get Answers" });
		});
}); // WORKING

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
}); // WORKING

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
}); // WORKING

module.exports = router;

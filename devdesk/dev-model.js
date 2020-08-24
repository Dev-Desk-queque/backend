const db = require("../data/db-config.js");

module.exports = {
	getQuestions,
	getAnswers,
	getQuestionsByID,
	getAnswersByID,
	addUser,
	findUserBy,
	addQuestion,
	addAnswer,
	updateQuestion,
	updateAnswer,
	deleteQuestion,
	deleteAnswer,
};

// ------------------------------------------------------------------------------
// ALL GET REQUESTS
// ------------------------------------------------------------------------------

function getQuestions() {
	return db("questions");
}
function getAnswers() {
	return db("answers");
}
function getQuestionsByID(id) {
	return db("questions").where({ question: id }).first();
}
function getAnswersByID(id) {
	return db("answers").where({ answer: id }).first();
}

// ------------------------------------------------------------------------------
// ALL POST REQUESTS
// ------------------------------------------------------------------------------

async function addUser(user) {
	try {
		const [id] = await db("accounts").insert(user, "id");
	} catch (error) {
		throw error;
	}
}
function findUserBy(filter) {
	return db("accounts")
		.where(filter)
		.select("accounts.id", "accounts.username", "accounts.password");
}
function addQuestion(question) {
	return db("questions")
		.insert(question)
		.returning("id")
		.then((ids) => {
			const id = ids[0];

			return getQuestionsByID(id);
		});
}
function addAnswer(answer) {
	return db("answers")
		.insert(answer)
		.returning("id")
		.then((ids) => {
			const id = ids[0];

			return getAnswersByID(id);
		});
}

// ------------------------------------------------------------------------------
// ALL PUT REQUESTS
// ------------------------------------------------------------------------------

function updateQuestion(id, changes) {
	return db("questions")
		.where({ id })
		.update(changes)
		.then(() => {
			return getQuestionsByID(id);
		});
}
function updateAnswer(id, changes) {
	return db("answers")
		.where({ id })
		.update(changes)
		.then(() => {
			return getAnswersByID(id);
		});
}

// ------------------------------------------------------------------------------
// ALL DELETE REQUESTS
// ------------------------------------------------------------------------------

function deleteQuestion(id) {
	return db("questions").where({ id }).del();
}
function deleteAnswer(id) {
	return db("answers").where({ id }).del();
}

const db = require("../data/db-config.js");

module.exports = {
	getAllUsers,
	getUserByID,
	getQuestions,
	getAnswers,
	getQuestionsByID,
	getAnswersByID,
	getUserByLogin,
	addUser,
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

function getAllUsers() {
	return db("accounts");
}
function getUserByID(id) {
	return db("accounts").where({ id });
}
function getUserByLogin(username) {
	return db("accounts").where(username);
}
function getQuestions() {
	return db("questions");
}
function getAnswers() {
	return db("answers");
}
function getQuestionsByID(id) {
	return db("questions").where({ id });
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
		return getUserByID(id);
	} catch (error) {
		throw error;
	}
}

// .where(filter)
// .select("accounts.id", "accounts.username", "accounts.password");

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

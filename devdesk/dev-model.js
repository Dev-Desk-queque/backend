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
} // WORKING
function getUserByID(id) {
	return db("accounts").where({ id });
} // WORKING
function getUserByLogin(username) {
	return db("accounts").where(username);
} // WORKING
function getQuestions() {
	return db("questions");
} // WORKING
function getAnswers() {
	return db("answers");
} // WORKING
function getQuestionsByID(id) {
	return db("questions").where({ id });
} // WORKING
function getAnswersByID(id) {
	return db("answers").where({ question_id: id });
} // WORKING

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
} // WORKING
function addQuestion(question) {
	return db("questions")
		.insert(question)
		.returning("id")
		.then((ids) => {
			const id = ids[0];

			return getQuestionsByID(id);
		});
} // WORKING
function addAnswer(answer) {
	return db("answers")
		.insert(answer, "id")
		.then((ids) => {
			const id = ids[0];

			return getAnswersByID(id);
		});
} // WORKING

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
} // WORKING
function updateAnswer(id, changes) {
	return db("answers")
		.where({ id })
		.update(changes)
		.then(() => {
			return getAnswersByID(id);
		});
} // WORKING

// ------------------------------------------------------------------------------
// ALL DELETE REQUESTS
// ------------------------------------------------------------------------------

function deleteQuestion(id) {
	return db("questions").where({ id }).del();
} // WORKING
function deleteAnswer(id) {
	return db("answers").where({ id }).del();
} // WORKING

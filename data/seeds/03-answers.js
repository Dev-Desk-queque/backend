exports.seed = function (knex) {
	return knex("answers").insert([
		{
			answer_user_id: 1,
			answer: "use the command create-react-app",
		},
		{
			answer_user_id: 1,
			answer: "code more!",
		},
	]);
};

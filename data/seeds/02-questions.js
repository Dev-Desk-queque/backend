exports.seed = function (knex) {
	return knex("questions").insert([
		{
			is_resolved: false,
			question_user_id: 1,
			topic: "react",
			question: "how do i make a new react app",
			what_I_tried: "googling",
			code_language: "React",
		},
		{
			is_resolved: false,
			question_user_id: 2,
			topic: "coding",
			question: "how do i become a better coder",
			what_I_tried: "googling",
			code_language: "All",
		},
	]);
};

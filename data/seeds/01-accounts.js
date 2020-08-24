exports.seed = function (knex) {
	return knex("accounts").insert([
		{
			username: "test",
			password: "123",
			is_student: true,
			is_helper: true,
		},
		{
			username: "onlyStudent",
			password: "123",
			is_student: true,
			is_helper: false,
		},
	]);
};

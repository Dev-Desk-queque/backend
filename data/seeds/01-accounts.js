exports.seed = function (knex) {
	return knex("accounts").insert([
		{
			id: 1,
			username: "test",
			password: "123",
			is_student: true,
			is_helper: true,
		},
		{
			id: 2,
			username: "onlyStudent",
			password: "123",
			is_student: true,
			is_helper: false,
		},
	]);
};

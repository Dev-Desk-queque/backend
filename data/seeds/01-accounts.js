exports.seed = function (knex) {
	return knex("accounts").insert([
		{
			name: "test",
			password: "123",
			is_student: true,
			is_helper: true,
		},
		{
			name: "Brian",
			password: "12345",
			is_student: true,
			is_helper: false,
		},
	]);
};

exports.up = function (knex) {
	return knex.schema
		.createTable("accounts", (tbl) => {
			tbl.increments("id"); // Primary Key
			tbl.string("name").notNullable().unique();
			tbl.string("password").notNullable();
			tbl.boolean("is_student");
			tbl.boolean("is_helper");
		})
		.createTable("users", (tbl) => {
			tbl.increments("id"); // Primary Key
			tbl
				.integer("user_id")
				.unsigned()
				.notNullable()
				.references("accounts.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl
				.string("user_name")
				.notNullable()
				.references("accounts.name")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		})
		.createTable("questions", (tbl) => {
			tbl.increments("id"); // Primary Key
			tbl
				.integer("question_user_id")
				.unsigned()
				.notNullable()
				.references("accounts.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.text("question");
		})
		.createTable("answers", (tbl) => {
			tbl.increments("id"); // Primary Key
			tbl
				.integer("answer_user_id")
				.unsigned()
				.notNullable()
				.references("accounts.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.text("answer");
		});
};

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists("answers")
		.dropTableIfExists("questions")
		.dropTableIfExists("users")
		.dropTableIfExists("accounts");
};

exports.up = function (knex) {
	return knex.schema
		.createTable("accounts", (tbl) => {
			tbl.increments("id"); // Primary Key
			tbl.string("username").notNullable().unique();
			tbl.string("password").notNullable();
			tbl.boolean("is_student");
			tbl.boolean("is_helper");
		})
		.createTable("questions", (tbl) => {
			tbl.increments("id"); // Primary Key
			tbl.boolean("is_resolved");
			tbl
				.integer("question_user_id")
				.unsigned()
				.notNullable()
				.references("accounts.id")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			tbl.text("topic");
			tbl.text("question");
			tbl.text("what_I_tried");
			tbl.text("code_language");
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

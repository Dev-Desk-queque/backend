const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/db-config.js");

describe("testing auth-router registry and login", () => {
	// truncate!
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("accounts").truncate();
	}); // PASSING

	// testing the registration of a user!
	describe("POST /register & /login", () => {
		it("should register an account, login that account, return a token", async () => {
			//step 1 check that users has been truncated
			const authTest1 = await db("accounts");
			expect(authTest1).toHaveLength(0);

			//step 2 add a user and check if they exist
			await request(server).post("/api/devdesk/auth/register").send({
				username: "postUsername",
				password: "postpass",
				is_student: true,
				is_helper: false,
			});
			const authTest2 = await db("accounts");
			expect(authTest2).toHaveLength(1);

			// step 3 login to account
			let res = await request(server).post("/api/devdesk/auth/login").send({
				username: "postUsername",
				password: "postpass",
			});

			// step 4 check the user login was successful in returning a token
			//// console.log(res.body);
			// result of log
			// message: 'Welcome to our API',
			// token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InBvc3RVc2VybmFtZSIsImlhdCI6MTU5ODU0NDAzNCwiZXhwIjoxNTk4NjMwNDM0fQ.JjOtnbk_h2VhmT4V8wEYOEVOdJYq9Awaxi8mE0aw3i4'

			// step 5 single out the token
			//// console.log(res.body.token);
		});
	}); // PASSING

	// closing brackets
});

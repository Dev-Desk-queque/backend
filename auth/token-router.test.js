const request = require("supertest");
const server = require("../api/server.js");
const db = require("../data/db-config.js");

describe("token router requests", () => {
	// truncate!
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("accounts").truncate();
	}); // PASSING
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("questions").truncate();
	}); // PASSING
	beforeEach(async () => {
		// empty table and reset primary key back to 1
		await db("answers").truncate();
	}); // PASSING

	// testing the registration of a user!
	describe("POST /register", () => {
		it("should add a new account", async () => {
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
			let foo = await request(server).post("/api/devdesk/auth/login").send({
				username: "postUsername",
				password: "postpass",
			});

			// step 4 check the user login was successful in returning a token
			//// console.log(foo.body);
			// result of log
			// message: 'Welcome to our API',
			// token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjoxLCJ1c2VybmFtZSI6InBvc3RVc2VybmFtZSIsImlhdCI6MTU5ODU0NDAzNCwiZXhwIjoxNTk4NjMwNDM0fQ.JjOtnbk_h2VhmT4V8wEYOEVOdJYq9Awaxi8mE0aw3i4'

			// step 5 single out the token
			//// console.log(foo.body.token);

			// TOKEN REQUESTS START HERE
			// set token to variable
			let token = foo.body.token;
			console.log(token);

			// ------------------------------------------------------------------------------
			// ALL GET REQUESTS
			// ------------------------------------------------------------------------------

			// GET /users --------- WORKING
			let users = await request(server)
				.get("/api/devdesk/protected/users")
				.set({ Authorization: token });

			// check if users are returned
			console.log("users log test-1-----", users.body);

			// GET /user/:id --------- WORKING
			let userById = await request(server)
				.get("/api/devdesk/protected/user/1")
				.set({ Authorization: token });

			// check if user are returned
			console.log("user by ID log test-2-----", userById.body);

			// ------------------------------------------------------------------------------
			// ALL POST REQUESTS
			// ------------------------------------------------------------------------------

			// POST /questions --------- WORKING
			let postQuestion = await request(server)
				.post("/api/devdesk/protected/questions")
				.set({ Authorization: token })
				.send({
					is_resolved: false,
					question_user_id: 1,
					topic: "react",
					question: "how do i make a new react app",
					what_I_tried: "googling",
					code_language: "React",
				});
			// check if question was posted
			console.log("posted question log test-3-----", postQuestion.body);
			let one = await db("questions");
			expect(one).toHaveLength(1);

			// POST /question/:id/answer --------- WORKING
			let postAnswer = await request(server)
				.post("/api/devdesk/protected/question/1/answer")
				.set({ Authorization: token })
				.send({
					question_id: 1,
					answer_user_id: 1,
					answer: "THIS IS THE ANSWER",
				});
			// check if answer was posted
			console.log("posted answer log test-4-----", postAnswer.body);
			let two = await db("answers");
			expect(two).toHaveLength(1);

			// ------------------------------------------------------------------------------
			// ALL PUT REQUESTS
			// ------------------------------------------------------------------------------

			// PUT /question/:id --------- WORKING
			let putQuestion = await request(server)
				.put("/api/devdesk/protected/question/1")
				.set({ Authorization: token })
				.send({
					is_resolved: false,
					question_user_id: 1,
					topic: "react",
					question: "how do i make a new react app",
					what_I_tried: "CHANGED",
					code_language: "CHANGED",
				});
			// check if question was edited
			console.log("put question log test-5-----", putQuestion.body);

			// PUT /question/:id/answer --------- WORKING
			let putAnswer = await request(server)
				.put("/api/devdesk/protected/question/1/answer")
				.set({ Authorization: token })
				.send({
					question_id: 1,
					answer_user_id: 1,
					answer: "THIS IS THE -updated- ANSWER",
				});
			// check if answer was edited
			console.log("put answer log test-6-----", putAnswer.body);

			// ------------------------------------------------------------------------------
			// ALL DELETE REQUESTS
			// ------------------------------------------------------------------------------

			// DELETE /question/:id/answer --------- WORKING
			let deleteAnswer = await request(server)
				.delete("/api/devdesk/protected/question/1/answer")
				.set({ Authorization: token });
			// check if question was deleted
			console.log(deleteAnswer.body);
			let answerCheck = await request(server).get("/api/devdesk/questions");
			console.log("delete answer log test-7-----", answerCheck.body);

			// DELETE /question/:id --------- WORKING
			let deleteQuestion = await request(server)
				.delete("/api/devdesk/protected/question/1")
				.set({ Authorization: token });
			// check if question was deleted
			console.log(deleteQuestion.body);
			let questionCheck = await request(server).get("/api/devdesk/questions");
			console.log("delete question log test-8-----", questionCheck.body);
		}); // it statement closing brackets
	}); // INNER describe statement closing brackets
}); // OUTER describe statement closing brackets

const request = require("supertest");
const app = require("../index");
const jwt = require("jsonwebtoken");
const username = require("crypto").randomBytes(6).toString("hex");
const password = "test1234";
const jwtSecret = process.env.JWTSECRET;
const token = jwt.sign({ id: 1, username }, jwtSecret, {
	expiresIn: 3 * 60 * 60,
});

describe("User controller", () => {
	describe("POST /api/routes/register", () => {
		it("should create and return a new user", async () => {
			const response = await request(app)
				.post("/api/routes/register")
				.set("content-type", "application/json")
				.send({
					username: username,
					password: password,
				});
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("user");
		});
	});

	describe("Attempt user login", () => {
		it("should return 201 and user", async () => {
			const response = await request(app)
				.post("/api/routes/login")
				.set("content-type", "application/json")
				.send({
					username: username,
					password: password,
				});

			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("user");
		});
	});
});

describe("Survey controller", () => {
	describe("POST /api/surveys/create", () => {
		it("should return 201 and survey id", async () => {
			const response = await request(app)
				.post("/api/surveys/create")
				.set("content-type", "application/json")
        .set("cookie", `jwt=${token}`)
				.send({
					name: "test",
					questions: [
						{
							name: "test question",
							answer: "this is a test",
						},
					],
					date: "test",
				});
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("survey");
		});
	});

	describe("POST /api/surveys/surveys", () => {
		it("should return 200 and the survey", async () => {
			const response = await request(app)
				.get("/api/surveys/surveys")
				.set("content-type", "application/json");
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("surveys");
		});
	});

	describe("POST /api/surveys/get", () => {
		it("should return 200 and the survey", async () => {
			const response = await request(app)
				.post("/api/surveys/get")
				.set("content-type", "application/json")
        .set("cookie", `jwt=${token}`)
				.send({
					surveyId: 1,
				});
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("survey");
		});
	});
});

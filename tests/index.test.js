const request = require("supertest");
const app = require("../index");
const username = require("crypto").randomBytes(6).toString("hex");
const password = "test1234";

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

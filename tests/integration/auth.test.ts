import supertest from "supertest";

import server from "../../src/server";
import { factory } from "../factory";
import client from "../../src/dbStrategy/postgres";

const app = supertest(server);

beforeEach(async () => {
	await client.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY`;
});

afterAll(async () => {
	await client.$disconnect();
});

describe("test authRoutes", () => {
	it("return 201 and a object that cotanins userData", async () => {
		const newUser = await factory.createUser(false);

		const result = await app.post("/signUp").send(newUser);

		expect(result.status).toBe(201);
		expect(result.body).toBeInstanceOf(Object);
		expect(await client.user.findUnique({ where: { id: result.body.id } })).not.toBeNull();
	});

	it("returns 409 for email in use", async () => {
		const newUser = await factory.createUser(false);

		await app.post("/signUp").send(newUser);
		const result = await app.post("/signUp").send(newUser);

		expect(result.status).toBe(409);
	});

	it("returns 422 for invalid body", async () => {
		const newUser = {};

		const result = await app.post("/signUp").send(newUser);

		expect(result.status).toBe(422);
	});
});

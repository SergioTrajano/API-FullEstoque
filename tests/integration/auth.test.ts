import supertest from "supertest";

import server from "../../src/server";
import { factory } from "../factory";
import client from "../../src/dbStrategy/postgres";
import { faker } from "@faker-js/faker";

const app = supertest(server);

beforeEach(async () => {
	await client.$executeRaw`TRUNCATE TABLE users CASCADE`;
});

afterAll(async () => {
	await client.$disconnect();
});

describe("test authRoutes", () => {
	it("return 201 and a object that cotanins userData /signUp", async () => {
		const newUser = await factory.createUser(false);

		const result = await app.post("/signUp").send(newUser);

		expect(result.status).toBe(201);
		expect(result.body).toBeInstanceOf(Object);
		expect(await client.user.findUnique({ where: { id: result.body.id } })).not.toBeNull();
	});

	it("returns 409 for email in use /signUp", async () => {
		const newUser = await factory.createUser(false);

		await app.post("/signUp").send(newUser);
		const result = await app.post("/signUp").send(newUser);

		expect(result.status).toBe(409);
	});

	it("returns 422 for invalid body /signUp", async () => {
		const newUser = {};

		const result = await app.post("/signUp").send(newUser);

		expect(result.status).toBe(422);
	});

	it("return 200 and a token /signIn", async () => {
		const user = await factory.createUser(true);

		const result = await app.post("/signIn").send({ email: user.email, password: user.password });

		expect(result.status).toBe(200);
		expect(result.body).toBeInstanceOf(Object);
	});

	it("return 422 for invalid body /signIn", async () => {
		const user = {};

		const result = await app.post("/signIn").send(user);

		expect(result.status).toBe(422);
	});

	it("return 401 for invalid credentials /signIn", async () => {
		const user = await factory.createUser(true);

		const result = await app.post("/signIn").send({ email: faker.internet.email(), password: user.password });

		expect(result.status).toBe(401);
	});
});

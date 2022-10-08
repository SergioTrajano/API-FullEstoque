import supertest from "supertest";

import server from "../../src/server";
import { factory } from "../factory";
import client from "../../src/dbStrategy/postgres";
import { faker } from "@faker-js/faker";

const app = supertest(server);

beforeEach(async () => {
	await client.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE manufacturers RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE clients RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE purchases RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE sells RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
});

afterAll(async () => {
	await client.$disconnect();
});

describe("test manufacturers routes /manufacturers", () => {
	it("/POSTreturns 201 and a object with newManufacturer data", async () => {
		const newManufacturer = await factory.createManufacturer(false);
		const token = await factory.createToken();

		const result = await app
			.post("/manufacturers")
			.send(newManufacturer)
			.set({ Authorization: `Bearer ${token}` });

		expect(result.status).toBe(201);
		expect(result.body).toBeInstanceOf(Object);
	});
});

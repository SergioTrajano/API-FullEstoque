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
	it("/POST returns 201 and a object with newManufacturer data", async () => {
		const token = await factory.createToken();
		const newManufacturer = await factory.createManufacturer(false, token.id);

		const result = await app
			.post("/manufacturers")
			.send({ name: newManufacturer.name })
			.set({ Authorization: `Bearer ${token.token}` });

		expect(result.status).toBe(201);
		expect(result.body).toBeInstanceOf(Object);
	});

	it("/POST returns 409 for name in use", async () => {
		const token = await factory.createToken();
		const newManufacturer = await factory.createManufacturer(true, token.id);

		const { status } = await app
			.post("/manufacturers")
			.send({ name: newManufacturer.name })
			.set({ Authorization: `Bearer ${token.token}` });

		expect(status).toBe(409);
	});

	it("/POST returns 401 if token dont belong to any user", async () => {
		const token = { token: `Bearer ${faker.animal.bear()}`, id: faker.datatype.number({ precision: 1 }) };
		const newManufacturer = await factory.createManufacturer(false, token.id);

		const { status } = await app
			.post("/manufacturer")
			.set({ Authorization: `Bearer ${token.token}` })
			.send({ name: newManufacturer.name });

		expect(status).toBe(401);
	});

	it("/PUT returns 404 for invalid manufacturerId", async () => {
		const token = await factory.createToken();
		const manufactureToUpdate = await factory.createManufacturer(false, token.id);

		const result = await app
			.post("/manufacturers/0")
			.send({ name: manufactureToUpdate.name })
			.set({ Authorization: `Bearer ${token.token}` });

		expect(result.status).toBe(404);
	});

	it("/PUT returns 401 if token dont belong to any user", async () => {
		const token = { token: `Bearer ${faker.animal.bear()}`, id: faker.datatype.number({ precision: 1 }) };
		const manufactureToUpdate = await factory.createManufacturer(false, token.id);

		const { status } = await app
			.put("/manufacturer")
			.set({ Authorization: `Bearer ${token.token}` })
			.send({ name: manufactureToUpdate.name });

		expect(status).toBe(401);
	});

	it("/PUT return 409 for name in use", async () => {
		const token = await factory.createToken();
		const manufactureToUpdate = await factory.createManufacturer(true, token.id);

		const dbManufacturer = await factory.createManufacturer(true, token.id);

		const { status } = await app
			.put(`/manufacturers/${manufactureToUpdate.id}`)
			.set({ Authorization: `Bearer ${token.token}` })
			.send({ name: dbManufacturer.name });

		expect(status).toBe(409);
	});

	it("/PUT return 200 for updated manufacturer", async () => {
		const token = await factory.createToken();
		const dbMaanufacturer = await factory.createManufacturer(true, token.id);
		const newManufacturerName = await factory.createManufacturer(false, token.id);

		const { status, body } = await app
			.put(`/manufacturers/${dbMaanufacturer.id}`)
			.set({ Authorization: `Bearer ${token.token}` })
			.send({ name: newManufacturerName.name });

		expect(status).toBe(200);
		expect(body).toBeInstanceOf(Object);
	});

	it("/PUT returns 401 if try to update other user manufacturer", async () => {
		const userToken = await factory.createToken();
		const otherToken = await factory.createToken();
		const dbMaanufacturer = await factory.createManufacturer(true, otherToken.id);

		const { status } = await app
			.put(`/manufacturers/${dbMaanufacturer.id}`)
			.set({ Authorization: `Bearer ${userToken.token}` })
			.send({ name: faker.animal.bird() });

		expect(status).toBe(403);
	});

	it("/GET returns 401 if token dont belong to any user", async () => {
		const token = { token: `Bearer ${faker.animal.bear()}`, id: faker.datatype.number({ precision: 1 }) };
		const newManufacturer = await factory.createManufacturer(false, token.id);

		const { status } = await app
			.get("/manufacturer")
			.set({ Authorization: `Bearer ${token.token}` })
			.send(newManufacturer);

		expect(status).toBe(401);
	});

	it("/GET returns 200 and a object with users manufacturers", async () => {
		const token = await factory.createToken();

		for (let i = 0; i < 10; i++) {
			await factory.createManufacturer(true, token.id);
		}

		const { status, body } = await app.get("/manufacturers").set({ Authorization: `Bearer ${token.token}` });

		expect(status).toBe(200);
		expect(body).toBeInstanceOf(Array);
		expect(body.length).toBe(10);
	});

	it("/DELETE returns 401 if token dont belong to any user", async () => {
		const token = { token: `Bearer ${faker.animal.bear()}`, id: faker.datatype.number({ precision: 1 }) };
		const newManufacturer = await factory.createManufacturer(false, token.id);

		const { status } = await app
			.delete("/manufacturer")
			.set({ Authorization: `Bearer ${token.token}` })
			.send(newManufacturer);

		expect(status).toBe(401);
	});

	it("/DELETE returns 200 and delete manufacturer", async () => {
		const token = await factory.createToken();

		const dbMaanufacturer = await factory.createManufacturer(true, token.id);

		const { status } = await app
			.delete(`/manufacturers/${dbMaanufacturer.id}`)
			.set({ Authorization: `Bearer ${token.token}` });

		const excludedManufacturer = await client.manufacturer.findUnique({ where: { id: dbMaanufacturer.id } });
		expect(status).toBe(200);
		expect(excludedManufacturer).toBe(null);
	});

	it("/DELETE return 404 for invalid manufacturerId", async () => {
		const token = await factory.createToken();

		const { status } = await app.delete(`/manufacturers/0`).set({ Authorization: `Bearer ${token.token}` });

		expect(status).toBe(404);
	});

	it("/DELETE returns 403 if user try to delete other user manufacturer", async () => {
		const userToken = await factory.createToken();
		const otherToken = await factory.createToken();
		const dbMaanufacturer = await factory.createManufacturer(true, otherToken.id);

		const { status } = await app
			.delete(`/manufacturers/${dbMaanufacturer.id}`)
			.set({ Authorization: `Bearer ${userToken.token}` });

		expect(status).toBe(403);
	});
});

import supertest from "supertest";

import server from "../../server";
import { factory } from "../factory";
import client from "../../dbStrategy/postgres";

const app = supertest(server);

describe("test authRoutes", () => {
	it("return 201 and a object that cotanins userData", async () => {
		const newUser = factory.createUser();

		const result = await app.post("/signUp").send(newUser);

		expect(result.status).toBe(201);
		expect(result.body).toBeInstanceOf(Object);
		expect(await client.user.findUnique({ where: { id: result.body.id } })).not.toBeNull();
	});
});

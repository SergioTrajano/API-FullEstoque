import { faker } from "@faker-js/faker";
import client from "../src/dbStrategy/postgres";
import { encryptPassword } from "../src/utils/passwordEncrypter";

async function createUser(bool: boolean) {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password(10) + "@1At",
		name: faker.animal.bird(),
	};

	if (bool) {
		await client.user.create({ data: { ...user, password: encryptPassword(user.password) } });
	}

	return user;
}

export const factory = {
	createUser,
};

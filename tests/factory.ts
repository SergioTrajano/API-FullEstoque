import { faker } from "@faker-js/faker";
import client from "../src/dbStrategy/postgres";
import { encryptPassword } from "../src/utils/passwordEncrypter";
import { tokenManager } from "../src/utils/tokenManager";

async function createUser(bool: boolean) {
	const password = faker.internet.password(10) + "@1At";
	const user = {
		email: faker.internet.email(),
		password,
		confirmPassword: password,
		name: faker.animal.bird(),
	};

	if (bool) {
		await client.user.create({
			data: { email: user.email, name: user.name, password: encryptPassword(user.password) },
		});
	}

	return user;
}

async function createManufacturer(bool: boolean) {
	const newManufacturer = {
		name: faker.company.name(),
	};

	return newManufacturer;
}

async function createToken() {
	const user = await createUser(false);
	const userData = await client.user.create({
		data: { email: user.email, name: user.name, password: encryptPassword(user.password) },
	});

	const token = await tokenManager.generateToken(userData.id);

	return token;
}

export const factory = {
	createUser,
	createManufacturer,
	createToken,
};

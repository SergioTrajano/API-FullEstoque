import { faker } from "@faker-js/faker";
import { Manufacturer } from "@prisma/client";
import client from "../src/dbStrategy/postgres";
import { encryptPassword } from "../src/utils/passwordEncrypter";
import { tokenManager } from "../src/utils/tokenManager";

async function createUser(bool: boolean) {
	const password = faker.internet.password(10) + "@1At";
	let user: any = {
		email: faker.internet.email(),
		password,
		confirmPassword: password,
		name: faker.animal.bird(),
	};

	if (bool) {
		const dbUser = await client.user.create({
			data: { email: user.email, name: user.name, password: encryptPassword(user.password) },
		});
		user = { ...dbUser, password: user.password };
	}

	return user;
}

async function createManufacturer(bool: boolean, id: number) {
	const newManufacturer = { name: faker.company.name(), id: 0 };

	if (bool) {
		const dbMaanufacturer = await client.manufacturer.create({
			data: { name: newManufacturer.name, userId: id },
		});

		return dbMaanufacturer;
	}

	return newManufacturer;
}

async function createToken() {
	const user = await createUser(true);

	const token = await tokenManager.generateToken(user.id);

	return { token, id: user.id };
}

export const factory = {
	createUser,
	createManufacturer,
	createToken,
};

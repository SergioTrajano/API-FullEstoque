import { faker } from "@faker-js/faker";

function createUser() {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password(10) + "@1At",
		name: faker.animal.bird(),
	};

	return user;
}

export const factory = {
	createUser,
};

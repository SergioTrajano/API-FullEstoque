import { createUser, userRepository } from "../repositories/userRepository";
import { errorType } from "../utils/errorTypes";

async function insertUser(newUserData: createUser) {
	if (await userRepository.getByEmail(newUserData.email)) {
		throw errorType.conflict("Email");
	}

	await userRepository.create(newUserData);
}

export const userService = {
	insertUser,
};

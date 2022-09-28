import { createUser, userRepository } from "../repositories/userRepository";
import { errorType } from "../utils/errorTypes";
import { encryptPassword } from "../utils/passwordEncrypter";

async function insertUser(newUserData: createUser) {
	if (await userRepository.getByEmail(newUserData.email)) {
		throw errorType.conflict("Email");
	}

	const userData = await userRepository.create({ ...newUserData, password: encryptPassword(newUserData.password) });

	return userData;
}

export const userService = {
	insertUser,
};

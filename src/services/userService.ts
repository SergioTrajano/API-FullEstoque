import { User } from "@prisma/client";
import { createUser, userRepository } from "../repositories/userRepository";
import { errorType } from "../utils/errorTypes";
import { encryptPassword, comparePassword } from "../utils/passwordEncrypter";
import { tokenManager } from "../utils/tokenManager";

async function insertUser(newUserData: createUser) {
	if (await userRepository.getByEmail(newUserData.email)) {
		throw errorType.conflict("Email");
	}

	const userData = await userRepository.create({ ...newUserData, password: encryptPassword(newUserData.password) });

	return userData;
}

async function getByEmail(userData: Omit<User, "id" | "name">) {
	const dbUser = await userRepository.getByEmail(userData.email);

	if (!dbUser || !comparePassword(userData.password, dbUser.password)) {
		throw errorType.unathorized("credentials!");
	}

	const token = tokenManager.generateToken(dbUser.id);

	return token;
}

async function getById(id: number) {
	const dbUser = await userRepository.getById(id);

	if (!dbUser) {
		throw errorType.unathorized("user!");
	}

	return dbUser;
}

export const userService = {
	insertUser,
	getByEmail,
	getById,
};

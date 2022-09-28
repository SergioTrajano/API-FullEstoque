import { User } from "@prisma/client";
import client from "../dbStrategy/postgres";

export type createUser = Omit<User, "id">;

async function create(newUserData: createUser) {
	const userData: User = await client.user.create({ data: newUserData });

	return userData;
}

async function deleteUser(id: number) {
	await client.user.delete({ where: { id } });
}

async function changePassword(id: number, newPassword: string) {
	await client.user.update({ data: { password: newPassword }, where: { id } });
}

async function getByEmail(email: string) {
	const dbUser = await client.user.findUnique({ where: { email } });

	return dbUser;
}

export const userRepository = {
	create,
	deleteUser,
	changePassword,
	getByEmail,
};

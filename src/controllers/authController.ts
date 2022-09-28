import { User } from "@prisma/client";
import { Request, Response } from "express";
import { createUser } from "../repositories/userRepository";

import { userService } from "../services/userService";

async function signUp(req: Request, res: Response) {
	const newUserData: createUser = req.body;

	const userData: User = await userService.insertUser(newUserData);

	res.status(201).send(userData);
}

export const userController = {
	signUp,
};

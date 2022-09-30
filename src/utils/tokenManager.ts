import jwt from "jsonwebtoken";

import { errorType } from "./errorTypes";

const SECRET: string = String(process.env.JWT_SECRET);

function generateToken(id: number) {
	return jwt.sign(String(id), SECRET);
}

function readToken(token: string) {
	try {
		return jwt.verify(token, SECRET) as { id: number };
	} catch {
		throw errorType.unathorized("token");
	}
}

export const tokenManager = {
	generateToken,
	readToken,
};

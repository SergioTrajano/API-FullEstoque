import jwt from "jsonwebtoken";

const SECRET: string = String(process.env.JWT_SECRET);

function generateToken(id: number) {
	return jwt.sign(String(id), SECRET);
}

function readToken(token: string) {
	return jwt.verify(token, SECRET);
}

export const tokenManager = {
	generateToken,
	readToken,
};

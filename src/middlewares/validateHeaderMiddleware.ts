import { Request, Response, NextFunction } from "express";

import headerSchema from "../schemas/headerSchema";
import { errorType } from "../utils/errorTypes";
import { tokenManager } from "../utils/tokenManager";

export default async function validateHeader(req: Request, res: Response, next: NextFunction) {
	const header = req.headers;

	const { error } = headerSchema.validate(header, { abortEarly: false });

	if (error) {
		throw errorType.unprocessableEntityError(error);
	}

	const token = String(req.headers.authorization?.replace("Bearer ", ""));
	const userId = tokenManager.readToken(token);

	res.locals.userId = Number(userId);

	next();
}

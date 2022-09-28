import { Request, Response, NextFunction } from "express";

function errorHandler(err: { code: number; message: string }, req: Request, res: Response, next: NextFunction) {
	if (err.code) {
		res.status(err.code).send(err.message);
		return;
	}

	console.log(err);
	res.sendStatus(500);
}

export default errorHandler;

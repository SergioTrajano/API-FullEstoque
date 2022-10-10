import { Request, Response } from "express";
import { testService } from "../services/testService";

async function resetDatabase(req: Request, res: Response) {
	await testService.reset();

	res.sendStatus(200);
}

export const testController = {
	resetDatabase,
};

import { Request, Response } from "express";

import { categoryService } from "../services/categoryService";
import { createCategory } from "../repositories/categoryRepository";

async function create(req: Request, res: Response) {
	const newCateogryData: createCategory = req.body;
	const userId: number = res.locals.userId;

	const newCateogry = await categoryService.create(newCateogryData, userId);

	res.status(201).send(newCateogry);
}

export const categoryController = {
	create,
};

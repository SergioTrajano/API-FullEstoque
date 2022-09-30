import { Request, Response } from "express";

import { categoryService } from "../services/categoryService";
import { createCategory } from "../repositories/categoryRepository";

async function create(req: Request, res: Response) {
	const newCateogryData: createCategory = req.body;
	const userId: number = res.locals.userId;

	const newCateogry = await categoryService.create(newCateogryData, userId);

	res.status(201).send(newCateogry);
}

async function update(req: Request, res: Response) {
	const dataToUpdate = req.body;
	const categoryId: number = Number(req.params.categoryId);
	const userId: number = res.locals.userId;

	const updatedCategory = await categoryService.update(dataToUpdate, categoryId, userId);

	res.status(200).send(updatedCategory);
}

export const categoryController = {
	create,
	update,
};

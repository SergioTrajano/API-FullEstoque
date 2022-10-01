import { Request, Response } from "express";

import { productService } from "../services/productService";
import { createProduct } from "../repositories/productRepository";

async function create(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const newProductData: createProduct = req.body;

	const newProduct = await productService.create(userId, newProductData);

	res.status(201).send(newProduct);
}

export const productController = {
	create,
};

import { Request, Response } from "express";

import { productService } from "../services/productService";
import { createProduct } from "../repositories/productRepository";

async function create(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const newProductData: createProduct = req.body;

	const newProduct = await productService.create(userId, newProductData);

	res.status(201).send(newProduct);
}

async function update(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const updateProductData: createProduct = req.body;
	const productId: number = Number(req.params.productId);

	const updatedProduct = await productService.update(userId, updateProductData, productId);

	res.status(200).send(updatedProduct);
}

async function remove(req: Request, res: Response) {
	const userId: number = res.locals.userId;
	const productId: number = Number(req.params.productId);

	await productService.remove(userId, productId);

	res.sendStatus(200);
}

async function find(req: Request, res: Response) {
	const userId: number = res.locals.userId;

	const userProducts = await productService.find(userId);

	res.status(200).send(userProducts);
}

export const productController = {
	create,
	update,
	remove,
	find,
};

import { Product } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import client from "../dbStrategy/postgres";

export type createProduct = {
	categoryId: number;
	name: string;
	description: string;
	barcode: string;
	price: Decimal;
	manufacturerId: number;
};

async function create(newProductData: Omit<Product, "id">) {
	const newProduct = await client.product.create({ data: newProductData });

	return newProduct;
}

async function findByBarcode(barcode: string, userId: number) {
	const dbProduct = await client.product.findFirst({ where: { barcode: barcode, userId: userId } });

	return dbProduct;
}

async function findById(id: number) {
	const dbProduct = await client.product.findUnique({ where: { id } });

	return dbProduct;
}

async function update(updateProductData: createProduct, id: number) {
	const updatedProduct = await client.product.update({ where: { id }, data: updateProductData });

	return updatedProduct;
}

async function remove(id: number) {
	await client.product.delete({ where: { id } });
}

export const productRepository = {
	create,
	findByBarcode,
	findById,
	update,
	remove,
};

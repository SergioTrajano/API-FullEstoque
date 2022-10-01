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

export const productRepository = {
	create,
	findByBarcode,
};

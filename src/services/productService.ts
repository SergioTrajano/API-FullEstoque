import { categoryService } from "./categoryService";
import { manufacturerService } from "./manufacturerService";
import { userService } from "./userService";
import { productRepository, createProduct } from "../repositories/productRepository";
import { errorType } from "../utils/errorTypes";

async function create(userId: number, newProductData: createProduct) {
	await userService.getById(userId);
	const dbCategory = await categoryService.findById(newProductData.categoryId);
	const dbManufacturer = await manufacturerService.findById(newProductData.manufacturerId);
	const dbProductByBarCode = await productRepository.findByBarcode(newProductData.barcode, userId);

	if (dbCategory.userId !== userId) {
		throw errorType.forbbiden("Invalid category");
	}
	if (dbManufacturer.userId !== userId) {
		throw errorType.forbbiden("Invalid manufacturer");
	}
	if (dbProductByBarCode) {
		throw errorType.conflict("Barcode");
	}

	const newProduct = await productRepository.create({ ...newProductData, userId });

	return newProduct;
}

async function update(userId: number, updateProductData: createProduct, productId: number) {
	await userService.getById(userId);
	const dbCategory = await categoryService.findById(updateProductData.categoryId);
	const dbManufacturer = await manufacturerService.findById(updateProductData.manufacturerId);
	const dbProductByBarCode = await productRepository.findByBarcode(updateProductData.barcode, userId);
	const dbProductById = await productRepository.findById(productId);

	if (dbCategory.userId !== userId) {
		throw errorType.forbbiden("Invalid category");
	}
	if (dbManufacturer.userId !== userId) {
		throw errorType.forbbiden("Invalid manufacturer");
	}
	if (dbProductByBarCode && dbProductByBarCode.id !== productId) {
		throw errorType.conflict("Barcode");
	}
	if (!dbProductById) {
		throw errorType.notFound("Product");
	}
	if (dbProductById.userId !== userId) {
		throw errorType.forbbiden();
	}

	const updatedProduct = await productRepository.update(updateProductData, productId);

	return updatedProduct;
}

async function remove(userId: number, productId: number) {
	await userService.getById(userId);
	const dbProductById = await productRepository.findById(productId);

	if (!dbProductById) {
		throw errorType.notFound("Product");
	}
	if (dbProductById.userId !== userId) {
		throw errorType.forbbiden();
	}

	await productRepository.remove(productId);
}

async function find(userId: number) {
	await userService.getById(userId);

	const userProducts = await productRepository.find(userId);

	return userProducts;
}

async function findById(id: number) {
	const dbProduct = await productRepository.findById(id);

	if (!dbProduct) {
		throw errorType.notFound("Product");
	}

	return dbProduct;
}

export const productService = {
	create,
	update,
	remove,
	find,
	findById,
};

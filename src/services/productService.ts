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

export const productService = {
	create,
};

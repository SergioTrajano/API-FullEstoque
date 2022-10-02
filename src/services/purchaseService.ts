import { errorType } from "../utils/errorTypes";
import { purchaseRepository, createPurchase } from "../repositories/purchaseRepository";
import { userService } from "./userService";
import { productService } from "./productService";

async function create(newPurchaseData: createPurchase, userId: number) {
	await userService.getById(userId);

	const dbProduct = await productService.findById(newPurchaseData.productId);

	if (dbProduct.userId !== userId) {
		throw errorType.forbbiden("Unathorized product id");
	}

	const newPurchase = await purchaseRepository.create({ ...newPurchaseData, userId });

	return { ...newPurchase, totalPrice: Number(newPurchase.totalPrice) };
}

async function update(dataToUpdate: createPurchase, userId: number, purchaseId: number) {
	await userService.getById(userId);

	const dbPurchase = await purchaseRepository.findById(purchaseId);
	const dbProduct = await productService.findById(dataToUpdate.productId);

	if (!dbPurchase) {
		throw errorType.notFound("Purchase");
	}
	if (dbPurchase.userId !== userId) {
		throw errorType.forbbiden("Unathorized purchase");
	}
	if (dbProduct.userId !== userId) {
		throw errorType.forbbiden("Unathorized product id");
	}

	const updatedPurchase = await purchaseRepository.update(dataToUpdate, purchaseId);

	return { ...updatedPurchase, totalPrice: Number(updatedPurchase.totalPrice) };
}

async function remove(userId: number, purchaseId: number) {
	await userService.getById(userId);

	const dbPurchase = await purchaseRepository.findById(purchaseId);

	if (!dbPurchase) {
		throw errorType.notFound("Purchase");
	}
	if (dbPurchase.userId !== userId) {
		throw errorType.forbbiden("Unathorized purchase");
	}

	await purchaseRepository.remove(purchaseId);
}

export const purchaseService = {
	create,
	update,
	remove,
};

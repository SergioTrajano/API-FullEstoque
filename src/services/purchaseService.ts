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

export const purchaseService = {
	create,
};

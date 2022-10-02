import { errorType } from "../utils/errorTypes";
import { sellRepository, createSell } from "../repositories/sellRepository";
import { userService } from "./userService";
import { productService } from "./productService";
import { clientService } from "./clientService";

async function create(newSellData: createSell, userId: number) {
	await userService.getById(userId);

	const dbProduct = await productService.findById(newSellData.productId);
	const dbClient = await clientService.findById(newSellData.clientId);

	if (dbProduct.userId !== userId) {
		throw errorType.forbbiden("Unathorized product");
	}
	if (dbClient.userId !== userId) {
		throw errorType.forbbiden("unathorized client");
	}

	const newSell = await sellRepository.create({ ...newSellData, userId });

	return newSell;
}

export const sellService = {
	create,
};

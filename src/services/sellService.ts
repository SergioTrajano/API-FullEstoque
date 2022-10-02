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

async function update(dataToUpdate: createSell, userId: number, sellId: number) {
	await userService.getById(userId);

	const dbSell = await sellRepository.findById(sellId);
	const dbProduct = await productService.findById(dataToUpdate.productId);
	const dbClient = await clientService.findById(dataToUpdate.clientId);

	if (!dbSell) {
		throw errorType.notFound("Sell");
	}
	if (dbSell.userId !== userId) {
		throw errorType.forbbiden("Unathorized sell");
	}
	if (dbProduct.userId !== userId) {
		throw errorType.forbbiden("Unathorized product");
	}
	if (dbClient.userId !== userId) {
		throw errorType.forbbiden("unathorized client");
	}

	const updatedSell = await sellRepository.update(dataToUpdate, sellId);

	return updatedSell;
}

async function remove(userId: number, sellId: number) {
	await userService.getById(userId);

	const dbSell = await sellRepository.findById(sellId);

	if (!dbSell) {
		throw errorType.notFound("Sell");
	}
	if (dbSell.userId !== userId) {
		throw errorType.forbbiden("Unathorized sell");
	}

	await sellRepository.remove(sellId);
}

export const sellService = {
	create,
	update,
	remove,
};

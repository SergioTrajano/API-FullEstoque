import { Purchase } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import client from "../dbStrategy/postgres";

export type createPurchase = {
	productId: number;
	quantity: number;
	totalPrice: Decimal;
};

async function create(data: Omit<Purchase, "id" | "createdAt">) {
	const newPurchase = await client.purchase.create({ data });

	return newPurchase;
}

async function findById(id: number) {
	const dbPurchase = await client.purchase.findUnique({ where: { id } });

	return dbPurchase;
}

async function update(data: createPurchase, id: number) {
	const updatedPurchase = await client.purchase.update({ data, where: { id } });

	return updatedPurchase;
}

export const purchaseRepository = {
	create,
	findById,
	update,
};

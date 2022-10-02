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

export const purchaseRepository = {
	create,
};

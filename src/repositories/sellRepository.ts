import { Sell } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import client from "../dbStrategy/postgres";

export type createSell = {
	productId: number;
	clientId: number;
	quantity: number;
	totalPrice: Decimal;
};

async function create(data: Omit<Sell, "id" | "createdAt">) {
	const newSell = await client.sell.create({ data });

	return { ...newSell, totalPrice: Number(newSell.totalPrice) };
}

export const sellRepository = {
	create,
};

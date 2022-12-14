import { Purchase } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";
import { when } from "joi";
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

async function remove(id: number) {
	await client.purchase.delete({ where: { id } });
}

async function find(userId: number) {
	const dbPurchases = await client.purchase.findMany({
		where: { userId },
		select: {
			id: true,
			quantity: true,
			totalPrice: true,
			product: {
				select: {
					id: true,
					name: true,
					manufacturer: {
						select: {
							name: true,
						},
					},
				},
			},
		},
		orderBy: [{ id: "desc" }],
	});

	return dbPurchases;
}

export const purchaseRepository = {
	create,
	findById,
	update,
	remove,
	find,
};

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

async function findById(id: number) {
	const dbSell = await client.sell.findUnique({ where: { id } });

	return dbSell;
}

async function update(data: createSell, id: number) {
	const updatedSell = await client.sell.update({ data, where: { id } });

	return updatedSell;
}

async function remove(id: number) {
	await client.sell.delete({ where: { id } });
}

async function find(userId: number) {
	const dbSells = await client.sell.findMany({
		where: { userId },
		select: {
			id: true,
			quantity: true,
			totalPrice: true,
			product: {
				select: {
					id: true,
					name: true,
				},
			},
			client: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	return dbSells;
}

export const sellRepository = {
	create,
	update,
	findById,
	remove,
	find,
};

import { Client } from "@prisma/client";
import client from "../dbStrategy/postgres";

export type createClient = {
	name: string;
	phoneNumber: number;
	CPF: string;
	RG: number;
};

async function create(data: Omit<Client, "id">) {
	const newClient = await client.client.create({ data });

	return newClient;
}

async function getByCPF(CPF: string, userId: number) {
	const dbClient = await client.client.findFirst({ where: { CPF, userId } });

	return dbClient;
}

async function getById(id: number) {
	const dbClient = await client.client.findUnique({ where: { id } });

	return dbClient;
}

async function update(data: createClient, id: number) {
	const updatedClient = await client.client.update({ data, where: { id } });

	return updatedClient;
}

async function remove(id: number) {
	await client.client.delete({ where: { id } });
}

async function find(userId: number) {
	const dbUserClients = await client.client.findMany({ where: { userId } });

	return dbUserClients;
}

export const clientRepository = {
	create,
	getByCPF,
	getById,
	update,
	remove,
	find,
};

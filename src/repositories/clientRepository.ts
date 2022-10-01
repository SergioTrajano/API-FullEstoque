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

export const clientRepository = {
	create,
	getByCPF,
};

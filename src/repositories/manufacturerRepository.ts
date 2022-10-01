import { Manufacturer } from "@prisma/client";
import client from "../dbStrategy/postgres";

export type createManufacture = {
	name: string;
};

async function create(newManufacturerData: createManufacture, userId: number) {
	const newManufacturer = await client.manufacturer.create({ data: { ...newManufacturerData, userId } });

	return newManufacturer;
}

async function getByName(name: string, userId: number) {
	const dbMaanufacturer = await client.manufacturer.findFirst({ where: { name, userId } });

	return dbMaanufacturer;
}

async function getById(id: number) {
	const dbManufacturer: any = await client.manufacturer.findFirst({ where: { id } });

	return dbManufacturer;
}

async function update(data: Partial<Manufacturer>, id: number) {
	const updatedManufacturer = await client.manufacturer.update({ data: data, where: { id } });

	return updatedManufacturer;
}

async function remove(id: number) {
	await client.manufacturer.delete({ where: { id } });
}

export const manufaturerRepository = {
	create,
	getByName,
	getById,
	update,
	remove,
};

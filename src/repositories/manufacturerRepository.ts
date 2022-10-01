import client from "../dbStrategy/postgres";

export type createManufacture = {
	name: string;
};

async function create(newManufacturerData: createManufacture, userId: number) {
	const newManufacturer = await client.manufacturer.create({ data: { ...newManufacturerData, userId } });

	return newManufacturer;
}

async function getByName(name: string) {
	const dbMaanufacturer = await client.manufacturer.findFirst({ where: { name } });

	return dbMaanufacturer;
}

export const manufaturerRepository = {
	create,
	getByName,
};

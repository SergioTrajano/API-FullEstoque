import { errorType } from "../utils/errorTypes";
import { userService } from "./userService";
import { manufaturerRepository, createManufacture } from "../repositories/manufacturerRepository";

async function create(newManufacturerData: createManufacture, userId: number) {
	await userService.getById(userId);

	const dbMaanufacturer = await manufaturerRepository.getByName(newManufacturerData.name, userId);

	if (dbMaanufacturer) {
		throw errorType.conflict("Manufacturer");
	}

	const newManufacturer = await manufaturerRepository.create(newManufacturerData, userId);

	return newManufacturer;
}

async function update(newManufacturerData: createManufacture, userId: number, manufacturerId: number) {
	await userService.getById(userId);

	const dbMaanufacturer = await manufaturerRepository.getById(manufacturerId);
	const dbMaanufacturerByName = await manufaturerRepository.getByName(newManufacturerData.name, userId);

	if (!dbMaanufacturer) {
		throw errorType.notFound("Manufacturer");
	}
	if (dbMaanufacturerByName && manufacturerId !== dbMaanufacturerByName.id) {
		throw errorType.conflict("Name");
	}
	if (dbMaanufacturer.userId !== userId) {
		throw errorType.forbbiden();
	}

	const updatedManufacturer = await manufaturerRepository.update(newManufacturerData, manufacturerId);

	return updatedManufacturer;
}

async function remove(userId: number, manufacturerId: number) {
	await userService.getById(userId);

	const dbMaanufacturer = await manufaturerRepository.getById(manufacturerId);

	if (!dbMaanufacturer) {
		throw errorType.notFound("Manufacturer");
	}
	if (dbMaanufacturer.userId !== userId) {
		throw errorType.forbbiden();
	}

	await manufaturerRepository.remove(manufacturerId);
}

async function find(userId: number) {
	await userService.getById(userId);

	const userManufacturers = await manufaturerRepository.find(userId);

	return userManufacturers;
}

export const manufacturerService = {
	create,
	update,
	remove,
	find,
};

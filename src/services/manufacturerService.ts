import { errorType } from "../utils/errorTypes";
import { userService } from "./userService";
import { manufaturerRepository, createManufacture } from "../repositories/manufacturerRepository";

async function create(newManufacturerData: createManufacture, userId: number) {
	await userService.getById(userId);

	const dbMaanufacturer = await manufaturerRepository.getByName(newManufacturerData.name);

	if (dbMaanufacturer) {
		throw errorType.conflict("Manufacturer");
	}

	const newManufacturer = await manufaturerRepository.create(newManufacturerData, userId);

	return newManufacturer;
}

export const manufacturerService = {
	create,
};

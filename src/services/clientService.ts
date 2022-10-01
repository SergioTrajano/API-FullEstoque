import { errorType } from "../utils/errorTypes";

import { clientRepository, createClient } from "../repositories/clientRepository";
import { userService } from "./userService";

async function create(newClientData: createClient, userId: number) {
	await userService.getById(userId);

	const dbClient = await clientRepository.getByCPF(newClientData.CPF, userId);

	if (dbClient) {
		throw errorType.conflict("CPF");
	}

	const newClient = await clientRepository.create({ ...newClientData, userId });

	return newClient;
}

export const clientService = {
	create,
};

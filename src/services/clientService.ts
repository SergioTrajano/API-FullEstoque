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

async function update(updateClient: createClient, userId: number, clientId: number) {
	await userService.getById(userId);
	const dbClientById = await clientRepository.getById(clientId);
	const dbClientByCPF = await clientRepository.getByCPF(updateClient.CPF, userId);

	if (!dbClientById) {
		throw errorType.notFound("Client");
	}
	if (dbClientById.userId !== userId) {
		throw errorType.forbbiden();
	}
	if (dbClientByCPF && dbClientByCPF.id !== clientId) {
		throw errorType.conflict("CPF");
	}

	const updatedClient = await clientRepository.update(updateClient, clientId);

	return updatedClient;
}

export const clientService = {
	create,
	update,
};

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

async function remove(userId: number, clientId: number) {
	await userService.getById(userId);
	const dbClient = await clientRepository.getById(clientId);

	if (!dbClient) {
		throw errorType.notFound("Client");
	}
	if (dbClient.userId !== userId) {
		throw errorType.forbbiden();
	}

	await clientRepository.remove(clientId);
}

async function find(userId: number) {
	const userClients = await clientRepository.find(userId);

	return userClients;
}

async function findById(id: number) {
	const dbClient = await clientRepository.getById(id);

	if (!dbClient) {
		throw errorType.notFound("Client");
	}

	return dbClient;
}

export const clientService = {
	create,
	update,
	remove,
	find,
	findById,
};

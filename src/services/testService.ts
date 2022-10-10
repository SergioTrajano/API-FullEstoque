import { testRepository } from "../repositories/testRepository";

async function reset() {
	await testRepository.reset();
}

export const testService = {
	reset,
};

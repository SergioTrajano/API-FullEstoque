import client from "../dbStrategy/postgres";

async function reset() {
	await client.$executeRaw`TRUNCATE TABLE categories RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE manufacturers RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE clients RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE products RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE purchases RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE sells RESTART IDENTITY CASCADE`;
	await client.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`;
}

export const testRepository = {
	reset,
};

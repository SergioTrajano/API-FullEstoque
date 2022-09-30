import client from "../dbStrategy/postgres";

export type createCategory = {
	name: string;
};

async function create(newCategoryData: createCategory, userId: number) {
	const newCategory = await client.category.create({ data: { ...newCategoryData, userId: userId } });

	return newCategory;
}

async function findByUserIdAndName(name: string, id: number) {
	const userCategory = await client.category.findFirst({ where: { name: name, userId: id } });

	return userCategory;
}

export const categoryRepository = {
	create,
	findByUserIdAndName,
};

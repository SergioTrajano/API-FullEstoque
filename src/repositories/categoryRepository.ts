import client from "../dbStrategy/postgres";

export type createCategory = {
	name: string;
};

async function create(newCategoryData: createCategory, userId: number) {
	const newCategory = await client.category.create({ data: { ...newCategoryData, userId: userId } });

	return newCategory;
}

async function findByUserIdAndName(name: string, id: number) {
	const userCategory = await client.category.findFirst({
		where: {
			name: {
				equals: name,
				mode: "insensitive",
			},
			userId: id,
		},
	});

	return userCategory;
}

async function findById(categoryId: number) {
	const dbCategory = await client.category.findUnique({ where: { id: categoryId } });

	return dbCategory;
}

async function update(dataToUpdate: createCategory, categoryId: number) {
	const updatedCategory = await client.category.update({ where: { id: categoryId }, data: dataToUpdate });

	return updatedCategory;
}

async function remove(categoryId: number) {
	await client.category.delete({ where: { id: categoryId } });
}

async function find(userId: number) {
	const dbUserCategories = await client.category.findMany({ where: { userId } });

	return dbUserCategories;
}

export const categoryRepository = {
	create,
	findByUserIdAndName,
	findById,
	update,
	remove,
	find,
};

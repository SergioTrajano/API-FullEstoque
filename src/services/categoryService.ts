import { userService } from "./userService";
import { errorType } from "../utils/errorTypes";
import { categoryRepository, createCategory } from "../repositories/categoryRepository";

async function create(newCategoryData: createCategory, id: number) {
	await userService.getById(id);
	const userCategories = await categoryRepository.findByUserIdAndName(newCategoryData.name, id);

	if (userCategories) {
		throw errorType.conflict("Category");
	}

	const newCategory = await categoryRepository.create(newCategoryData, id);

	return newCategory;
}

async function update(dataToUpdate: createCategory, categoryId: number, userId: number) {
	const dbCategory = await categoryRepository.findById(categoryId);
	const dbCategorybyName = await categoryRepository.findByUserIdAndName(dataToUpdate.name, userId);

	if (!dbCategory) {
		throw errorType.notFound("Category");
	}
	if (dbCategorybyName && categoryId !== dbCategorybyName.id) {
		throw errorType.forbbiden();
	}
	if (dbCategory.userId !== userId) {
		throw errorType.forbbiden();
	}

	const updatedCatregory = await categoryRepository.update(dataToUpdate, categoryId);

	return updatedCatregory;
}

async function remove(categoryId: number, userId: number) {
	const dbCategory = await categoryRepository.findById(categoryId);

	if (!dbCategory) {
		throw errorType.notFound("Category");
	}
	if (dbCategory.userId !== userId) {
		throw errorType.forbbiden();
	}

	await categoryRepository.remove(categoryId);
}

async function find(userId: number) {
	const userCategories = await categoryRepository.find(userId);

	return userCategories;
}

async function findById(id: number) {
	const dbCategory = await categoryRepository.findById(id);

	if (!dbCategory) {
		throw errorType.notFound("Category");
	}

	return dbCategory;
}

export const categoryService = {
	create,
	update,
	remove,
	find,
	findById,
};

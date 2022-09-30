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

export const categoryService = {
	create,
};

import joi from "joi";

export const createProductSchema = joi.object({
	categoryId: joi.number().integer().min(1).required(),
	name: joi.string().trim().required(),
	description: joi.string().trim().required(),
	barcode: joi.string().trim().required(),
	price: joi.number().precision(2).min(0).required(),
	manufacturerId: joi.number().integer().min(1).required(),
});

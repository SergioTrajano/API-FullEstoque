import joi from "joi";

export const createPurchaseSchema = joi.object({
	productId: joi.number().integer().min(1).required(),
	quantity: joi.number().integer().min(1).required(),
	totalPrice: joi.number().precision(2).min(0).required(),
});

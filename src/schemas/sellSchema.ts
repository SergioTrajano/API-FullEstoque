import joi from "joi";

export const createSellSchema = joi.object({
	productId: joi.number().integer().min(1).required(),
	clientId: joi.number().integer().min(1).required(),
	quantity: joi.number().integer().min(1).required(),
	totalPrice: joi.number().precision(2).min(0.01).required(),
});

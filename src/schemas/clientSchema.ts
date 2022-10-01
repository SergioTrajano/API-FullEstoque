import joi from "joi";

export const createClientSchema = joi.object({
	name: joi.string().trim().required(),
	phoneNumber: joi.number().integer().required().strict(),
	CPF: joi.string().trim().required(),
	RG: joi.number().integer().required().strict(),
});

import joi from "joi";

export const createClientSchema = joi.object({
	name: joi.string().trim().required(),
	phoneNumber: joi.string().trim().required(),
	CPF: joi.string().trim().required(),
	RG: joi.string().trim().required(),
});

import joi from "joi";

export const createManufacturerSchema = joi.object({
	name: joi.string().trim().required(),
});

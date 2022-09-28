import joi from "joi";

const strongPasswordRegEx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;

export const signUpSchema = joi.object({
	email: joi
		.string()
		.email({ tlds: { allow: false } })
		.trim()
		.required(),
	password: joi.string().trim().pattern(strongPasswordRegEx).required(),
	confirmPassword: joi.string().trim().equal(joi.ref("password")).required(),
	name: joi.string().trim().required(),
});

export const signInSchema = joi.object({
	email: joi
		.string()
		.email({ tlds: { allow: false } })
		.trim()
		.required(),
	password: joi.string().trim().required(),
});

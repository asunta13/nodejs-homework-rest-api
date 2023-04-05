const Joi = require("joi");
const addSchema = Joi.object({
	name: Joi.string().required().message({
		"any.required": `"name" field is required`,
		"string.empty": `"name" field cannot be empty`,
	}),
	email: Joi.string().required().message({
		"any.required": `"email" field is required`,
		"string.empty": `"email" field cannot be empty`,
	}),
	phone: Joi.string().required().message({
		"any.required": `"phone" field is required`,
		"string.empty": `"phone" field cannot be empty`,
	}),
});

module.exports = {
	addSchema,
};

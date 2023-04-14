// const { boolean } = require("joi");
const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");

const contactSchema = new Schema({
	name: {
		type: String,
		required: [true, "Set name for contact"],
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	favorite: {
		type: Boolean,
		default: false,
	},
	owner: {
		type: Schema.Types.ObjectId,
		ref: "user",
	},
});

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": `"name" field is required`,
		"string.empty": `"name" field cannot be empty`,
	}),
	email: Joi.string().required().messages({
		"any.required": `"email" field is required`,
		"string.empty": `"email" field cannot be empty`,
	}),
	phone: Joi.string().required().messages({
		"any.required": `"phone" field is required`,
		"string.empty": `"phone" field cannot be empty`,
	}),
	favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		"any.required": "missing field favorite",
	}),
});

const schemas = {
	addSchema,
	updateFavoriteSchema,
};

const Contact = model("contact", contactSchema);

module.exports = {
	Contact,
	schemas,
};

const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../utils");

const subscriptionList = ["starter", "pro", "business"];
const userSchema = new Schema({
	password: {
		type: String,
		required: [true, "Set password for user"],
	},
	email: {
		type: String,
		required: [true, "Email is required"],
		unique: true,
	},
	subscription: {
		type: String,
		enum: subscriptionList,
		default: "starter",
	},
	token: String,
});

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
	password: Joi.string().required().messages({
		"any.required": `"password" field is required`,
		"string.empty": `"password" field cannot be empty`,
	}),
	email: Joi.string().email().messages({
		"any.required": `"email" field is required`,
		"string.empty": `"email" field cannot be empty`,
	}),
});

const loginSchema = Joi.object({
	password: Joi.string().required().messages({
		"any.required": `"password" field is required`,
		"string.empty": `"password" field cannot be empty`,
	}),
	email: Joi.string().email().messages({
		"any.required": `"email" field is required`,
		"string.empty": `"email" field cannot be empty`,
	}),
});

const subscriptionSchema = Joi.object({
	password: Joi.string().required().messages({
		"any.required": `"password" field is required`,
		"string.empty": `"password" field cannot be empty`,
	}),
	email: Joi.string().email().messages({
		"any.required": `"email" field is required`,
		"string.empty": `"email" field cannot be empty`,
	}),
	subscription: Joi.boolean()
		.valid(...subscriptionList)
		.required()
		.messages({
			"any.required": "missing field subscription",
		}),
});

const schemas = {
	registerSchema,
	loginSchema,
	subscriptionSchema,
};

const User = model("user", userSchema);

module.exports = {
	User,
	schemas,
};

const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();

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

router.get("/", async (req, res, next) => {
	try {
		const result = await contacts.listContacts();
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.getContactById(id);

		if (!result) {
			throw HttpError(404, `Contact with ${id} not found`);
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await contacts.addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contacts.removeContact(id);
		if (!result) {
			throw HttpError(404, `Contact with ${id} not found`);
		}
		res.status(200).json({
			message: "Contact deleted",
		});
	} catch (error) {
		next(error);
	}
});

router.put("/:id", async (req, res, next) => {
	try {
		const { error } = addSchema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const { id } = req.params;
		const result = await contacts.updateContact(id, req.body);
		if (!result) {
			throw HttpError(404, `Contact with ${id} not found`);
		}
		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;

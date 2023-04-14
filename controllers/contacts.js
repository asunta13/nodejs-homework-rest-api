const { Contact } = require("../models/contact");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite = null } = req.query;
	const skip = (page - 1) * limit;
	const findOptions = favorite ? { owner, favorite } : { owner };

	const contacts = await Contact.find(findOptions, "-__v", {
		skip,
		limit,
	}).populate("owner", "name email");
	res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
	const { id } = req.params;
	const result = await Contact.findById(id);
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.status(200).json(result);
};

const addContact = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Contact.create({ ...req.body, owner });
	res.status(201).json(result);
};

const deleteContactById = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await Contact.findByIdAndDelete(id, owner);
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.status(200).json({
		message: "Contact deleted",
	});
};

const updateContactById = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await Contact.findByIdAndUpdate(
		id,
		req.body,
		{
			new: true,
		},
		owner
	);
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
	const { id } = req.params;
	const { _id: owner } = req.user;
	const result = await Contact.findByIdAndUpdate(
		id,
		req.body,
		{
			new: true,
		},
		owner
	);
	if (!result) {
		throw HttpError(404, `Contact with ${id} not found`);
	}
	res.status(200).json(result);
};

module.exports = {
	getAllContacts: ctrlWrapper(getAllContacts),
	getContactById: ctrlWrapper(getContactById),
	addContact: ctrlWrapper(addContact),
	deleteContactById: ctrlWrapper(deleteContactById),
	updateContactById: ctrlWrapper(updateContactById),
	updateStatusContact: ctrlWrapper(updateStatusContact),
};

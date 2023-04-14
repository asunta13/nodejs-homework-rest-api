const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const { isValidId, authenticate } = require("../../middlewares");
const { validateBody } = require("../../utils");
const { schemas } = require("../../models/contact");

router.get("/", authenticate, ctrl.getAllContacts);

router.get("/:id", authenticate, isValidId, ctrl.getContactById);

router.post(
	"/",
	authenticate,
	validateBody(schemas.addSchema),
	ctrl.addContact
);

router.delete("/:id", authenticate, isValidId, ctrl.deleteContactById);

router.put(
	"/:id",
	authenticate,
	isValidId,
	validateBody(schemas.addSchema),
	ctrl.updateContactById
);

router.patch(
	"/:id/favorite",
	authenticate,
	isValidId,
	validateBody(schemas.updateFavoriteSchema),
	ctrl.updateStatusContact
);

module.exports = router;

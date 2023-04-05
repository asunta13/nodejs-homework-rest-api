const express = require("express");
const ctrl = require("../../controllers/contacts");
const router = express.Router();

const { validateBody } = require("../../utils");
const schemas = require("../../schemas/contacts");

router.get("/", ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", validateBody(schemas.addSchema), ctrl.addContact);

router.delete("/:id", ctrl.deleteContactById);

router.put("/:id", validateBody(schemas.addSchema), ctrl.updateContactById);

module.exports = router;

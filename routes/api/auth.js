const express = require("express");

const ctrl = require("../../controllers/auth");

const router = express.Router();
const { validateBody } = require("../../utils");
const { authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch(
	"/",
	authenticate,
	validateBody(schemas.subscriptionSchema),
	ctrl.updateSubscription
);
router.patch(
	"/avatars",
	authenticate,
	upload.single("avatar"),
	ctrl.updateAvatar
);

module.exports = router;
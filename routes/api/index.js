const router = require("express").Router();
const teachbackRoutes = require("./teachback");
const userRoutes = require("./user");
const taFinalRoutes = require("./taFinal");
const OneonOneRoutes = require("./OneonOne")

// Teachback routes
router.use("/teachback", teachbackRoutes);

// User routes
router.use("/user", userRoutes);

// TA Final routes
router.use("/taFinal", taFinalRoutes);

// One on One routes
router.use("/OneonOne", OneonOneRoutes);

module.exports = router;

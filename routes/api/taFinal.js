const router = require("express").Router();
const taFinalController = require("../../controllers/taFinalController");

// Matches with "/api/taFinal"
router.route("/").get(taFinalController.findAll).post(taFinalController.create);

// Matches with "/api/taFinal/mytaFinal/userID"
router.route("/mytaFinal/:userID").get(taFinalController.findUserTAFinals);

// Matches with "/api/taFinal/:id"
router
  .route("/:id")
  .get(taFinalController.findById)
  .put(taFinalController.update)
  .delete(taFinalController.remove);

module.exports = router;

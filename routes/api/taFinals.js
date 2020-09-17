const router = require("express").Router();
const taFinalController = require("../../controllers/taFinalController");

// Matches with "/api/taFinals"
router.route("/").get(taFinalController.findAll).post(taFinalController.create);

// Matches with "/api/taFinals/mytaFinals/userID"
router.route("/mytaFinals/:userID").get(taFinalController.findUserTAFinals);

// Matches with "/api/taFinals/:id"
router
  .route("/:id")
  .get(taFinalController.findById)
  .put(taFinalController.update)
  .delete(taFinalController.remove);

module.exports = router;

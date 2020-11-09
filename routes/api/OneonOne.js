const router = require("express").Router();
const OneonOneController = require("../../controllers/OneonOneController");

// Matches with "/api/OneonOne"
router.route("/").get(OneonOneController.findAll).post(OneonOneController.create);

// Matches with "/api/OneonOne/myOneonOnes/userID"
router.route("/myOneonOnes/:userID").get(OneonOneController.findUserOneonOnes);

// Matches with "/api/OneonOne/:id"
router
  .route("/:id")
  .get(OneonOneController.findById)
  .put(OneonOneController.update)
  .delete(OneonOneController.remove);

module.exports = router;

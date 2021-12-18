const router = require("express").Router();
const { index, create, remove, update } = require("./controller");

router.route("/category").get(index).post(create);
router.route("/category/:id").delete(remove).put(update);

module.exports = router;

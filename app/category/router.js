const router = require("express").Router();
const { index, create } = require("./controller");

router.route("/category").get(index).post(create);

module.exports = router;

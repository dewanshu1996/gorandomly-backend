const express = require("express");
const taskRoute = require("./task.route");
const resultRoute = require("./result.route");

const router = express.Router();

router.use("/task", taskRoute);
router.use("/result", resultRoute);

module.exports = router;

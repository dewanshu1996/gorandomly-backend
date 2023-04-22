const express = require("express");
const { findResult } = require("../controller/result.controller");

const router = new express.Router();

router.get("/findResult/:id", findResult);

module.exports = router;

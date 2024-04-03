const express = require("express");
const { hanlegenrateNewUrl } = require("../controller/url");
const router = express.Router();

router.post("/", hanlegenrateNewUrl);

module.exports = router;

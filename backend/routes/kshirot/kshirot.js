const express = require("express");
const router = express.Router();

const { create } = require("../../controllers/kshirot/kshirot");

router.post("/create", create);

module.exports = router;

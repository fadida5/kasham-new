const express = require("express");
const router = express.Router();

const { create, findbygdod } = require("../../controllers/kshirot/kshirot");

router.post("/create", create);

router.get("/getbygdod/:gdod", findbygdod);

module.exports = router;

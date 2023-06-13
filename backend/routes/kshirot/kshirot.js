const express = require("express");
const router = express.Router();

const {
	create,
	findbygdod,
	gradebyhativaid,
	gradebyogdaid,
	gradebypikodid,
} = require("../../controllers/kshirot/kshirot");

router.post("/create", create);

router.get("/getbygdod/:gdod", findbygdod);

router.get("/gradebyhativaid/:hativa", gradebyhativaid);

router.get("/gradebyogdaid/:ogda", gradebyogdaid);

router.get("/gradebypikodid/:pikod", gradebypikodid);

module.exports = router;

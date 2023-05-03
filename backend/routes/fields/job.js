const express = require("express");
const router = express.Router();

const {
	find,
	find_by_name,
	find_by_number,
} = require("../../controllers/fields/job");

router.get("/job/find_by_name", find_by_name);
router.get("/job/find_by_number", find_by_number);
router.get("/job/find", find);

module.exports = router;

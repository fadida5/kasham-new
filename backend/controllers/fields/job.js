// import { Mongoose } from "mongoose";

const job = require("../../models/fields/job");

exports.find_by_number = (req, res) => {
	job
		.findOne({ job: req.params.job })
		.then((results) => res.json(results))
		.catch((err) => res.status(400).json(`error: ${err}`));
};

exports.find_by_name = (req, res) => {
	job
		.findOne({ name: req.params.name })
		.then((results) => res.json(results))
		.catch((err) => res.status(400).json(`error: ${err}`));
};

exports.find = (req, res) => {
	job
		.find()
		.then((results) => {
			const names = results.map((r) => r.name);
			const jobs = results.map((r) => r.job);
			const final = { names: names, jobs: jobs };
			// console.log(final);
			res.json(final);
		})
		.catch((err) => res.status(400).json(`error: ${err}`));
};

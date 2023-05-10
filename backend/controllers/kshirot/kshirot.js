// import { Mongoose } from "mongoose";
const Kshirot = require("../../models/kshirot/kshirot");

exports.create = (req, res) => {
	console.log(req.body);
	const kshirot = new Kshirot(req.body);
	kshirot.save((err, data) => {
		if (err) {
			// log.error(err);
			return res.status(400).json({
				error: err,
				// data: data,
			});
		}
		res.json(data);
	});
};

exports.findbygdod = (req, res) => {
	Kshirot.findOne({ gdod: req.params.gdod })
		.then((data) => {
			res.json(data);
		})
		.catch((err) => res.status(400).json("Error: " + err));
};

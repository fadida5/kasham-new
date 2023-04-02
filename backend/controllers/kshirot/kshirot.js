// import { Mongoose } from "mongoose";
const Kshirot = require("../../models/kshirot/kshirot");

exports.create = (req, res) => {
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

// import { Mongoose } from "mongoose";
const Kshirot = require("../../models/kshirot/kshirot");
const Gdod = require("../../models/units/gdod");
const { hativa_agg, ogda_agg, pikod_agg } = require("./aggregation");

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

exports.gradebyhativaid = (req, res) => {
	const hativa = hativa_agg.slice();
	// console.log(b);
	Kshirot.aggregate(hativa)
		.then((data) => {
			// console.log(req.params.hativa);
			const filltered = data.filter((grade) => {
				// console.log(Object.values(grade.hativa_data[0]));

				return grade.hativa_data[0]._id == req.params.hativa;
			});
			const temp = filltered.map((grade) => grade.grade);
			// console.log(temp);
			const fillter_sum =
				temp.reduce((acc, cv) => Number(acc) + Number(cv), 0) / temp.length;
			res.json(~~fillter_sum);
		})
		.catch((err) => res.status(400).json);
};

exports.gradebyogdaid = (req, res) => {
	const ogda = ogda_agg.slice();
	const dt = req.params.ogda.split(",");

	Kshirot.aggregate(ogda).then((data) => {
		const filltered = dt.map((ogda) => {
			const avg = data.filter((grade) => {
				return grade.ogda_data[0]._id == ogda;
			}).length;
			// console.log(avg);
			return {
				[ogda]:
					~~data
						.filter((grade) => {
							return grade.ogda_data[0]._id == ogda;
						})
						.map((grade) => grade.grade)
						.reduce((acc, cv) => Number(acc) + Number(cv), 0) / avg,
			};
		});
		// console.log(filltered);
		res.json(filltered);
		// const filltered = data.filter((grade) => {
		// 	return grade.ogda_data[0]._id == req.params.ogda;
		// });
		// const temp = filltered.map((grade) => grade.grade);
		// // console.log(temp);
		// const fillter_sum =
		// 	temp.reduce((acc, cv) => Number(acc) + Number(cv), 0) / temp.length;
		// res.json(~~fillter_sum); 
	});
};
exports.gradebypikodid = (req, res) => {
	const pikod = pikod_agg.slice();
	// console.log(req.params.pikod);
	const dt = req.params.pikod.split(",");
	// console.log(dt);
	Kshirot.aggregate(pikod).then((data) => {
		const filltered = dt.map((pikod) => {
			const avg = data.filter((grade) => {
				return grade.pikod_data[0]._id == pikod;
			}).length;
			// console.log(avg);
			return {
				[pikod]:
					~~data
						.filter((grade) => {
							return grade.pikod_data[0]._id == pikod;
						})
						.map((grade) => grade.grade)
						.reduce((acc, cv) => Number(acc) + Number(cv), 0) / avg,
			};
		});
		// console.log(filltered);
		res.json(filltered);
	});
};

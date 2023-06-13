exports.hativa_agg = [
	{
		$lookup: {
			from: "kshirots",
			localField: "grade",
			foreignField: "grade",
			as: "kshirot_by_gdod",
		},
	},
	{
		$unwind: "$kshirot_by_gdod",
	},
	{
		$lookup: {
			from: "gdods",
			localField: "kshirot_by_gdod.gdod",
			foreignField: "_id",
			as: "gdod_data",
		},
	},
	{
		$unwind: "$gdod_data",
	},
	{
		$lookup: {
			from: "hativas",
			localField: "gdod_data.hativa",
			foreignField: "_id",
			as: "hativa_data",
		},
	},
	{
		$set: {
			hativa: { $arrayElemAt: ["$hativa_data._id", 0] },
		},
	},
];

exports.ogda_agg = [
	{
		$lookup: {
			from: "kshirots",
			localField: "grade",
			foreignField: "grade",
			as: "kshirot_by_gdod",
		},
	},
	{
		$unwind: "$kshirot_by_gdod",
	},
	{
		$lookup: {
			from: "gdods",
			localField: "kshirot_by_gdod.gdod",
			foreignField: "_id",
			as: "gdod_data",
		},
	},
	{
		$unwind: "$gdod_data",
	},
	{
		$lookup: {
			from: "hativas",
			localField: "gdod_data.hativa",
			foreignField: "_id",
			as: "hativa_data",
		},
	},
	{
		$set: {
			hativa: { $arrayElemAt: ["$hativa_data._id", 0] },
		},
	},
	{
		$lookup: {
			from: "ogdas",
			localField: "hativa_data.ogda",
			foreignField: "_id",
			as: "ogda_data",
		},
	},
	{
		$set: {
			ogda: { $arrayElemAt: ["$ogda_data._id", 0] },
		},
	},
];

exports.pikod_agg = [
	{
		$lookup: {
			from: "kshirots",
			localField: "grade",
			foreignField: "grade",
			as: "kshirot_by_gdod",
		},
	},
	{
		$unwind: "$kshirot_by_gdod",
	},
	{
		$lookup: {
			from: "gdods",
			localField: "kshirot_by_gdod.gdod",
			foreignField: "_id",
			as: "gdod_data",
		},
	},
	{
		$unwind: "$gdod_data",
	},
	{
		$lookup: {
			from: "hativas",
			localField: "gdod_data.hativa",
			foreignField: "_id",
			as: "hativa_data",
		},
	},
	{
		$set: {
			hativa: { $arrayElemAt: ["$hativa_data._id", 0] },
		},
	},
	{
		$lookup: {
			from: "ogdas",
			localField: "hativa_data.ogda",
			foreignField: "_id",
			as: "ogda_data",
		},
	},
	{
		$set: {
			ogda: { $arrayElemAt: ["$ogda_data._id", 0] },
		},
	},
	{
		$lookup: {
			from: "pikods",
			localField: "ogda_data.pikod",
			foreignField: "_id",
			as: "pikod_data",
		},
	},
	{
		$set: {
			pikod: { $arrayElemAt: ["$pikod_data._id", 0] },
		},
	},
];

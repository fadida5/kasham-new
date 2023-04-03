//* fields ----------------------------------------------------------------
exports.tafkid = {
	id: "",
	name: "",
	teken: 0,
	matzva: 0,
	active: false,
};
exports.tafkidFields = [
	{ name: "מפקד", type: "text" },
	{ name: "תקן", type: "number" },
	{ name: "מצבה", type: "number" },
	{ name: "פעיל", type: "select" },
];
exports.job = {
	id: "",
	numbermikzoa: "",
	name: "",
	teken: 0,
	matzva: 0,
	active: false,
	tafkiddetails: "",
	professionalLevel: 0,
	shamap: 0,
};
exports.jobFields = [
	{ name: "מספר מקצוע", type: "select" },
	{ name: "שם מקצוע", type: "select" },
	{ name: "תקן", type: "number" },
	{ name: "מצבה", type: "number" },
	{ name: "פעיל", type: "select" },
	{ name: "סוג", type: "select" },
	{ name: "רמת מקצועיות", type: "number" },
	{ name: 'ביצוע שמ"פ', type: "number" },
];
exports.jobFields_options = [
	{ name: "חובה", value: "חובה" },
	{ name: "ראשוני", value: "ראשוני" },
	{ name: "מובהק", value: "מובהק" },
	{ name: "מילואים", value: "מילואים" },
	{ name: `גרעין מומחים מיל'`, value: `מומחים` },
];
exports.jobnName_options = [
	{ name: "מכונאי", value: 1 },
	{ name: "חשמלאי", value: 0 },
];
exports.jobNumber_options = [
	{ name: "1", value: 1 },
	{ name: "0", value: 0 },
];
exports.Operative_options = [
	{ name: "כן", value: true },
	{ name: "לא", value: false },
];
//* supply options for spare parts
exports.spareParts_exist_not = [
	{ name: "קיים", value: "קיים" },
	{ name: "לא קיים", value: "לא קיים" },
];
exports.spareParts_done = [
	{ name: "בוצע", value: "בוצע" },
	{ name: "לא בוצע", value: "לא בוצע" },
];
exports.spareParts_exist_not_partially = [
	{ name: "קיים", value: "קיים" },
	{ name: "חלקי", value: "חלקי" },
	{ name: "לא קיים", value: "לא קיים" },
];

exports.trainperson = {
	id: "",
	tafkid: "",
	name: "",
	pazam: 0,
	lastJob: "",
	trainingpazam: 0,
	comments: "",
};

exports.trainpersonFields = [
	{ name: "תפקיד", type: "text" },
	{ name: "דרגה,שם+משפחה", type: "text" },
	{ name: "וותק בתפקיד", type: "number" },
	{ name: "תפקיד קודם", type: "text" },
	{ name: "מספר ימים באימון", type: "number" },
	{ name: "הערות", type: "text" },
];

exports.oneToFive_Rate = [
	{ name: "1- לא מספיק", value: 1 },
	{ name: "2- נמוך", value: 2 },
	{ name: "3- בינוני", value: 3 },
	{ name: "4- טוב", value: 4 },
	{ name: "5- טוב מאוד", value: 5 },
];
// //* pakage info

exports.info = [];
// //* specialkeys searched values
exports.searchedVals = ["teken", "matzva"];

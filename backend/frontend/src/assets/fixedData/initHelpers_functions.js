//* init helpers ----------------------------------------------------------------
exports.get_field = (pack, arr, val) => pack[arr].map((item) => item[val]);
//* returns an array of field names from the selected package
exports.dup = (Package, start, end) =>
	Object.keys(Package).slice(
		Object.keys(Package).indexOf(start),
		Object.keys(Package).indexOf(end) + 1
	);
exports.arrayObjectOptions_Checker = (options, key) => {
	const temp = [];
	options.map((obj) => {
		temp.push(obj[key]);
	});
	return temp;
};

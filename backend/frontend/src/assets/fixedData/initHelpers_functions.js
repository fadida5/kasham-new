const { toast } = require("react-toastify");

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

exports.deepCheck = (obj, setDefault) => {
	const errorArr = [];
	let end = {};

	function check(arr) {
		arr.map((name) => {
			if (isNaN(obj[name])) {
				obj[name] = setDefault ? setDefault : 0;
				errorArr.push(
					`${name} was NaN so it was set to ${
						setDefault ? setDefault : 0
					} to not crush the app`
				);
			} else {
				obj[name] = obj[name];
				// console.log(obj.name);
			}
		});
	}
	if (typeof obj == "object" && !Array.isArray(obj)) {
		const names = Object.keys(obj);
		// let vals = Object.values(obj);
		// alert(names);
		check(names);
		//* last check before send
		if (errorArr.length > 0) {
			// toast.error(errorArr);
			obj.err = errorArr;
			return obj;
		} else {
			return obj;
		}
	} else {
		if (Array.isArray(obj)) {
			alert(`you need to pass an object you passed ${obj} and its an array`);
		} else {
			alert(
				`you need to pass an object you passed ${obj} and its an ${typeof obj}`
			);
		}
	}
	return end;
};

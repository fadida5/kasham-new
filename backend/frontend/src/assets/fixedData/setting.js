//TODO - make universal

//* universalInput
exports.uni = (type, footer, name, smSize, mdSize) => {
	return {
		type: type,
		footer: footer,
		name: name,
		// handleCallBack: callBack,
		// handleCallBack3: CallBack3,
		smSize: smSize ? smSize : 12,
		mdSize: mdSize ? mdSize : 6,
		textLoc: "right",
	};
};
//* date
exports.date = (footer, name, smSize, mdSize) => {
	return {
		footer: footer,
		name: name,
		// handleCallBack: callBack,
		// handleCallBack3: CallBack3,
		disableheader: true,
		smSize: smSize ? smSize : 12,
		mdSize: mdSize ? mdSize : 6,
		textLoc: "right",
	};
};

//* ArrayAdder

exports.arrAdd = (name, arrName, Bname, field, inputArray, Freeoptions) => {
	const optionNames = Object.keys(field).slice(1);
	const optionTypes = inputArray.map((obj) => obj.type);
	const TypeOfName = optionNames.filter((name, index) => {
		if (optionTypes[index] == "select") {
			return name;
		}
	});
	// console.log(TypeOfName);
	// console.log(optionNames);
	// console.log(optionTypes);
	let temp = {};

	exports.getData = () => {
		Freeoptions.map((fl, index) => {
			// console.log(fl);
			// console.log( {[TypeOfName[index]]:fl});
			temp = { ...temp, [TypeOfName[index]]: fl };
		});
	};

	// let Op = { ...temp };

	// try {
	// 	getData();
	// 	Op = { ...temp };
	// } catch (error) {
	// 	// console.log(error);
	// }

	// console.log({...Op});
	// return {
	// 	name: name,
	// 	arrName: arrName,
	// 	buttonName: Bname,
	// 	handleCallBack2: callBack2,
	// 	field: { ...field },
	// 	inputArray: inputArray,
	// 	freeOptions: { ...Op },
	// };
};

//* selectOne free options

exports.selectOneFO = (name, header, hasNull, freeOptions, val, hascomment) => {
	return {
		name: name,
		header: header,
		hasNull: hasNull,
		FreeOptions: freeOptions,
		value: val ? val : undefined,
		// handleCallBack: callBack,
		// handleCallBack3: CallBack3,
		hascomment: hascomment,
	};
};

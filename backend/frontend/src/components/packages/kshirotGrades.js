// let info = 0; // מידע בלי ציון
// let HR = 0.25; //כוח אדם
// let Sg = 0.15; //מלאי
// let OI = 0.15; //אירגון ותשתיות
// let TNT = 0.15; //אימון והכשרות
// let OP = 0.2; //אאופרטיבי
// let sum = 0.1; // סיכום

import { toast } from "react-toastify";

const {
	dup,
	deepCheck,
} = require("../../assets/fixedData/initHelpers_functions");
// const kshirotPackage = require("../packages/kshirot");

//*helper functions

function options_exist_not_partially(kshir, father, val, params) {
	switch (kshir[val]) {
		case "קיים":
			return params[father][val];
			break;

		case "חלקי":
			return params[father][val] / 2;
			break;

		case "לא קיים":
			return 0;
			break;

		default:
			break;
	}
}

function options_done(kshir, father, val, params) {
	switch (kshir[val]) {
		case "בוצע":
			return params[father][val];
			break;

		case "לא בוצע":
			return 0;
			break;

		default:
			break;
	}
}

function options_exist_not(kshir, father, val, params) {
	switch (kshir[val]) {
		case "קיים":
			return params[father][val];
			break;

		case "לא קיים":
			return 0;
			break;

		default:
			break;
	}
}

function options_Operative_options(kshir, father, val, params) {
	switch (kshir[val]) {
		case "כן":
			return params[father][val];
			break;

		case "לא":
			return 0;
			break;

		default:
			break;
	}
}

function options_oneToFive_Rate(kshir, father, val, params) {
	switch (kshir[val]) {
		case 1:
			return params[father][val] / 5;
			break;

		case 2:
			return params[father][val] / 4;
			break;

		case 3:
			return params[father][val] / 3;
			break;
		case 4:
			return params[father][val] / 2;
			break;
		case 5:
			return params[father][val];
			break;

		default:
			break;
	}
}
//* defult vals
let hrv = 0;
let sgv = 0;
let oiv = 0;
let tntv = 0;
let opv = 0;
let sumv = 0;

//todo - add better error handling

export function kshirotGrade(kshir, params, isTest, ishandasa) {
	//! only if using without fix functions
	const nullList = [];
	//! force fix opartor
	let opartor = 0.001;
	//!
	function Relevant(val, calc, paramVal) {
		switch (val) {
			case -1:
				//! only if using without fix functions
				nullList.push(paramVal);
				//!
				return null;
				break;

			default:
				return calc;
				break;
		}
	}
	//* error handling indicator
	let hasError = false;

	//* send function
	function send() {
		if (hrv <= params.HR.Total && hrv >= 0) {
			if (sgv <= params.Sg.Total && sgv >= 0) {
				if (oiv <= params.OI.Total && oiv >= 0) {
					if (opv <= params.OP.Total && opv >= 0) {
						if (tntv <= params.TNT.Total && tntv >= 0) {
							if (sumv <= params.sum.Total && sumv >= 0) {
								return (
									(
										Number(hrv) +
										Number(sgv) +
										Number(oiv) +
										Number(opv) +
										Number(tntv) +
										Number(sumv)
									).toFixed(3) / opartor
								);
							} else {
								console.log(sumv);
								sumv = 0;
							}
						} else {
							console.log(tntv);
							tntv = 0;
						}
					} else {
						console.log(opv);
						opv = 0;
					}
				} else {
					console.log(oiv);
					oiv = 0;
				}
			} else {
				console.log(sgv);
				sgv = 0;
			}
		} else {
			console.log(hrv);
			hrv = 0;
		}
	}
	// console.log(params.HR.Of);
	// todo - test if base number is 0 if is 0 return error
	const errorMessage = [];
	const HR = async () => {
		let temp = [];
		const km = kshir["kzinimActivemax"] / kshir["kzinim"]; //kzinim
		const Of = kshir["officersActivemax"] / kshir["officers"]; //officers
		const ofProVals = dup(kshir, "professionalSadir", "professionalReserved")
			.map((val) => {
				if (kshir[val] > 0) {
					return kshir[val];
				}
			})
			.filter((val) => val != undefined);
		let OFPro = 0;
		try {
			OFPro =
				ofProVals.reduce((acc, cv) => Number(acc) + Number(cv), 0) /
				ofProVals.length /
				10; //professionals כ"א
		} catch (error) {
			console.log(error);
			errorMessage.push(` "לא הוזנו נתונים כראוי ב"הוסף בעל מקצוע`);
		}
		if (OFPro == 0) {
			errorMessage.push(` "לא הוזנו נתונים כראוי ב"הוסף בעל מקצוע`);
		}
		// console.log(ofProVals);
		hrv =
			(km * params.HR.km + Of * params.HR.Of + OFPro * params.HR.OFPro) *
			params.HR.Total;
	};
	const Sg = async () => {
		let temp = [];
		const active = [];
		const fix = 0;
		//* by field letter
		const a = (kshir["tekenmax"] / kshir["teken"]) * params.Sg.a;
		const b = (kshir["toolsboxmax"] / kshir["toolsbox"]) * params.Sg.b;
		const c = options_exist_not_partially(kshir, "Sg", "lift", params);
		const d = options_exist_not_partially(kshir, "Sg", "match", params);
		const e = Relevant(
			kshir["load"],
			options_exist_not_partially(kshir, "Sg", "load", params),
			params.Sg.load
		);
		const f = Relevant(
			kshir["stash"],
			options_done(kshir, "Sg", "stash", params),
			params.Sg.stash
		);
		const g = Relevant(
			kshir["hatak"],
			(kshir["hatakmax"] / kshir["hatak"]) * params.Sg.g,
			params.Sg.g
		);
		const h = Relevant(
			kshir["bakash"],
			(kshir["bakashmax"] / kshir["bakash"]) * params.Sg.h,
			params.Sg.h
		);
		const i = Relevant(kshir["lastrefreshdate"], params.Sg.i);
		const j = Relevant(
			kshir["halfimtzelem"],
			(kshir["halfimtzelemmax"] / kshir["halfimtzelem"]) * params.Sg.j,
			params.Sg.j
		);
		const k = Relevant(
			kshir["matchswap"],
			options_exist_not_partially(kshir, "Sg", "matchswap", params)
		);
		const l = Relevant(
			kshir["catalogs"],
			options_exist_not_partially(kshir, "Sg", "catalogs", params),
			params.Sg.catalogs
		);

		sgv = (a + b + c + d + e + f + g + h + i + j + k + l) * params.Sg.Total;

		//? apply self fixing

		// temp = [a, b, c, d, e, f, g, h, i, j, k, l];
		// if (temp.includes(null)) {
		// 	let tempName = [
		// 		"a",
		// 		"b",
		// 		"c",
		// 		"d",
		// 		"e",
		// 		"f",
		// 		"g",
		// 		"h",
		// 		"i",
		// 		"j",
		// 		"k",
		// 		"l",
		// 	];
		// 	let tempNameActive = [];
		// 	temp.map((val, index) => {
		// 		if (val == null) {
		// 			fix = fix + params.Sg[tempName[index]];
		// 		}
		// 		if (val == undefined) {
		// 			alert(`${tempName[index]} is not a valid`);
		// 		} else {
		// 			active.push(val);
		// 			tempNameActive.push(tempName[index]);
		// 		}
		// 	});
		// 	const preFinal = active.reduce((acc, cv, index) => {
		// 		console.log(
		// 			`@ ${index} => ${acc} + ${cv} * ${
		// 				params.Sg[tempNameActive[index]] + fix / tempNameActive.length
		// 			} `
		// 		);
		// 		return (
		// 			Number(acc) +
		// 				Number(
		// 					(cv / params.Sg[tempNameActive[index]]) *
		// 						(params.Sg[tempNameActive[index]] + fix / tempNameActive.length)
		// 				),
		// 			0
		// 		);
		// 	});
		// 	sgv = preFinal * params.Sg.Total;
		// } else {
		// 	sgv = (a + b + c + d + e + f + g + h + i + j + k + l) * params.Sg.Total;
		// }
	};
	const OI = async () => {
		//* by field letter
		let temp = [];
		const active = [];
		const fix = 0;
		const a = Relevant(
			kshir["carhatap"],
			(kshir["carhatapmax"] / kshir["carhatap"]) * params.OI.a,
			params.OI.a
		);
		const b = Relevant(
			kshir["carpiter"],
			(kshir["carpitermax"] / kshir["carpiter"]) * params.OI.b,
			params.OI.b
		);
		const c = Relevant(
			kshir["classhatak"],
			(kshir["classhatakMax"] / kshir["classhatak"]) * params.OI.c,
			params.OI.c
		);
		const d = Relevant(
			kshir["classBakash_Namer"],
			(kshir["classBakash_NamerMax"] / kshir["classBakash_Namer"]) *
				params.OI.d,
			params.OI.d
		);
		const e = Relevant(
			kshir["katkal"],
			(kshir["katkalMax"] / kshir["katkal"]) * params.OI.e,
			params.OI.e
		);
		const f = Relevant(
			kshir["classHathatHeavy"],
			(kshir["classHathatHeavyMax"] / kshir["classHathatHeavy"]) * params.OI.f,
			params.OI.f
		);
		const g = Relevant(
			kshir["classHathatlight"],
			(kshir["classHathatlightMax"] / kshir["classHathatlight"]) * params.OI.g,
			params.OI.g
		);
		if (ishandasa) {
			const h = Relevant(
				kshir["rioarrow"],
				(kshir["rioarrowmax"] / kshir["rioarrow"]) * (params.OI.h - 0.05)
			);
			const j = Relevant(
				kshir["battletsama"],
				(kshir["battletsamamax"] / kshir["battletsama"]) * params.OI.j
			);
			const k = Relevant(
				kshir["tsama"],
				(kshir["tsamamax"] / kshir["tsama"]) * params.OI.k
			);
			const l = Relevant(
				kshir["hhtsama"],
				(kshir["hhtsamamax"] / kshir["hhtsama"]) * params.OI.l
			);
			const m = Relevant(
				kshir["amtap"],
				(kshir["amtapmax"] / kshir["amtap"]) * params.OI.m
			);
			oiv = (a + b + c + d + e + f + g + h + j + k + l + m) * params.OI.Total;
		} else {
			const h = Relevant(
				kshir["rioarrow"],
				(kshir["rioarrowmax"] / kshir["rioarrow"]) * params.OI.h
			);
			const i = Relevant(
				kshir["classNahot"],
				(kshir["classNahotMax"] / kshir["classNahot"]) * params.OI.i,
				params.OI.i
			);
			oiv = (a + b + c + d + e + f + g + h + i) * params.OI.Total;
		}

		//? apply self fixing

		// temp = [a, b, c, d, e, f, g, h, i];
		// if (temp.includes(null)) {
		// 	let tempName = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
		// 	let tempNameActive = [];
		// 	temp.map((val, index) => {
		// 		if (val == null) {
		// 			fix = fix + params.OI[tempName[index]];
		// 		}
		// 		if (val == undefined) {
		// 			alert(`${tempName[index]} is not a valid`);
		// 		} else {
		// 			active.push(val);
		// 			tempNameActive.push(tempName[index]);
		// 		}
		// 	});
		// 	const preFinal = active.reduce((acc, cv, index) => {
		// 		console.log(
		// 			`@ ${index} => ${acc} + ${cv} * ${
		// 				params.OI[tempNameActive[index]] + fix / tempNameActive.length
		// 			} `
		// 		);
		// 		return (
		// 			Number(acc) +
		// 				Number(
		// 					(cv / params.OI[tempNameActive[index]]) *
		// 						(params.OI[tempNameActive[index]] + fix / tempNameActive.length)
		// 				),
		// 			0
		// 		);
		// 	});
		// 	oiv = preFinal * params.OI.Total;
		// } else {
		// 	oiv = (a + b + c + d + e + f + g + h + i) * params.OI.Total;
		// }
	};
	const OP = async () => {
		let temp = [];
		const active = [];
		const fix = 0;
		//* by field letter
		const a = Relevant(
			kshir["shibozmax"],
			(kshir["shibozmax"] / kshir["shiboz"]) * params.OP.a,
			params.OP.a
		);
		const b = Relevant(
			kshir["drivers"],
			(kshir["driversmax"] / kshir["drivers"]) * params.OP.b,
			params.OP.b
		);
		const must = dup(kshir, "pkodotopara", "mefakedAPP_pkpCp")
			.map((val) => options_exist_not(kshir, "OP", val, params))
			.reduce((acc, cv) => Number(acc) + Number(cv), 0);

		const c = Relevant(
			kshir["tkinot"],
			(kshir["tkinotmax"] / kshir["tkinot"]) * params.OP.c,
			params.OP.c
		);
		const d = Relevant(
			kshir["tikim"],
			options_done(kshir, "OP", "tikim", params),
			params.OP.tikim
		);
		const e = Relevant(
			kshir["roleholdersmax"],
			(kshir["roleholdersmax"] / kshir["roleholders"]) * params.OP.e,
			params.OP.e
		);
		const f = Relevant(
			kshir["boxcontent"],
			options_exist_not_partially(kshir, "OP", "boxcontent", params),
			params.OP.boxcontent
		);

		opv = (a + b + c + d + e + f + must) * params.OP.Total;

		//? apply self fixing

		// temp = [a, b, c, d, e, f];
		// if (temp.includes(null)) {
		// 	let tempName = ["a", "b", "c", "d", "e", "f"];
		// 	let tempNameActive = [];
		// 	temp.map((val, index) => {
		// 		if (val == null) {
		// 			fix = fix + params.OP[tempName[index]];
		// 		}
		// 		if (val == undefined) {
		// 			alert(`${tempName[index]} is not a valid`);
		// 		} else {
		// 			active.push(val);
		// 			tempNameActive.push(tempName[index]);
		// 		}
		// 	});
		// 	const preFinal = active.reduce((acc, cv, index) => {
		// 		console.log(
		// 			`@ ${index} => ${acc} + ${cv} * ${
		// 				params.OP[tempNameActive[index]] + fix / tempNameActive.length
		// 			} `
		// 		);
		// 		return (
		// 			Number(acc) +
		// 				Number(
		// 					(cv / params.OP[tempNameActive[index]]) *
		// 						(params.OP[tempNameActive[index]] + fix / tempNameActive.length)
		// 				),
		// 			0
		// 		);
		// 	});
		// 	opv = (preFinal + must) * params.OP.Total;
		// } else {
		// 	opv = (a + b + c + d + e + f + must) * params.OP.Total;
		// }
	};

	const TNT = async () => {
		let temp = [];
		const active = [];
		const fix = 0;
		let mustval = 0;
		//* by field letter
		const must = () => {
			let aval = 0;
			const a = () => {
				if (kshir["trainingamount"] == undefined || "") {
					aval = params.TNT.trainingamount;
				} else {
					aval = 0;
				}
			};
			a();
			const b = (kshir["trainingquality"] / 100) * params.TNT.trainingquality;
			const c = options_done(kshir, "TNT", "trainSycle", params);
			const d = options_done(kshir, "TNT", "battaliondrillamount", params);
			const e =
				(kshir["battaliondrillquality"] / 100) *
				params.TNT.battaliondrillquality;
			mustval = aval + b + c + d + e;
		};
		must();
		const a = Relevant(
			kshir["kors"],
			(kshir["korsmax"] / kshir["kors"]) * params.TNT.a,
			params.TNT.a
		);
		const b = Relevant(
			kshir["nokavim"],
			(kshir["nokavim"] / 100) * params.TNT.b,
			params.TNT.e
		);
		const c = Relevant(
			kshir["tester"],
			(kshir["testermax"] / kshir["tester"]) * params.TNT.c,
			params.TNT.c
		);
		const d = Relevant(
			kshir["amountmhalaf"],
			(kshir["amountmhalafmax"] / kshir["amountmhalaf"]) * params.TNT.d,
			params.TNT.d
		);
		const e = Relevant(
			kshir["amounthanafa"],
			(kshir["amounthanafamax"] / kshir["amounthanafa"]) * params.TNT.e,
			params.TNT.e
		);

		tntv = (a + b + c + d + e + mustval) * params.TNT.Total;

		//? apply self fixing
		// temp = [a, b, c, d, e];
		// if (temp.includes(null)) {
		// 	let tempName = ["a", "b", "c", "d", "e", "f"];
		// 	let tempNameActive = [];
		// 	temp.map((val, index) => {
		// 		if (val == null) {
		// 			fix = fix + params.TNT[tempName[index]];
		// 		}
		// 		if (val == undefined) {
		// 			alert(`${tempName[index]} is not a valid`);
		// 		} else {
		// 			active.push(val);
		// 			tempNameActive.push(tempName[index]);
		// 		}
		// 	});
		// 	const preFinal = active.reduce((acc, cv, index) => {
		// 		console.log(
		// 			`@ ${index} => ${acc} + ${cv} * ${
		// 				params.TNT[tempNameActive[index]] + fix / tempNameActive.length
		// 			} `
		// 		);
		// 		return (
		// 			Number(acc) +
		// 				Number(
		// 					(cv / params.TNT[tempNameActive[index]]) *
		// 						(params.TNT[tempNameActive[index]] +
		// 							fix / tempNameActive.length)
		// 				),
		// 			0
		// 		);
		// 	});
		// 	tntv = (preFinal + mustval) * params.TNT.Total;
		// } else {
		// 	tntv = (a + b + c + d + e + mustval) * params.TNT.Total;
		// }
	};
	const sum = async () => {
		// console.log(kshir["mentality"]);
		// console.log(params.sum.Total);
		const Sclass = Relevant(
			kshir["sumClass"],
			(kshir["sumClassKashir"] / kshir["sumClass"]) * params.sum.Sclass,
			params.sum.Sclass * params.sum.Total
		);

		const man = (kshir["mentality"] / 5) * params.sum.mentality;
		// console.log(Sclass + "aaaa");
		// console.log(Sclass);

		if (Sclass == null || undefined) {
			sumv = man * params.sum.Total;
		} else {
			sumv = (man + Sclass) * params.sum.Total;
		}
	};
	//* calling calc functions
	HR();
	Sg();
	OI();
	OP();
	TNT();
	sum();
	//* setting decimal to x.abc
	hrv = hrv.toFixed(3);
	sgv = sgv.toFixed(3);
	oiv = oiv.toFixed(3);
	opv = opv.toFixed(3);
	tntv = tntv.toFixed(3);
	sumv = sumv.toFixed(3);
	// console.log(hrv + "HR - 0.25 max");
	// console.log(sgv + "SG - 0.15 max");
	// console.log(oiv + "Oi - 0.15 max");
	// console.log(opv + "OP - 0.2 max");
	// console.log(tntv + "TNT - 0.15 max");
	// console.log(sumv + "sum - 0.1 max");
	//* checking if there are any invalid values
	let unCheckedData = {
		hrv: hrv,
		sgv: sgv,
		oiv: oiv,
		opv: opv,
		tntv: tntv,
		sumv: sumv,
	};
	let CheckedData = deepCheck(unCheckedData);

	// console.log(a);
	// console.log(a.err);
	//* error handeling (need to be improved)
	if (Array.isArray(CheckedData.err)) {
		if (isTest) {
			CheckedData.err.map((error) => {
				toast.error(error);
			});
		}

		hasError = true;
	}
	//* setting the checked data to the correct enteries
	hrv = CheckedData.hrv;
	sgv = CheckedData.sgv;
	oiv = CheckedData.oiv;
	opv = CheckedData.opv;
	tntv = CheckedData.tntv;
	sumv = CheckedData.sumv;

	// console.log(nullList);
	// console.log(nullList.reduce((acc, v) => acc + v, 0));

	if (nullList.length > 0) {
		opartor = nullList.reduce((acc, v) => acc + v, 0) * 0.01;
	}

	// console.log(hrv + "HR - 0.25 max");
	// console.log(sgv + "SG - 0.15 max");
	// console.log(oiv + "Oi - 0.15 max");
	// console.log(opv + "OP - 0.2 max");
	// console.log(tntv + "TNT - 0.15 max");
	// console.log(sumv + "sum - 0.1 max");

	// console.log(send());
	return { grade: send(), approved: hasError };
}

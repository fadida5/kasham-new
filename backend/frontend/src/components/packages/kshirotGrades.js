// let info = 0; // מידע בלי ציון
// let HR = 0.25; //כוח אדם
// let Sg = 0.15; //מלאי
// let OI = 0.15; //אירגון ותשתיות
// let TNT = 0.15; //אימון והכשרות
// let OP = 0.2; //אאופרטיבי
// let sum = 0.1; // סיכום

const { dup } = require("../../assets/fixedData/initHelpers_functions");
// const kshirotPackage = require("../packages/kshirot");

//helper functions

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

function Relevant(val, calc) {
	switch (val) {
		case undefined:
			return null;
			break;
		case NaN:
			return null;
			break;
		case "":
			return null;
			break;
		case null:
			return null;
			break;

		default:
			return calc;
			break;
	}
}
let hrv = 0;
let sgv = 0;
let oiv = 0;
let tntv = 0;
let opv = 0;
let sumv = 0;
//TODO - fix relevent
export function kshirotGrade(kshir, params) {
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
			options_exist_not_partially(kshir, "Sg", "load", params)
		);
		const f = Relevant(
			kshir["stash"],
			options_done(kshir, "Sg", "stash", params)
		);
		const g = Relevant(
			kshir["hatakmax"],
			(kshir["hatakmax"] / kshir["hatak"]) * params.Sg.g
		);
		const h = Relevant(
			kshir["bakashmax"],
			(kshir["bakashmax"] / kshir["bakash"]) * params.Sg.h
		);
		const i = Relevant(kshir["lastrefreshdate"], params.Sg.i);
		const j = Relevant(
			kshir["halfimtzelemmax"],
			(kshir["halfimtzelemmax"] / kshir["halfimtzelem"]) * params.Sg.j
		);
		const k = Relevant(
			kshir["matchswap"],
			options_exist_not_partially(kshir, "Sg", "matchswap", params)
		);
		const l = Relevant(
			kshir["catalogs"],
			options_exist_not_partially(kshir, "Sg", "catalogs", params)
		);

		temp = [a, b, c, d, e, f, g, h, i, j, k, l];
		if (temp.includes(null)) {
			let tempName = [
				"a",
				"b",
				"c",
				"d",
				"e",
				"f",
				"g",
				"h",
				"i",
				"j",
				"k",
				"l",
			];
			let tempNameActive = [];
			temp.map((val, index) => {
				if (val == null) {
					fix = fix + params.Sg[tempName[index]];
				}
				if (val == undefined) {
					alert(`${tempName[index]} is not a valid`);
				} else {
					active.push(val);
					tempNameActive.push(tempName[index]);
				}
			});
			const preFinal = active.reduce((acc, cv, index) => {
				console.log(
					`@ ${index} => ${acc} + ${cv} * ${
						params.Sg[tempNameActive[index]] + fix / tempNameActive.length
					} `
				);
				return (
					Number(acc) +
						Number(
							(cv / params.Sg[tempNameActive[index]]) *
								(params.Sg[tempNameActive[index]] + fix / tempNameActive.length)
						),
					0
				);
			});
			sgv = preFinal * params.Sg.Total;
		} else {
			sgv = (a + b + c + d + e + f + g + h + i + j + k + l) * params.Sg.Total;
		}
	};
	const OI = async () => {
		//* by field letter
		let temp = [];
		const active = [];
		const fix = 0;
		const a = Relevant(
			kshir["carhatapmax"],
			(kshir["carhatapmax"] / kshir["carhatap"]) * params.OI.a
		);
		const b = Relevant(
			kshir["carpitermax"],
			(kshir["carpitermax"] / kshir["carpiter"]) * params.OI.b
		);
		const c = Relevant(
			kshir["classhatakMax"],
			(kshir["classhatakMax"] / kshir["classhatak"]) * params.OI.c
		);
		const d = Relevant(
			kshir["classBakash_NamerMax"],
			(kshir["classBakash_NamerMax"] / kshir["classBakash_Namer"]) * params.OI.d
		);
		const e = Relevant(
			kshir["katkalMax"],
			(kshir["katkalMax"] / kshir["katkal"]) * params.OI.e
		);
		const f = Relevant(
			kshir["classHathatHeavyMax"],
			(kshir["classHathatHeavyMax"] / kshir["classHathatHeavy"]) * params.OI.f
		);
		const g = Relevant(
			kshir["classHathatlightMax"],
			(kshir["classHathatlightMax"] / kshir["classHathatlight"]) * params.OI.g
		);
		const h = Relevant(
			kshir["rioarrowmax"],
			(kshir["rioarrowmax"] / kshir["rioarrow"]) * params.OI.h
		);
		const i = Relevant(
			kshir["classNahotMax"],
			(kshir["classNahotMax"] / kshir["classNahot"]) * params.OI.i
		);
		temp = [a, b, c, d, e, f, g, h, i];
		if (temp.includes(null)) {
			let tempName = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
			let tempNameActive = [];
			temp.map((val, index) => {
				if (val == null) {
					fix = fix + params.OI[tempName[index]];
				}
				if (val == undefined) {
					alert(`${tempName[index]} is not a valid`);
				} else {
					active.push(val);
					tempNameActive.push(tempName[index]);
				}
			});
			const preFinal = active.reduce((acc, cv, index) => {
				console.log(
					`@ ${index} => ${acc} + ${cv} * ${
						params.OI[tempNameActive[index]] + fix / tempNameActive.length
					} `
				);
				return (
					Number(acc) +
						Number(
							(cv / params.OI[tempNameActive[index]]) *
								(params.OI[tempNameActive[index]] + fix / tempNameActive.length)
						),
					0
				);
			});
			oiv = preFinal * params.OI.Total;
		} else {
			oiv = (a + b + c + d + e + f + g + h + i) * params.OI.Total;
		}
	};
	const OP = async () => {
		let temp = [];
		const active = [];
		const fix = 0;
		//* by field letter
		const a = Relevant(
			kshir["shibozmax"],
			(kshir["shibozmax"] / kshir["shiboz"]) * params.OP.a
		);
		const b = Relevant(
			kshir["drivers"],
			(kshir["drivers"] / kshir["driversmax"]) * params.OP.b
		);
		const must = dup(kshir, "pkodotopara", "mefakedAPP_pkpCp")
			.map((val) => options_exist_not(kshir, "OP", val, params))
			.reduce((acc, cv) => Number(acc) + Number(cv), 0);

		const c = Relevant(
			kshir["tkinotmax"],
			(kshir["tkinotmax"] / kshir["tkinot"]) * params.OP.c
		);
		const d = Relevant(
			kshir["tikim"],
			options_done(kshir, "OP", "tikim", params)
		);
		const e = Relevant(
			kshir["roleholdersmax"],
			(kshir["roleholdersmax"] / kshir["roleholders"]) * params.OP.e
		);
		const f = Relevant(
			kshir["boxcontent"],
			options_exist_not_partially(kshir, "OP", "boxcontent", params)
		);
		temp = [a, b, c, d, e, f];
		if (temp.includes(null)) {
			let tempName = ["a", "b", "c", "d", "e", "f"];
			let tempNameActive = [];
			temp.map((val, index) => {
				if (val == null) {
					fix = fix + params.OP[tempName[index]];
				}
				if (val == undefined) {
					alert(`${tempName[index]} is not a valid`);
				} else {
					active.push(val);
					tempNameActive.push(tempName[index]);
				}
			});
			const preFinal = active.reduce((acc, cv, index) => {
				console.log(
					`@ ${index} => ${acc} + ${cv} * ${
						params.OP[tempNameActive[index]] + fix / tempNameActive.length
					} `
				);
				return (
					Number(acc) +
						Number(
							(cv / params.OP[tempNameActive[index]]) *
								(params.OP[tempNameActive[index]] + fix / tempNameActive.length)
						),
					0
				);
			});
			opv = (preFinal + must) * params.OP.Total;
		} else {
			opv = (a + b + c + d + e + f + must) * params.OP.Total;
		}
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
			kshir["korsmax"],
			(kshir["korsmax"] / kshir["kors"]) * params.TNT.a
		);
		const b = Relevant(
			kshir["nokavim"],
			(kshir["nokavim"] / 100) * params.TNT.b
		);
		const c = Relevant(
			kshir["tester"],
			(kshir["tester"] / kshir["testermax"]) * params.TNT.c
		);
		const d = Relevant(
			kshir["amountmhalafmax"],
			(kshir["amountmhalafmax"] / kshir["amountmhalaf"]) * params.TNT.d
		);
		const e = Relevant(
			kshir["amounthanafamax"],
			(kshir["amounthanafamax"] / kshir["amounthanafa"]) * params.TNT.e
		);
		// console.log(mustval);

		temp = [a, b, c, d, e];
		if (temp.includes(null)) {
			let tempName = ["a", "b", "c", "d", "e", "f"];
			let tempNameActive = [];
			temp.map((val, index) => {
				if (val == null) {
					fix = fix + params.TNT[tempName[index]];
				}
				if (val == undefined) {
					alert(`${tempName[index]} is not a valid`);
				} else {
					active.push(val);
					tempNameActive.push(tempName[index]);
				}
			});
			const preFinal = active.reduce((acc, cv, index) => {
				console.log(
					`@ ${index} => ${acc} + ${cv} * ${
						params.TNT[tempNameActive[index]] + fix / tempNameActive.length
					} `
				);
				return (
					Number(acc) +
						Number(
							(cv / params.TNT[tempNameActive[index]]) *
								(params.TNT[tempNameActive[index]] +
									fix / tempNameActive.length)
						),
					0
				);
			});
			tntv = (preFinal + mustval) * params.TNT.Total;
		} else {
			tntv = (a + b + c + d + e + mustval) * params.TNT.Total;
		}
	};
	const sum = async () => {
		// console.log(kshir["mentality"]);
		// console.log(params.sum.Total);
		const Sclass = Relevant(
			kshir["sumClassKashir"],
			(kshir["sumClassKashir"] / kshir["sumClass"]) * params.sum.Sclass
		);

		const man = (kshir["mentality"] / 5) * params.sum.mentality;
		// console.log(Sclass + "aaaa");
		console.log(Sclass);

		if (Sclass == null || undefined) {
			sumv = man * params.sum.Total;
		} else {
			sumv = (man + Sclass) * params.sum.Total;
		}
	};

	HR();
	Sg();
	OI();
	OP();
	TNT();
	sum();
	hrv = hrv.toFixed(3);
	sgv = sgv.toFixed(3);
	oiv = oiv.toFixed(3);
	opv = opv.toFixed(3);
	tntv = tntv.toFixed(3);
	sumv = sumv.toFixed(3);
	console.log(hrv + "HR - 0.25 max");
	console.log(sgv + "SG - 0.15 max");
	console.log(oiv + "Oi - 0.15 max");
	console.log(opv + "OP - 0.2 max");
	console.log(tntv + "TNT - 0.15 max");
	console.log(sumv + "sum - 0.1 max");

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
								).toFixed(3) * 100
							);
						} else {
							console.log(sumv);

							alert("error in sum");
						}
					} else {
						console.log(TNT);

						alert("error in TNT");
					}
				} else {
					console.log(OP);

					alert("error in OP");
				}
			} else {
				console.log(OI);

				alert("error in OI");
			}
		} else {
			console.log(Sg);

			alert("error in Sg");
		}
	} else {
		console.log(HR);
		alert("error in HR");
	}
}

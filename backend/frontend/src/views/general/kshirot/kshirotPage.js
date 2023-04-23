/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useReducer } from "react";

import { useParams, Link, withRouter, Redirect } from "react-router-dom";

//* tipul packages
import { kshirotPackage } from "components/packages/kshirot";

// reactstrap components
import {
	Button,
	ButtonGroup,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Row,
	Container,
	Col,
	Collapse,
	CardColumns,
} from "reactstrap";
import { Typography } from "@mui/material";
import axios from "axios";
import { signin, authenticate, isAuthenticated } from "auth/index";
import PropagateLoader from "react-spinners/PropagateLoader";
// import Select from "../../../components/general/Select/AnimatedSelect";
import { UniversalInput } from "components/general/inputs/FreeTextInputs/UniversalInput";
import { DateInput } from "components/general/inputs/dateInput/DateInput";
import { ArrayAdder } from "components/general/inputs/ArrayInputs/ArrayAdder";
import AnimatedSelect from "components/general/Select/AnimatedSelect";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getCarDataFunc } from "redux/features/cardata/cardataSlice";
import { SelectOne } from "components/general/inputs/SelectInputs/SelectOne";
import IsRelevant from "components/general/CollapseComponents/IsRelevant/IsRelevant";
//* styles
import style from "../kshirot/kshirotPage.module.css";
import { TopTitle, h4Title } from "assets/fixedData/forcedStyle";
import Minimize from "components/general/CollapseComponents/Minimize/Minimize";
import { actions } from "react-table";
import { toast } from "react-toastify";
import { kshirotGrade } from "components/packages/kshirotGrades";
import { params } from "../../../assets/fixedData/ksirotGradeParams";
//TODO - build a test for test-user
function KshirotPage(props) {
	//* user
	const { user } = isAuthenticated();
	//* states ----------------------------------------------------------------
	//* main data
	const [kshirot, setKshirot] = useState(kshirotPackage);
	//* details field
	const [details, setDetails] = useState([]);
	//* isRelevant
	const [isRelevant, setIsRelevant] = useState([]);
	//* init helpers ----------------------------------------------------------------
	const {
		get_field,
		dup,
		arrayObjectOptions_Checker,
	} = require("../../../assets/fixedData/initHelpers_functions");

	//* useRducer ----------------------------------------------------------------
	let temp = {};

	function reducer_Function(state, action) {
		let arr = [];
		let arrActive = [];
		let arrFillter = [];
		//* returns sum of array objects array with a "if active" condition
		const diffActive = () => {
			arr = get_field(kshirot, action.father, action.val);
			arrActive = get_field(kshirot, action.father, "active");
			arrActive.map((item, index) => {
				if (!item) {
					arr[index] = 0;
				}
			});
			// console.log(arr);
			return arr.reduce((acc, cv) => Number(acc) + Number(cv), 0);
		};
		//* returns sum of array objects array
		const diff = () => {
			arr = get_field(kshirot, action.father, action.val);
			return arr.reduce((acc, cv) => Number(acc) + Number(cv), 0);
		};
		//* returns sum of array objects array
		const diffType = (type, filter) => {
			arr = get_field(kshirot, action.father, type);
			arrFillter = get_field(kshirot, action.father, action.val);
			// console.log(arrActive);
			// console.log(filter);
			arrFillter.map((item, index) => {
				if (item != filter) {
					arr[index] = 0;
				}
			});
			arrActive = get_field(kshirot, action.father, "active");
			arrActive.map((item, index) => {
				if (!item) {
					arr[index] = 0;
				}
			});
			// console.log(arr);
			return arr.reduce((acc, cv) => Number(acc) + Number(cv), 0);
		};
		//* returns an average of array objects array sum
		const average = (fl, fl2) => {
			if (!fl2) {
				arr = kshirot[action.father]
					.filter((obj) => obj.tafkiddetails === fl)
					.map((item) => item.professionalLevel);
				// console.log(arr);
				return (
					arr.reduce((acc, cv) => Number(acc) + Number(cv), 0) / arr.length
				);
			} else {
				// console.log(average(fl));
				// console.log(average(fl2));
				return (average(fl) + average(fl2)) / 2;
			}
		};
		// console.log(action);
		if (action.father === "specialkeytwo") {
			// console.log(action.val);
			switch (action.val) {
				case "teken":
					temp.kzinim = diff();
					break;
				case "matzva":
					temp.kzinimmax = diff();
					temp.kzinimActivemax = diffActive();

					break;

				case null:
					console.log(`resetting all values to default for ${action.father}`);
					let reVal = {};
					dup(kshirot, "kzinim", "kzinimActivemax").map((fl) => {
						reVal[fl] = kshirotPackage[fl];
					});
					// console.log(reVal);
					Object.keys(reVal).map((key) => {
						temp[key] = reVal[key];
					});

					break;
				default:
					break;
			}
		} else if (action.father === "specialkey") {
			switch (action.val) {
				case "teken":
					temp.officers = diff();
					break;
				case "matzva":
					temp.officersmax = diff();
					temp.officersActivemax = diffActive();
					break;
				case "tafkiddetails":
					// console.log(get_field(kshirot, action.father, action.val));
					let tafkidim = get_field(kshirot, action.father, action.val);
					tafkidim.map((tafkid, index) => {
						switch (tafkid) {
							case "חובה":
								temp.professionalSadir = average("חובה");
								temp.professionalKeva = average("ראשוני");
								temp.professionalReserved =
									average("מילואים") || average("מומחים");
								temp.professionals =
									diffType("matzva", "מילואים") + diffType("matzva", "מומחים");
								break;
							case "ראשוני" || "מובהק":
								temp.professionalKeva = average("ראשוני", "מובהק")
									? average("ראשוני", "מובהק")
									: average("ראשוני")
									? average("ראשוני")
									: average("מובהק")
									? average("מובהק")
									: null;
								temp.professionalSadir = average("חובה");
								temp.professionalReserved =
									average("מילואים") || average("מומחים");
								temp.professionals =
									diffType("matzva", "מילואים") + diffType("matzva", "מומחים");
								break;
							case "מובהק" || "ראשוני":
								temp.professionalKeva = average("ראשוני", "מובהק")
									? average("ראשוני", "מובהק")
									: average("ראשוני")
									? average("ראשוני")
									: average("מובהק")
									? average("מובהק")
									: null;
								temp.professionalSadir = average("חובה");
								temp.professionalReserved =
									average("מילואים") || average("מומחים");
								temp.professionals =
									diffType("matzva", "מילואים") + diffType("matzva", "מומחים");

								break;
							case "מילואים" || "מומחים":
								temp.professionalReserved = average("מילואים", "מומחים")
									? average("מילואים", "מומחים")
									: average("מילואים")
									? average("מילואים")
									: average("מומחים")
									? average("מומחים")
									: null;
								temp.professionalSadir = average("חובה");
								temp.professionalReserved =
									average("מילואים") || average("מומחים");
								temp.professionals =
									diffType("matzva", "מילואים") + diffType("matzva", "מומחים");

								break;
							case "מומחים" || "מילואים":
								temp.professionalReserved = average("מומחים", "מילואים")
									? average("מומחים", "מילואים")
									: average("מומחים")
									? average("מומחים")
									: average("מילואים")
									? average("מילואים")
									: null;
								temp.professionalSadir = average("חובה");
								temp.professionalReserved =
									average("מילואים") || average("מומחים");
								temp.professionals =
									diffType("matzva", "מילואים") + diffType("matzva", "מומחים");
								break;

								break;

							default:
								arr = [];
								break;
						}
					});
					break;

				case null:
					console.log(`resetting all values to default for ${action.father}`);
					let reVal = {};
					dup(kshirot, "officers", "professionals").map((fl) => {
						reVal[fl] = kshirotPackage[fl];
					});
					Object.keys(reVal).map((key) => {
						temp[key] = reVal[key];
					});
					// console.log(reVal);
					// setKshirot({ ...kshirot, ...reVal });
					break;

				default:
					break;
			}
		} else {
			console.log("no array");
		}
		// console.log(temp);
		setKshirot({ ...kshirot, ...temp });
	}

	const [, dispatch] = useReducer(reducer_Function, 0);

	//* fields ----------------------------------------------------------------
	const {
		tafkid,
		tafkidFields,
		job,
		jobFields,
		jobFields_options,
		jobNumber_options,
		jobnName_options,
		Operative_options,
		spareParts_done,
		spareParts_exist_not,
		spareParts_exist_not_partially,
		searchedVals,
		trainperson,
		trainpersonFields,
		oneToFive_Rate,
	} = require("../../../assets/fixedData/fields");

	//* functions ------------------------------------------------------------------------------------------------

	//* setting ----------------------------------------------------------------
	//* universalInput
	const uni = (type, footer, name, smSize, mdSize) => {
		return {
			type: type,
			footer: footer,
			name: name,
			handleCallBack: callBack,
			handleCallBack3: CallBack3,
			smSize: smSize ? smSize : 12,
			mdSize: mdSize ? mdSize : 6,
			textLoc: "right",
			isDisabeld: user.validated? false : true
		};
	};
	//* date
	const date = (footer, name, smSize, mdSize) => {
		return {
			footer: footer,
			name: name,
			handleCallBack: callBack,
			handleCallBack3: CallBack3,
			disableheader: true,
			smSize: smSize ? smSize : 12,
			mdSize: mdSize ? mdSize : 6,
			textLoc: "right",
			isDisabeld: user.validated? false : true

		};
	};

	//* ArrayAdder

	const arrAdd = (name, arrName, Bname, field, inputArray, Freeoptions) => {
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

		const getData = () => {
			Freeoptions.map((fl, index) => {
				// console.log(fl);
				// console.log( {[TypeOfName[index]]:fl});
				temp = { ...temp, [TypeOfName[index]]: fl };
			});
		};

		let Op = { ...temp };

		try {
			getData();
			Op = { ...temp };
		} catch (error) {
			// console.log(error);
		}

		// console.log({...Op});
		return {
			name: name,
			arrName: arrName,
			buttonName: Bname,
			handleCallBack2: callBack2,
			field: { ...field },
			inputArray: inputArray,
			freeOptions: { ...Op },
			isDisabeld: user.validated? false : true

		};
	};

	//* selectOne free options

	const selectOneFO = (
		name,
		header,
		hasNull,
		freeOptions,
		val,
		hascomment,
		size,
		barWidth
	) => {
		return {
			name: name,
			header: header,
			hasNull: hasNull,
			FreeOptions: freeOptions,
			value: val ? val : undefined,
			handleCallBack: callBack,
			handleCallBack3: CallBack3,
			hascomment: hascomment,
			barWidth: barWidth ? barWidth : 120,
			size: size ? size : "small",
			isDisabeld: user.validated? false : true

		};
	};

	//* callbacks ----------------------------------------------------------------

	//* regular output {key : value}
	function callBack(inputData) {
		setKshirot({ ...kshirot, [inputData.label]: inputData.value });
		console.log(inputData);
		console.log(kshirot);
		// console.table(tipuldata);
	}
	//* array output [{key : val, key2 : val2, ...}, ...]
	function callBack2(inputData2, arrName) {
		// console.log(arrName);
		console.table(inputData2);
		kshirot[arrName] = inputData2;
		if (inputData2.length > 0) {
			// console.log(dup(inputData2[0], "teken", "matzva"));
			dup(inputData2[0], "teken", "matzva").map((key) => {
				dispatch({ val: key, father: arrName });
			});
			// console.log(dup(inputData2[0], "tafkiddetails", "tafkiddetails"));
			dispatch({
				val: dup(inputData2[0], "tafkiddetails", "tafkiddetails")[0],
				father: arrName,
			});
		} else {
			dispatch({ val: null, father: arrName });
		}
		// ArrayCalcDIff(inputData2, arrName);
	}
	//* geting details as an object {name : value, name : value } (name = inputName + detail)
	function CallBack3(inputData3) {
		// console.log(inputData3);
		// console.log(details);
		setDetails({ ...details, [inputData3.name]: inputData3.value });
		setKshirot({ ...kshirot, details: details });
	}
	//* geting Relevant as an object {name : value, name : value } (name = cardname)
	function CallBack4(inputData4) {
		// console.log(inputData4);
		// console.log(isRelevant);
		setIsRelevant({ ...isRelevant, [inputData4.label]: inputData4.value });
		setKshirot({ ...kshirot, IsRelevant: isRelevant });
	}

	//*send ----------------------------------------------------------------

	function send() {
		const arr1 = dup(kshirotPackage, "commandername", "match");
		const arr2 = dup(kshirotPackage, "pkodotopara", "mefakedAPP_pkpCp");
		const arr3 = dup(kshirotPackage, "trainingamount", "battaliondrillquality");
		const fillter = [];
		const necessary = arr1.concat(arr2.concat(arr3));
		necessary.push("mentality");
		const pak = dup(kshirotPackage, "commandername", "specialkeytwo");
		// console.log(pak);
		// console.log(isRelevant);
		//* if there are not relevant items ----------------------------------------------------------------
		if (Object.values(isRelevant).includes(false)) {
			let kshirotRel = { ...kshirot };
			// console.log("check");
			let isRkeys = Object.keys(isRelevant);
			// console.log(isRkeys);
			const NotRelevant = isRkeys.filter((key) => isRelevant[key] === false);
			// console.log(NotRelevant);
			NotRelevant.map((nr) => {
				// console.log(nr);
				kshirotRel[nr] = -1;
				pak.pop(nr);
				// console.log(kshirotRel);
			});
			// console.log(NotRelevant);
			// console.log(
			// 	kshirotGrade(kshirotRel, params(0.25, 0.15, 0.15, 0.2, 0.15, 0.1), true)
			// 		.grade
			// );
			// console.log(pak);
			const temp = [];
			const empty = [];
			pak.map((val) => {
				// console.log(val);
				switch (kshirot[val]) {
					case "":
						temp.push(false);
						empty.push(val);
						break;
					case undefined:
						temp.push(false);
						empty.push(val);
						break;
					case null:
						temp.push(false);
						empty.push(val);
						break;

					default:
						temp.push(true);
						break;
				}
			});
			if (temp.includes(false)) {
				//todo make a table that converts all data to its name on the form
				// console.log(temp);
				// console.log(empty);
				// console.log(kshirot);
				// console.log(
				// 	kshirotGrade(
				// 		kshirotRel,
				// 		params(0.25, 0.15, 0.15, 0.2, 0.15, 0.1),
				// 		true
				// 	)
				// );
				toast.error(`${empty} נשאר ריק`);
				toast.info("אנא נסה שנית");
			} else {
				const grade = kshirotGrade(
					kshirotRel,
					params(0.25, 0.15, 0.15, 0.2, 0.15, 0.1),
					true
				).grade;
				const hasError = kshirotGrade(
					kshirot,
					params(0.25, 0.15, 0.15, 0.2, 0.15, 0.1),
					true
				).approved;
				// kshirotGrade(kshirot,ksirotGradeParams)
				console.log(pak);
				if (hasError) {
					toast.error("לא כל השדות מלאים כמו שצריך");
				} else {
					// kshirotGrade(kshirot,ksirotGradeParams)
					console.log(pak);
					kshirotRel.grade = grade;
					axios
						.post(`http://localhost:8000/kshirot/create`, kshirotRel)
						.then((res) => {
							// console.log(res);
							console.groupCollapsed("Axios then");
							console.log(res);
							toast.success("דוח כשירות נשלח בהצלחה");
						})
						.catch((err) => {
							console.log(err);
							toast.error("שגיאה בשליחה");
						});
				}
			}

			//* if all items are relevent ----------------------------------------------------------------------------
		} else {
			const temp = [];
			const empty = [];
			pak.map((val) => {
				// console.log(val);
				switch (kshirot[val]) {
					case "":
						temp.push(false);
						empty.push(val);
						break;
					case undefined:
						temp.push(false);
						empty.push(val);
						break;
					case null:
						temp.push(false);
						empty.push(val);
						break;

					default:
						temp.push(true);
						break;
				}
			});
			// console.log(temp);
			if (temp.includes(false)) {
				//todo make a table that converts all data to its name on the form
				// console.log(temp);
				// console.log(empty);
				// console.log(kshirot);
				// console.log(
				// 	kshirotGrade(kshirot, params(0.25, 0.15, 0.15, 0.2, 0.15, 0.1), true)
				// );
				toast.error(`${empty} נשאר ריק`);
				toast.info("אנא נסה שנית");
			} else {
				const grade = kshirotGrade(
					kshirot,
					params(0.25, 0.15, 0.15, 0.2, 0.15, 0.1),
					true
				).grade;
				const hasError = kshirotGrade(
					kshirot,
					params(0.25, 0.15, 0.15, 0.2, 0.15, 0.1),
					true
				).approved;
				// kshirotGrade(kshirot,ksirotGradeParams)
				console.log(pak);
				if (hasError) {
					toast.error("לא כל השדות מלאים כמו שצריך");
				} else {
					setKshirot({ ...kshirot, grade: grade });
					axios
						.post(`http://localhost:8000/kshirot/create`, kshirot)
						.then((res) => {
							// console.log(res);
							console.groupCollapsed("Axios then");
							console.log(res);
							toast.success("דוח כשירות נשלח בהצלחה");
						})
						.catch((err) => {
							console.log(err);
							toast.error("שגיאה בשליחה");
						});
				}
			}
			// console.log(necessary);
		}
	}

	//* useEffects ----------------------------------------------------------------
	//* work-plan + basic workflow (should be minimized)
	useEffect(() => {
		let info = [];
		let k = Object.keys(kshirotPackage);
		let v = Object.values(kshirotPackage);
		k.map((i, index) => {
			let input = "";
			if (typeof v[index] == "number") {
				input = "UniversalInput";
			} else if (Array.isArray(v[index])) {
				input = "ArrayAdder";
			} else if (typeof v[index] == "string") {
				if (v[index] == "") {
					input = "UniversalInput";
				} else {
					input = "SelectOne";
				}
			} else if (typeof v[index] == "object") {
				input = "specific => need a specific input format";
			}
			info.push({
				// index: index,
				param: i,
				paramType: typeof v[index],
				inputType: input,
				val: v[index],
			});
		});

		// console.table(t);
		/* NOTE - kshirot package break down by index:
		 * look at log info
		 */
		console.table(info);
		console.log(user);
		// console.log(k.indexOf("specialkey"));
		// console.log(k.length);
		// send();
	}, []);

	// try {
	// 	let a = document.getElementById("tene").getElementsByTagName("button");

	// 	console.log(a[0].id);
	// } catch (error) {
	// 	console.log(error);
	// }

	return (
		//TODO -
		/*//todo: 1) make each card its own component while this page will use the kshirot state (might move to usecontext).
		//todo:	  2) check if all the card need to be relevent from the start if not use lazy loading (just for performance/fun ;) )
		//todo:	  3) after doing 1 make handasa page (adaptive) 
		*/
		<Container className={style.Container}>
			<div
				style={{
					textAlign: "center",
					fontWeight: "bold",
					fontSize: "22px",
					paddingBottom: "10px",
				}}
			>
				placeholder {/*//!{gdod.name}*/}
			</div>
			<div
				style={{
					direction: "rtl",
					textAlign: "center",
					fontWeight: "bold",
					paddingBottom: "5px",
				}}
			>
				הערכת כשירות טנא
			</div>
			<Row>
				<Col
					xs={12}
					md={6}
				>
					<Card >
						<CardBody  className={style.CardBody}>
							<Container>
								<UniversalInput
									{...uni("text", "שם המפקד", "commandername")}
									textLoc="center"
								>
									<UniversalInput
										{...uni("number", "זמן בתפקיד", "date")}
										textLoc="center"
										chained={true}
										costume={{ min: 0 }}
									/>
									{/* <DateInput
										{...date("תאריך תחילת תפקיד", "date")}
										chained={true}
										textLoc="center"
									/> */}
								</UniversalInput>
								<div
									style={{
										fontSize: "18px",
										textAlign: "right",
										paddingTop: "10px",
										fontWeight: "bold",
									}}
								>
									כללי
								</div>
								<UniversalInput
									{...uni("text", "יחידה", "unit", 12, 4)}
									textLoc="center"
									header="פרטים אישיים"
								>
									<UniversalInput
										{...uni("text", 'שם קצין טנ"א', "name", 12, 4)}
										chained={true}
										textLoc="center"
									/>
									<UniversalInput
										{...uni("phone", "טלפון", "phone", 12, 4)}
										chained={true}
										textLoc="center"
									/>
								</UniversalInput>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody className={style.CardBody}>
							<Container>
								<div style={TopTitle}> כוח אדם (25%)</div>
								<Minimize relevantField={{ HR: true }}>
									{/*//! {gdod.sadir == true ? null : ()} */}

									<ArrayAdder
										{...arrAdd(
											"בעלי תפקיד(קצינים,מנהלי עבודה,מחטפים)",
											"specialkeytwo",
											"הוסף בעל תפקיד",
											tafkid,
											tafkidFields,
											[Operative_options]
										)}
										costume={(type) => {
											switch (true) {
												case type == "number":
													// console.log(type);

													return { min: 0 };
													break;
												default:
													console
														.error
														// `this type: ${type} does have costume settings (just for you to know)`
														();
													break;
											}
										}}
									/>

									<UniversalInput
										{...uni("number", "תקינה", "kzinim", 12, 4)}
										header='סה"כ בעלי תפקיד'
										isDisabeld={true}
										value={kshirot.kzinim}
										hascomment={true}
									>
										<UniversalInput
											{...uni("number", "מצבה", "kzinimmax", 12, 4)}
											chained={true}
											costume={{ min: 0 }}
											isDisabeld={true}
											value={kshirot.kzinimmax}
										/>
										<UniversalInput
											{...uni("number", "מצבה פעילה", "kzinimActivemax", 12, 4)}
											chained={true}
											costume={{ min: 0 }}
											isDisabeld={true}
											value={kshirot.kzinimActivemax}
										/>
									</UniversalInput>
									<ArrayAdder
										{...arrAdd(
											"בעלי מקצוע",
											"specialkey",
											"הוסף בעל מקצוע",
											job,
											jobFields,
											[
												jobNumber_options,
												jobnName_options,
												Operative_options,
												jobFields_options,
											]
										)}
										costumeSize={{
											"מספר מקצוע": "col-12 col-md-6",
											"שם מקצוע": "col-12 col-md-6",
										}}
										costume={(type, name) => {
											// console.log(name);
											switch (true) {
												case name == "רמת מקצועיות" && type == "number":
													return { max: 10, min: 0 };
													break;
												case type == "number":
													return { min: 0 };
													break;
												default:
													console
														.error
														// `this type: ${type} does have costume settings (just for you to know)`
														();
											}
										}}
									/>
									<UniversalInput
										{...uni("number", "תקינה", "officers", 12, 4)}
										header='סה"כ בעלי מקצוע'
										isDisabeld={true}
										value={kshirot.officers}
									>
										<UniversalInput
											{...uni("number", "מצבה", "officersmax", 12, 4)}
											chained={true}
											costume={{ min: 0 }}
											isDisabeld={true}
											value={kshirot.officersmax}
										/>
										<UniversalInput
											{...uni(
												"number",
												"מצבה פעילה",
												"officersActivemax",
												12,
												4
											)}
											chained={true}
											costume={{ min: 0 }}
											isDisabeld={true}
											value={kshirot.officersActivemax}
										/>
									</UniversalInput>
									<UniversalInput
										{...uni(
											"number",
											'מקצועיות כ"א חובה',
											"professionalSadir",
											12,
											4
										)}
										costume={{ min: 0, max: 10 }}
										isDisabeld={true}
										value={kshirot.professionalSadir}
									>
										<UniversalInput
											{...uni(
												"number",
												'מקצועיות כ"א קבע',
												"professionalKeva",
												12,
												4
											)}
											chained={true}
											costume={{ min: 0 }}
											isDisabeld={true}
											value={kshirot.professionalKeva}
										/>
										<UniversalInput
											{...uni(
												"number",
												`מקצועיות כ"א מיל'`,
												"professionalReserved",
												12,
												4
											)}
											chained={true}
											costume={{ min: 0 }}
											isDisabeld={true}
											value={kshirot.professionalReserved}
										/>
									</UniversalInput>
									<div style={{ marginRight: "-10px" }}>
										<UniversalInput
											{...uni("number", `סה"כ כמות מומחים`, "professionals")}
											isDisabeld={true}
											costume={{ min: 0 }}
											value={kshirot.professionals}
										/>
									</div>
								</Minimize>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody className={style.CardBody}>
							<Container>
								<div style={TopTitle}>מלאי (15%)</div>
								<Minimize relevantField={{ Supply: true }}>
									<UniversalInput
										{...uni("number", "תקן", "teken")}
										header={"אמצעי אחזקה"}
										costume={{ min: 0 }}
										hascomment={true}
									>
										<UniversalInput
											{...uni("number", "מצבה", "tekenmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									<UniversalInput
										{...uni("number", "תקן", "toolsbox")}
										header={"ארגז כלים לכל בעל מקצוע"}
										costume={{ min: 0 }}
										hascomment={true}
									>
										<UniversalInput
											{...uni("number", "מצבה", "toolsboxmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									{/* <SelectOne
										{...selectOneFO(
											"match",
											'התאמת כ"ע לסוג הצל"ם',
											false,
											spareParts_exist_not_partially,
											kshirot.match,
											true
										)}
									/> */}
									{dup(kshirotPackage, "lift", "stash").map((fl, index) => {
										const names = [
											"אמצעי הרמה,חילוץ וגרירה",
											'התאמת כ"ע לסוג הצל"ם',
											"יכולת העמסה",
											"הילום המלאי",
											'חט"כ',
										];

										{
											/* console.log(fl); */
										}

										return (
											//todo check if to add tkinot to lift
											<>
												{index >= 2 ? (
													<>
														{/* {index === 2 ? (
															<Row>
																<Col
																	xs={12}
																	md={3}
																	style={{
																		textAlign: "right",
																		paddingTop: "10px",
																		fontWeight: "bold",
																	}}
																>
																	חלפים
																</Col>
															</Row>
														) : null} */}

														<SelectOne
															{...selectOneFO(
																fl,
																names[index],
																false,
																index >= 0 && index <= 2
																	? spareParts_exist_not_partially
																	: index === 3
																	? spareParts_done
																	: index === 4
																	? spareParts_exist_not
																	: null,
																kshirot[fl],
																true
															)}
															title={index === 2 ? "חלפים" : undefined}
															IsRelevant={true}
															handleCallBack4={CallBack4}
														/>
													</>
												) : (
													<SelectOne
														{...selectOneFO(
															fl,
															names[index],
															false,
															index >= 0 && index <= 2
																? spareParts_exist_not_partially
																: index === 3
																? spareParts_done
																: index === 4
																? spareParts_exist_not
																: null,
															kshirot[fl],
															true
														)}
														title={index === 2 ? "חלפים" : undefined}
													/>
												)}
											</>
										);
									})}
									<UniversalInput
										{...uni("number", "תקן", "hatak")}
										header='חט"כ'
										costume={{ min: 0 }}
										IsRelevant={true}
										handleCallBack4={CallBack4}
									>
										<UniversalInput
											{...uni("number", "מצבה", "hatakmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									<UniversalInput
										{...uni("number", "תקן", "bakash")}
										IsRelevant={true}
										handleCallBack4={CallBack4}
										header='בק"ש'
										costume={{ min: 0 }}
									>
										<UniversalInput
											{...uni("number", "מצבה", "bakashmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									<IsRelevant
										handleCallBack={CallBack4}
										relevantField={{ lastrefreshdate: true }}
									>
										<DateInput
											{...date(
												"תאריך רענון אחרון (תוקף 8 שנים)",
												"lastrefreshdate",
												12,
												12
											)}
											hascomment={true}
											styleName={style.Comment}
										/>
									</IsRelevant>

									<UniversalInput
										{...uni("number", "תקן", "halfimtzelem")}
										IsRelevant={true}
										handleCallBack4={CallBack4}
										costume={{ min: 0 }}
										header='מצאי ערכות חלפים לצל"ם'
										styleName={style.Comment}
										hascomment={true}
									>
										<UniversalInput
											{...uni("number", "מצבה", "halfimtzelemmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									{dup(kshirotPackage, "matchswap", "catalogs").map(
										(fl, index) => {
											const names = ['התאמת ערכות חלפים לצל"ם', "קטלוגים"];

											{
												/* console.log(fl); */
											}

											return (
												<SelectOne
													{...selectOneFO(
														fl,
														names[index],
														false,
														spareParts_exist_not_partially,
														kshirot[fl],
														true
													)}
													IsRelevant={true}
													handleCallBack4={CallBack4}
												/>
											);
										}
									)}
								</Minimize>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Container>
								<div style={TopTitle}>ארגון ותשתיות (15%)</div>
								<Minimize relevantField={{ orgniztion: true }}>
									{dup(kshirotPackage, "maflag", "classNahotMax").map(
										(fl, index) => {
											let title = undefined;
											let header = [
												'אמצעי ניוד מלפ"ג טנ"א - משימתי (15א)',
												'1. חט"פ/חט"ס 9 (עד 4)',
												"1.כיתה קדמית (19,19א) - פיטר",
												'2. כיתת חט"כ (19ז)',
												`3.  כיתת בק"ש/חלפי אלק' נמר 19ו`,
												`1.  כתק"ל (19ב)`,
												`2. כיתת ח"ח כבד (19ה)`,
												`3. כיתת ח"ח קל (19ד)`,
												`4. כיתת הנפה (19ג) - ריאו חץ/עגור 20/מרום`,
												`5. כיתה נאו"ת (גדוד סדיר)`,
											];

											let father = dup(
												kshirotPackage,
												"maflag",
												"classNahotMax"
											).filter((item, i) => i % 2 == 0);
											let child = dup(
												kshirotPackage,
												"maflag",
												"classNahotMax"
											).filter((item, i) => i % 2 != 0);

											if (
												index ==
												dup(kshirotPackage, "maflag", "classNahotMax").length /
													2
											) {
												return father.map((ffl, i) => {
													switch (true) {
														case ffl == "maflag":
															title = "אמצעי ניוד לקרב";
															break;
														case ffl == "carhatap":
															title =
																'פלגת טנ"א גדודית - אמצעי ניוד פלוגות לוחמות';
															break;
														case ffl == "carpiter":
															title = 'מחלקת אחזקה רק"ם';
															break;
														case ffl == "katkal":
															title = 'מחלקת רכב, נאו"ת וחלפים';
															break;

														default:
															title = undefined;
															break;
													}
													return (
														<>
															<Typography
																variant="h4"
																style={h4Title}
															>
																{title}
															</Typography>
															<UniversalInput
																{...uni("number", "תקן", ffl)}
																hascomment={true}
																IsRelevant={true}
																handleCallBack4={CallBack4}
																styleName={style.Comment}
																header={header[i]}
																costume={{ min: 0 }}
															>
																<UniversalInput
																	{...uni("number", "מצבה", child[i])}
																	chained={true}
																	costume={{
																		min: 0,
																	}}
																/>
															</UniversalInput>
														</>
													);
												});
											} else {
												{
													/* console.log(index); */
												}
											}
										}
									)}
								</Minimize>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Container>
								<div style={TopTitle}>דו"ח אימון פלגת טנ"א גדודית </div>
								<Minimize relevantField={{ training: true }}>
									<UniversalInput
										{...uni("textarea", "ציין פרטים כללי", "TRdetails", 12, 12)}
									/>
									<UniversalInput
										{...uni(
											"textarea",
											"ציין את מטרות האימון",
											"TRgoals",
											12,
											12
										)}
									/>
									<ArrayAdder
										{...arrAdd(
											"פרטי הסגל המתאמן",
											"TRtraining",
											"הוסף",
											trainperson,
											trainpersonFields
										)}
										costume={(type) => {
											switch (true) {
												case type == "number":
													return { min: 0 };
													break;
												default:
													console
														.error
														// `this type: ${type} does have costume settings (just for you to know)`
														();
											}
										}}
									/>
									{dup(kshirotPackage, "TRmaflag", "TRbkiotbashob").map(
										(fl, index) => {
											const names = [
												'התייצבות מפל"ג/קט"א',
												'התייצבות קט"א/מנהל עבודה',
												"התייצבות מפקד כיתת חלפים",
												'התייצבות מפקד כיתת נאו"ת',
												"התייצבות מפקד כיתה קלה (רכב)",
												"19/19 א'",
												"19 ב'",
												"19 ד'",
												'כתיבת נספח טנ"א',
												'הכנת תלקון נוה"ק',
												'הכנת תלקון ניהו"ק',
												'הכנת עזרים (שוב"ך)',
												'הזנת פקודות טנ"א במשואה',
												'הזנת סד"כ כלים וכשירות',
												'ביצוע תדריך מפל"ג',
												'קבלת פקודת טנ"א מרמה ממונה',
												"רמת בקיאות בגזרת הלחימה",
												'רמת בקיאות בסד"כ, משימות ויכולות',
												'רמת כתיבת נספח טנ"א',
												'תיאום תוכניות הטנ"א ע"י קט"א חטיבה',
												"איכות הכנת עזרים",
												'אישור תוכניות ע"י המג"ד',
												'רמת השליטה בנתוני צל"ם לטנ"א',
												"רמת ביצוע חישובי שחיקה",
												"רמת הבקיאות במיקום כוחות שכנים",
												'רמת הבקיאות ביכולות מערך הטנ"א בגדוד, בחטיבה ובכוחות הטנ"א המרחביים',
												'שימוש במערכת השו"ב',
												'רמת הבקיאות והשליטה במערכת השו"ב',
											];
											const Top = ["מדדי סף לאימון", "נוהל הקרב"];
											const titles = {
												TRmaflag: 'התייצבות בע"ת',
												TRa: 'יציאת כלי טנ"א לתרגיל',
												TRnispach: 'ביצוע נוה"ק סדור הכולל',
												TRpkodotmasoa: 'נוה"ק ע"ג משואה',
												TRtadrich: "ביצוע תדריך לקרב",
												TRpkodotahzaka: "ביצוע הערכת מצב",
												TRramatnispach: "תהליך ביצוע נוהל קרב",
												TRzlm: "תכנון מענה אחזקתי",
												TRshimosbashob: 'צי"ד בנוה"ק - משואה',
											};

											{
												/* console.log(`${index}=> ${fl} : ${kshirot[fl]}`); */
											}

											return (
												<>
													<h4 style={h4Title}>
														{" "}
														{index == 0
															? Top[0]
															: fl == "TRpkodotahzaka"
															? Top[1]
															: null}
													</h4>
													<SelectOne
														{...selectOneFO(
															fl,
															names[index],
															false,
															arrayObjectOptions_Checker(
																spareParts_done,
																"name"
															).includes(kshirot[fl])
																? spareParts_done
																: oneToFive_Rate,
															kshirot[fl],
															false
														)}
														title={
															typeof titles[fl] == "string"
																? titles[fl]
																: undefined
														}
													/>
												</>
											);
										}
									)}
								</Minimize>
							</Container>
						</CardBody>
					</Card>
				</Col>
				<Col
					xs={12}
					md={6}
				>
					<Card>
						<CardBody>
							<Container>
								<Minimize relevantField={{ tr: true }}>
									{dup(kshirotPackage, "TRramatshlita", "TRimonhiloz").map(
										(fl, index) => {
											const names = [
												"רמת השליטה בכוחות קטנים",
												"מידת הרציפות במענה האחזקתי",
												'רמת התיאום והשליטה בתנועה ובמיקום כוחות אג"ם טנ"א',
												"רמת השליטה בתמונת המצב",
												'מידת התאמת מאמץ הטנ"א לתמונת המצב',
												"ניהול העזרים",
												"מידת קבלה ומסירה של דוחות עיתיים",
												"הפקת משמעויות מהערכת מצב מתמשכת",
												'איכות יחסי הגומלין בתוך מערכי הטנ"א',
												"איכות יחסי הגומלין עם הפלגות",
												"איכות יחסי הגומלין עם מפקדת הגדוד",
												'שימוש במערכת שו"ב בניהול הקרב',
												'רמת השימוש במערכת השו"ב במכלול המנהלה תוך כדי ניהול הקרב',
												"רמת בניית עקומת למידה",
												"רמת ביצוע סיכומי ביניים",
												"ביצוע מבחני רמה למפקדים",
												"ביצוע סיכום האימון בסיום האימון",
												"ביצוע אימון משטח חילוץ",
											];
											const titles = {
												TRramatshlita: "מענה אחזקתי לרציפות הלחימה",
												TRshlitabmazav: 'בניית תמ"צ וביצוע הערכת מצב מתמשכת',
												TRehot: "יחסי גומלין",
												TRshimosbashob2: 'צי"ד בניהו"ק - משואה',
												TRlamida: "למידה והפקת לקחים",
											};

											const Top = ["ניהול הקרב", "סיכום"];
											return (
												<>
													<h4 style={h4Title}>
														{" "}
														{index == 0
															? Top[0]
															: fl == "TRlamida"
															? Top[1]
															: null}
													</h4>
													<SelectOne
														{...selectOneFO(
															fl,
															names[index],
															false,
															arrayObjectOptions_Checker(
																spareParts_done,
																"name"
															).includes(kshirot[fl])
																? spareParts_done
																: oneToFive_Rate,
															kshirot[fl],
															false
														)}
														title={
															typeof titles[fl] == "string"
																? titles[fl]
																: undefined
														}
													/>
												</>
											);
										}
									)}
									{dup(kshirotPackage, "TRlkhaimtene", "TRsicomhmitaman").map(
										(fl, index) => {
											const names = [
												'לקחים לתורה, טנ"ה ואופרטיבי',
												'לקחים לאמצעים ואמל"ח',
												"לקחים לכוח אדם",
												"לקחים לאימונים והכשרות",
												"לקחים לארגון ותקינה",
												"נקודות לשיפור",
												"נקודות לשימור",
												'סיכום חונך טנ"א',
												"סיכום המתאמן",
											];
											const headers = {
												TRlkhaimtene: 'לקחים ע"פ מרכיבי בניין הכוח',
												TRshipor: "נקודות לשימור ושיפור",
												TRsicomhonach: "סיכום",
											};
											return (
												<UniversalInput
													{...uni("textarea", names[index], fl, 12, 12)}
													header={
														typeof headers[fl] == "string"
															? headers[fl]
															: undefined
													}
												/>
											);
										}
									)}
									<UniversalInput
										{...uni("text", "שם מלא", "TRnamehonach", 12, 4)}
										header="פרטי החונך"
									>
										<UniversalInput
											{...uni("text", "תפקיד", "TRtafkidhonach", 12, 4)}
											chained={true}
										/>
										<UniversalInput
											{...uni("text", "מאשר", "TRmasherhonach", 12, 4)}
											chained={true}
										/>
									</UniversalInput>
								</Minimize>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Container>
								<div style={TopTitle}>אופרטיבי (20%)</div>
								<Minimize relevantField={{ opertive: true }}>
									<h4 style={h4Title}>שבצ"ק</h4>
									<UniversalInput
										{...uni("number", "תקן", "shiboz")}
										header="התאמת שיבוץ קרבי"
										costume={{ min: 0 }}
										IsRelevant={true}
										handleCallBack4={CallBack4}
									>
										<UniversalInput
											{...uni("number", "מצבה", "shibozmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									<UniversalInput
										{...uni("number", "תקן", "drivers")}
										header="נהגים לכל פלטפורמת ניוד"
										costume={{ min: 0 }}
										IsRelevant={true}
										handleCallBack4={CallBack4}
									>
										<UniversalInput
											{...uni("number", "מצבה", "driversmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									{dup(kshirotPackage, "pkodotopara", "mefakedAPP_pkpCp").map(
										(fl, index) => {
											{
												/* console.log(fl); */
											}
											let names = [
												"המצאות פקודות",
												"תיאום רמת ממונה",
												"אישור מפקד",
												"המצאות פקודות ונספחים",
												"תיאום רמת ממונה",
												"אישור מפקד",
												"המצאות פקודות",
												"תיאום רמת ממונה",
												"אישור מפקד",
											];
											let header = undefined;
											let title = "";

											switch (index) {
												case 0:
													title = "פקודת מבצע";
													break;
												case 3:
													title = "נספחי אחזקה לפקודות אופרטביות";
													break;
												case 6:
													title = 'פקל"י אחזקה משלימים';
													break;

												default:
													title = "";
											}
											return (
												<SelectOne
													{...selectOneFO(
														fl,
														names[index],
														false,
														spareParts_exist_not,
														kshirot[fl],
														true
													)}
													title={title}
													hascomment={true}
												/>
											);
										}
									)}
									<h4
										style={{
											textAlign: "center",
											paddingTop: "10px",
											fontWeight: "bold",
											marginBottom: "5px",
											marginTop: "10px",
											// textDecoration: "underline",
										}}
									>
										מערכות שו"ב ממוחשבות{" "}
									</h4>
									<UniversalInput
										{...uni("number", "תקן", "tkinot")}
										header='מצאי עמדות שו"ב תקינות'
										costume={{ min: 0 }}
										IsRelevant={true}
										handleCallBack4={CallBack4}
									>
										<UniversalInput
											{...uni("number", "מצבה", "tkinotmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									<SelectOne
										{...selectOneFO(
											"tikim",
											"הזנת תיק נתוני יחידות פקודות ומפות במשואה",
											false,
											spareParts_done,
											kshirot.tikim,
											true
										)}
									/>
									<UniversalInput
										{...uni("number", "תקן", "roleholders")}
										header="בעלי תפקידים מוכשרים"
										costume={{ min: 0 }}
										IsRelevant={true}
										handleCallBack4={CallBack4}
									>
										<UniversalInput
											{...uni("number", "מצבה", "roleholdersmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									<SelectOne
										{...selectOneFO(
											"boxcontent",
											'תכולת ארגזי חירום ע"פ טנ"ה 1',
											false,
											spareParts_exist_not_partially,
											kshirot.boxcontent,
											true
										)}
										title='דחווח שליטה ארגז מפל"ג טנ"א'
										IsRelevant={true}
										handleCallBack4={CallBack4}
									/>
								</Minimize>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody>
							<Container>
								<div style={TopTitle}>אימונים והכשרות (15%)</div>
								<Minimize relevantField={{ training: true }}>
									<DateInput
										{...date(
											'אימון פלגת טנ"א- כמות (תאריך ביצוע אחרון)',
											"trainingamount",
											12,
											12
										)}
										disableheader={false}
										header="אימוני מסגרת - פלגת טנא אימון טקטי"
										hascomment={true}
									/>
									<UniversalInput
										{...uni(
											"number",
											'אימון פלגת טנ"א - איכות (ציון בין 0-100)',
											"trainingquality",
											12,
											12
										)}
										hascomment={true}
										costume={{ min: 0, max: 100 }}
									/>
									<SelectOne
										{...selectOneFO(
											"trainSycle",
											"עמידה במחזוריות האימונים",
											false,
											spareParts_done,
											kshirot.trainSycle,
											true
										)}
									/>
									<SelectOne
										{...selectOneFO(
											"battaliondrillamount",
											"תרגיל גדוד בשנה האחרונה",
											false,
											spareParts_done,
											kshirot.battaliondrillamount,
											true
										)}
										title="תרגילים"
									/>
									<UniversalInput
										{...uni(
											"number",
											"תרגיל גדוד - איכות (ציון בין 0-100)",
											"battaliondrillquality",
											12,
											12
										)}
										hascomment={true}
										costume={{ min: 0, max: 100 }}
									/>
									{dup(kshirotPackage, "kors", "amounthanafamax").map(
										(fl, index) => {
											const headers = [
												'כמות מחט"פים שעברו קורס מחט"פים',
												"כמות מעוכבי שלב ביחידה",
												"תעודת בוחן",
												"כמות מוסמכי מחלץ",
												"כמות מוסמכי הנפה",
											];

											let father = dup(
												kshirotPackage,
												"kors",
												"amounthanafamax"
											).filter((item, i) => i % 2 == 0);
											let child = dup(
												kshirotPackage,
												"kors",
												"amounthanafamax"
											).filter((item, i) => i % 2 != 0);

											if (
												index ==
												dup(kshirotPackage, "kors", "amounthanafamax").length /
													2
											) {
												return father.map((ffl, i) => {
													return (
														<>
															<h4 style={h4Title}></h4>
															{i == 1 ? (
																<UniversalInput
																	{...uni("number", "כמות", ffl)}
																	hascomment={true}
																	IsRelevant={true}
																	handleCallBack4={CallBack4}
																	styleName={style.Comment}
																	header={headers[i]}
																	costume={{ min: 0 }}
																>
																	<UniversalInput
																		{...uni("number", "%אחוז", child[i])}
																		chained={true}
																		costume={{
																			min: 0,
																			max: 100,
																		}}
																		id="precentage"
																	/>
																</UniversalInput>
															) : (
																<UniversalInput
																	{...uni("number", "תקן", ffl)}
																	hascomment={true}
																	IsRelevant={true}
																	handleCallBack4={CallBack4}
																	styleName={style.Comment}
																	header={headers[i]}
																	costume={
																		i == 3
																			? { min: 3 }
																			: i == 4
																			? { min: 2 }
																			: { min: 0 }
																	}
																>
																	<UniversalInput
																		{...uni("number", "מצבה", child[i])}
																		chained={true}
																		costume={{
																			min: 0,
																		}}
																	/>
																</UniversalInput>
															)}
														</>
													);
												});
											} else {
												{
													/* console.log(index); */
												}
											}
										}
									)}
								</Minimize>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody style={{ height: "420px" }}>
							<Container>
								<div style={TopTitle}>סיכום (10%)</div>
								<UniversalInput
									{...uni(
										"number",
										"חוסן מנטאלי (ציון בין 1-5)",
										"mentality",
										12,
										12
									)}
									costume={{ min: 0, max: 5 }}
									header="רוח היחידה"
								/>
								<div style={TopTitle}>כיתות טנ"א </div>
								<IsRelevant
									handleCallBack={CallBack4}
									relevantField={{ sumClass: true }}
								>
									<Row
										style={{
											position: "absolute",
											marginTop: "5.5rem",
											marginLeft: "1rem",
										}}
									>
										<UniversalInput
											{...uni("number", 'סה"כ כיתות', "sumClass", 12, 4)}
											costume={{ min: 0 }}
										>
											<UniversalInput
												{...uni(
													"number",
													'סה"כ כיתות כשירות',
													"sumClassKashir",
													12,
													4
												)}
												chained={true}
												costume={{ min: 0 }}
											/>
											<UniversalInput
												{...uni(
													"number",
													'סה"כ כיתות לא כשירות',
													"sumClassNotKashir",
													12,
													4
												)}
												chained={true}
												costume={{ min: 0 }}
											/>
										</UniversalInput>
									</Row>
								</IsRelevant>
							</Container>
						</CardBody>
					</Card>

					<Card>
						<CardBody>
							<Container>
								<div style={TopTitle}>דיווח כשירות </div>
								<div style={{ textAlign: "center" }}>
									<Button
										onClick={send}
										className="btn btn-success btn-lg mt-4"
									>
										שליחה
									</Button>
								</div>
							</Container>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
export default withRouter(KshirotPage);

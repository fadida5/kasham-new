/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";

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
} from "reactstrap";
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
import style from "../kshirot/kshirotPage.module.css";
import IsRelevant from "components/general/CollapseComponents/IsRelevant/IsRelevant";
import Minimize from "components/general/CollapseComponents/Minimize/Minimize";

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

	//* fields ----------------------------------------------------------------
	const tafkid = {
		id: "",
		name: "",
		teken: 0,
		matzva: 0,
		active: false,
	};
	const tafkidFields = [
		{ name: "מפקד", type: "text" },
		{ name: "תקן", type: "number" },
		{ name: "מצבה", type: "number" },
		{ name: "פעיל", type: "select" },
	];
	const job = {
		id: "",
		numbermikzoa: "",
		name: "",
		teken: 0,
		matzva: 0,
		active: false,
		tafkiddetails: "",
		professionalLevel: 0,
	};
	const jobFields = [
		{ name: "מספר מקצוע", type: "select" },
		{ name: "שם מקצוע", type: "select" },
		{ name: "תקן", type: "number" },
		{ name: "מצבה", type: "number" },
		{ name: "פעיל", type: "select" },
		{ name: "סוג", type: "select" },
		{ name: "רמת מקצועיות", type: "number" },
	];
	const jobFields_options = [
		{ name: "חובה", value: "חובה" },
		{ name: "ראשוני", value: "ראשוני" },
		{ name: "מובהק", value: "מובהק" },
		{ name: "מילואים", value: "מילואים" },
	];
	const jobnName_options = [
		{ name: "מכונאי", value: 1 },
		{ name: "חשמלאי", value: 0 },
	];
	const jobNumber_options = [
		{ name: "1", value: 1 },
		{ name: "0", value: 0 },
	];
	const Operative_options = [
		{ name: "כן", value: true },
		{ name: "לא", value: false },
	];
	//* supply options for spare parts
	const spareParts_exist_not = [
		{ name: "קיים", value: "קיים" },
		{ name: "לא קיים", value: "לא קיים" },
	];
	const spareParts_done = [
		{ name: "בוצע", value: "בוצע" },
		{ name: "לא בוצע", value: "לא בוצע" },
	];
	const spareParts_exist_not_partially = [
		{ name: "קיים", value: "קיים" },
		{ name: "חלקי", value: "חלקי" },
		{ name: "לא קיים", value: "לא קיים" },
	];
	//* pakage info
	const info = [];
	//* specialkeys searched values
	const searchedVals = ["teken", "matzva"];

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
		};
	};

	//* selectOne free options

	const selectOneFO = (name, header, hasNull, freeOptions, val, hascomment) => {
		return {
			name: name,
			header: header,
			hasNull: hasNull,
			FreeOptions: freeOptions,
			value: val ? val : undefined,
			handleCallBack: callBack,
			handleCallBack3: CallBack3,
			hascomment: hascomment,
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
		// console.log(inputData2);
		kshirot[arrName] = inputData2;
		ArrayCalcDIff(inputData2, arrName);
	}
	//* geting details as an object {name : value, name : value } (name = inputName + detail)
	function CallBack3(inputData3) {
		console.log(inputData3);
		console.log(details);
		setDetails({ ...details, [inputData3.name]: inputData3.value });
		setKshirot({ ...kshirot, details: details });
	}
	//* geting Relevant as an object {name : value, name : value } (name = cardname)
	function CallBack4(inputData4) {
		console.log(inputData4);
		console.log(isRelevant);
		setIsRelevant({ ...isRelevant, [inputData4.label]: inputData4.value });
		setKshirot({ ...kshirot, IsRelevant: isRelevant });
	}

	//* helper functions --------------------------------
	//* calc from array to val in kshirot
	function ArrayCalcDIff(arr, name) {
		let tempActive = [];
		let temp = [];
		// console.log(arr);
		searchedVals.map((fl) => {
			// console.log(fl);
			tempActive.push(
				arr.reduce(
					//todo: fix cv.avtive to something that will check if all active and not just the last one
					(acc, cv) => (cv.active ? Number(acc) + Number(cv[fl]) : null),
					0
				)
			);
			temp.push(
				arr.reduce(
					//todo: fix cv.avtive to something that will check if all active and not just the last one
					(acc, cv) => Number(acc) + Number(cv[fl]),
					0
				)
			);
			if (name === "specialkeytwo") {
				setKshirot({
					...kshirot,
					kzinim: tempActive[0],
					kzinimmax: tempActive[1],
					kzinimActivemax: temp[1],
				});
				// console.log(`the cal of ${fl} is ${temp[index]}`);
			}
			if (name === "specialkey") {
				setKshirot({
					...kshirot,
					officers: tempActive[0],
					officersmax: tempActive[1],
					officersActivemax: temp[1],
				});
				// console.log(`the cal of ${fl} is ${temp[index]}`);
			}
		});
	}
	//* dupliction function by indexof
	const dup = (Package, start, end) =>
		Object.keys(Package).slice(
			Object.keys(Package).indexOf(start),
			Object.keys(Package).indexOf(end) + 1
		);

	//* useEffects ----------------------------------------------------------------
	//* work-plan + basic workflow (should be minimized)
	useEffect(() => {
		let k = Object.keys(kshirotPackage);
		let v = Object.values(kshirotPackage);
		k.map((i, index) => {
			let input = "";
			if (typeof v[index] != "object") {
				input = "UniversalInput";
			} else {
				input = "ArrayAdder";
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
		// console.log(k.indexOf("specialkey"));
		// console.log(k.length);
	}, []);

	return (
		//TODO -
		/*//todo: 1) make each card its own component while this page will use the kshirot state (might move to usecontext).
		//todo:	  2) check if all the card need to be relevent from the start if not use lazy loading (just for performance/fun ;) )
		//todo:   3) make the fields in a different folder and import them, to prevent repeations 	
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
					<Card>
						<CardBody className={style.CardBody}>
							<Container>
								<UniversalInput
									{...uni("text", "שם המפקד", "commandername")}
									textLoc="center"
								>
									<DateInput
										{...date("date", "תאריך תחילת תפקיד")}
										smSize={12}
										mdSize={6}
										chained={true}
										textLoc="center"
									/>
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
								<div
									style={{
										fontSize: "22px",
										textAlign: "center",
										paddingTop: "10px",
										fontWeight: "bold",
									}}
								>
									כוח אדם
								</div>
								<Minimize
									relevantField={{ HR: true }}
									handleCallBack={CallBack4}
								>
									{/*//! {gdod.sadir == true ? null : ()} */}
									<UniversalInput
										{...uni("number", "סימון מקצוע", "experts")}
										costume={{ min: 0 }}
										header={"גרעין מומחים"}
									>
										<UniversalInput
											{...uni("number", "מצבה", "expertsmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>

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
										hascomment={true}
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
								</Minimize>
							</Container>
						</CardBody>
					</Card>
					<Card>
						<CardBody className={style.CardBody}>
							<Container>
								<div
									style={{
										fontSize: "22px",
										textAlign: "center",
										paddingTop: "10px",
										fontWeight: "bold",
									}}
								>
									מלאי
								</div>
								<Minimize
									relevantField={{ Supply: true }}
									handleCallBack={CallBack4}
								>
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
									{dup(kshirotPackage, "lift", "hatak").map((fl, index) => {
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
											<>
												{index > 2 ? (
													<IsRelevant
														relevantField={{ [fl]: true }}
														handleCallBack={CallBack4}
													>
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
													</IsRelevant>
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
										{...uni("number", "תקן", "bakash")}
										header='בק"ש'
										costume={{ min: 0 }}
									>
										<UniversalInput
											{...uni("number", "מצבה", "bakashmax")}
											chained={true}
											costume={{ min: 0 }}
										/>
									</UniversalInput>
									<DateInput
										{...date(
											"תאריך רענון אחרון (תוקף 8 שנים)",
											"lastrefreshdate",
											12,
											12
										)}
										hascomment={true}
									/>
									{dup(kshirotPackage, "matchmahin", "catalogs").map(
										(fl, index) => {
											const names = [
												'התאמת חלפים לצל"ם-רישום מכין',
												'התאמת ערכות חלפים לצל"ם',
												"קטלוגים",
											];

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
												/>
											);
										}
									)}
								</Minimize>
							</Container>
						</CardBody>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}
export default withRouter(KshirotPage);

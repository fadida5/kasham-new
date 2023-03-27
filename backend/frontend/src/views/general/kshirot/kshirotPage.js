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

function KshirotPage(props) {
	//* user
	const { user } = isAuthenticated();
	//* states ----------------------------------------------------------------
	//* main data
	const [kshirot, setKshirot] = useState(kshirotPackage);
	//* details field
	const [details, setDetails] = useState([]);

	//* fields ----------------------------------------------------------------
	const tafkid = {
		id: "",
		name: "",
		teken: 0,
		matzva: 0,
	};
	const tafkidFields = [
		{ name: "מפקד", type: "text" },
		{ name: "תקן", type: "number" },
		{ name: "מצבה", type: "number" },
	];
	const job = {
		id: "",
		numbermikzoa: 0,
		name: "",
		teken: 0,
		matzva: 0,
		tafkiddetails: "",
	};
	const jobFields = [
		{ name: "מספר מקצוע", type: "number" },
		{ name: "שם מקצוע", type: "string" },
		{ name: "תקן", type: "number" },
		{ name: "מצבה", type: "number" },
		{ name: "הערות", type: "select" },
	];
	const jobFields_options = [
		{ name: "חובה", value: "חובה" },
		{ name: "ראשוני", value: "ראשוני" },
		{ name: "מובהק", value: "מובהק" },
		{ name: "מילואים", value: "מילואים" },
	];
	//* supply options for spare parts
	const spareParts_exist_not = [{name: "קיים", value: "קיים"},{name: "לא קיים", value: "לא קיים"} ]
	const spareParts_done = [{name: "בוצע", value: "בוצע"},{name: "לא בוצע", value: "לא בוצע"} ]
	const spareParts_exist_not_partially  = [{name: "קיים", value: "קיים"},{name:"חלקי",value:"חלקי"},{name: "לא קיים", value: "לא קיים"} ]
	//* pakage info
	const info = [];

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
	const date = (footer, name) => {
		return {
			footer: footer,
			name: name,
			handleCallBack: callBack,
			disableheader: true,
		};
	};

	//* ArrayAdder

	const arrAdd = (name, arrName, Bname, field, inputArray) => {
		return {
			name: name,
			arrName: arrName,
			buttonName: Bname,
			handleCallBack2: callBack2,
			field: { ...field },
			inputArray: inputArray,
		};
	};

	//* selectOne free options

	const selectOneFO = (name,hasNull,freeOptions,val,callBack) => {
		return {
			name: name,
			hasNull: hasNull,
			FreeOptions: freeOptions,
			value: val? val : undefined ,
			handleCallBack: callBack
		}
	}

	//* specialkeys searched values
	const searchedVals = ["teken", "matzva"];

	//* regular output {key : value}
	function callBack(inputData) {
		setKshirot({ ...kshirot, [inputData.label]: inputData.value });
		console.log(inputData);
		console.log(kshirot);
		// console.table(tipuldata);
	}
	//* array output [{key : val, key2 : val2, ...}, ...]
	function callBack2(inputData2, arrName) {
		console.log(arrName);
		// console.log(inputData2);
		kshirot[arrName] = inputData2;
		ArrayCalcDIff(inputData2, arrName);
	}
	//* geting details as an object {name : value, name : value } (name = inputName + detail) --------------------------------
	function CallBack3(inputData3) {
		console.log(inputData3);
		console.log(details);
		setDetails({ ...details, [inputData3.name]: inputData3.value });
		setKshirot({ ...kshirot, details: details });
	}
	//* calc from array to val in kshirot
	function ArrayCalcDIff(arr, name) {
		let temp = [];
		searchedVals.map((fl, index) => {
			temp.push(arr.reduce((acc, cv) => Number(acc) + Number(cv[fl]), 0));
			if (name === "specialkeytwo") {
				setKshirot({ ...kshirot, kzinim: temp[0], kzinimmax: temp[1] });
				// console.log(`the cal of ${fl} is ${temp[index]}`);
			}
			if (name === "specialkey") {
				setKshirot({ ...kshirot, officers: temp[0], officersmax: temp[1] });
				// console.log(`the cal of ${fl} is ${temp[index]}`);
			}
		});
	}

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
								{/*//! {gdod.sadir == true ? null : ()} */}
								<UniversalInput
									{...uni("number", "סימון מקצוע", "experts")}
									costume={{ min: 0 }}
									header = {"גרעין מומחים"}
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
										tafkidFields
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
									{...uni("number", "תקינה", "kzinim")}
									header='סה"כ בעלי תפקיד'
									isDisabeld={true}
									value={kshirot.kzinim}
									hascomment={true}
								>
									<UniversalInput
										{...uni("number", "מצבה", "kzinimmax")}
										chained={true}
										costume={{ min: 0 }}
										isDisabeld={true}
										value={kshirot.kzinimmax}
									/>
								</UniversalInput>
								<ArrayAdder
									{...arrAdd(
										undefined,
										"specialkey",
										"הוסף בעל מקצוע",
										job,
										jobFields
									)}
									freeOptions={jobFields_options}
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
									{...uni("number", "תקינה", "officers")}
									header='סה"כ בעלי מקצוע'
									isDisabeld={true}
									value={kshirot.officers}
									hascomment={true}
								>
									<UniversalInput
										{...uni("number", "מצבה", "officersmax")}
										chained={true}
										costume={{ min: 0 }}
										isDisabeld={true}
										value={kshirot.officersmax}
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
									מלאי
								</div>
								<UniversalInput {...uni("number","תקן","teken")} 
								header= {"אמצעי אחזקה"} 										
								costume={{ min: 0 }}
								hascomment = {true}
								>
								<UniversalInput {...uni("number","מצבה","tekenmax")} 
								chained = {true} 
								costume={{ min: 0 }}/>
								</UniversalInput>
								<UniversalInput {...uni("number","תקן","toolsbox")} 
								header= {"ארגז כלים לכל בעל מקצוע"} 										
								costume={{ min: 0 }}
								hascomment = {true}
								>
								<UniversalInput {...uni("number","מצבה","toolsboxmax")} 
								chained = {true} 
								costume={{ min: 0 }}/>
								</UniversalInput>
								<SelectOne {...selectOneFO("match",false,spareParts_exist_not,kshirot.match,callBack)} header = 'התאמת כ"ע לסוג הצל"ם'/>
								</Container>
								</CardBody>
								</Card>
				</Col>
			</Row>
		</Container>
	);
}
export default withRouter(KshirotPage);

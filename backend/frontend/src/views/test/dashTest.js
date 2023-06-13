import React, { useState, useEffect, useRef } from "react";

import { useParams, Link, withRouter, Redirect } from "react-router-dom";
import { generate } from "shortid";

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
import {
	Grid,
	Input,
	Select,
	InputLabel,
	MenuItem,
	FormControl,
	TextField,
	FormControlLabel,
} from "@mui/material";

function DashboardTest({ match, theme }) {
	//user
	const { user } = isAuthenticated();
	//spinner
	const [isdataloaded, setIsdataloaded] = useState(true);
	//redux
	const dispatch = useDispatch();
	const reduxcardata = useSelector((state) => state.cardata.value);

	//* state ----------------------------------------------

	const [tipuldata, setTipulData] = useState(kshirotPackage);
	const [details, setDetails] = useState([]);
	const [pikods, setPikods] = useState([]);
	const [options, setOptions] = useState([]);

	//* consts --------------------------------

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
	} = require("../../assets/fixedData/fields");
	//* redux

	const getReduxCardDataByUnitTypeAndUnitId = async () => {
		if (reduxcardata.length == 0) {
			await dispatch(getCarDataFunc(user));
		}
	};

	//* fields --------------------------------

	//* functions -----------------------------------------------

	//* regular output {key : value}
	function callBack(inputData) {
		setTipulData({ ...tipuldata, [inputData.label]: inputData.value });
		console.log(inputData);
		console.log(tipuldata);
		// console.table(tipuldata);
	}
	//* array output [{key : val, key2 : val2, ...}, ...]
	function callBack2(inputData2) {
		// setChildData(chiData);
		// console.log(inputData2);
		tipuldata.specialkeytwo = inputData2;
	}
	//* geting details as an object {name : value, name : value } (name = inputName + detail) --------------------------------
	function CallBack3(inputData3) {
		// console.log(inputData3);
		// console.log(details);
		setDetails({ ...details, [inputData3.name]: inputData3.value });
		setTipulData({ ...tipuldata, details: details });
	}
	const a = ["P04", "P06"];

	const load = async () => {
		await axios
			.get(
				`http://localhost:8000/kshirot/gradebypikodid/${pikods.map(
					(pk) => pk._id
				)}`
			)
			.then((res) => {
				console.log(res.data);
			});
	};

	const loadPikods = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				setPikods(response.data);
				// console.log(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	async function init() {
		setIsdataloaded(true);
	}

	useEffect(() => {
		if (reduxcardata.length > 0) {
			init();
		}
	}, [match]);

	useEffect(() => {
		if (reduxcardata.length > 0 && isdataloaded == false) {
			init();
		}
	}, [reduxcardata]);

	useEffect(() => {
		getReduxCardDataByUnitTypeAndUnitId();
	}, []);

	useEffect(() => {
		setPikods([]);
		loadPikods();
		load();
	}, []);

	const handleChange = (event) => {
		console.log(event.target.name);
		console.log(event.target.value);
		setTipulData({ ...tipuldata, age: event.target.value });
		console.log(tipuldata);
	};
	const hasNull = true;

	function freeOptions(arr) {
		const temp = [];
		if (hasNull) {
			if (arr.length != 0) {
				temp.push({ value: "בחר", label: "בחר" });
			} else {
				alert("unit is empty");
			}
		}
		arr.map((item, index) => {
			let val = item.value;
			let lab = item.name;
			temp.push({ value: val, label: lab });
		});
		if (hasNull ? temp.length === arr.length + 1 : temp.length === arr.length) {
			setOptions(temp);
		} else {
			console.log(temp.length);
			console.log(arr.length);
			alert("something went wrong");
		}
	}

	useEffect(() => {
		freeOptions(spareParts_done);
		// console.log(options);
	}, []);

	return !isdataloaded ? (
		<div style={{ width: "50%", marginTop: "30%" }}>
			<PropagateLoader color={"#ff4650"} loading={true} size={25} />
		</div>
	) : (
		<div>
			<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
				<Grid item md={6}>
					<Input />
				</Grid>
				<Grid item>
					<Input md={6} />
				</Grid>
				<Grid item md={6}>
					<Input />
				</Grid>
				<Grid item>
					<FormControl dir="rtl">
						<TextField
							name="name"
							value={tipuldata.name}
							variant="standard"
							type="Text"
							helperText="aaaa"
						/>
					</FormControl>
				</Grid>
			</Grid>
			<FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
				<InputLabel id="header">Age</InputLabel>
				<Select
					name="age"
					labelId="header" // value={tipuldata.age}
					label="Age"
					value={tipuldata.age}
					onChange={handleChange}
				>
					{options.map((lab, index) => {
						return (
							<MenuItem value={options[index].value}>
								{options[index].label}
							</MenuItem>
						);
					})}

					{/* <MenuItem value="">
						<em>None</em>
					</MenuItem>
					<MenuItem value={10}>Ten</MenuItem>
					<MenuItem value={20}>Twenty</MenuItem>
					<MenuItem value={30}>Thirty</MenuItem> */}
				</Select>
			</FormControl>
			{/* <FormControlLabel
				label="a"
				control={<Input />}
			/> */}
			<div style={{ textAlign: "right" }}>
				<InputLabel id="label">aaa</InputLabel>
				<TextField />
			</div>
		</div>
	);
}

export default withRouter(DashboardTest);

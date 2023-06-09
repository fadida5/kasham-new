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

	//* consts --------------------------------

	//* redux

	const getReduxCardDataByUnitTypeAndUnitId = async () => {
		if (reduxcardata.length == 0) {
			await dispatch(getCarDataFunc(user));
		}
	};

	//* fields --------------------------------
	const job = {
		id: "",
		name: "",
		teken: "",
		matzva: "",
		select: "",
	};

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
		console.log(inputData2);
		tipuldata.specialkeytwo = inputData2;
	}
	//* geting details as an object {name : value, name : value } (name = inputName + detail) --------------------------------
	function CallBack3(inputData3) {
		console.log(inputData3);
		console.log(details);
		setDetails({ ...details, [inputData3.name]: inputData3.value });
		setTipulData({ ...tipuldata, details: details });
	}

	const loadPikods = async () => {
		await axios
			.get("http://localhost:8000/api/pikod")
			.then((response) => {
				setPikods(response.data);
				console.log(response.data);
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
	}, []);

	return !isdataloaded ? (
		<div style={{ width: "50%", marginTop: "30%" }}>
			<PropagateLoader
				color={"#ff4650"}
				loading={true}
				size={25}
			/>
		</div>
	) : (
		<div>
			<Row>
				<Col
					xs={12}
					md={3}
					style={{ textAlign: "right" }}
				>
					<ArrayAdder
						name="בעלי תפקיד(קצינים,מנהלי עבודה,מחטפים)"
						buttonName="הוסף בעל תפקיד"
						handleCallBack2={callBack2}
						field={{ ...job }}
						inputArray={[
							{ name: "מפקד", type: "text" },
							{ name: "בדיקה", type: "text" },
							{ name: "IAL", type: "text" },
							{ name: "list", type: "select" },
						]}
						freeOptions={[
							{ name: "קיים", value: "קיים" },
							{ name: "לא קיים", value: "לא קיים" },
						]}
					/>

					<UniversalInput
						type="text"
						header="מפקד"
						footer="שם המפקד"
						name="commandername"
						handleCallBack={callBack}
						handleCallBack3={CallBack3}
						// hascomment={true}
						// chained={true}
					>
						{" "}
						<UniversalInput
							disableheader={true}
							type="text"
							header="מפקד"
							footer="שם המפקד"
							name="commandername"
							handleCallBack={callBack}
							handleCallBack3={CallBack3}
							// hascomment={true}
							chained={true}
						/>
					</UniversalInput>

					<DateInput
						header="תאריך"
						footer="תאריך תחילת תפקיד"
						name="timeinrole"
						handleCallBack={callBack}
						disableheader={true}
					/>

					<SelectOne
						name="load"
						hasNull={true}
						FreeOptions={[
							{ name: "קיים", value: "קיים" },
							{ name: "לא קיים", value: "לא קיים" },
						]}
						value={tipuldata.load ? tipuldata.load : undefined}
						handleCallBack={callBack}
					/>
					{/* {Array.isArray(pikods) ? (
						<SelectOne
							name="a"
							hasNull={true}
							unit={pikods}
							// value={tipuldata.pikod ? tipuldata.pikod : undefined}
							handleCallBack={callBack}
						/>
					) : null} */}
				</Col>
				<Col
					xs={12}
					md={6}
				></Col>
				<Col
					xs={12}
					md={3}
				></Col>
				<UniversalInput
					type="text"
					header="יחידה"
					footer="שם היחידה"
					name="unit"
					handleCallBack={callBack}
					handleCallBack3={CallBack3}
					disableheader={true}
					hascomment={true}
				/>
			</Row>
		</div>
	);
}

export default withRouter(DashboardTest);

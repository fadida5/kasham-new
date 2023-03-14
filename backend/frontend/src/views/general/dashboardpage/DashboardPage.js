import React, { useState, useEffect, useRef } from "react";

import { useParams, Link, withRouter, Redirect } from "react-router-dom";

//* tipul packages
import { tipulPackage } from "components/packages/tipul";

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
import { TextInput } from "components/general/inputs/TextInput";
import { DateInput } from "components/general/inputs/DateInput";
import { DoubleNumInputArryaAdder } from "components/general/inputs/DoubleNumInput-arryadder";

//redux
import { useSelector, useDispatch } from "react-redux";
import { getCarDataFunc } from "redux/features/cardata/cardataSlice";

function DashboardPage({ match, theme }) {
	//user
	const { user } = isAuthenticated();
	//spinner
	const [isdataloaded, setIsdataloaded] = useState(true);
	//redux
	const dispatch = useDispatch();
	const reduxcardata = useSelector((state) => state.cardata.value);

	const [tipuldata, setTipulData] = useState(tipulPackage);

	function callBack(inputData) {
		// setChildData(chiData);
		setTipulData({ ...tipuldata, [inputData.label]: inputData.value });
		console.log(inputData);
		console.log(tipuldata);
		console.table(tipuldata);
	}

	function callBack2(inputData2) {
		// setChildData(chiData);
		console.log(inputData2);
		tipuldata.specialkeytwo = inputData2;
	}

	async function init() {
		setIsdataloaded(true);
	}

	const getReduxCardDataByUnitTypeAndUnitId = async () => {
		if (reduxcardata.length == 0) {
			await dispatch(getCarDataFunc(user));
		}
	};

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
					<DoubleNumInputArryaAdder
						name1="experts"
						name2="expertsmax"
						handleCallBack={callBack}
						handleCallBack2={callBack2}
					/>
					<TextInput
						header="מפקד"
						footer="שם המפקד"
						name="commandername"
						handleCallBack={callBack}
					/>
					<DateInput
						header="תאריך"
						footer="											תאריך תחילת תפקיד
"
						name="timeinrole"
						handleCallBack={callBack}
						disableheader={true}
					/>
				</Col>
				<Col
					xs={12}
					md={6}
				></Col>
				<Col
					xs={12}
					md={3}
				></Col>
				<TextInput
					header="יחידה"
					footer="שם היחידה"
					name="unit"
					handleCallBack={callBack}
					disableheader={true}
				/>
				<TextInput
					header="יחידה"
					footer="שם היחידה"
					name="unit"
					handleCallBack={callBack}
					disableheader={true}
				/>
				<TextInput
					header="יחידה"
					footer="שם היחידה"
					name="unit"
					handleCallBack={callBack}
					disableheader={true}
				/>
			</Row>
		</div>
	);
}

export default withRouter(DashboardPage);

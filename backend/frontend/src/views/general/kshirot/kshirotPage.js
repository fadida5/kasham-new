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
	const job = {
		id: "",
		numbermikzoa: 0,
		name: "",
		teken: 0,
		matzva: 0,
		tafkiddetails: "",
	};

	//* regular output {key : value}
	function callBack(inputData) {
		setKshirot({ ...kshirot, [inputData.label]: inputData.value });
		console.log(inputData);
		console.log(kshirot);
		// console.table(tipuldata);
	}
	//* array output [{key : val, key2 : val2, ...}, ...]
	function callBack2(inputData2) {
		// setChildData(chiData);
		console.log(inputData2);
		kshirot.specialkeytwo = inputData2;
	}
	//* geting details as an object {name : value, name : value } (name = inputName + detail) --------------------------------
	function CallBack3(inputData3) {
		console.log(inputData3);
		console.log(details);
		setDetails({ ...details, [inputData3.name]: inputData3.value });
		setKshirot({ ...kshirot, details: details });
	}

	//* useEffects ----------------------------------------------------------------
	//* work-plan + basic workflow (should be minimized)
	useEffect(() => {
		let len = Object.keys(kshirotPackage);
		console.table(kshirotPackage);
		/*//?  kshirot package break down by index:
        0 : string - universalinput - name - commandername	
        1 (date) : string - dateinput - name - timeinrole
        2 - 4 : string - universalinput - name - unit,name
        5 : number - universalinput - name - phone
        //! details (add addComment to all inside =>{}) {
            //? couples share the same detail block in the name of the first one. if different will be added * before the couple so both will have details
        //* כוח אדם
        6 - 7  : number  - universalinput  - name - experts,expertsmax
        8 - 9 + 71 (71 before  8 - 9) : number + Array - universalinput + ArrayAdder - name - kzinimm,kzinimmax,specialkey
        10 - 11 + 72 (72 before 10 - 11) : number + Array - universalinput + ArrayAdder - name - teken,tekenmax,specialkeyTwo
        //* מלאי

     //!    }
        
        */
		console.log(len.indexOf("specialkey"));
		console.log(len.length);
	}, []);

	return <></>;
}
export default withRouter(KshirotPage);

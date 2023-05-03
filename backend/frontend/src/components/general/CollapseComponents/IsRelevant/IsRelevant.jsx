import React, { useState, useEffect } from "react";
import {
	Collapse,
	UncontrolledCollapse,
	CardBody,
	Card,
	// Button,
	CardHeader,
	CardTitle,
	Container,
	FormGroup,
	Form,
	Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Alert,
	Spinner,
	Label,
	Col,
} from "reactstrap";
//TODO - switch to full mui component

import { Button } from "@mui/material";

const IsRelevant = (props) => {
	const RelevantField = props.relevantField;
	const label = Object.keys(RelevantField)[0];
	// console.log(label);

	const [isopen, setIsopen] = useState(RelevantField);

	function handleChange() {
		const val = isopen[label];
		// console.log(val);
		// console.log(evt.target.name);
		// setTipulData({ ...tipuldata, [evt.target.name]: value });
		// console.log(tipuldata);
		props.handleCallBack({ label: label, value: val });
	}

	useEffect(() => {
		handleChange();
	}, [isopen]);

	return (
		<>
			{isopen[label] ? (
				<Button
					style={props.styleR}
					variant="contained"
					color="error"
					size="small"
					// style={{ float: "left", marginTop: "1.8rem", marginBottom: "1rem" }}
					className=" float-left"
					onClick={() => setIsopen({ ...isopen, [label]: !isopen[label] })}
				>
					לא רלוונטי
				</Button>
			) : (
				<Col
					xs={12}
					md={3}
				>
					<Button
						style={props.styleR}
						variant="contained"
						color="info"
						size="small"
						onClick={() => setIsopen({ ...isopen, [label]: !isopen[label] })}
					>
						רלוונטי
					</Button>
				</Col>
			)}
			<Collapse isOpen={isopen[label]}>{props.children}</Collapse>
		</>
	);
};
export default IsRelevant;

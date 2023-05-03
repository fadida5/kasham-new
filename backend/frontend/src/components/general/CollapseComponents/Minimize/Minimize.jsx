import React, { useState, useEffect } from "react";
import {
	// Collapse,
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
import styles from "../Minimize/Minimize.module.css";

import { Button, IconButton, Collapse } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Minimize = (props) => {
	const RelevantField = props.relevantField;
	const label = Object.keys(RelevantField)[0];
	// console.log(label);

	const [isopen, setIsopen] = useState(RelevantField);

	// function handleChange() {
	// 	const val = isopen[label];
	// 	// console.log(val);
	// 	// console.log(evt.target.name);
	// 	// setTipulData({ ...tipuldata, [evt.target.name]: value });
	// 	// console.log(tipuldata);
	// 	props.handleCallBack({ label: label, value: val });
	// }

	useEffect(() => {
		// handleChange();
		// console.log(isopen);
	}, [isopen]);

	return (
		<div id={props.id}>
			{isopen[label] ? (
				<IconButton
					size="large"
					id="close"
					variant="contained"
					className={styles.ActiveButton}
					onClick={() => setIsopen({ ...isopen, [label]: !isopen[label] })}
				>
					<ArrowDropUpIcon fontSize="large" />
				</IconButton>
			) : (
				<IconButton
					size="small"
					variant="contained"
					id="open"
					className={styles.closeButton}
					onClick={() => setIsopen({ ...isopen, [label]: !isopen[label] })}
				>
					<ArrowDropDownIcon fontSize="large" />
				</IconButton>
			)}
			<Collapse in={isopen[label]}>{props.children}</Collapse>
		</div>
	);
};
export default Minimize;

import React, { useState, useEffect } from "react";
import {
	Collapse,
	UncontrolledCollapse,
	CardBody,
	Card,
	Button,
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
				<Button
					id="close"
					className={styles.ActiveButton}
					onClick={() => setIsopen({ ...isopen, [label]: !isopen[label] })}
				>
					^
				</Button>
			) : (
				<Button
					id="open"
					className={styles.closeButton}
					onClick={() => setIsopen({ ...isopen, [label]: !isopen[label] })}
				>
					⌄
				</Button>
			)}
			<Collapse isOpen={isopen[label]}>{props.children}</Collapse>
		</div>
	);
};
export default Minimize;

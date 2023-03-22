import React, { useState, useEffect, useRef } from "react";
import {
	Button,
	Card,
	CardHeader,
	CardBody,
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

export const DateInput = (props) => {
	function handleChange(evt) {
		const val = evt.target.value;
		// console.log(value);
		// console.log(evt.target.name);
		// setTipulData({ ...tipuldata, [evt.target.name]: value });
		// console.log(tipuldata);
		props.handleCallBack({ label: evt.target.name, value: val });
	}

	return (
		<>
			<Row>
				{!props.disableheader ? (
					<Col
						xs={12}
						md={3}
						style={{ textAlign: "right" }}
					>
						{props.header}
					</Col>
				) : (
					<Col
						xs={12}
						md={3}
						style={{ textAlign: "right" }}
					></Col>
				)}
			</Row>
			{!props.disableCol ? (
				<Row>
					<Col
						xs={12}
						md={6}
					>
						<div style={{ textAlign: "center", paddingTop: "10px" }}>
							{" "}
							{props.footer}
						</div>
						<FormGroup dir="rtl">
							<Input
								type="date"
								bsSize="lg"
								name={props.name}
								value={props.value}
								onChange={handleChange}
								style={{ lineHeight: "inherit" }}
							/>
						</FormGroup>
					</Col>
				</Row>
			) : (
				<Row className="mr-3 ml-3">
					<div style={{ textAlign: "center", paddingTop: "10px" }}>
						{" "}
						{props.footer}
					</div>
					<FormGroup dir="rtl">
						<Input
							type="date"
							bsSize="lg"
							name={props.name}
							value={props.value}
							onChange={handleChange}
							style={{ lineHeight: "inherit" }}
						/>
					</FormGroup>
				</Row>
			)}
		</>
	);
};

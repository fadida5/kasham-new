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
import AddComment from "../../Toggle/AddComment";

export const UniversalInput = (props) => {
	function handleChange(evt) {
		const val = evt.target.value;
		// console.log(val);
		// console.log(evt.target.name);
		// setTipulData({ ...tipuldata, [evt.target.name]: value });
		// console.log(tipuldata);
		props.handleCallBack({ label: evt.target.name, value: val });
	}
	function handleChange2(evt) {
		const val = evt.target.value;
		// setIsopen(!isopen);
		console.log(val);
		console.log(evt.target.name);
		props.handleCallBack3({
			name: evt.target.name,
			value: val,
		});
	}

	const detailVal = props.name + "detail";

	return (
		<>
			{props.chained ? (
				<>
					{!props.disableCol ? (
						<Col
							xs={props.smSize}
							md={props.mdSize}
						>
							<div
								style={{ textAlign: `${props.textLoc}`, paddingTop: "10px" }}
							>
								{" "}
								{props.footer}
							</div>
							<FormGroup dir="rtl">
								<Input
									type={props.type}
									bsSize="lg"
									name={props.name}
									value={props.value}
									onChange={handleChange}
									disabled={props.isDisabeld}
									{...props.costume}
								/>
							</FormGroup>
							{props.children}
						</Col>
					) : (
						<>
							<div
								style={{ textAlign: `${props.textLoc}`, paddingTop: "10px" }}
							>
								{" "}
								{props.footer}
							</div>
							<FormGroup dir="rtl">
								<Input
									type={props.type}
									bsSize="lg"
									name={props.name}
									value={props.value}
									onChange={handleChange}
									disabled={props.isDisabeld}
									{...props.costume}
								/>
							</FormGroup>
							{props.children}
						</>
					)}

					{props.hascomment ? (
						<div className={props.styleName}>
							<AddComment
								btnName="הוסף הערות"
								name={detailVal}
								value={props.detailVal}
								handleChange={handleChange2}
							/>
						</div>
					) : null}
				</>
			) : (
				<>
					<Row>
						{props.header ? (
							<Col
								xs={12}
								md={6}
								style={{
									textAlign: "right",
									paddingTop: "10px",
									fontWeight: "bold",
								}}
							>
								{props.header}
							</Col>
						) : null}
					</Row>
					{!props.disableCol ? (
						<Row>
							<Col
								xs={props.smSize}
								md={props.mdSize}
							>
								<div
									style={{ textAlign: `${props.textLoc}`, paddingTop: "10px" }}
								>
									{" "}
									{props.footer}
								</div>
								<FormGroup dir="rtl">
									<Input
										type={props.type}
										bsSize="lg"
										name={props.name}
										value={props.value}
										onChange={handleChange}
										disabled={props.isDisabeld}
										{...props.costume}
									/>
								</FormGroup>
							</Col>

							{props.children}
						</Row>
					) : (
						<Row className="mr-3 ml-3">
							<div
								style={{ textAlign: `${props.textLoc}`, paddingTop: "10px" }}
							>
								{" "}
								{props.footer}
							</div>
							<FormGroup dir="rtl">
								<Input
									type={props.type}
									bsSize="lg"
									name={props.name}
									value={props.value}
									onChange={handleChange}
									disabled={props.isDisabeld}
									{...props.costume}
								/>
							</FormGroup>
							{props.children}
						</Row>
					)}

					{props.hascomment ? (
						<div className={props.styleName}>
							<AddComment
								btnName="הוסף הערות"
								name={detailVal}
								value={props.detailVal}
								handleChange={handleChange2}
							/>
						</div>
					) : null}
				</>
			)}
		</>
	);
};

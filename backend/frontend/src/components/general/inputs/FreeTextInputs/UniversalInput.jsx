import IsRelevant from "components/general/CollapseComponents/IsRelevant/IsRelevant";
import style from "./UniversalInput.module.css";
import React, { useState, useEffect, useRef } from "react";
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Container,
	// FormControl,
	Form,
	// Input,
	InputGroupAddon,
	InputGroupText,
	InputGroup,
	Row,
	Alert,
	Spinner,
	Label,
	Col,
} from "reactstrap";
import { Input, FormControl, Grid, InputLabel } from "@mui/material";

//TODO - switch the input in Input (including the header footer and so on)
//todo grid

import AddComment from "../../Toggle/AddComment";

export const UniversalInput = (props) => {
	//* functions ----------------------------------------------------------------
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
							<FormControl dir="rtl">
								<Input
									fullWidth={true}
									variant="standard"
									type={props.type}
									bsSize="lg"
									name={props.name}
									value={props.value}
									onChange={handleChange}
									disabled={props.isDisabeld}
									slotProps={{ input: { ...props.costume } }}
								/>
							</FormControl>
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
							<FormControl dir="rtl">
								<Input
									fullWidth={true}
									variant="standard"
									type={props.type}
									bsSize="lg"
									name={props.name}
									value={props.value}
									onChange={handleChange}
									disabled={props.isDisabeld}
									slotProps={{ input: { ...props.costume } }}
								/>
							</FormControl>
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
								isDisabeld={props.isDisabeld}
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
								md={12}
								style={{
									textAlign: "right",
									paddingTop: "1px",
									fontWeight: "bold",
								}}
							>
								{props.header}
							</Col>
						) : null}
					</Row>
					{props.IsRelevant ? (
						<IsRelevant
							relevantField={{ [props.name]: true }}
							handleCallBack={props.handleCallBack4}
						>
							{!props.disableCol ? (
								<Row>
									<Col
										xs={props.smSize}
										md={props.mdSize}
									>
										<div>
											<InputLabel
												className={style.MuiInputLabel}
												style={{
													textAlign: `${props.textLoc}`,
													paddingTop: "10px",
												}}
											>
												{" "}
												{props.footer}
											</InputLabel>
											<Input
												variant="standard"
												type={props.type}
												bsSize="lg"
												name={props.name}
												value={props.value}
												onChange={handleChange}
												disabled={props.isDisabeld}
												slotProps={{ input: { ...props.costume } }}
											/>
										</div>
									</Col>

									{props.children}
								</Row>
							) : (
								<Row className="mr-3 ml-3">
									<div>
										<InputLabel
											className={style.MuiInputLabel}
											style={{
												textAlign: `${props.textLoc}`,
												paddingTop: "10px",
												fontSize: "15px",
											}}
										>
											{" "}
											{props.footer}
										</InputLabel>
										<Input
											fullWidth={true}
											variant="standard"
											type={props.type}
											bsSize="lg"
											name={props.name}
											value={props.value}
											onChange={handleChange}
											disabled={props.isDisabeld}
											slotProps={{ input: { ...props.costume } }}
										/>
									</div>
									{props.children}
								</Row>
							)}
						</IsRelevant>
					) : !props.disableCol ? (
						<Row>
							<Col
								xs={props.smSize}
								md={props.mdSize}
							>
								<div style={{ textAlign: "right" }}>
									<InputLabel
										className={style.MuiInputLabel}
										style={{
											textAlign: `${props.textLoc}`,
											paddingTop: "5px",
											fontSize: "15px",
										}}
									>
										{" "}
										{props.footer}
									</InputLabel>
									<Input
										fullWidth={true}
										variant="standard"
										type={props.type}
										bsSize="lg"
										name={props.name}
										value={props.value}
										onChange={handleChange}
										disabled={props.isDisabeld}
										slotProps={{ input: { ...props.costume } }}
									/>
								</div>{" "}
							</Col>

							{props.children}
						</Row>
					) : (
						<Row className="mr-3 ml-3">
							<div style={{ textAlign: "right" }}>
								<InputLabel
									className={style.MuiInputLabel}
									style={{
										textAlign: `${props.textLoc}`,
										paddingTop: "5px",
										fontSize: "15px",
									}}
								>
									{" "}
									{props.footer}
								</InputLabel>
								<Input
									fullWidth={true}
									variant="standard"
									type={props.type}
									bsSize="lg"
									name={props.name}
									value={props.value}
									onChange={handleChange}
									disabled={props.isDisabeld}
									slotProps={{ input: { ...props.costume } }}
								/>
							</div>{" "}
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
								isDisabeld={props.isDisabeld}
							/>
						</div>
					) : null}
				</>
			)}
		</>
	);
};

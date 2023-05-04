import AddComment from "components/general/Toggle/AddComment";
import React, { useState, useEffect, useRef } from "react";
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Container,
	// FormGroup,
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
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Input, FormControl, Grid, InputLabel } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import IsRelevant from "components/general/CollapseComponents/IsRelevant/IsRelevant";

export const DateInput = (props) => {
	function handleChange(evt) {
		console.log(props.name);
		// console.log(evt.$d);
		const val = evt.$d;
		// console.log(value);
		// console.log(evt.target.name);
		// setTipulData({ ...tipuldata, [evt.target.name]: value });
		// console.log(tipuldata);
		props.handleCallBack({ label: props.name, value: val });
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
						<>
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
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<DemoContainer components={["DesktopDatePicker"]}>
										<DemoItem>
											<DesktopDatePicker
												fullWidth={true}
												name={props.name}
												value={props.value}
												onChange={handleChange}
												style={{ lineHeight: "inherit" }}
												slotProps={{ input: { ...props.costume } }}
												disabled={props.isDisabeld}
											/>
										</DemoItem>
									</DemoContainer>
								</LocalizationProvider>
							</Col>
						</>
					) : (
						<>
							<div
								style={{ textAlign: `${props.textLoc}`, paddingTop: "10px" }}
							>
								{" "}
								{props.footer}
							</div>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DemoContainer components={["DesktopDatePicker"]}>
									<DemoItem>
										<DesktopDatePicker
											fullWidth={true}
											name={props.name}
											value={props.value}
											onChange={handleChange}
											style={{ lineHeight: "inherit" }}
											slotProps={{ input: { ...props.costume } }}
										/>
									</DemoItem>
								</DemoContainer>
							</LocalizationProvider>
						</>
					)}
				</>
			) : (
				<>
					{props.IsRelevant ? (
						<IsRelevant
							styleR={{ marginTop: "10%" }}
							relevantField={{ [props.name]: true }}
							handleCallBack={props.handleCallBack4}
						>
							<>
								<Row>
									{!props.disableheader ? (
										<Col
											xs={12}
											md={12}
											style={{
												textAlign: "right",
												paddingTop: "10px",
												fontWeight: "bold",
											}}
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
											xs={props.smSize}
											md={props.mdSize}
										>
											<div
												style={{
													textAlign: `${props.textLoc}`,
													paddingTop: "10px",
												}}
											>
												{" "}
												{props.footer}
											</div>
											<LocalizationProvider dateAdapter={AdapterDayjs}>
												<DemoContainer components={["DesktopDatePicker"]}>
													<DemoItem>
														<DesktopDatePicker
															fullWidth={true}
															name={props.name}
															value={props.value}
															onChange={handleChange}
															style={{ lineHeight: "inherit" }}
															slotProps={{ input: { ...props.costume } }}
														/>
													</DemoItem>
												</DemoContainer>
											</LocalizationProvider>
										</Col>
									</Row>
								) : (
									<Row className="mr-3 ml-3">
										<div
											style={{
												textAlign: `${props.textLoc}`,
												paddingTop: "10px",
											}}
										>
											{" "}
											{props.footer}
										</div>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer components={["DesktopDatePicker"]}>
												<DemoItem>
													<DesktopDatePicker
														fullWidth={true}
														name={props.name}
														value={props.value}
														onChange={handleChange}
														style={{ lineHeight: "inherit" }}
														slotProps={{ input: { ...props.costume } }}
														disabled={props.isDisabeld}
													/>
												</DemoItem>
											</DemoContainer>
										</LocalizationProvider>
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
						</IsRelevant>
					) : (
						<>
							<Row>
								{!props.disableheader ? (
									<Col
										xs={12}
										md={12}
										style={{
											textAlign: "right",
											paddingTop: "10px",
											fontWeight: "bold",
										}}
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
										xs={props.smSize}
										md={props.mdSize}
									>
										<div
											style={{
												textAlign: `${props.textLoc}`,
												paddingTop: "10px",
											}}
										>
											{" "}
											{props.footer}
										</div>
										<LocalizationProvider dateAdapter={AdapterDayjs}>
											<DemoContainer components={["DesktopDatePicker"]}>
												<DemoItem>
													<DesktopDatePicker
														fullWidth={true}
														name={props.name}
														value={props.value}
														onChange={handleChange}
														style={{ lineHeight: "inherit" }}
														slotProps={{ input: { ...props.costume } }}
													/>
												</DemoItem>
											</DemoContainer>
										</LocalizationProvider>
									</Col>
								</Row>
							) : (
								<Row className="mr-3 ml-3">
									<div
										style={{
											textAlign: `${props.textLoc}`,
											paddingTop: "10px",
										}}
									>
										{" "}
										{props.footer}
									</div>
									<LocalizationProvider dateAdapter={AdapterDayjs}>
										<DemoContainer components={["DesktopDatePicker"]}>
											<DemoItem>
												<DesktopDatePicker
													fullWidth={true}
													name={props.name}
													value={props.value}
													onChange={handleChange}
													style={{ lineHeight: "inherit" }}
													slotProps={{ input: { ...props.costume } }}
													disabled={props.isDisabeld}
												/>
											</DemoItem>
										</DemoContainer>
									</LocalizationProvider>
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
			)}
		</>
	);
};

import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "reactstrap";
// import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ThemeContext } from "contexts/ThemeContext";
import AddComment from "components/general/Toggle/AddComment";
import IsRelevant from "components/general/CollapseComponents/IsRelevant/IsRelevant";
import {
	Grid,
	Input,
	Select,
	InputLabel,
	MenuItem,
	FormControl,
} from "@mui/material";
import RTL from "components/general/ThemeWrapper/RtlWrapper";

//TODO - grid

export const SelectOne = (props) => {
	//* state ----------------------------------------------------------------

	const [options, setOptions] = useState([]);
	const [style, setStyle] = useState({
		marginRight: "0.5rem",
		fontSize: "15px",
	});

	const animatedComponents = makeAnimated();

	const detailVal = props.name + "detail";

	//* functions ----------------------------------------------------------------
	function optionsForUnits(unit) {
		const temp = [];
		if (props.hasNull) {
			if (unit.length != 0) {
				temp.push({ value: "בחר", label: "בחר" });
			} else {
				alert("unit is empty");
			}
		}
		unit.map((item, index) => {
			let val = item._id;
			let lab = item.name;
			temp.push({ value: val, label: lab });
		});
		if (
			props.hasNull
				? temp.length === unit.length + 1
				: temp.length === unit.length
		) {
			setOptions(temp);
		} else {
			console.log(temp.length);
			console.log(unit.length);
			alert("something went wrong");
		}
	}

	function freeOptions(arr) {
		const temp = [];
		if (props.hasNull) {
			if (arr.length != 0) {
				temp.push({ value: "בחר", label: "בחר" });
			} else {
				alert("unit is empty");
			}
		}
		arr.map((item, index) => {
			let val = item.value;
			let lab = item.name;
			temp.push({ value: val, label: lab });
		});
		if (
			props.hasNull
				? temp.length === arr.length + 1
				: temp.length === arr.length
		) {
			setOptions(temp);
		} else {
			console.log(temp.length);
			console.log(arr.length);
			alert("something went wrong");
		}
	}

	function handleChange(evt) {
		// console.log(evt);
		const val = evt.target.value;
		// console.log(evt.target);
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

	//* useEffect ----------------------------------------------------------------

	useEffect(() => {
		// console.log(theme);
		// console.log(props.value);
		// console.log(props.unit);

		switch (true) {
			//* unit ----------------------------------------------------------------
			case Array.isArray(props.unit):
				if (typeof props.unit[0] == "object") {
					let keys = Object.keys(props.unit[0]);
					if (keys.includes("name") && keys.includes("_id")) {
						optionsForUnits(props.unit);
					} else {
						console.log(
							"the array need to be array of objetc with at least  _id and name"
						);
					}
				} else {
					console.log("props.unit is not an array");
				}
				break;
			//* freeoptions ----------------------------------------------------------------
			case Array.isArray(props.FreeOptions):
				let keys = Object.keys(props.FreeOptions[0]);
				if (keys.includes("name") && keys.includes("value")) {
					freeOptions(props.FreeOptions);
				} else {
					if (props.test) {
						alert(
							"the array need to be array of objetc with at least  value and name"
						);
					}
				}

				break;
			default:
				console.log(props.FreeOptions);
				console.log(props.unit);
				if (props.test) {
					alert(
						"please inherent an unit (pikod,gdud... or mkabaz magad ...) or a free set of options. \n both shoud be an array of objects ;)"
					);
				}

				break;
		}
	}, [props.unit, props.FreeOptions]);
	//! DOM style change
	// useEffect(() => {
	// 	let a = document.getElementsByClassName(props.name);
	// 	for (let item of a) {
	// 		// console.log(...item.style);
	// 		// console.log(`${item} ==> ${item.attributes["data-shrink"]}`);
	// 		console.log(item.attributes["data-shrink"].value);
	// 		if (item.attributes["data-shrink"].value) {
	// 			console.log(item);
	// 			console.log(item.attributes["data-shrink"]);
	// 			item.style.marginRight = "0rem";
	// 			item.style.marginButtom = "1rem";
	// 		} else {
	// 			// console.log("shrinked");
	// 			item.style.marginRight = "1rem";
	// 		}
	// 	}
	// 	// console.log(a[0].attributes["data-shrink"].value);
	// }, [props.value]);

	return (
		<RTL>
			<ThemeContext.Consumer>
				{({ changeTheme, theme }) => (
					<>
						<Row>
							{props.title ? (
								<Col
									xs={12}
									md={12}
									style={{
										textAlign: "right",
										paddingTop: "10px",
										fontWeight: "bold",
									}}
								>
									{props.title}
								</Col>
							) : null}
						</Row>
						{props.IsRelevant ? (
							<IsRelevant
								relevantField={{ [props.name]: true }}
								handleCallBack={props.handleCallBack4}
							>
								<FormControl
									sx={{ m: 1, minWidth: 120 }}
									size={props.size}
									style={{ textAlign: "right" }}
									fullWidth={true}
									disabled={props.isDisabeld}
								>
									<Row>
										<Col
											style={{
												marginTop: "-5px",
												textAlign: "right",
												marginBottom: "10px",
											}}
										>
											{theme == "white-content" ? (
												<>
													<InputLabel
														style={style}
														id={props.name}
													>
														{props.header}
													</InputLabel>
													<Select
														fullWidth={true}
														name={props.name}
														multiple={false}
														labelId="header"
														label={props.name}
														// defaultValue={props.value}
														// value={props.value ? props.value : undefined}
														onChange={handleChange}
														disabled={props.isDisabled}
														// placeholder={
														// 	props.value != undefined ? props.value : "בחר"
														// }
													>
														{options.map((lab, index) => {
															return (
																<MenuItem
																	style={{ textAlign: "right" }}
																	value={options[index].value}
																>
																	{options[index].label}
																</MenuItem>
															);
														})}
													</Select>
												</>
											) : (
												<>
													<InputLabel
														style={style}
														id={props.name}
													>
														{props.header}
													</InputLabel>
													<Select
														fullWidth={true}
														name={props.name}
														multiple={false}
														labelId="header"
														label={props.name}
														// defaultValue={props.value}
														// value={props.value ? props.value : undefined}
														onChange={handleChange}
														disabled={props.isDisabled}
														// placeholder={
														// 	props.value != undefined ? props.value : "בחר"
														// }
														theme={(theme) => ({
															...theme,
															colors: {
																...theme.colors,
																neutral0: "#27293d",
																neutral5: "#1e1e2f",
																primary25: "#1e1e2f",
																primary50: "transparent",
																neutral50: "white",
																neutral80: "white",
															},
														})}
													>
														{options.map((lab, index) => {
															return (
																<MenuItem
																	style={{ textAlign: "right" }}
																	value={options[index].value}
																>
																	{options[index].label}
																</MenuItem>
															);
														})}
													</Select>
												</>
											)}
										</Col>
									</Row>
								</FormControl>
							</IsRelevant>
						) : (
							<>
								<FormControl
									sx={{ m: 1, minWidth: "auto" }}
									fullWidth={true}
									size={props.size}
									style={{ textAlign: "right" }}
									disabled={props.isDisabeld}
								>
									<Row>
										<Col
											style={{
												marginTop: "20px",
												textAlign: "right",
												marginBottom: "10px",
											}}
										>
											{theme == "white-content" ? (
												<>
													<InputLabel
														// className={props.name}
														style={style}
													>
														{props.header}
														{""}
													</InputLabel>
													<Select
														fullWidth={true}
														name={props.name}
														multiple={false}
														labelId="header"
														label={props.name}
														// defaultValue={props.value}
														// value={props.value ? props.value : undefined}
														// value={val ? val : undefined}
														onChange={handleChange}
														// onOpen={close}
														disabled={props.isDisabled}
														// placeholder={
														// 	props.value != undefined ? props.value : "בחר"
														// }
													>
														{options.map((lab, index) => {
															return (
																<MenuItem
																	style={{ textAlign: "right" }}
																	value={options[index].value}
																>
																	{options[index].label}
																</MenuItem>
															);
														})}
													</Select>
												</>
											) : (
												<>
													<InputLabel
														style={style}
														id={props.name}
													>
														{props.header}
														{""}
													</InputLabel>
													<Select
														fullWidth={true}
														name={props.name}
														multiple={false}
														labelId="header"
														label={props.name}
														// defaultValue={props.value}
														// value={props.value ? props.value : undefined}
														onChange={handleChange}
														disabled={props.isDisabled}
														// placeholder={
														// 	props.value != undefined ? props.value : "בחר"
														// }
														theme={(theme) => ({
															...theme,
															colors: {
																...theme.colors,
																neutral0: "#27293d",
																neutral5: "#1e1e2f",
																primary25: "#1e1e2f",
																primary50: "transparent",
																neutral50: "white",
																neutral80: "white",
															},
														})}
													>
														{options.map((lab, index) => {
															return (
																<MenuItem
																	style={{ textAlign: "right" }}
																	value={options[index].value}
																>
																	{options[index].label}
																</MenuItem>
															);
														})}
													</Select>
												</>
											)}
										</Col>
									</Row>
								</FormControl>
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
				)}
			</ThemeContext.Consumer>
		</RTL>
	);
};

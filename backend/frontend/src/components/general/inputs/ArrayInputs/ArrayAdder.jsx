import React, { useState, useEffect, useRef } from "react";
import {
	// Button,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	Container,
	FormGroup,
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
import { produce } from "immer";
import { generate } from "shortid";
import SelectOne from "../SelectInputs/SelectOne";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	TextField,
	FormControl,
	Grid,
	Button,
	IconButton,
	InputLabel,
	Input,
} from "@mui/material";
import { checkVal } from "assets/fixedData/initHelpers_functions";

const ArrayAdder = (props) => {
	//* states ----------------------------------------------------------------
	const [finalspecialkeytwo, setFinalSpecialKeytwo] = useState([]);
	// const [tempFinalspecialkeytwo, setTempFinalSpecialKeytwo] = useState([]);
	const [mainData, setMainData] = useState([]);
	//* specfic use cases ----------------------------------------------------------------
	//TODO - make it work better - maybe add extra function for value
	function change(v, i, name, curr) {
		const pack = props.freeOptions;
		// console.log(pack);
		let temp = "";
		let res = "";
		// console.log(v);
		if (v == "בחר") {
			// console.log("aaaaa");
			return curr;
		} else {
			switch (name) {
				case "מספר מקצוע":
					// console.log(v);
					// temp = pack.name.filter((item) => item.name == v);
					// console.log(pack.name);
					temp = pack.name.filter(
						(item) => item.value == finalspecialkeytwo[i].name
					);
					// console.log(temp);
					try {
						if (finalspecialkeytwo[i].name == "" || temp == []) {
							return curr;
						} else {
							res = [{ name: temp[0].value, value: temp[0].name }];
							// console.log(res);

							return res;
						}
					} catch (error) {
						return curr;

						// console.log(error);
					}

				case "שם מקצוע":
					// console.log(v);
					// temp = pack.name.filter((item) => item.name == v);
					// console.log(pack.name);
					temp = pack.numbermikzoa.filter(
						(item) => item.value == finalspecialkeytwo[i].numbermikzoa
					);
					// console.log(temp);
					try {
						if (finalspecialkeytwo[i].numbermikzoa == "" || temp == []) {
							return curr;
						} else {
							res = [{ name: temp[0].value, value: temp[0].name }];
							// console.log(res);

							return res;
						}
					} catch (error) {
						return res;
						// console.log(error);
					}

				default:
					return curr;
			}
		}
		// console.log(pack);
		// console.log(finalspecialkeytwo[i]);
		// console.log(props.freeOptions);
	}

	//* variables ----------------------------------------------------------------

	const inputArray = props.inputArray;
	let field = props.field;
	const fieldAraay = Object.keys(field);
	const arrName = props.arrName;

	//* useeffects ----------------------------------------------------

	useEffect(() => {
		// console.log(field);
		setMainData(field);
	}, []);

	useEffect(() => {
		const newArayytwo = [...finalspecialkeytwo];
		props.handleCallBack2(newArayytwo, arrName);
	}, [finalspecialkeytwo]);

	//* props checker

	useEffect(() => {
		switch (true) {
			case typeof props.field != "object":
				alert("field prop is not an object");
				break;

			case typeof props.inputArray != "object":
				alert("inputArray prop is not an object");
				break;

			case fieldAraay.length != props.inputArray.length + 1:
				// console.log(fieldAraay.slice(1).length);
				// console.log(props.inputArray.length);
				alert("you will not have enough input fields");
			case typeof props.costume != "function":
				alert("you must enter a function in costume");
				break;

			default:
				break;
		}
		// console.log(props.inputArray[0].name);
	}, []);

	useEffect(() => {
		try {
			const names = Object.keys(props.costumeSize);
			names.map((name, index) => {
				document.getElementsByName(name).forEach((element, index) => {
					if (element.tagName == "DIV") {
						element.className = props.costumeSize[name];
					}
				});
			});
		} catch (error) {
			if (props.costumeSize) {
				console.log(error);
			} else {
				// console.log("there is no costume size prop");
			}
		}

		// document.getElementById("מספר מקצוע").className = "col-12 col-md-6";
		// console.log(a);
	}, [finalspecialkeytwo.length]);

	//* render ----------------------------------------------------------------

	return (
		<>
			<div
				style={{
					textAlign: "right",
					paddingTop: "10px",
					fontWeight: "bold",
				}}
			>
				{props.name}
			</div>

			<Row>
				{finalspecialkeytwo.length == 0 ? (
					<>
						<Button
							disabled={props.isDisabeld}
							color="secondary"
							variant="contained"
							style={{
								float: "right",
								borderRadius: "20px",
								marginTop: "0.5rem",
							}}
							onClick={() => {
								setFinalSpecialKeytwo((currentSpec) => [
									...currentSpec,
									props.field,
								]);
								field.id = generate();
							}}
						>
							{props.buttonName}{" "}
						</Button>
					</>
				) : (
					finalspecialkeytwo.map((input, index) => {
						{
							/* input.id = generate(); */
						}
						return (
							<div>
								{index == 0 ? (
									<Row>
										<Button
											color="secondary"
											variant="contained"
											style={{
												float: "right",
												borderRadius: "20px",
												marginRight: "1rem",
												marginTop: "0.5rem",
												marginBottom: "0.5rem",
											}}
											onClick={() => {
												setFinalSpecialKeytwo((currentSpec) => [
													...currentSpec,
													field,
												]);
											}}
										>
											{props.buttonName}{" "}
										</Button>
									</Row>
								) : null}

								<Row>
									{props.inputArray
										? props.inputArray.map((item, i) => {
												return (
													<Col name={item.name} xs={12} md={4}>
														<div>
															{item.type != "select" ? (
																<div style={{ textAlign: "right" }}>
																	<InputLabel
																		style={{
																			textAlign: `right`,
																			margin: "0px",
																			// paddingTop: "5px",
																			fontSize: "15px",
																		}}
																	>
																		{" "}
																		{item.name}
																	</InputLabel>
																	<Input
																		onChange={(e) => {
																			const name = e.target.value;
																			setFinalSpecialKeytwo((currentSpec) =>
																				produce(currentSpec, (v) => {
																					v[index][fieldAraay[i + 1]] = name;
																					v[index].id = generate();
																				})
																			);
																		}}
																		variant="standard"
																		// value={input[fieldAraay[i + 1]]}
																		value={
																			props.costume(item.type, item.name) ==
																			undefined
																				? input[fieldAraay[i + 1]]
																				: checkVal(
																						props.costume(item.type, item.name),
																						input[fieldAraay[i + 1]]
																				  )
																		}
																		type={item.type}
																		placeholder={item.name}
																		fullWidth={true}
																		slotProps={{
																			input: {
																				...props.costume(item.type, item.name),
																			},
																		}}
																	/>
																</div>
															) : (
																<>
																	{/* <p style={{ margin: "-8px", float: "right" }}>
																		{item.name}
																	</p> */}
																	<div
																		style={{
																			marginTop: "-10px",
																			marginRight: "-5px",
																			marginBottom: "10px",
																		}}
																	>
																		{/* {console.log(fieldAraay[i+1])}
																	{console.log(props.freeOptions[fieldAraay[i+1]])} */}
																		{/*//TODO - find a way to combine job namer and job name*/}
																		<SelectOne
																			header={item.name}
																			isPart={true}
																			size="small"
																			name={item.name}
																			{...props.costume(item.type, item.name)}
																			hasNull={true}
																			FreeOptions={
																				change(
																					input[fieldAraay[i + 1]],
																					index,
																					item.name,
																					props.freeOptions[fieldAraay[i + 1]]
																				)
																				// props.freeOptions[fieldAraay[i + 1]]
																			}
																			// val={finalspecialkeytwo}
																			value={
																				input[fieldAraay[i + 1]]
																					? input[fieldAraay[i + 1]]
																					: undefined
																			}
																			handleCallBack={(e) => {
																				const name = e.value;
																				setFinalSpecialKeytwo((currentSpec) =>
																					produce(currentSpec, (v) => {
																						// console.log(e);
																						v[index][fieldAraay[i + 1]] = name;
																						v[index].id = generate();
																					})
																				);
																			}}
																		/>
																	</div>
																</>
															)}
														</div>
													</Col>
												);
										  })
										: null}
								</Row>

								<IconButton
									onClick={() => {
										setFinalSpecialKeytwo((currentSpec) =>
											currentSpec.filter((x) => x.id !== input.id)
										);
									}}
								>
									<DeleteIcon />
								</IconButton>
							</div>
						);
					})
				)}
			</Row>
		</>
	);
};
export default React.memo(ArrayAdder);

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
import { produce } from "immer";
import { generate } from "shortid";
import { SelectOne } from "../SelectInputs/SelectOne";

export const ArrayAdder = (props) => {
	//* states ----------------------------------------------------------------
	const [finalspecialkeytwo, setFinalSpecialKeytwo] = useState([]);
	// const [tempFinalspecialkeytwo, setTempFinalSpecialKeytwo] = useState([]);
	const [mainData, setMainData] = useState([]);

	//* variables ----------------------------------------------------------------

	const inputArray = props.inputArray;
	let field = props.field;
	const fieldAraay = Object.keys(field);

	//* useeffects ----------------------------------------------------

	useEffect(() => {
		// console.log(field);
		setMainData(field);
	}, []);

	useEffect(() => {
		const newArayytwo = [...finalspecialkeytwo];
		props.handleCallBack2(newArayytwo);
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
				console.log(fieldAraay.slice(1).length);
				console.log(props.inputArray.length);
				alert("you will not have enough input fields");

			default:
				break;
		}
		// console.log(props.inputArray[0].name);
	}, []);

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
							style={{ float: "right" }}
							type="button"
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
											style={{ float: "right" }}
											type="button"
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
													<Col
														xs={12}
														md={4}
													>
														<div>
															{item.type != "select" ? (
																<>
																	<p style={{ margin: "0px", float: "right" }}>
																		{item.name}
																	</p>
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
																		value={input[fieldAraay[i + 1]]}
																		type={item.type}
																		placeholder={item.name}
																	/>
																</>
															) : (
																<>
																	{/* <p style={{ margin: "-8px", float: "right" }}>
																		{item.name}
																	</p> */}
																	<div
																		style={{
																			marginTop: "15px",
																			marginRight: "2px",
																			marginBottom: "10px",
																		}}
																	>
																		<SelectOne
																			header={item.name}
																			name={item.name}
																			hasNull={true}
																			FreeOptions={props.freeOptions}
																			value={
																				input[fieldAraay[i + 1]]
																					? input[fieldAraay[i + 1]]
																					: undefined
																			}
																			handleCallBack={(e) => {
																				const name = e.value;
																				setFinalSpecialKeytwo((currentSpec) =>
																					produce(currentSpec, (v) => {
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

								<Button
									type="button"
									onClick={() => {
										setFinalSpecialKeytwo((currentSpec) =>
											currentSpec.filter((x) => x.id !== input.id)
										);
									}}
								>
									x
								</Button>
							</div>
						);
					})
				)}
			</Row>
		</>
	);
};

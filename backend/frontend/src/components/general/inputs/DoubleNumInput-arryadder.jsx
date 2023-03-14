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
import { generate } from "shortid";
import { produce } from "immer";

export const DoubleNumInputArryaAdder = (props) => {
	const [finalspecialkeytwo, setFinalSpecialKeytwo] = useState([]);

	function handleChange(evt) {
		const val = evt.target.value;
		// console.log(value);
		// console.log(evt.target.name);
		// setTipulData({ ...tipuldata, [evt.target.name]: value });
		// console.log(tipuldata);
		props.handleCallBack({ label: evt.target.name, value: val });
	}
	useEffect(() => {
		const newArayytwo = [...finalspecialkeytwo];
		props.handleCallBack2(newArayytwo);
	}, [finalspecialkeytwo]);

	return (
		<>
			<>
				<div
					style={{
						textAlign: "right",
						paddingTop: "10px",
						fontWeight: "bold",
					}}
				>
					גרעין מומחים
				</div>

				<Row>
					<Col
						xs={12}
						md={6}
					>
						<div style={{ textAlign: "right", paddingTop: "10px" }}>
							סימון מקצוע
						</div>
						<FormGroup dir="rtl">
							<Input
								type="number"
								bsSize="lg"
								name={props.name1}
								value={props.value1}
								onChange={handleChange}
							/>
						</FormGroup>
					</Col>
					<Col
						xs={12}
						md={6}
					>
						<div style={{ textAlign: "right", paddingTop: "10px" }}>מצבה</div>
						<FormGroup dir="rtl">
							<Input
								type="number"
								bsSize="lg"
								name={props.name2}
								value={props.value2}
								onChange={handleChange}
							/>
						</FormGroup>
					</Col>
				</Row>
			</>

			<div
				style={{
					textAlign: "right",
					paddingTop: "10px",
					fontWeight: "bold",
				}}
			>
				בעלי תפקיד(קצינים,מנהלי עבודה,מחטפים)
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
									{
										id: generate(),
										name: "",
										teken: 0,
										matzva: 0,
									},
								]);
							}}
						>
							הוסף בעל תפקיד
						</Button>
					</>
				) : (
					finalspecialkeytwo.map((p, index) => {
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
													{
														id: generate(),
														name: "",
														teken: 0,
														matzva: 0,
													},
												]);
											}}
										>
											הוסף בעל תפקיד
										</Button>
									</Row>
								) : null}

								<Row>
									<Col
										xs={12}
										md={4}
									>
										<div>
											<p style={{ margin: "0px", float: "right" }}>תפקיד</p>
											<Input
												onChange={(e) => {
													const name = e.target.value;
													setFinalSpecialKeytwo((currentSpec) =>
														produce(currentSpec, (v) => {
															v[index].name = name;
														})
													);
												}}
												value={p.name}
												type="text"
												placeholder="תפקיד"
											/>
										</div>
									</Col>
									<Col
										xs={12}
										md={4}
									>
										<div>
											<p style={{ margin: "0px", float: "right" }}>תקן</p>
											<Input
												onChange={(e) => {
													const teken = e.target.value;
													setFinalSpecialKeytwo((currentSpec) =>
														produce(currentSpec, (v) => {
															v[index].teken = teken;
														})
													);
												}}
												value={p.teken}
												type="number"
												placeholder="תקן"
												min="0"
											/>
										</div>
									</Col>
									<Col
										xs={12}
										md={4}
									>
										<div>
											<p style={{ margin: "0px", float: "right" }}>מצבה</p>
											<Input
												onChange={(e) => {
													const matzva = e.target.value;
													setFinalSpecialKeytwo((currentSpec) =>
														produce(currentSpec, (v) => {
															v[index].matzva = matzva;
														})
													);
												}}
												value={p.matzva}
												type="number"
												placeholder="מצבה"
												min="0"
											/>
										</div>
									</Col>
								</Row>

								<Button
									type="button"
									onClick={() => {
										setFinalSpecialKeytwo((currentSpec) =>
											currentSpec.filter((x) => x.id !== p.id)
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

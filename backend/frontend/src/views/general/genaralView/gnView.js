import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, withRouter, Redirect } from "react-router-dom";
import {
	Grid,
	Input,
	Select,
	InputLabel,
	MenuItem,
	FormControl,
	TextField,
	FormControlLabel,
	Card,
	Typography,
	CardHeader,
	Button,
	Icon,
} from "@mui/material";
import axios from "axios";
import { CardBody } from "reactstrap";
import PropagateLoader from "react-spinners/PropagateLoader";
import { Dg } from "components/general/charts/Doughunt_pie";
import Minimize from "components/general/CollapseComponents/Minimize/Minimize";
import air from "../../../assets/img/unitsimg/avir.png";
import water from "../../../assets/img/unitsimg/yam.png";
import earth from "../../../assets/img/unitsimg/defaultTzahal.png";
import fire from "../../../assets/img/unitsimg/mekatnar58.png";
import { isAuthenticated } from "auth";
import { Testuser } from "components/packages/tester";

function Generalview(props) {
	//* states ----------------------------------------------------------------
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const { user } = isAuthenticated();

	//* functions ----------------------------------------------------------------
	const getpikod = () => {
		axios.get("http://localhost:8000/api/pikod").then((response) => {
			setData({ ...data, pikods: response.data });
			// console.log(response.data);
		});
	};
	//* mock data ----------------------------------------------------------------
	const mklabs = ["Red", "Blue", "Yellow"];
	const mklab = "mock";
	const mkdata = [300, 50, 100];

	useEffect(() => {
		setLoading(true);
		getpikod();
	}, []);

	useEffect(() => {
		if (Array.isArray(data.pikods)) {
			// console.log(data.pikods);
			setLoading(false);
		}
	}, [data.pikods]);

	return (
		<>
			{loading ? (
				<div style={{ width: "50%", marginTop: "30%" }}>
					<PropagateLoader
						color={"#ff4650"}
						loading={true}
						size={25}
					/>
				</div>
			) : (
				<>
					<Card
						style={{
							height: "5%",
							width: "90%",
							textAlign: "center",
							marginRight: "50px",
						}}
					>
						<CardBody>
							{Testuser.includes(user.personalnumber) ? (
								<>
									<Typography variant="h2">
										כשירות מסגרות הטנ"א - תמונת מצב {""}
										<img
											src={fire}
											height="150px"
											width="150px"
										/>{" "}
									</Typography>
								</>
							) : (
								<Typography>כשירות מסגאות הטנ"א - תמונת מצב</Typography>
							)}
						</CardBody>
					</Card>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
						style={{ marginTop: "3%" }}
					>
						{data.pikods.map((pk, index) => (
							<Grid
								item
								xs={2}
								sm={4}
								md={4}
								key={index}
							>
								<Card>
									<div
										style={{ textAlign: "right" }}
										// dir="rtl"
									>
										<Button
											// endIcon
											variant="text"
											style={{
												marginRight: "3rem",
												marginTop: "2%",
											}}
										>
											{pk.name}
										</Button>
									</div>
									<CardBody>
										{/*//TODO - get real data change to progress bar */}
										<Dg
											labels={mklabs}
											label={mklab}
											data={mkdata}
											dataArr={mkdata}
										/>
										<div style={{ textAlign: "center" }}>
											<Minimize relevantField={{ [pk.name]: false }}>
												<Typography>placeholder</Typography>
											</Minimize>
										</div>
									</CardBody>
								</Card>
							</Grid>
						))}
					</Grid>
				</>
			)}
		</>
	);
}
export default withRouter(Generalview);

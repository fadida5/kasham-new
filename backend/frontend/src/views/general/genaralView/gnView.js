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
	AppBar,
	Toolbar,
	IconButton,
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
import ProgressProvider from "components/general/CircularProgressBarAnimation/ProgressProvider";
import {
	buildStyles,
	CircularProgressbar,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import { Mclock } from "components/general/charts/MainClock";
import { loadOgdas } from "assets/unitFunctions/ogdas";
import { loadHativas } from "assets/unitFunctions/hativas";
import { loadGdods } from "assets/unitFunctions/gdods";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { GoBack } from "components/general/Buttons/GoBack";

function Generalview(props) {
	//* global ----------------------------------------------------------------
	const { user } = isAuthenticated();

	//* states ----------------------------------------------------------------
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);
	const [id, setId] = useState({});

	//* base functions ----------------------------------------------------------------
	const getpikod = async () => {
		await axios.get("http://localhost:8000/api/pikod").then((response) => {
			setData({ ...data, units: response.data });
			// console.log(response.data);
		});
	};

	//* change function --------------------------------------------------------
	async function handleChange(evt) {
		console.log(data.units);
		console.log(evt.target.name);
		const L_id = evt.target.name;
		// setId(L_id)
		const operator = L_id.split("")[0];
		console.log(operator);
		switch (operator) {
			case "P":
				// console.log(await loadOgdas(L_id));
				setData({ ...data, units: await loadOgdas(L_id) });
				setId({ ...id, pikod: L_id });
				// console.log(L_id);
				break;

			case "U":
				// console.log(await loadHativas(L_id));
				setData({ ...data, units: await loadHativas(L_id) });
				setId({ ...id, ogda: L_id });

				break;
			case "H":
				// console.log(await loadGdods(L_id));
				setData({ ...data, units: await loadGdods(L_id) });
				setId({ ...id, hativa: L_id });

				break;

			default:
				console.log(id);
				break;
		}
	}
	//* mock data ----------------------------------------------------------------

	useEffect(() => {
		setLoading(true);
		getpikod();
	}, []);

	useEffect(() => {
		if (Array.isArray(data.units)) {
			// console.log(data.units);
			setLoading(false);
		}
	}, [data.units]);

	return (
		<>
			{loading ? (
				<div style={{ width: "50%", marginTop: "30%" }}>
					<PropagateLoader color={"#ff4650"} loading={true} size={25} />
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
										<img src={fire} height="150px" width="150px" />{" "}
									</Typography>
								</>
							) : (
								<Typography>כשירות מסגאות הטנ"א - תמונת מצב</Typography>
							)}
						</CardBody>
					</Card>
					<div style={{ textAlign: "center", marginTop: "2%" }}>
						{id.pikod? <GoBack text="חזור לפיקוד" />: null}
					</div>
					<Grid
						container
						spacing={{ xs: 2, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
						style={{ marginTop: "3%" }}
					>
						{data.units.map((ut, index) => (
							<Grid item xs={2} sm={4} md={4} key={index}>
								<Card>
									<div
										style={{ textAlign: "right" }}
										// dir="rtl"
									>
										<Button
											// endIcon
											name={ut._id}
											variant="text"
											style={{
												marginRight: "3rem",
												marginTop: "2%",
											}}
											onClick={handleChange}
										>
											{ut.name}
										</Button>
									</div>
									<CardBody>
										{/*//TODO - get real data change to progress bar */}
										<div
											style={{
												height: "70%",
												width: "50%",
												textAlign: "center",
												marginRight: "25%",
												marginBottom: "5%",
											}}
										>
											<Mclock
												start={0}
												end={100}
												high={100}
												medium={70}
												high_color="green"
												medium_color="yellow"
												low_color="red"
											/>
										</div>
										<div style={{ textAlign: "center" }}>
											<Minimize relevantField={{ [ut.name]: false }}>
												{/* <Typography>placeholder</Typography> */}
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

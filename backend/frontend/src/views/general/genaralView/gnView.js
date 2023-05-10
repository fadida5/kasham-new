import React, { useState, useEffect, useRef } from "react";
import {
	useParams,
	Link,
	withRouter,
	Redirect,
	useLocation,
} from "react-router-dom";
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
	CardContent,
} from "@mui/material";
import axios from "axios";
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
import history from "../../../history";

function Generalview(props) {
	//* global ----------------------------------------------------------------
	const { user } = isAuthenticated();
	const location = useLocation();

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

	async function switch_fn(operator, _id, starter) {
		switch (operator) {
			case "P":
				// console.log(await loadOgdas(L_id));
				setData({ ...data, units: await loadOgdas(_id) });
				setId({ ...id, pikod: _id });
				// console.log(value);
				break;

			case "U":
				// console.log(await loadHativas(L_id));
				setData({ ...data, units: await loadHativas(_id) });
				// console.log(value);
				setId({ ...id, ogda: _id });

				break;
			case "H":
				// console.log(await loadGdods(L_id));
				setData({ ...data, units: await loadGdods(_id) });
				setId({ ...id, hativa: _id });
				break;

			default:
				if (!isNaN(operator)) {
					history.push(`/gdodpage/${_id}`);

					// console.log(_id);
				} else {
					// console.log(operator);
				}
				break;
		}
		if (starter) {
			setId({ ...id, pikod: "p" });
		}
	}

	//* change function --------------------------------------------------------
	function handleChange(evt) {
		// console.log(data.units);
		const L_id = evt.target.name;
		// setId(L_id)
		const operator = L_id.split("")[0];
		// console.log(operator);
		switch_fn(operator, L_id);
	}

	//* for going back
	async function handleChange2(evt) {
		// console.log(evt.target.name);
		const L_id = evt.target.name;
		// console.log(L_id);
		const operator = L_id.split("")[0];
		// console.log(operator);

		switch (operator) {
			case "P":
				// console.log(await loadOgdas(L_id));
				getpikod(); // console.log(L_id);
				setId({});
				break;

			case "U":
				// console.log(await loadHativas(L_id));
				setData({ ...data, units: await loadOgdas(id.pikod) });
				setId({ pikod: id.pikod });

				break;
			case "H":
				// console.log(await loadGdods(L_id));
				setData({ ...data, units: await loadHativas(id.ogda) });
				setId({ pikod: id.pikod, ogda: id.ogda });

				break;

			default:
				// console.log(id);
				getpikod();
				setId({});
				break;
		}
	}
	//* mock data ----------------------------------------------------------------

	useEffect(() => {
		setLoading(true);
		getpikod();
		const inherit = location.pathname.split("/")[2];
		const operator = location.pathname.split("/")[2].split("")[0];
		if (inherit !== "undefined") {
			switch_fn(operator, inherit, true);
		}
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
						<CardContent>
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
						</CardContent>
					</Card>
					<Grid
						container
						spacing={{ xs: 3, md: 3 }}
						columns={{ xs: 4, sm: 8, md: 12 }}
						style={{ marginTop: "3%" }}
					>
						<Grid item xs={2} sm={4} md={4}>
							<div style={{ textAlign: "center", marginTop: "2%" }}>
								{id.pikod ? (
									<GoBack
										name={id.pikod}
										text="חזור לפיקוד"
										onClick={handleChange2}
									/>
								) : null}
							</div>
						</Grid>
						<Grid item xs={2} sm={4} md={4}>
							<div style={{ textAlign: "center", marginTop: "2%" }}>
								{id.ogda ? (
									<GoBack
										name={id.ogda}
										text="חזור לאוגדה"
										onClick={handleChange2}
									/>
								) : null}
							</div>
						</Grid>
						<Grid item xs={2} sm={4} md={4}>
							<div style={{ textAlign: "center", marginTop: "2%" }}>
								{id.hativa ? (
									<GoBack
										name={id.hativa}
										text="חזור לחטיבה"
										onClick={handleChange2}
									/>
								) : null}
							</div>
						</Grid>
					</Grid>
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
											value={ut.name}
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
									<CardContent>
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
									</CardContent>
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

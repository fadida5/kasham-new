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
	LinearProgress,
} from "@mui/material";
import axios from "axios";
import Minimize from "components/general/CollapseComponents/Minimize/Minimize";
import { isAuthenticated } from "auth";
import PropagateLoader from "react-spinners/PropagateLoader";
import history from "../../../history";
import Gradeprogress from "components/general/progressbar/GradeProgress";

function GdodPage(props) {
	//* global ----------------------------------------------------------------

	const { user } = isAuthenticated();
	const location = useLocation();
	//* use state ----------------------------------------------------------------
	const [data, setData] = useState({});
	const [gdod, setGdod] = useState({});
	//* functions ----------------------------------------------------------------
	//* axios ----------------------------------------------------------------
	const getGdod = async (_id) => {
		await axios
			.get(`http://localhost:8000/api/gdod/${_id}`)
			.then((response) => {
				// console.log(response.data);
				setGdod({ ...response.data });
			});
	};
	const getGrade = async (_id) => {
		await axios
			.get(`http://localhost:8000/kshirot/getbygdod/${_id}`)
			.then((response) => {
				console.log(response.data);
				setData({ ...data, grade: response.data.grade });
			})
			.catch((err) => {
				setData({ ...data, new: true });
				// console.log(err);
			});
	};
	//* handel ----------------------------------------------------------------

	function handleChange(evt) {
		// console.log(evt.target.name);
		const L_id = evt.target.name;
		if (data.new) {
			history.push(`/kshirot/${L_id}`);
		}
	}
	//* use effects ----------------------------------------------------------------
	useEffect(() => {
		getGdod(location.pathname.split("/")[2]);
		getGrade(location.pathname.split("/")[2]);
		// setData({ gdod: location.pathname.split("/")[2] });
		// console.log(location.pathname.split("/")[2]);
		// console.log(getGdod(location.pathname.split("/")[2]));
		// setGdod(getGdod(location.pathname.split("/")[2]));
	}, []);

	return (
		<>
			{!gdod.name ? (
				<div style={{ width: "50%", marginTop: "30%" }}>
					<PropagateLoader color={"#ff4650"} loading={true} size={25} />
				</div>
			) : (
				<>
					<Card>
						<CardContent>
							<div style={{ textAlign: "center" }}>
								<Typography variant="h2">{gdod.name}</Typography>
							</div>
						</CardContent>
					</Card>
					<div style={{ marginRight: "25%" }}>
						<Card style={{ marginTop: "5%", width: "70%" }}>
							<CardContent>
								<div style={{ textAlign: "right" }} dir="rtl">
									<Typography variant="h3">כשירות נוכחית</Typography>
									{data.new ? (
										<>
											<Typography style={{ marginTop: "4%" }} variant="h5">
												לא קיימת כשירות נוכחית
											</Typography>
											<Button
												name={gdod._id}
												onClick={handleChange}
												size="large"
												style={{ marginTop: "4%" }}
												color="primary"
												variant="contained"
											>
												הוסף כשירות
											</Button>
										</>
									) : (
										<>
											{/* <LinearProgress  color="success" style={{marginTop: "5%" }} variant="determinate" value={data.grade} /> */}
											<div dir="rtl">
												<Typography style={{ marginTop: "2%" }} variant="h6">
													ציון כללי {~~data.grade}%
												</Typography>
											</div>
											<Gradeprogress
												style={{ marginTop: "4%" }}
												variant="determinate"
												value={data.grade}
											/>
										</>
									)}
								</div>
							</CardContent>
						</Card>
						<Card style={{ marginTop: "5%", width: "70%" }}>
							<CardContent>
								{data.new ? (
									<Typography style={{ textAlign: "right" }} variant="h4">
										לא קיימת היסטוריית כשירויות
									</Typography>
								) : (
									<></>
								)}
							</CardContent>
						</Card>
					</div>
				</>
			)}
		</>
	);
}

export default withRouter(GdodPage);

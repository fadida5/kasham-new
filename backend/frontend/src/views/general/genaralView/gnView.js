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
} from "@mui/material";
import axios from "axios";
import { CardBody } from "reactstrap";
import PropagateLoader from "react-spinners/PropagateLoader";

function Generalview(props) {
	//* states ----------------------------------------------------------------
	const [data, setData] = useState({});
	const [loading, setLoading] = useState(true);

	//* functions ----------------------------------------------------------------
	const getpikod = () => {
		axios.get("http://localhost:8000/api/pikod").then((response) => {
			setData({ ...data, pikods: response.data });
			// console.log(response.data);
		});
	};

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
							<Typography>כשירות מסגאות הטנ"א - תמונת מצב</Typography>
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
									<Typography style={{ textAlign: "right" }}>
										{pk.name}
									</Typography>
									<CardBody></CardBody>
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

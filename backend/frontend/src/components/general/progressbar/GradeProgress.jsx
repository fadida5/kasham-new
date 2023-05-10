import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress, {
	circularProgressClasses,
} from "@mui/material/CircularProgress";
import LinearProgress, {
	linearProgressClasses,
} from "@mui/material/LinearProgress";

const Gradeprogress = styled(LinearProgress)(({ theme }) => ({
	height: 15,
	borderRadius: 10,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor:
			theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 15,
		backgroundColor: theme.palette.mode === "light" ? "green" : "#308fe8",
	},
}));

export default Gradeprogress;

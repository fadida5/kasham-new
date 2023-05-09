import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Button } from "@mui/material";

export function GoBack(props) {
	return (
		<Button
			name={props.name}
			value={props.value}
			size="medium"
			color="success"
			style={{ fontSize: "18px" }}
			startIcon={
				<ArrowRightIcon
					fontSize="inherit"
					style={{
						marginLeft: "10px",
						width: "18px",
						color: "white",
					}}
				/>
			}
			variant="contained"
		>
			{props.text}
		</Button>
	);
}

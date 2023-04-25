import React, { useState } from "react";
import {
	// Collapse,
	UncontrolledCollapse,
	CardBody,
	Card,
	// Button,
	CardHeader,
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
import {
	TextField,
	FormControl,
	Grid,
	Button,
	IconButton,
	InputLabel,
	Collapse,
	Input,
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import styles from "../Toggle/AddComment.module.css";

const AddComment = (props) => {
	const [isopen, setIsopen] = useState(false);

	return (
		<Row>
			{isopen ? (
				<IconButton
							variant="contained"
					className={styles.closeButton}
					color="danger"
					onClick={() => setIsopen(!isopen)}
				>
					<CancelIcon/>
				</IconButton>
			) : (
				<Button
					className={styles.ActiveButton}
					size="small"
					style={{borderRadius: "20px", marginTop: "7px", marginBottom: "7px"}}
					variant="contained"
					color="primary"
					id="toggler"
					onClick={() => setIsopen(!isopen)}
					disabled={props.isDisabeld}
				>
					{props.btnName}
				</Button>
			)}

			<Collapse isOpen={isopen}>
				<div className={styles.togglediv}>הערות</div>
				<TextField
					className={styles.MainInput}
					variant="standard"
					bsSize="lg"
					label={props.name}
					value={props.value}
					onChange={props.handleChange}
					multiline

				/>
			</Collapse>
		</Row>
	);
};
export default AddComment;

import React, { useState } from "react";
import {
	Collapse,
	UncontrolledCollapse,
	CardBody,
	Card,
	Button,
	CardHeader,
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
import styles from "../Toggle/AddComment.module.css";

const AddComment = (props) => {
	const [isopen, setIsopen] = useState(false);

	return (
		<Row>
			{isopen ? (
				<Button
					className={styles.closeButton}
					color="danger"
					onClick={() => setIsopen(!isopen)}
				>
					X
				</Button>
			) : (
				<Button
					className={styles.ActiveButton}
					color="primary"
					id="toggler"
					onClick={() => setIsopen(!isopen)}
				>
					{props.btnName}
				</Button>
			)}

			<Collapse isOpen={isopen}>
				<div className={styles.togglediv}>הערות</div>
				<Input
					className={styles.MainInput}
					type="textarea"
					bsSize="lg"
					name={props.name}
					value={props.value}
					onChange={props.handleChange}
				/>
			</Collapse>
		</Row>
	);
};
export default AddComment;

import ProgressProvider from "components/general/CircularProgressBarAnimation/ProgressProvider";
import { useEffect } from "react";
import {
	buildStyles,
	CircularProgressbar,
	CircularProgressbarWithChildren,
} from "react-circular-progressbar";

export function Mclock(props) {
	// useEffect(() => {
	// 	if (!props.test) {

	// 		switch (true) {
	// 			case typeof props.start !== "number":
	// 				alert(`${props.start} is not a number`);
	// 				break;
	// 			case typeof props.end !== "number":
	// 				alert(`${props.end} is not a number`);
	// 				break;
	// 			case typeof props.hight !== "number":
	// 				alert(`${props.hight} is not a number`);
	// 				break;
	// 			case typeof props.medium !== "number":
	// 				alert(`${props.medium} is not a number`);
	// 				break;

	// 			default:
	// 				break;
	// 		}
	// 	}
	// }, []);

	return (
		<ProgressProvider valueStart={props.start} valueEnd={props.end}>
			{(value) => (
				<CircularProgressbarWithChildren
					value={value}
					/*text={`${value}%`}*/ styles={{
						root: {},
						path: {
							stroke: `${
								value == props.high
									? props.high_color
									: value >= props.medium
									? props.medium_color
									: props.low_color
							}`, // example == `${value == 100? 'green': 'red'}`
							strokeLinecap: "butt",
							transition: "stroke-dashoffset 0.5s ease 0s",
						},
						trail: {
							stroke: "rgb(141 141 141 / 30%)",
							strokeLinecap: "butt",
							transform: "rotate(0.25turn)",
							transformOrigin: "center center",
						},
						text: {
							fill: "#8ac926",
							fontSize: "18px",
						},
						background: {
							fill: "#3e98c7",
						},
					}}
				>
					<div>
						<h2 style={{ margin: "0px" }}>
							{props.info ? props.info : `${value.toFixed(0)}%`}
						</h2>
					</div>
				</CircularProgressbarWithChildren>
			)}
		</ProgressProvider>
	);
}

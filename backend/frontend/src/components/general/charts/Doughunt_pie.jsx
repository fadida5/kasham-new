import React, { useState, useEffect, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const Dg = (props) => {
	// ChartJS.register(ArcElement, Tooltip, Legend);

	const options = props.op
		? { ...props.op }
		: {
				//* on civil
				responsive: true,
				plugins: {
					legend: {
						display: true,
						position: "right",
						align: "center",
						fullSize: true,
					},
				},
		  };

	//* on Army :
	//! brakes after 2-3 fillter because of the size of the data
	// 		responsive: true,
	// 		legend: {
	// 			display: true,
	// 			position: "right",
	// 			align: "center",
	// 			fullSize: true,
	// 		},
	// };

	const colors = [
		"rgb(230, 115, 136)",
		"rgb(255, 94, 94)",
		"rgb(255, 129, 94)",
		"	rgb(255, 164, 94)",
		"rgb(255, 199, 94)",
		"rgb(255, 218, 94)",
		"rgb(255, 235, 95)",
		"rgb(255, 255, 94)",
		"rgb(189, 213, 78)",
		"rgb(118, 170, 62)",
		"rgb(48, 128, 47)",
		"rgb(31, 84, 83)",
		"rgb(63, 90, 171)",
		"rgb(94, 94, 255)",
		"rgb(95, 79, 214)",
		"rgb(94, 63, 171)",
		"rgb(96, 48, 130)",
		"rgb(121, 74, 148)",
		"rgb(147, 104, 166)",
		"rgb(195, 161, 201)",
	];

	function randomcolor(arr1) {
		// console.log(arr1);
		const colorsar = colors.map((col) => col).slice(0, arr1.length + 1);
		return colorsar;
	}

	const data = {
		labels: props.labels,
		datasets: [
			{
				label: props.header,
				data: props.data,
				backgroundColor: props.color ? props.color : randomcolor(props.dataArr),
				borderColor: props.borderColor
					? props.borderColor
					: "rgb(230, 115, 136)",
				borderWidth: 1,
			},
		],
	};

	useEffect(() => {
		switch (false) {
			case Array.isArray(props.labels):
				alert(`${props.labels} is not an array`);
				break;
			case Array.isArray(props.data):
				alert(`${props.data} is not an array`);
				break;
			case Array.isArray(props.dataArr):
				alert(`${props.dataArr} is not an array`);
				break;
			case typeof props.header != "string":
				alert(`${props.header} is not a string`);
				break;
			case !props.op:
				if (typeof props.op != "object") {
					alert(`${props.op} is not a object`);
				}
			default:
				break;
		}
	}, []);

	return (
		<>
			<Doughnut
				data={data}
				options={options}
			/>
		</>
	);
};

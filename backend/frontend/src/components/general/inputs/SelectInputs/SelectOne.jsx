import React, { useState, useEffect, useRef } from "react";

export const SelectOne = (props) => {
	//* state ----------------------------------------------------------------

	const [options, setOptions] = useState([]);

	//* functions ----------------------------------------------------------------
	function optionsForUnits(unit) {
		const temp = [];
		if (props.unit.length != 0) {
			temp.push({ value: "בחר", label: "בחר" });
		} else {
			alert("unit is empty");
		}
		unit.map((item) => {
			let val = item._id;
			let lab = item.name;
			temp.push({ value: val, label: lab });
		});
		if (temp.length === props.unit.length + 1) {
			setOptions(temp);
		} else {
			console.log(temp.length);
			console.log(props.unit.length);
			alert("something went wrong");
		}
	}

	function freeOptions(arr) {
		const temp = [];
		if (props.FreeOptions.length != 0) {
			temp.push({ value: "בחר", label: "בחר" });
		} else {
			alert("unit is empty");
		}
		arr.map((item) => {
			let val = item.value;
			let lab = item.name;
			temp.push({ value: val, label: lab });
		});
		if (temp.length === props.FreeOptions.length + 1) {
			setOptions(temp);
		} else {
			console.log(temp.length);
			console.log(props.FreeOptions.length);
			alert("something went wrong");
		}
	}

	//* useEffect ----------------------------------------------------------------

	useEffect(() => {
		switch (true) {
			//* unit ----------------------------------------------------------------
			case props.unit:
				if (Array.isArray(props.unit)) {
					let keys = Object.keys(props.unit[0]);
					if (keys.includes("name") && keys.includes("_id")) {
						optionsForUnits(props.unit);
					} else {
						alert(
							"the array need to be array of objetc with at least  _id and name"
						);
					}
				} else {
					alert("props.unit is not an array");
				}
				break;
			//* freeoptions ----------------------------------------------------------------
			case props.FreeOptions:
				if (Array.isArray(props.FreeOptions)) {
					let keys = Object.keys(props.FreeOptions[0]);
					if (keys.includes("name") && keys.includes("value")) {
						freeOptions(props.FreeOptions);
					} else {
						alert(
							"the array need to be array of objetc with at least  value and name"
						);
					}
				} else {
					alert("props.FreeOptions is not an array");
				}
				break;
			default:
				alert(
					"please inherent an unit (pikod,gdud... or mkabaz magad ...) or a free set of options. \n both shoud be an array of objects ;)"
				);
				break;
		}
	}, []);

	return <></>;
};

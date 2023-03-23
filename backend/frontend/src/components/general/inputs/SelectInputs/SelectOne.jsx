import React, { useState, useEffect, useRef } from "react";
import { Col } from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { ThemeContext } from "contexts/ThemeContext";

export const SelectOne = (props) => {
	//* state ----------------------------------------------------------------

	const [options, setOptions] = useState([]);

	const animatedComponents = makeAnimated();

	//* functions ----------------------------------------------------------------
	function optionsForUnits(unit) {
		const temp = [];
		if (props.hasNull) {
			if (unit.length != 0) {
				temp.push({ value: "בחר", label: "בחר" });
			} else {
				alert("unit is empty");
			}
		}
		unit.map((item, index) => {
			let val = item._id;
			let lab = item.name;
			temp.push({ value: val, label: lab });
		});
		if (
			props.hasNull
				? temp.length === unit.length + 1
				: temp.length === unit.length
		) {
			setOptions(temp);
		} else {
			console.log(temp.length);
			console.log(unit.length);
			alert("something went wrong");
		}
	}

	function freeOptions(arr) {
		const temp = [];
		if (props.hasNull) {
			if (arr.length != 0) {
				temp.push({ value: "בחר", label: "בחר" });
			} else {
				alert("unit is empty");
			}
		}
		arr.map((item, index) => {
			let val = item.value;
			let lab = item.name;
			temp.push({ value: val, label: lab });
		});
		if (
			props.hasNull
				? temp.length === arr.length + 1
				: temp.length === arr.length
		) {
			setOptions(temp);
		} else {
			console.log(temp.length);
			console.log(arr.length);
			alert("something went wrong");
		}
	}

	function handleChange(evt) {
		// console.log(evt);
		const val = evt.value;
		// console.log(val);
		// console.log(evt.target.name);
		// setTipulData({ ...tipuldata, [evt.target.name]: value });
		// console.log(tipuldata);
		props.handleCallBack({ label: props.name, value: val });
	}

	//* useEffect ----------------------------------------------------------------

	useEffect(() => {
		// console.log(theme);
		// console.log(props.value);
		// console.log(props.unit);
		switch (true) {
			//* unit ----------------------------------------------------------------
			case Array.isArray(props.unit):
				if (typeof props.unit[0] == "object") {
					let keys = Object.keys(props.unit[0]);
					if (keys.includes("name") && keys.includes("_id")) {
						optionsForUnits(props.unit);
					} else {
						console.log(
							"the array need to be array of objetc with at least  _id and name"
						);
					}
				} else {
					console.log("props.unit is not an array");
				}
				break;
			//* freeoptions ----------------------------------------------------------------
			case Array.isArray(props.FreeOptions):
				let keys = Object.keys(props.FreeOptions[0]);
				if (keys.includes("name") && keys.includes("value")) {
					freeOptions(props.FreeOptions);
				} else {
					alert(
						"the array need to be array of objetc with at least  value and name"
					);
				}

				break;
			default:
				console.log(props.FreeOptions);
				console.log(props.unit);
				alert(
					"please inherent an unit (pikod,gdud... or mkabaz magad ...) or a free set of options. \n both shoud be an array of objects ;)"
				);

				break;
		}
	}, [props.unit, props.FreeOptions]);

	return (
		<ThemeContext.Consumer>
			{({ changeTheme, theme }) => (
				<Col>
					{theme == "white-content" ? (
						<Select
							name={props.name}
							isMulti={false}
							// defaultValue={props.value}
							options={options}
							// value={props.value}
							onChange={handleChange}
							closeMenuOnSelect={true}
							components={animatedComponents}
							isDisabled={props.isDisabled}
							placeholder={props.value != undefined ? props.value : "בחר"}
						/>
					) : (
						<Select
							name={props.name}
							isMulti={false}
							// defaultValue={props.value}
							options={options}
							// value={props.value}
							onChange={handleChange}
							closeMenuOnSelect={true}
							components={animatedComponents}
							isDisabled={props.isDisabled}
							placeholder={props.value != undefined ? props.value : "בחר"}
							theme={(theme) => ({
								...theme,
								colors: {
									...theme.colors,
									neutral0: "#27293d",
									neutral5: "#1e1e2f",
									primary25: "#1e1e2f",
									primary50: "transparent",
									neutral50: "white",
									neutral80: "white",
								},
							})}
						/>
					)}
				</Col>
			)}
		</ThemeContext.Consumer>
	);
};

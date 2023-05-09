const { default: axios } = require("axios");

export const loadHativas = async (ogdaids) => {
	let tempogdaids = ogdaids;
	if (tempogdaids != undefined && !tempogdaids.isArray) {
		tempogdaids = [ogdaids];
	}
	let tempogdashativas = [];
	if (tempogdaids != undefined && tempogdaids.length > 0) {
		for (let i = 0; i < tempogdaids.length; i++) {
			await axios
				.post("http://localhost:8000/api/hativa/hativasbyogdaid", {
					ogda: tempogdaids[i],
				})
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						tempogdashativas.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
	return tempogdashativas;
};

import axios from "axios";

export const loadOgdas = async (pikodids) => {
	let temppikodids = pikodids;
	if (temppikodids != undefined && !temppikodids.isArray) {
		temppikodids = [pikodids];
	}
	let temppikodsogdas = [];
	if (temppikodids != undefined && temppikodids.length > 0) {
		for (let i = 0; i < temppikodids.length; i++) {
			await axios
				.post("http://localhost:8000/api/ogda/ogdasbypikodid", {
					pikod: temppikodids[i],
				})
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						temppikodsogdas.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
	return temppikodsogdas;
};

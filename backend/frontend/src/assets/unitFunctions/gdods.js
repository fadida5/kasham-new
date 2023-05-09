import axios from "axios";

export const loadGdods = async (hativaids) => {
	let temphativaids = hativaids;
	if (temphativaids != undefined && !temphativaids.isArray) {
		temphativaids = [hativaids];
	}
	let temphativasgdods = [];
	if (temphativaids != undefined && temphativaids.length > 0) {
		for (let i = 0; i < temphativaids.length; i++) {
			await axios
				.post("http://localhost:8000/api/gdod/gdodsbyhativaid", {
					hativa: temphativaids[i],
				})
				.then((response) => {
					for (let j = 0; j < response.data.length; j++)
						temphativasgdods.push(response.data[j]);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
	return temphativasgdods;
};

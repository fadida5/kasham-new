const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const jobSchema = new mongoose.Schema({
	id: { type: ObjectId },
	job: { type: Number },
	name: { type: String },
});

const job = mongoose.model("job", jobSchema);

module.exports = job;

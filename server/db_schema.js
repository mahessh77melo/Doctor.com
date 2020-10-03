const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// defining the structure of the database
const applicationSchema = new Schema(
	{
		patient: {
			type: String,
			required: true,
		},
		age: {
			type: String,
			required: true,
		},
		applicant: {
			type: String,
			required: true,
		},
		description: { type: String },
		date: { type: Date, required: true },
	},
	{ timestamps: true }
);

const Appointment = mongoose.model("Appointment", applicationSchema);
module.exports = Appointment;

const express = require("express");
const path = require("path");
const morgan = require("morgan");
const Appointment = require("./db_schema");
const mongoose = require("mongoose");
const http = require("http");
const url = require("url");

const app = express();
const baseDir = path.dirname(__dirname);

// Connect to mongodb server (local or atlas)
const dbAtlas =
	"mongodb+srv://magesh:mongo123@mycluster.rhps1.mongodb.net/doctor_db?retryWrites=true&w=majority";
const dbLocal = "mongodb://localhost:27107/doctor_db"; // local db url

mongoose
	.connect(dbAtlas, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((res) => {
		// Rendering the page at localhost and link for the localhost
		console.log("connected to the database");
		app.listen(3000);
		console.log("Rendering the page at http://localhost:3000");
	})
	.catch((err) => console.log(err));

// middleware for static files
app.use(express.static(path.join(baseDir, "/client/static")));
// comments on get and post requests that will appear in the console
app.use(morgan("dev"));
// form submission middleware code
app.use(express.urlencoded({ extended: true }));

// main page rendering
app.get("/", (req, res) => {
	res.sendFile("client/index.html", { root: path.resolve(__dirname, "..") });
});

//getting the form input
let body, onDate;
app.post("/submit", (req, res) => {
	body = req.body;
	console.log(body);
	const appointment = new Appointment(req.body);
	appointment
		.save()
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => console.log(err));
	// res.redirect("/");
	const [year, month, date] = req.body.date.split("-");
	const appTime = new Date(year, month - 1, date);
	onDate = appTime.toDateString();
});
app.get("/getdata", (req, res) => {
	let queryObject = url.parse(req.url, true).query;
	const query = JSON.parse(JSON.stringify(queryObject));
	console.log(query.patient);
	Appointment.findOne(query, (err, doc) => {
		if (err) {
			console.log(err);
		} else {
			console.log(doc);
			res.json(doc);
		}
	});
});
app.get("/application", (req, res) => {
	res.redirect("/#application");
});

// 404 page rendering
app.use((req, res) => {
	res
		.status(404)
		.sendFile("client/404.html", { root: path.resolve(__dirname, "..") });
});

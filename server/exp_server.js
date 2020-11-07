const express = require("express");
const path = require("path");
const morgan = require("morgan");
const Appointment = require("./db_schema");
const mongoose = require("mongoose");
const url = require("url");
const { dbLocal, dbAtlas } = require("./mongo_data");

const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
AdminBro.registerAdapter(AdminBroMongoose);

const app = express();
const baseDir = path.dirname(__dirname);
const port = 3000;

// DB connnection
const rundb = async () => {
	await mongoose
		.connect(dbAtlas, { useNewUrlParser: true, useUnifiedTopology: true })
		.then((res) => {
			// Rendering the page at localhost and link for the localhost
			console.log("connected to the database");
		})
		.catch((err) => console.log(err));
};
rundb();
app.listen(port);
console.log(`Rendering the page at http://localhost:${port}`);
const AdminBroOptions = {
	resources: [Appointment],
	databases: [],
	rootPath: "/admin",
};
const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);

// middleware for admin pages
app.use(adminBro.options.rootPath, router);
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
app.post("/submit", (req, res) => {
	let body = req.body;
	console.log(body);
	const appointment = new Appointment(req.body);
	appointment
		.save()
		.then(() => {
			res.redirect("/");
		})
		.catch((err) => console.log(err));
});

// Middleware for api request from frontend application query
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

// 404 page rendering
// If none of the above is matched, this code is read by the compiler and thus the 404 page is served.
app.use((req, res) => {
	res
		.status(404)
		.sendFile("client/404.html", { root: path.resolve(__dirname, "..") });
});

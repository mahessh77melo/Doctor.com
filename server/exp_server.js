const express = require("express");
const path = require("path");
const morgan = require("morgan");

const app = express();
const baseDir = path.dirname(__dirname);

// Rendering the page at localhost and link for the localhost
app.listen(3000);

console.log("Rendering the page at http://localhost:3000");

// middleware for static files

app.use(express.static(path.join(baseDir, "/client/static")));
// comments on get and post requests
app.use(morgan("dev"));

// main page rendering
app.get("/", (req, res) => {
	res.sendFile("client/index.html", { root: path.resolve(__dirname, "..") });
});

// 404 page rendering
app.use((req, res) => {
	res
		.status(404)
		.sendFile("client/404.html", { root: path.resolve(__dirname, "..") });
});

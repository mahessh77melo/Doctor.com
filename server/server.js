const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
	console.log(req.url, req.method);

	//set the header content type
	if (req.url.startsWith("/static/img/")) {
		fs.readFile(
			path.join(path.resolve(__dirname, ".."), "/client/", req.url),
			(err, data) => {
				console.log(
					path.join(path.resolve(__dirname, ".."), "/client/", req.url)
				);
				res.writeHead(200, { "Content-Type": "image/jpg" });
				res.end(data);
				if (err) {
					console.log(err);
				}
			}
		);
	} else if (req.url.startsWith("/static/css")) {
		fs.readFile("../client/static/css/doc_style.css", (err, data) => {
			res.setHeader("Content-Type", "stylesheet");
			res.end(data);
		});
	} else if (req.url === "/") {
		fs.readFile("../client/index.html", (err, data) => {
			if (err) {
				console.log(err);
				res.end();
			} else {
				res.setHeader("Content-Type", "text/html");
				res.statusCode = 200;
				res.write(data);
				res.end();
			}
		});
		// feed index.html
	} else {
		fs.readFile("../client/404.html", (err, data) => {
			if (err) {
				console.log(err);
			} else {
				res.statusCode = 404;
				res.setHeader("Content-Type", "text/html");
				res.end(data);
			}
		});
	}
});
server.listen("3000", "localhost", () => {
	console.log("Serving the webpage at http://localhost:3000");
});

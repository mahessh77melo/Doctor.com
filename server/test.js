// run this file to get all the entries in the database including the ones which you inserted recently  (if any)
// node test.js (in your cmd)

const mongoose = require("mongoose");
const Application = require("./db_schema");
mongoose.connect(
	"mongodb+srv://magesh:mongo123@mycluster.rhps1.mongodb.net/doctor_db?retryWrites=true&w=majority",
	{ useNewUrlParser: true, useUnifiedTopology: true }
);

Application.find((err, res) => {
	if (!err) {
		console.log(res);
	}
});

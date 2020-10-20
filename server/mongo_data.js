// Connect to mongodb server (local or atlas)

// Cloud data server (Atlas)
const dbAtlas =
	"mongodb+srv://magesh:mongo123@mycluster.rhps1.mongodb.net/doctor_db?retryWrites=true&w=majority";
// local db url
const dbLocal = "mongodb://localhost:27107/doctor_db";
module.exports = { dbLocal, dbAtlas };

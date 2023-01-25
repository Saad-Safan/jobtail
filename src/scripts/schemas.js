require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/test?retryWrites=true&w=majority`;
var database = new MongoClient(uri);
database.connect((err) => {
  const collection = database.db("test").collection("devices");
  // perform actions on the collection object
  database.close();
});

/* var Schema = database.Schema;

var JobSchema = new Schema({
  jobId: { type: String },
  company: { type: String },
  title: { type: String },
  description: { type: String },
  status: { type: String },
});

var UserJobsSchema = new Schema({
  user: { type: String },
  jobs: [JobSchema],
});

var UserJobs = MongoClient.model("userjobs", UserJobsSchema);

 */

const mongoose = require("mongoose");

function connect() {
  mongoose.connect(process.env.MONGO_CONNECTION);

  mongoose.connection.once("open", () => {
    console.log("Connected with Mongo");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Something went wrong: ", err);
  });

  return mongoose.connection;
}
module.exports = { connect };

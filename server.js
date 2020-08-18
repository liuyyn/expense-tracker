const express = require("express");
const dotenv = require("dotenv"); // allows us to create global variables
const colors = require("colors");
const morgan = require("morgan"); // logging
const mongoose = require("mongoose");
dotenv.config({ path: "./config/config.env" });
const transactions = require("./routes/transactions");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/transactions", transactions);

// connect to mongoDB
const db = process.env.mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("MongoDB connected...".blue.bold))
  .catch((e) => console.log(e));

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

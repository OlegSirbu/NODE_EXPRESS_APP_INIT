const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = mongoose.connect("mongodb://localhost/bookAPI");
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const Book = require("./models/bookModel");
const bookRouter = require("./routers/bookRouter")(Book);

app.use("/api", bookRouter);

app.get("/", (req, res) => {
  res.send("WELCOME!");
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});

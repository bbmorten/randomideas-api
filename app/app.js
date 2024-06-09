const express = require("express");
const app = express();
const cors = require("cors");
// mongodb
require("dotenv").config();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");

connectDB();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors()
); 

const indexRouter = require("./routes/index");
app.use("/api", indexRouter);
const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

// cors middleware


app.get("/", (req, res) => {
  res.send({ message: "Hello World Bülent Morten" });
  // res.json({ message: "Hello World"});
});

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

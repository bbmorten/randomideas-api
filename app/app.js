const express = require("express");
const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const indexRouter = require("./routes/index");
app.use("/api", indexRouter);
const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);
const usersRouter = require("./routes/users");
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
  res.send({ message : 'Hello World Bülent Morten' });
  // res.json({ message: "Hello World"});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

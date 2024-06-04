const express = require("express");
const app = express();

const ideasRouter = require("./routes/ideas");
app.use("/api/ideas", ideasRouter);

app.get("/", (req, res) => {
  res.send({ message : 'Hello World Bülent Morten' });
  // res.json({ message: "Hello World"});
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

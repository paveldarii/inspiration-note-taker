const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
//to get a static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "db")));

app.use("/api/notes", require("./routes/api/notes"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

// npm start & node index are gonna run the server without nodemon
// npm run dev will run with nodemon

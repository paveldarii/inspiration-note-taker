const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//to get a static folder
//app.use(express.static(path.join(__dirname, "public")));

app.use("/api/notes", require("./routes/api/notes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on ${PORT}`));

// npm start & node index are gonna run the server without nodemon
// npm run dev will run with nodemon

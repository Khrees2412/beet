const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const cookieparser = require("cookie-parser");
const connectDB = require("./database/config");
const routes = require("./routes/routes");

dotenv.config();
const app = express();

app.use(cookieparser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use("/api/v1", routes);

app.get("/", (req, res) => {
	res.send("<h1 style=`text-align:center`>You're home, :) </h1>");
});

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
	console.log(`server started at port ${PORT}`);
});

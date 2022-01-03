const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/config");
const routes = require("./routes/routes");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", routes);

app.get("/", (req, res) => {
	res.send("<h1>Home</h1>");
});

const PORT = process.env.PORT || 5000;
connectDB();

app.listen(PORT, () => {
	console.log(`server started at port ${PORT}`);
});

const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();
const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(mongoURI, {
			useNewUrlParser: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (err) {
		console.error(err);
	}
};

module.exports = connectDB;
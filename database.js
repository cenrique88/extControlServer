const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const user = process.env.MONGO_USERNAME;
const pass = process.env.MONGO_PASSWORD;

//const url = "mongodb://172.16.1.167:27017/database";
const url = `mongodb+srv://${user}:${pass}@app.mvtv3jd.mongodb.net/?retryWrites=true&w=majority&appName=app`;

const connectDB = async () => {
	try {
		await mongoose.connect(url);
		console.log("Conexión exitosa a MongoDB");
	} catch (error) {
		console.error("Error conectando a MongoDB:", error);
		process.exit(1);
	}
};

module.exports = connectDB;

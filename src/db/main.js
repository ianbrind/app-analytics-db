const mongoose = require("mongoose");
const DB_CONFIG = require("../../config").database;
const CONNECTION_STRING = `mongodb://${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.name}`;


mongoose.connect(CONNECTION_STRING, DB_CONFIG.mongoOptions, () => {
	console.log(`MongoDB connected to ${CONNECTION_STRING}`);
});

module.exports = mongoose;
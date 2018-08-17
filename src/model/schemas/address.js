const db = require("../db");

let AddressSchema = db.Schema({
	line_one: {
		type: String
	},
	town_city: {
		type: String
	},
	region: {
		type: String
	},
	country: {
		type: String
	},
	postcode: {
		type: String
	},
	route: {
		type: String
	},
	street_number: {
		type: String
	},
	position: { 
		type: [Number], 
		index: "2dsphere", 
	}

});

module.exports = AddressSchema;
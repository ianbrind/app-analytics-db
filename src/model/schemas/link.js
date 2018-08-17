const db = require("../../db/main");

let LinkSchema = db.Schema({
	title: {
		type: String
	},
	url: {
		type: String
	}
});

module.exports = LinkSchema;
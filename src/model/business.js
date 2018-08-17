const db = require("../db/main");

let BusinessSchema = db.Schema({
	title: {
		type: String,
		required: true,
		minLength: 1
	},

	createdon: {
		type: Date, 
		default: Date.now
	},
	updatedon: {
		type: Date, 
		default: Date.now
	}
});

BusinessSchema.pre("save", function (next) {

	//Update the timestamp which tracks when the last update on the object was.
	this.updatedon = new Date();

	next();
});

module.exports = db.model("Business", BusinessSchema);
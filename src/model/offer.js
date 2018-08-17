const db = require("../db/main");

let OfferSchema = db.Schema({
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

OfferSchema.pre("save", function (next) {

	//Update the timestamp which tracks when the last update on the object was.
	this.updatedon = new Date();

	next();
});

module.exports = db.model("Offer", OfferSchema);
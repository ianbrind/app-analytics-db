const db = require("../db/main");

let model = db.Schema({
    createdon: {
		type: Date, 
		default: Date.now
	},
	updatedon: {
		type: Date, 
		default: Date.now
	},
    active: {
        type: Boolean,
        default: true
    }
}, {strict: false});

model.pre("save", function (next) {
	// Keep track of when the object was last updated
	this.updatedon = new Date();
	next();
});

module.exports = db.model("App", model);

/**
 * The file was generated using the femgoose cli-tools, femgoose will be happy!
 */
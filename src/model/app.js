const db = require("../db/main");
const uuidv4 = require("uuid/v4");

let model = db.Schema({
    uuid: {
        type: String,
        index: true,
        unique: true,

        default: uuidv4
    },
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
});

model.pre("save", function (next) {
	// Keep track of when the object was last updated
	this.updatedon = new Date();
	next();
});


module.exports = db.model("App", model);

/**
 * The file was generated using the femgoose cli-tools, femgoose will be happy!
 */
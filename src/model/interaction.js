const db = require("../db/main");
const uuidv3 = require("uuid/v3");
const uuidv4 = require("uuid/v4");

let model = db.Schema({
    uuid: uuid4, // Random uuid
    props: {}, // Running with the flexibility of Mixed to begin with
    intent: {
        type: String,
        enum: ["Open", "Close", "Error", "Navigate", "Request", "Submit"]
    },
    app_uuid: { // link to an App entity
        type: db.Schema.Types.ObjectId, ref: 'App'
    },
    user_uuid: {
        type: String,
        set: setUuid
    },
    user_group_uuid: {
        type: String,
        set: setUuid
    },
    createdon: {
		type: Date, 
		default: Date.now
	},
	updatedon: {
		type: Date, 
		default: Date.now
	},
}, { retainKeyOrder: true });

model.pre("save", function (next) {
	// Keep track of when the object was last updated
	this.updatedon = new Date();
	next();
});

// Generates a uuid using the app_uuid as a namespace
function setUuid (v) {
    return uuidv3(v, this.app_uuid);
}

module.exports = db.model("Interaction", model);

/**
 * The file was generated using the femgoose cli-tools, femgoose will be happy!
 */
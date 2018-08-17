const db = require("../db/main");
const LinkSchema = require("./schemas/link");

let GalleryItemSchema = db.Schema({
	image: {
		type: db.Schema.Types.ObjectId,
		ref: "MediaEntity",
		required: true
	},
	description: {
		type: String,
	},
	title: {
		type: String
	},
	link: {
		type: LinkSchema
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

GalleryItemSchema.pre("save", function (next) {

	//Update the timestamp which tracks when the last update on the object was.
	this.updatedon = new Date();

	next();
});

module.exports = db.model("GalleryItem", GalleryItemSchema);
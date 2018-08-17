const Business = require("../../model/offer");
const MediaEntity = require("../../model/mediaentity");
const ProcessorResponse = require("../../lib/classes/processor-response");
const Uploads = require("../../../config").app.uploads;
const FileSystem = require("../../lib/classes/filesystem");
const MediaClass = require("../../lib/classes/media");

//Where the uploaded images will be moved to
const IMAGE_DIR = Uploads.ASSET_BASE_URL + "business/";

const create = (props, cb) => {
		

	let item = new Business(props);

	item.save(cb);
};

const processor = (data, cb) => {
	
	let file = data.props.file;

	const FILE_PATH = IMAGE_DIR + file.filename;

	MediaClass.processMediaEntity(data.user._id, data.props.file, FILE_PATH, (err, media) => {
		
		if (err) {
			console.error(err);
			return cb (new ProcessorResponse(err, {message: "Error saving image."}, 500));
		}
		
		data.props.image = media;

		create(data.props, (err, result) => {

			if (err) {
				console.error(err);
				return cb (new ProcessorResponse(err, {message: "Error saving offer."}, 500));
			}

			return cb (new ProcessorResponse(null, {message: "Success"}));
		});
	});
};

module.exports = processor;
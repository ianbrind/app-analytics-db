const App = require("../../model/app");
const ProcessorResponse = require("../../lib/classes/processor-response");

const getList = (props, skip, limit, cb) => {
	
	App.find()
		.sort({createdon: -1})
		.skip(skip)
		.limit(limit)
		.exec(cb);
};

const processor = (data, cb) => {
	let skip = parseInt((data.props.skip || 0));
	let limit = parseInt((data.props.limit || 0));
	
	getList(data.props, skip, limit, (err, gallery) => {
		if (err) {
			console.error(err);
			return cb (new ProcessorResponse(err, {message: "Error getting items."}, 500));
		}

		return cb (new ProcessorResponse(null, gallery));
	});
};

module.exports = processor;
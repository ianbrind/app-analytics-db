const App = require("../../model/app");
const ProcessorResponse = require("../../lib/classes/processor-response");

const deleteFn = (props, cb) => {
	App.findByIdAndRemove(props._id, cb);
};

const processor = (data, cb) => {
	deleteFn(data.props, (err, result) => {
		if (err) {
            console.error(err);
			return cb (new ProcessorResponse(err, {message: "Error deleting App."}, 500));
		}

		return cb (new ProcessorResponse(null, {message: "Success"}));
	});
};

module.exports = processor;
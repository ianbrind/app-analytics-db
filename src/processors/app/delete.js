const App = require("../../model/app");
const ProcessorResponse = require("../../lib/classes/processor-response");

const delete = (props, cb) => {
	App.remove({_id: props._id}, cb);
};

const processor = (data, cb) => {
	delete(data.props, (err, result) => {
		if (err) {
            console.error(err);
			return cb (new ProcessorResponse(err, {message: "Error deleting App."}, 500));
		}

		return cb (new ProcessorResponse(null, {message: "Success"}));
	});
};

module.exports = processor;
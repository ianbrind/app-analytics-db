const Interaction = require("../../model/interaction");
const ProcessorResponse = require("../../lib/classes/processor-response");

const deleteModel = (props, cb) => {
	Interaction.remove({_id: props._id}, cb);
};

const processor = (data, cb) => {
	deleteModel(data.props, (err, result) => {
		if (err) {
            console.error(err);
			return cb (new ProcessorResponse(err, {message: "Error deleting Interaction."}, 500));
		}

		return cb (new ProcessorResponse(null, {message: "Success"}));
	});
};

module.exports = processor;
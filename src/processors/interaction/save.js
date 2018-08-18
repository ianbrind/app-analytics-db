const Interaction = require("../../model/interaction");
const Processor = require("../../lib/classes/processor");

const saveFn = (props, cb) => {
    if (Object.hasOwnProperty.call(props, "_id")) {
        Interaction.findByIdAndUpdate(props._id, { $set: props }, {new: true}, cb);
    } else {
	    let obj = new Interaction(props);
	    obj.save(cb);
    }
};

const processor = (data, cb) => {
	saveFn(data.props, (err, result) => {
		if (err) {
            console.error(err);
			return cb (new Processor.Response(err, {message: "Error creating Interaction."}, Processor.getStatusCode("error")));
		}

		return cb (new Processor.Response(null, {
            message: "Success",
            data: result
        }));
	});
};

module.exports = processor;
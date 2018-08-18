const App = require("../../model/app");
const Processor = require("../../lib/classes/processor");

const saveFn = (props, cb) => {
    if (Object.hasOwnProperty.call(props, "_id")) {
        App.findByIdAndUpdate(props._id, props, {new: true}, cb);
    } else {
	    let obj = new App(props);
	    obj.save(cb);
    }
};

const processor = (data, cb) => {
	saveFn(data.props, (err, result) => {
		if (err) {
            console.error(err);
			return cb (new Processor.Response(err, {message: "Error creating App."}, Processor.getStatusCode("error")));
		}

		return cb (new Processor.Response(null, {
            message: "Success",
            data: result
        }));
	});
};

module.exports = processor;
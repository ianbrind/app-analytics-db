const Business = require("../../model/business");
const ProcessorResponse = require("../../lib/classes/processor-response");

const getList = (props, skip, limit, cb) => {
	
	Business
		.find({})
		.sort({
			title: 1
		})
		.skip(parseInt(skip, 10))
		.limit(parseInt(limit, 10))
		.exec(cb);
};

const processor = (data, cb) => {
		
	let props = data.props;
	
	getList(props, props.skip, props.limit, (err, businesses) => {

		if (err) {
			console.error(err);
			return cb (new ProcessorResponse(err, {message: "Error getting business items."}, 500));
		}

		return cb (new ProcessorResponse(null, businesses));
	});
};

module.exports = processor;
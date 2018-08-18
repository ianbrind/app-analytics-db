const Interaction = require("../../model/interaction");
const ProcessorResponse = require("../../lib/classes/processor-response");

const get = (query, cb) => {
    Interaction.findOne(query).exec(cb);
};

const processor = (data, cb) => {

    const query = {
        _id: data.props.id
    };

    get(query, (err, obj) => {
        if (err) {
            return cb(new ProcessorResponse(err, null));
        }

        return cb(new ProcessorResponse(null, obj));
    });
};

module.exports = processor;
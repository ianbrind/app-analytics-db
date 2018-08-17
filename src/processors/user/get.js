const User = require("../../model/user");
const ProcessorResponse = require("../../lib/classes/processor-response");

const getUser = (query, cb) => {
    
    User
        .findOne(query)
        .select("first_name last_name")
        .populate("avatar")
        .exec((err, user) => {

            return cb(err, user);
        });
};

const processor = (data, cb) => {

    const query = {

        //Default to looking for a given ID, fallback to using the 
        //user making the request
        _id: data._id || data.user._id
    };

    getUser(query, (err, user) => {
        
        if (err) {
            return cb(new ProcessorResponse(err, null));
        }

        return cb(new ProcessorResponse(null, {
            data: user
        }));
    });
 
};

module.exports = processor;
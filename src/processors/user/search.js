const User = require("../../model/user");
const ProcessorResponse = require("../../lib/classes/processor-response");
const JSHELP = require("../../lib/classes/js-help");

const getCount = (query, cb) => {
    
    User
        .count(query)
        .exec(cb);
};

const getUsers = (username, cb) => {
    
    User
        .findByUsername(username)
        .select("first_name last_name")
        .exec((err, users) => {

            if (err) {
                return cb(err, {message: "Error searching users."});
            }

            return cb(null, users);
        });
};

const processor = (data, cb) => {

    const username = data.props.query;

    if (!username && JSHELP.typeof(username) !== "string") {
        return cb(new ProcessorResponse(true, {message: "No query sent with request"}, 500));
    }

    getCount({username: (username.length) ? username : ""}, (err, count) => {

        if (err) {
            return cb(new ProcessorResponse(err, {message: "Error counting users."}, 500));
        }

        getUsers(username, (err, users) => {
            
            if (err) {
                return cb(new ProcessorResponse(err, {message: "Error finding users."}, 500));
            }

            return cb(new ProcessorResponse(null, {
                count: count, 
                data: users
            }));
        });
    }); 
 
};

module.exports = processor;
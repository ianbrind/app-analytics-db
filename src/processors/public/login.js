const jwt = require("jwt-simple");
const APP_CONFIG = require("../../../config");
const User = require("../../model/user");
const ProcessorResponse = require("../../lib/classes/processor-response");


const findUser = (email, cb) => {

    User
        .findOne({
            email: email
        })
        .select("email password")
        .exec(cb);
};

const validateUser = (user, password, cb) => {

    //Validate the user's password
    user.validatePassword(password, (err, result) => {
        
        //We'll pass this back to the client if successful 
        let api_token = "";

        if (err) {

            return cb(err, {message: "Error validating password."});
        }

        if (result === false) {

            return cb(err, {message: "Invalid password."});
        }

        return cb(null, true);
    });
};

let generateApiToken = (user) => {

    return jwt.encode({
        _id: user._id
    }, APP_CONFIG.security.jwt_secret);
};

/**
 * @function processor Authenticate a user, allowing them to access the API
 */
let processor = (data, cb) => {

    const email = data.props.email || "";
    const password = data.props.password || "";

    findUser(email, (err, user) => {

        if (err) {
            return cb(new ProcessorResponse(err, {message: "Error finding user."}, 500));
        }
        if (!user) {
            return cb(new ProcessorResponse(true, {message: "No user found."}, 404));
        }
        
        validateUser(user, password, (err, token) => {

            if (err) {
                return cb(new ProcessorResponse(err, {message: "Error authenticating."}, 401));
            }

            if (!token) {
                return cb(new ProcessorResponse(err, {message: "Error generating auth token."}, 401));
            }

            return cb(new ProcessorResponse(null, {
                jwt: generateApiToken(user),
                user: {
                    _id: user._id
                }
            }));            
        });
    });

};

module.exports = processor;
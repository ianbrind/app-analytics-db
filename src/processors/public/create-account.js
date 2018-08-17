const User = require("../../model/user");
const ProcessorResponse = require("../../lib/classes/processor-response");


/**
 * @function checkUser Checks for a user existing with the provided email address, change this to the unique identifier for your users,
 * e.g. username, if username is your unique field for users
 * @param {String} email email address provided by the registration form. 
 * @param {Function} cb Callback function
 */
const checkUser = (email, cb) => {

    User.count({
        email: email
    })
    .exec(cb);
}

const createUser = (data, cb) => {

    let user = new User(data);

    User.generateHash(user.password, (err, hash) => {
        
        if (err) {
            return cb(true, {message:"Error generating password."})
        }

        //Update the password with the hash
        user.password = hash;

        user.save(cb);
    });
};

const processor = (data, cb) => {

    if (!data.props.email) {
        return cb (new ProcessorResponse(true, {message:"No email provided."}, 500));
    }

    //First, check we're able to create the account with the email address    
    checkUser(data.props.email, (err, count) => {

        if (err) {
            return cb(new ProcessorResponse(err, {message: "Error validating user."}, 500));
        }

        if (count > 0) {
            return cb(new ProcessorResponse(true, {message: "There is already an account on the system with the provided email address."}, 500));
        }

        createUser(data.props, (err, user) => {
                
            if (err) {
                return cb(new ProcessorResponse(err, null, 500));
            }   

            user.password = null;
            
            return cb(new ProcessorResponse(null, {
                data: user
            }));
        });

    });
};

module.exports = processor;
const jwt = require("jwt-simple");
const APP_CONFIG = require("../../config");
	

module.exports = (req, res, next) => {
	
	//Get the token from the request
	let token = req.headers["x-auth"] || req.params.jwt || req.query.jwt;
	let decoded = null;

	if (!token) {
		return res.status(401).json({message: "No token sent with request."});
	}

	//Try decode the JWT token
	try {	
		decoded = jwt.decode(token, APP_CONFIG.security.jwt_secret);
	
	} catch (e) {

		return res.status(401).json({message: "Error decoding token."});
	}

	if (!decoded) {
		return res.status(401).json({message: "Unauthorized."});
	}
	
	req.user = decoded;
	req.jwt = token;
	
	next();
};



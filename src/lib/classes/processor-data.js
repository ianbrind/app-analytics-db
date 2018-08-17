/*
* @overview Data structure which gets passed to the processors
*/

const _ = require("lodash");

/*
 * @param {Object} req - Request response object
*/
class ProcessorData {

	/*
	* @param {Object} req - express request object
	*/
	constructor (req) {

		//Merge all data passed by the client in the request
		this.props = _.merge(req.body, req.params, req.query);

		//Store reference to the user
		this.user = req.user || null;
		
		//Reference any files sent up
		this.props.file = req.file || null;
		this.props.files = req.files || null;

		//API connected devices (Mobile app..) will send x-client header with requests, web context is implied.
		this.client = (req.headers) ? (req.headers["x-client"] || (req.client || "web")) : "web";
	}
}

module.exports = ProcessorData;

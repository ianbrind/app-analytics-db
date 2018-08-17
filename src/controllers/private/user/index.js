const router = require("express").Router();
const ProcessorData = require("../../../lib/classes/processor-data");
const GetProcessor = require("../../../processors/user/get");
const SearchProcessor = require("../../../processors/user/search");

router.get("/", (req, res) => {
	
	GetProcessor(new ProcessorData(req), (result) => {

		if (result.err) {
			return res.status(result.status).json(result.data);
		}

		return res.json(result.data); 
	});
});

router.get("/search", (req, res) => {
	
	SearchProcessor(new ProcessorData(req), (result) => {

		if (result.err) {
			return res.status(result.status).json(result.data);
		}

		return res.json(result.data); 
	});
});

module.exports = router;
const router = require("express").Router();
const ProcessorData = require("../../../lib/classes/processor-data");
const CreateProcessor = require("../../../processors/offer/create");
const GetListProcessor = require("../../../processors/offer/getlist");
const UploadConfig = require("../../../../config").app.uploads;


router.get("/list", (req, res) => {

	GetListProcessor(new ProcessorData(req), (result) => {

		if (result.err) {
			return res.status(result.status).json(result.data);
		}
		
		return res.json(result.data); 
	});
});

router.post("/", UploadConfig.Offer.single("file"), UploadConfig.compressImages, (req, res) => {

	CreateProcessor(new ProcessorData(req), (result) => {

		if (result.err) {
			return res.status(result.status).json(result.data);
		}
		
		return res.json(result.data); 
	});
});

module.exports = router;
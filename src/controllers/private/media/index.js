const router = require("express").Router();
// const ProcessorData = require("../../../classes/lib/processor-data");
// const UploadProcessor = require("../../../processors/media/upload");
const StreamProcessor = require("../../../processors/media/stream");
// const GetProcessor = require("../../../processors/media/get");
// const DeleteProcessor = require("../../../processors/media/delete");


router.get("/stream/:media_id", StreamProcessor);

// router.get("/stream/video/:media_id", VideoStreamProcessor);

// router.delete("/:media_id", DeleteProcessor);

module.exports = router;
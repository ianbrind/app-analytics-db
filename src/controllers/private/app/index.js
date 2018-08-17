const router = require("express").Router();
const Processor = require("../../../lib/classes/processor");

const CrudProcessors = {
    "Get": "app/get",
    "Save": "app/save",
    "List": "app/list",
    "Delete": "app/delete",
}

router.get("/list", (req, res) => {
    Processor.run(CrudProcessors.List, req).then( (result) => {
        return res.json(result.data);
    }).catch( (result) => {
        return res.status(result.status).json(result.data);
    })
});

router.get("/:id", (req, res) => {
    Processor.run(CrudProcessors.Get, req).then( (result) => {
        return res.json(result.data);
    }).catch( (result) => {
        return res.status(result.status).json(result.data);
    })
});

router.post("/", (req, res) => {
    Processor.run(CrudProcessors.Save, req).then( (result) => {
        return res.json(result.data);
    }).catch( (result) => {
        return res.status(result.status).json(result.data);
    })
});

router.put("/", (req, res) => {
    Processor.run(CrudProcessors.Save, req).then( (result) => {
        return res.json(result.data);
    }).catch( (result) => {
        return res.status(result.status).json(result.data);
    })
});

router.delete("/:_id", (req, res) => {
    Processor.run(CrudProcessors.Delete, req).then( (result) => {
        return res.json(result.data);
    }).catch( (result) => {
        return res.status(result.status).json(result.data);
    })
});

module.exports = router;
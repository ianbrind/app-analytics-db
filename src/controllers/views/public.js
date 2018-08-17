const express = require("express");
const router = express.Router();
const path = require("path");
const view_dir = path.join(__dirname, "../../../views");

router.use(express.static(view_dir, { 
	redirect : false, 
	maxAge: "7 days"
}));

router.get("/", (req, res, next) => {
    
    if (req.user || (req.session && req.session.user)) {
        console.log("Public redirect.");
        return res.redirect("/app");
    }

	//Response options
	var options = {
		root: path.join(__dirname, "../../"),
    };
    
    res.sendFile("views/layouts/public.html", options);			
});

module.exports = router;
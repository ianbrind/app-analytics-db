const express = require("express");
const router = express.Router();
const path = require("path");
const _ = require("lodash");
const fs = require("fs");
const view_dir = path.join(__dirname, "../../../views");

router.use(express.static(view_dir, { 
	redirect : false, 
	maxAge: "7 days"
}));

router.get("*", (req, res) => {
	
	//Response options
	var options = {
		root: path.join(__dirname, "../../"),
	};

	//Redirect them back to the public context if they're not authenticated.
	if (!req.session || !req.session.access_token) {
		console.log("Redirecting user due to no user object found on the request. Private view ctrl.");	
		console.warn("Redirecting user due to no user object found on the request. Private view ctrl.");	
		return res.redirect("/");
	} 

	let token = req.jwt;

	//Check the file exists first.
	fs.access("src/views/layouts/private.html", fs.constants.F_OK, (err) => {

		//This should be handled better.
		if (err) {

			console.warn("Redirecting user due to an error being thrown checking the file. Private view ctrl.");		
			return res.redirect("/");
		}

		return res.render("layouts/private", {
			locals: {
				token: token
			}
		});
	});


});

module.exports = router;
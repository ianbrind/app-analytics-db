const config = require("../config/index");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const AppClass = require("./lib/classes/app");
const compression = require("compression");
const db = require("./db/main");
const cors = require("cors");
const fs = require("fs");
const es6Renderer = require("express-es6-template-engine");
const path = require("path");

//Define the express app object
let app = express();
let App = new AppClass(app);

app.use(session({
	//Uses mongodb store as the default persistent session store.
	store: new MongoStore({ mongooseConnection: db.connection }),
	secret: config.security.cookie_secret,
	maxAge: 600000,
	resave: true,
	saveUninitialized: true,
	cookie: { secure: false }
}));

//For parsing request JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

//Permit cross origin requests 
app.use(cors());

// trust first proxy, this should be enabled if you're running the app behind a proxy
app.set('trust proxy', 1) 

//Setup template rendering
app.engine("html", es6Renderer);

//Set the root view directory
app.set("views", "./src/views");

//Assign the template engine as the default view engine of express
app.set("view engine", "html");

//Enables gzip compression
app.use(compression());

//Static file handling
app.use(express.static(path.join(__dirname, "../assets/dist"), { maxage: "1d" }));

//Publicly accessible API routes
app.use("/api/public", require("./controllers/public/index"));

//This protects anything inside the /api url namespace
app.use("/api", require("./middleware/jwt-auth"));
app.use("/app", require("./middleware/session")); 
	
//Serve views for the public context
//!!!!!!!! This seems to be getting hit when the user is authenticated...
app.use("/", require("./controllers/views/public"));


//Programmatically require all of the private API controllers 
fs.readdir("./src/controllers/private", (err, files) => {
	
	if (err) {
		console.warn("Error reading files for controller requires.");
		console.warn(err);
		process.exit(1);
	}

	files.forEach((file) => {
		app.use(`/api/${file}`, require(`./controllers/private/${file}/index`));
	});

	//Serve the app context's views
	app.use("/app", require("./controllers/views/private"));

	//Final route, if nothing is hit, redirect to the public page
	app.get("*", (req, res) => {
		console.log("No route found, redirecting to /");
		res.status(404).redirect("/");
	});

	//Start the application, we're now live!
	App.run(app);
});


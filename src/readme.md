## Controllers

## DB
The DB directory includes all available database connections to the app. 

If you want to connect to multiple data sources, place your database connection logic inside a file in here and export the appropriate object. 

This application ships with a single 'main' connection, which is a mongoose connection connected to the database name defined in the application's config file. 

## Lib  
Place any reuseable code files in here, there's a differentiation between lib and middleware in the project.

If a module / file is solely to be used as a piece of middlware in the API, place that inside the /src/middleware folder, otherwise the logical place for it is Lib.

## Middleware
Place any API middleware functions inside the middleware directory, e.g. authentication middleware, etc.

## Model

Save all of your database model and schema files inside the model directory.  

## Processors
Processors are the building blocks of your API, a processor is an abstraction of a "job", each job in your system should be implemented through processors.

For example, the application ships with a "Login" processor, this is called from the controller route which handles user's logging into the API. 

Processors can be called from anywhere within the application, 

Below is an example of the login processor being called. You'll see that you can use the processors to keep your core business logic seperate from your controller files. 

`
/*src/controllers/public/index.js*/
const router = require("express").Router();
const ProcessorData = require("../../lib/classes/processor-data");
...
//Require the login processor
const LoginProcessor = require("../../processors/public/login");

...

router.post("/login", (req, res) => {
	
  //Calling the login processor, passing in the request object, this passes props from the request to the processor
	LoginProcessor(new ProcessorData(req), (result) => {

    //Handle any logic after the processor has run...
		if (result.err) {

			return res.status(result.status).json(result.data);
		}

		//Return early if no session is required, i.e. a mobile app user is logging in
		if (req.headers["x-client"] === "app") {
			return res.json(result.data); 		
		}

		//Indicates that the response to the request can be exposed to the page
		res.setHeader("Access-Control-Allow-Credentials", "true");
						
		//Set the user model on the session
		req.session.user = result.data.user;

		//Set the access token on the session so we can inject it into the web context
		req.session.access_token = result.data.jwt;

		//Save the session explitely so we know it will be up-to-date when the front-end redirects to /app
		req.session.save(function () {

			
			return res.json(result.data);			
		});
	});`

The login call above uses some logic, this is an uncommon example, it's neccesary in this case because we don't want the processor's to be tied to the express's req, res properties directly, this is by design, we may want to use the processors from within a websocket event handler, etc. We do not want to tie into express directly. With that said, you'll see that after the login processor is called, we simply use the processor's response to place some data directly on the req and res objects before returning. 

A more typical example of how you'll most commonly see processor calls used in your API is the user search API route shipped with the application. 

`
/*src/controllers/private/user/index.js*/
const router = require("express").Router();
const ProcessorData = require("../../../lib/classes/processor-data");
...
const SearchProcessor = require("../../../processors/user/search");

router.get("/search", (req, res) => {
	
  //We simply call the processor, pass the req object, and handle the response with an error check before returning
	SearchProcessor(new ProcessorData(req), (result) => {

		if (result.err) {
			return res.status(result.status).json(result.data);
		}

		return res.json(result.data); 
	});
});

`
Nice and simple. 

Processors should form the core of your application's logic. They make your application logic easier to test in isolation, and provide an abstraction layer away from express, so should you want to port your app away from express, you simply need to adhere to the processor's input parameter interface. 

## Views

The base directory for any views/templates that your application will serve. 

This directory is shipped with a "public" and "private" context, this seperates your application's public and private context. 

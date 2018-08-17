/**
 * @param {Object} APP Application object, all app logic is stored within this object. 
 */
(function (App) {

    "use strict";

    //API endpoint.
    var API_BASE_URL = "http://localhost:5556/";
    var API_KEY_ID = "fs-express-mongoose-api-key";
    var APP_BASE_URL = "/app";

    /**
     * @function namespace Non-destructive namespacing function
     */
	App.namespace = function (namespace_string) {

		var parts = namespace_string.split("."),
			parent = App,
			i = 0

		//strip redundant leading global if it exists
		if (parts[0] === "BPP") {
			parts = parts.slice(1);
		}

		for (i = 0; i < parts.length; i++) {
			//Create a property if it doesn't exist
			if (typeof parent[parts[i]] === "undefined") {
				parent[parts[i]] = {};
			}

			parent = parent[parts[i]];
		}
		
		return parent;
	};

    App.namespace("auth");

    /**
     * @function isAuthenticated Checks for an API key being present on the device
     */
    App.auth.isAuthenticated = function () {
        return JSON.parse(window.localStorage.getItem(API_KEY_ID));
    };

    /**
     * @function authenticate Sets the user's API key in persistent storage
     */
    App.auth.authenticate = function (value) {
        return window.localStorage.setItem(API_KEY_ID, JSON.stringify(value));
    };

    /**
     * @function _checkApiResponse Checks the response object from the API for error/success
     */
    App.auth._checkApiResponse = function (res) {

        var result = {
            success: false,
            status: res.status
        };
        
        if (result.status >= 200 && result.status < 300) {
            result.success = true;
        }
        
        return result;
    };

    /**
     * @function _onLoginSuccess Logic executed when the user has logged in successfuly
     */
    App.auth.onLoginSuccess = function  (token) {
        
        //Store the api token in localstorage
        App.auth.authenticate(token);

        //Redirect to the app context
        window.location.href = APP_BASE_URL;
    };
    
    /**
     * @function login Attempts to retrieve an authentication token from the API
     * @param {String} email Email address for a user account
     * @param {String} password Password for a user account
     */
    App.auth.login = function (email, password, success, error) {

        fetch(API_BASE_URL + "api/public/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-client": "web"
            },            
            credentials: "include",
            body: JSON.stringify({email: email, password: password})
        })
        .then(function (res) {

            var successful = App.auth._checkApiResponse(res).success; 

            res.json().then(function (data) {
                return (successful) ? success(data) : error(data);
            });
        });
    };

    /**
     * @function register Registers a user account with the API
     * 
     */
    App.auth.register = function (fields, success, error) {

        fetch(API_BASE_URL + "api/public/createaccount", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "x-client": "web"
            },
            credentials: "include",
            body: JSON.stringify(fields)
        })
        .then(function (res) {

            var successful = App.auth._checkApiResponse(res).success; 
                
            res.json().then(function (data) {

                
                if (successful) {

                    return App.auth.login(fields.email, fields.password, function (token) {
                        console.log("token", token);            
                        App.auth.onLoginSuccess(token);

                    }, function (err) {
                        console.log("Error logging in.");
                        console.log(err);
                    });
                }

                return error(data);
            });
        });
    };

    
})(window.App || (window.App = {}));
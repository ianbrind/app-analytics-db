/**
 * Wrapper for processors
 */
const App = require("./app");

// Somewhere for generic processor error codes to go?
// Processor.getStatusCode("succes|error")?
const responseStatuses = {
    "success": 200,
    "error": 500,
    "notfound": 204
};

const Processor = {
    Data: require("./processor-data"),
    Response: require("./processor-response"),

    getStatusCode: (type) => {
        return responseStatuses[type] || responseStatuses["notfound"];
    },

    run: (processName, data) => {
        var processPromise = new Promise((resolve, reject) => {
            try {
                var processModule = App.getProcessor(processName);
                processModule(new Processor.Data(data), (result) => {
                    if (result.err) {
                        reject(result);
                    }
                    resolve(result); 
                });
            } catch (e) {
                console.log(e);
                reject(new Processor.Response(e, {message: e.message}, Processor.getStatusCode("notfound")));
            }
        });

        // Middleware injection here
        // Will throwing an exception here reject the promise?
        processPromise.then(() => {return});

        return processPromise;
    }
}

module.exports = Processor;
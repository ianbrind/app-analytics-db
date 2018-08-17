const config = require("../../../config");
const numCPUs = require("os").cpus().length;
const cluster = require("cluster");

class App {
	
	constructor (app) {

		this.app = app;
	}

    /**
     * @function getProcessor Returns processor module from within the app
     * @param {String} processName  A conventional node module name 
     * relative to the apps processors directory, e.g, "business/create"
     */
    static getProcessor (processName) {

        // Prevent directory traversal
        if (/^[a-z\/\-]+$/.test(processName) === false) {
            throw new Error("Bad process name");
            // Should probably pass the error on through a callback or use a promise?
        }
        // Likely use of a callback or promise here instead
        return require("../../../src/processors/" + processName);
    }

	run () {

		if (config.app.cluster === true) {
			this.runInstanceCluster();
		}
		else {
			this.runInstance();
		}
	}

	runInstance () {

		this.app.listen(config.app.port, () => {
			console.log("App listening on port " + config.app.port);
		});
	}

	runInstanceCluster () {

		if (cluster.isMaster) {

			// Fork workers.
			for (let i = 0, max = numCPUs; i < max; i++) {
				cluster.fork();
			}

			cluster.on('online', (worker, code, signal) => {
				console.log(`worker ${worker.process.pid} online`);
			})
			.on('exit', (deadWorker, code, signal) => {
				//If a worker dies restart it
				let worker = cluster.fork();

				// Note the process IDs
				let newPID = worker.process.pid;
				let oldPID = deadWorker.process.pid;

				// Log the event
				console.log('worker '+oldPID+' died.');
				console.log('worker '+newPID+' born.');
			});
		} 
		else {
			//Start the worker
			this.runInstance();
		}
	}
}

module.exports = App;

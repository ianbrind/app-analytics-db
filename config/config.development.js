module.exports = {
    app: {

        //Whether or not to use the cluster module, which, when enabled is set 
        //to spawn a node process for each available core
        //Sensible default would be dev false & production true  
        cluster: false,
        port: 5566,
        base_url: "/",
        http_host: "http://localhost/"
    },
    security: {
        jwt_secret: "X)72w(]LCXHn!j8{bR2;K<eDYth4",
        cookie_secret: "sdf%T£%dvvd_+_df322",
        password_salt_iterations: 10
    },
    database: {
        host: "localhost",//Host 
        port: 27017, // Port running mongodb on the machine
        name: "app-analytics", // Name of the mongodb database,
        mongoOptions: {

            // auth: { //User authentication credentials
            //     user: "",
            //     password: ""
            // },
            ssl: false, //SSL false by default
            sslCA: "",
            sslCRL: "",
            sslCert: "",
            sslKey: "",
            sslPass: "",
            checkServerIdentity: true,//Ensure we check server identify during SSL
            autoReconnect: true, //Enable autoReconnect for single server instances
            noDelay: true, //TCP Connection no delay
            family: 4, //Version of IP stack. Defaults to 4.
            keepAlive: 30000, //The number of milliseconds to wait before initiating keepAlive on the TCP socket.
            connectTimeoutMS: 30000, //TCP Connection timeout setting
            socketTimeoutMS: 360000, //TCP Socket timeout setting
            reconnectTries: 30, //Server attempt to reconnect #times
            reconnectInterval: 1000, //Server will wait # milliseconds between retries
            ha: true, //Control if high availability monitoring runs for Replicaset or Mongos proxies.
            haInterval: 10000, //The High availability period for replicaset inquiry
            poolSize: 5, //The maximum size of the individual server pool.
            secondaryAcceptableLatencyMS: 15, //Cutoff latency point in MS for Replicaset member selection
            acceptableLatencyMS: 15, //Cutoff latency point in MS for Mongos proxies selection.
            connectWithNoPrimary: false, //Sets if the driver should connect even if no primary is available
            // authSource: "admin", //Define the database to authenticate against
            useMongoClient: true,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            promiseLibrary: global.Promise,
            poolSize: 10, // Maintain up to 10 socket connections
            // If not connected, return errors immediately rather than waiting for reconnect
            bufferMaxEntries: -1 //Sets a cap on how many operations the driver will buffer up before giving up on getting a working connection, default is -1 which is unlimited.
        }
    }
}

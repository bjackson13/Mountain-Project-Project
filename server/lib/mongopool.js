/**
 * MongoPool - connects to our mongo db and maintains a single mongo connection.
 *  This is in accordance with mongos recommendations for not opening/closing a connection for each interaction
 * @author Brennan Jackson
 * Created March 9, 2021
 * 
 */

const Client = require('mongodb').MongoClient
const log4js = require('log4js') 
const user = process.env.DBUSER
const password = process.env.DBPASS
const dbName = process.env.DBNAME
const env = process.env.ENV
const connectionString = env === 'local' ? `mongodb://localhost:27017` : `mongodb://${user}:${password}@localhost:27017`

//db conn options
var options = {
    numberOfRetries: 5,
    poolSize: 5,
    connectTimeoutMS: 1000,
    useUnifiedTopology: true
};

var MongoPool = function () {
    //global database connection object
    let dbo;

    const logger = log4js.getLogger('MongoPool')

    /**
     * @function init initializes our databse connection
     * @param {function} callback 
     */
    function init(callback) {
        try {
            Client.connect(connectionString, options, function(err, db) {
                if(err) throw err;

                // set our global db connection object 
                dbo = db;
                logger.info("Databse conenction has been initialized")

                if(callback && typeof(callback) == "function") {
                    logger.info(`Callback function receiving database connection: ${callback.toString()}`)
                    callback(dbo.db(dbName));
                }
            })
            return MongoPool
        }
        catch(err) {
            logger.error(`Error intializing database connection: ${err}`)
            throw err;
        }
    }

    /**
     * @function getInstance grants access to our globaldb object. 
     *              Will initialize if it is not already set.
     * @param {function} callback
     * @returns a callback function with access to our global db connection 
     */
    function getInstance(callback) {
        if(!dbo) {
            init(callback)
        }
        else {
            if(callback && typeof(callback) == "function") {
                logger.info(`Callback function receiving database connection: ${callback.toString()}`)
                callback(dbo.db(dbName)) // will automatically connect to Project DB
            }
        }
    }

    return {
        init: function() {
            return init()
        },

        connect: function(callback) {
            return getInstance(callback)
        }
    }
}

module.exports = MongoPool

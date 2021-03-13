/**
 * Group 7 
 * Mountain-Project-Project
 * @author Brennan Jackson
 * Created March 7, 2021
 * 
 * repository.js
 *  Data layer to interact with our mongo DB instance
 */
 const log4js = require('log4js')
 const MongoPool = require('./mongopool.js') 

 var Repository = function() {

    //initialize logger
    const logger = log4js.getLogger('Repository')

    //initialize mongo connection
    const mongo = new MongoPool()
    /**
     * I am not using a try/catch for the initial startup.
     * If an error is thrown when the application starts because 
     * we cannot connect to the databse we should let the app crash
     * and restart it after investigating.
     */
    mongo.init()
    logger.info("Connected to database")

    /**
     * @function searchDocumentsByTerm search the database for documents by search terms
     * @param {searchTerms} array of search terms to query the database for
     */
    function searchDocumentsByTerm(searchTerms) {
        logger.info("Query made against serach terms: " + searchTerms)
        return new Promise((resolve, reject) => {
            try {
                mongo.connect((db) => {
                    let regex = new RegExp(`\\b${searchTerms}.*\\b`, "i") //create regex expression with search terms
                    db.collection("Routes").find(
                        {
                        $or:
                            [
                                { desc: regex },
                                { rating: regex },
                                { route: regex },
                                { route_type: regex },
                            ]
                                
                        }
                    ).project(
                        {
                            _id: 0,
                            loc: 0
                        }
                    ).toArray(
                        (err, res) => {
                            if(err) {
                                reject(err)
                            }
                            logger.info("Query successful")
                            resolve(res)
                        }
                    )
                })
            }
            catch(err) {
                logger.warn("Error thrown in searchDocumentsByTerm: " + err)
                reject(err)
            }
        })
    }

    /**
     * @function searchDocumentsByLocation search the database for documents by location
     * @param {long} long longitude coordinates to query the database for
     * @param {lat} long latitude coordinates to query the database for
     * @param {maxDistance} int kilometers to search
     */
     function searchDocumentsByLocation(long, lat, maxDistance) {
        logger.info(`Query made against serach location: Long ${long} Lat ${lat} Distance ${maxDistance}`)
        let kilometers = maxDistance * 1000;
        return new Promise((resolve, reject) => {
            try {
                mongo.connect((db) => {
                    db.collection("Routes").find(
                        {
                            loc: {
                                $near: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [long, lat]
                                    },
                                    $maxDistance: kilometers
                                }
                            }
                        }
                    ).project(
                        {
                            _id: 0,
                            loc: 0
                        }
                    ).toArray(
                        (err, res) => {
                            if(err) {
                                reject(err)
                            }
                            logger.info("Query successful")
                            resolve(res)
                        }
                    )
                })
            }
            catch(err) {
                logger.warn("Error thrown in searchDocumentsByLocation: " + err)
                reject(err)
            }
        })
    }

    /**
     * @function getDocument retrieve single document from the databse
     * @param {id} int id of document to retireve
     */
    function getDocument(id) {
        logger.info(`Query made for document ID: ${id}`)
        id = parseInt(id) // ID needs to be an int before querying
        return new Promise((resolve, reject) => {
            try {
                mongo.connect((db) => {
                    db.collection("Routes").findOne(
                        {
                            id: id       
                        }, 
                        {
                            projection: {
                                _id: 0,
                                loc: 0
                            }
                        },
                        (err, res) => {
                            if(err) {
                                reject(err)
                            }
                            logger.info("Query successful")
                            resolve(res)
                        }
                    )
                })
            }
            catch(err) {
                logger.warn("Error thrown in getDocument: " + err)
                reject(err)
            }
        })
    }

    /**
     * @function getImage retrieve single image from the databse
     * @param {id} int id of image to retireve
     */
    function getImage(id) {

    }

    /**
     * @function searchDocumentsByLocation retrieve single image from the databse
     * @param {id} int id of comment to add comment to
     * @param {text} text of comment to add to document
     */
    function addComment(id, text) {

    }

    return {
        searchTerms: function(terms) {
            return searchDocumentsByTerm(terms)
        },
        searchLocation: function(long, lat, maxDistance) {
            return searchDocumentsByLocation(long, lat, maxDistance)
        },
        getDocument: function(id) {
            return getDocument(id) 
        },
        getImage: function() {
            return getImage()
        },
        addComment: function() {
            return addComment()
        }
    }
 }

 module.exports = Repository

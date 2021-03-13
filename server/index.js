/**
 * Group 7 
 * Mountain-Project-Project
 * @author Brennan Jackson
 * Created March 7, 2021
 * 
 * index.js
 *  Project index file. Serves as the controller for our endpoints
 */
require('dotenv').config() //read in .env file
const log4js = require('log4js') 
const express = require('express')
const app = express()
const port = process.env.PORT
const Repository = require('./lib/repository.js')
const repo = Repository(); 

/*Initialize logger using log4js */
log4js.configure({
    appenders: {
      multi: { type: 'multiFile', base: 'log/', property: 'categoryName', extension: '.log' }
    },
    categories: {
      default: { appenders: [ 'multi' ], level: 'debug' }
    }
});
  
const logger = log4js.getLogger('Controller')

app.get('/search/term', function(req, res) {
    let terms = req.query.searchterms
    logger.info(`Search made with terms: ${terms}`)
    repo.searchTerms(terms).then((results) => {
        res.jsonp(results)
    }).catch((rejection) =>{ 
        logger.warn(rejection)
        res.status(500).send("Error: Something went wrong!")
    })
})

app.get('/search/location', function(req, res) {
    let lat = parseFloat(req.query.lat)
    let long = parseFloat(req.query.long)
    let distance = req.query.maxDistance
    logger.info(`Search made with locations: latitude: ${lat} longitude: ${long}`)
    repo.searchLocation(long, lat, distance).then((results) => {
        res.jsonp(results)
    }).catch((rejection) =>{ 
        logger.warn(rejection)
        res.status(500).send("Error: Something went wrong!")
    })
})

app.get('/document/:id', function(req, res) {
    //call query generator by passing id

    //pass query object and options to repository

    //return results to user
})

app.get('/image/:id', function(req, res) {
    //call query generator by passing id

    //pass query object and options to repository

    //return results to user    
})

app.post('/comment/:id', function(req, res) {
    //call query generator by passing id and new tags

    //pass query object and options to repository

    //return success/failure to user
})


app.listen(port, () => {
    logger.info(`Application listening on localhost:${port}`)
})
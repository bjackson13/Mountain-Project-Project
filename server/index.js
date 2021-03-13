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
const repo = Repository()
const fs = require('fs')

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
    let terms = req.query.searchTerms
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
    logger.info(`Search made for id: ${req.params.id}`)
    repo.getDocument(req.params.id).then((results) => {
        if(results === null) {
            res.status(404).send("No route found")
        }
        else {
            res.jsonp(results)
        }
    }).catch((rejection) =>{ 
        logger.warn(rejection)
        res.status(500).send("Error: Something went wrong!")
    })
})

app.get('/image', function(req, res) {
    let filename =req.query.name
    logger.info(`Search made for image named: ${filename}`)
    repo.searchImages(filename).then((results) => {
        if(results === null) {
            res.status(404).send("No image found")
        }
        else{
            gridStream = results[0]
            res.set('Content-Type', results[1].contentType);
            return gridStream.pipe(res);
        }        
    }).catch((rejection) =>{ 
        logger.warn(rejection)
        res.status(500).send("Error: Something went wrong!")
    }) 
})

app.post('/comment/:id', function(req, res) {
    //pass post data to repository

    //return success/failure to user
})


app.listen(port, () => {
    logger.info(`Application listening on localhost:${port}`)
})
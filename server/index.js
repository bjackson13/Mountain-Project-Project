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


app.listen(port, () => {
    logger.info(`Application listening on localhost:${port}`)
})
/**
 * Group 7 
 * Mountain-Project-Project
 * Author: Brennan Jackson
 * Created March 7, 2021
 * 
 * index.js
 *  Project index file. Serves as the controller for our endpoints
 */

const express = require('express')
const app = express()
const port = 8080

app.listen(port, () => {
    console.log(`Application listening on localhost:${port}`)
})
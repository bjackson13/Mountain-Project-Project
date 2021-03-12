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

 var Repository = function() {

    //initialize logger
    const logger = log4js.getLogger('Repository')

    /**
     * @function searchDocumentsByTerm search the database for documents by search terms
     * @param {searchTerms} array of search terms to query the database for
     */
    function searchDocumentsByTerm(searchTerms) {

    }

    /**
     * @function searchDocumentsByLocation search the database for documents by location
     * @param {searchLocation} array of coordinates to query the database for
     */
     function searchDocumentsByTerm(searchLocation) {

    }

    /**
     * @function getDocument retrieve single document from the databse
     * @param {id} int id of document to retireve
     */
    function getDocument(id) {

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
        searchTerms: function() {
            return searchDocumentsByTerm()
        },
        searchLocation: function() {
            return searchDocumentsByLocation()
        },
        getDocument: function() {
            return getDocument() 
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

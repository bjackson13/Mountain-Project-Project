# Mountain-Project-Project Server
NodeJs server with express framework, handles requests for finding routes, accessing pictures, and adding tags to routes.

## Prereqs
The following need to be set in a `.env` file before running the project:  
`DBUSER` The username for access to the mongo database  
`DBPASS` Password for the username previously mentioned  
`DBNAME` Name of the project database  
`PORT`   Port you would like the application to listen on  
`ENV`    Sets the environment for the connection string. Use `local` if running locally for devlopment  

## Endpoints

### /search/term

METHOD: GET  

Query Parameters:  
`searchTerms` = term to search for  

EX: `/search/term?searchterms=rock`  

RETURNS:  
JSON array of found documents  
This method searches multiple fields including description, route name, route type, rating   

-------------------------------------------------  

### /search/location

METHOD: GET

Query Parameters:  
`lat` = latitude for point  
`long` = longitude for point  
`maxDistance` = Kilometers for search radius (this is converted to meters on server side)  

EX: `/search/location?long=-77.6114&lat=43.1656&maxDistance=50`  

RETURNS:  
JSON array of found documents  

-------------------------------------------------  

### /document/:id

METHOD: GET  

`id` = to the document id you want to retireve   

RETURNS:  
JSON object for the requested document  

-------------------------------------------------  

### /image

METHOD: GET  

Query Parameters:  
`name` = The name of the route you would like to check if an image exists for.  

EX: `/image?name=50+More+Seconds+of+Fun`  

RETURNS:  
Will return image for route '50 More Seconds of Fun' if it exists  
Image (.jpg file)  

-------------------------------------------------  

### /comment/:id

METHOD: POST  

`id` = the ID of the document you would like to add a comment to  

Form-data fields:  
`username`: users name   
`text`: The comment to add  

RETURNS:  
HTTP Status 204 if comment added  

********

All routes return HTTP Status 500 if error  


# Mountain-Project-Project Server
NodeJs server with express framework, handles requests for findingroutes, accessing pictures, and adding tags to routes.

## Prereqs
The following need to be set in a `.env` file before running the project:  
`DBUSER` The username for access to the mongo database  
`DBPASS` Password for the username previously mentioned  
`DBNAME` Name of the project database  
`PORT`   Port you would like the application to listen on  
`ENV`    Sets the environment for the connection string. Use `local` if running locally for devlopment  
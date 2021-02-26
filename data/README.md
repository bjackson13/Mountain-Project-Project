# Import info about the data
The original data set for this project is the `mp_rotes.csv` file.
The script `trim_data_count.sh` was used to reduce the overall entry count from over 115k entries to ~2500 entries.
The script creates a file called `trimmed_data.csv` which if you attempt to import to mongo will throw an error. You need to remove 3 lines around line 1131-1133 which are weirdly formatted.  
I have also changed the header line field names to be lowercase and contain no spaces. We canconsider automatting this but it shouldn't be necessary now that we have a good data set.  
Import `trimmed_data.csv` from this repo into your mongoDB instance.  

Once the csv file is imported, you can run the `create_loc_field.js` script which will take the seperated latitude and logitude fields and turn them into a single 'loc' geometry field.  

The project database should then be all set.

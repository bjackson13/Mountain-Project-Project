## Import Information About the Data
The original data set for this project is the `mp_rotes.csv` file.
The script `trim_data_count.sh` was used to reduce the overall entry count from over 115,000 entries to about 2,500 entries.

The script creates a file called `trimmed_data.csv` which if you attempt to import to Mongo will throw an error. You must remove three lines around line 1131-1133 which are incorrectly formatted.  
I have also changed the header line field names to be lowercase and contain no spaces. We can consider automating this but it shouldn't be necessary now that we have a good dataset.  

Import `trimmed_data.csv` from this repository into your MongoDB instance.  

Once the CSV file is imported, you can run the `create_loc_field.js` script which will take the separated latitude and longitude fields and turn them into a single 'loc' geometry field.  

The project database should then be all set.

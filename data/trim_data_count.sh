#!/bin/bash
count=0 
start_line=1
end_line=10
while [ $count -le 2500 ]
do
	sed -n "${start_line},${end_line}p" < mp_routes.csv >> trimmed_data.csv
	count=$(( $count + 10 ))
	start_line=$(( $start_line + 150 ))
	end_line=$(( $end_line + 150 ))
done

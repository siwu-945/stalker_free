#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 file1.csv file2.csv"
    echo "Both files should have username and full_name fields"
    exit 1
fi

file1=$1
file2=$2

if [ ! -f "$file1" ]; then
    echo "Error: File $file1 does not exist"
    exit 1
fi

if [ ! -f "$file2" ]; then
    echo "Error: File $file2 does not exist"
    exit 1
fi

output_file="unfollowers_$(date +%Y%m%d_%H%M%S).txt"

{
    echo "Comparison between $file1 and $file2"
    echo "Date: $(date)"
    echo -e "\nUsers who unfollowed you:"
    
    tail -n +2 "$file1" | cut -d',' -f1 > temp1.txt
    tail -n +2 "$file2" | cut -d',' -f1 > temp2.txt
    
    comm -23 <(sort temp1.txt) <(sort temp2.txt)
} | tee "$output_file"

rm temp1.txt temp2.txt

echo -e "\nResults have been saved to $output_file"
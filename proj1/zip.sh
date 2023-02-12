#!/bin/sh

login='xzbori20'
d=${1}

if [ "$d" = 'd' ]; then
    rm ${login}.zip
    exit 1
else
    zip ${login} doc.sh iterate.mjs test.sh 
    exit 1
fi

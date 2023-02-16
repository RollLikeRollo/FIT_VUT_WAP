#!/bin/sh

login='xzbori20'
d=${1}

if [ "$d" = 'd' ]; then
    rm ${login}.zip
    exit 1
else
    zip ${login} doc.sh iterate.mjs test.sh package.json package-lock.json README.md iterate.test.mjs
    exit 1
fi

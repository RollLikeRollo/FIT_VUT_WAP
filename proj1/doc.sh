#!/bin/sh

d=${1}

if [ "$d" = 'd' ]; then
    rm jsdoc.config.json
    rm -rf ${PWD}/out
    exit 1
else
    echo '{
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "include": ["."],
        "includePattern": ".+\\.(m)*js(doc|x)?$"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": true,
        "monospaceLinks": true
    }
    }
    ' > jsdoc.config.json

    jsdoc -c jsdoc.config.json --readme README.md iterate.mjs 
    exit 1
fi



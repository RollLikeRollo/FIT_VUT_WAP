#!/bin/sh

d=${1}

if [ "$d" = 'd' ]; then
    rm jsdoc.config.json
    exit 1
else
    echo '{
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "include": ["."],
        "includePattern": ".+\\.mjs(doc|x)?$"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
    }
    ' > jsdoc.config.json
    jsdoc -c jsdoc.config.json iterate.mjs 
    exit 1
fi



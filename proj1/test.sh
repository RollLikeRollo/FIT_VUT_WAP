#!/bin/sh

d=${1}

if [ "$d" = 'd' ]; then
    rm -rf ${PWD}/node_modules
    rm babel.config.js
    rm jest.config.js
    exit 1
elif [ "$d" = 'install' ]; then
    npm i babel-jest --save-dev
    npm i @babel/preset-env --save-dev
    npm i jest --save-dev
    npm i -D rewire  --save-dev
    npm i -D @types/rewire  --save-dev
else
    echo 'const presets = [
    [
      "@babel/preset-env",
    ]
  ];
  
  module.exports = { presets };' > babel.config.js

    echo 'module.exports = {
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?|mjs?)$",
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.mjs$": "babel-jest",
    },
    testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
    moduleFileExtensions: ["js", "jsx", "mjs"]
  }
  ' > jest.config.js

    jest
    exit 1
fi


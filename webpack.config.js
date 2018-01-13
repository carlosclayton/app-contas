var webpack = require('webpack');
var path = require('path');

// Naming and path settings
var entryFile = 'js/app.js';
var entryPoint = './src/app.js';
var exportPath = path.resolve(__dirname, './dist');

module.exports = {
    entry: entryPoint,
    output: {
        path: exportPath,
        filename: entryFile
    }
}


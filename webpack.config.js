var webpack = require('webpack');
var path = require('path');

// Naming and path settings
var entryFile = './app.js';
var entryPoint = './app.js';
var exportPath = path.resolve(__dirname, './dist');

module.exports = {
    entry: entryPoint,
    output: {
        path: exportPath,
        filename: entryFile
    },

    // resolve TypeScript and Vue file
    resolve: {
        extensions: ['', '.ts', '.vue', '.js']
    },
    module: {
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.ts$/, loader: 'vue-ts' }
        ],
    },
    vue: {
        // instruct vue-loader to load TypeScript
        loaders: { js: 'vue-ts-loader', },
        // make TS' generated code cooperate with vue-loader
        esModule: true
    }
}


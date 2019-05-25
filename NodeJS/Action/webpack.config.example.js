const path = require('path');
const webpack = require('webpack');

// npm install --save react react-dom
// npm install --save-dev webpack babel-loader babel-core
// npm install --save-dev babel-preset-es2015 babel-preset-react
module.exports = {
    entry: './app/index.jsx',
    output: {path: __dirname, filename: 'dist/bundle.js'},
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}

// add wenpack-dev-server to a project
// 1. install webpack-dev-server
// 2. Add a publicPath option to the output property 
// 3. Add an index.html file to your build directory to act as a harness to load your Javascript and CSS bundles.
// 4. Run the server with the options that you want
// 5. visit http://localhost:3001
// output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'bundle.js',
//     publicPath: '/assets/'
//   },

//"scripts": {
//     "server:dev": "webpack-dev-server --hot –inline
//     --content-base dist/ --port 3001"
// },

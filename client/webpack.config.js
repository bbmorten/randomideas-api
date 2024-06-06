
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


   module.exports = {
     entry: './src/index.js',
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'public')
     },
     module: {
       rules: [
         
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
           test: /\.js$/,
           exclude: /node_modules/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: ['@babel/preset-env']
             }
           }
         }
       ]
     },
     plugins: [
      new HtmlWebpackPlugin({
        title: 'FrontEnd Client for RandomIdeas App',
        filename: 'index.html',
        template: './src/index.html',
      }),
    ],
     mode: 'development',
     watch: true
   };
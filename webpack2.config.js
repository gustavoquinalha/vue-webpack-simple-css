var webpack = require('webpack');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
let PurifyCSSPlugin = require('purifycss-webpack');

var inProduction = (process.env.NODE_ENV === 'production');

module.exports = {
    entry: {
      app: [
        './src/main.js',
        './src/main.scss'
      ]
    },

    output: {
      path: path.resolve(__dirname, './dist'),
      filename: '[name].js'
    },

    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          use: ExtractTextPlugin.extract({
            use: ['css-loader', 'sass-loader'],
            fallback: 'style-loader'
          })
        },

        {
          test: /\.png|jpe?g|svg$/,
          loader: 'file-loader',
          options: {
            name: 'images/[name][hash].[ext]'
          }
        },

        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader"
        }
      ]
    },

    plugins: [
      new ExtractTextPlugin('[name].css'),

      new PurifyCSSPlugin({
        paths: glob.sync(path.join(__dirname, '**/*.html')),
        minimize: inProduction
      }),

      new webpack.LoaderOptionsPlugin({
        minimize: inProduction
      })
    ]
};

if (inProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

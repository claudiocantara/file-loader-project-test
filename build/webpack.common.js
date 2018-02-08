const path = require("path");
const webpack = require("webpack");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const pugData = require(path.resolve(__dirname, "../pug.config.json"));

module.exports = {
  resolve: {
    alias: {
      "@img": path.resolve(__dirname, "../src/img/")
    }
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          formatter: require("eslint-friendly-formatter"),
          emitWarning: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "resolve-url-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [require("autoprefixer")]
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              // name: "[name].[ext]",
              outputPath: "fonts/",
              publicPath: "../"
            }
          }
        ]
      },
      {
        test: /\.pug/,
        exclude: /node_modules/,
        use: [
          {
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
              data: pugData
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("css/style.css"),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
};

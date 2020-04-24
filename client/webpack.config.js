const path = require('path');
const babiliPlugin = require('babili-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const optimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const ChunksWebpackPlugin = require('chunks-webpack-plugin');
const HtmlWebpackPluugin = require('html-webpack-plugin');

let plugins = [];

plugins.push(new HtmlWebpackPluugin({
  hash: true,
  minify: {
    html5: true,
    collapseWhitespace: true,
    removeComments: true
  },
  filename: 'index.html',
  template: __dirname + '/main.html'
}))

plugins.push(new miniCssExtractPlugin({
  filename: 'styles.css',
  chunkFilename: '[id].css'
}));

plugins.push(
  new webpack.ProvidePlugin({
    $: 'jquery/dist/jquery.js',
    jQuery: 'jquery/dist/jquery.js'
  })
);

plugins.push(new ChunksWebpackPlugin());

if(process.env.NODE_ENV == 'production') {
  plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  plugins.push(new babiliPlugin());
  plugins.push(new optimizeCSSAssetsPlugin({
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: {
        removeAll: true
      }
    },
    canPrint: true
  }))
}

module.exports = {
  entry: {
    app: './app-src/app.js',
    vendor: ['jquery', 'bootstrap', 'reflect-metadata']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    //publicPath: "dist"
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
            commons: { 
              test: /[\\/]node_modules[\\/]/, 
              name: "vendor", 
              chunks: "all" 
            }
      }
  }
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              exclude: /node_modules/,
              use: {
                  loader: 'babel-loader'
              }
          },
          {
            test: /\.css$/,
            use: [{
                loader: miniCssExtractPlugin.loader,
                options: {
                  publicPath: 'dist'
                }
              },
              'css-loader'
            ]
          },
          {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/font-woff'
          },
          {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
          },
          {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader'
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
          }
      ]
  },
  plugins
};
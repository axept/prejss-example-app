import path from 'path'
import webpack from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: 'eval',
  entry: {
    'default': [
      'webpack-hot-middleware/client?reload=true',
      './react-app/index.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    publicPath: '/assets/',
    filename: 'js/[name].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'BROWSER': JSON.stringify('true'),
        'SERVER': JSON.stringify('false'),
        'NODE_ENV': JSON.stringify('development'),
      },
    }),
    new CopyWebpackPlugin([{
      from: './assets',
      to: './'
    }, {
      from: './images',
      to: './images'
    }]),
  ],
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      { test: /\.jsx?$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   exclude: /node_modules/
      // }, {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'images/[name].[ext]',
          },
        },
      }, {
        test: /\.(eot|woff|ttf)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'fonts/[name].[ext]',
          },
        },
      },
    ]
  },
};

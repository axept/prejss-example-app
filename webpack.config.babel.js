import webpack from 'webpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import createBuildInfo from './tools/create-build-info'

const BUILD_ID = (Date.now() * 10 + Math.floor(Math.random() * 10)).toString(36)
createBuildInfo({
  'id': BUILD_ID,
})

const entry = './react-app/index.js'

const plugins = [
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'BROWSER': JSON.stringify('true'),
      'SERVER': JSON.stringify('false'),
      'NODE_ENV': JSON.stringify(process.env['NODE_ENV']),
    }
  }),
  new CopyWebpackPlugin([{
    from: './assets/',
    to: '../'
  }, {
    from: './images',
    to: './images'
  }]),
]

if (process.env['NODE_ENV'] === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false,
      unused: true,
      dead_code: true,
    },
    minimize: false,
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }))
}


// Build final webpack config
export default {
  devtool: (process.env['NODE_ENV'] === 'production') ? false : 'cheap-module-source-map',
  context: path.join(__dirname, 'src'),
  entry,
  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    publicPath: '/assets/',
    filename: `js/[name]-${BUILD_ID}.js`,
  },
  plugins,
  resolve: {
    modules: [
      __dirname,
      'node_modules',
    ],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: 'images/[name].[ext]',
          },
        },
      },
      {
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
}

import path from 'path'
import express from 'express'
import compression from 'compression'
import exphbs from 'express-handlebars'
import minifyHTML from 'express-minify-html'
import renderReactApp from './utils/render-react-app'
import Root from './react-app/components/demo'

const PORT = process.env['PORT'] || 3000
const HOST = process.env['HOST'] || 'localhost'

let buildInfo = {}
if (process.env['NODE_ENV'] !== 'development') {
  try {
    buildInfo = require('../dist/build.json')
  } catch (err) {
    console.error('Build information is not found.', err)
  }
}

// Configure Application server
const app = express()
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'templates'))
app.enable('trust proxy')
app.use(compression())
app.set('port', PORT)

if (process.env['NODE_ENV'] === 'production') {
  app.use(minifyHTML({
    override: true,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: false,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
      ignoreCustomFragments: [
        /__INITIAL_STATE__(.*)\n.*__EXTERNAL_STYLES__(.*)\n/,
        /<\?[\s\S]*?\?>/,
        /<%[\s\S]*?%>/,
      ]
    },
  }))
}

if (process.env['NODE_ENV'] === 'development') {
  const webpack = require('webpack')
  const config = require('../webpack.config.local')
  const compiler = webpack(config)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }))
  app.use(require('webpack-hot-middleware')(compiler))
} else {
  app.use('/', express.static(path.join(__dirname, '..', 'dist')))
}

app.get('*', (req, res, next) => {
  if (req.url.match('/api') || req.url.match('/assets') || req.url.match('favicon')) {
    return next();
  }
  renderReactApp({
    req,
    res,
    buildId: buildInfo['id'],
    Root,
  })
})

app.listen(PORT, HOST, () => {
  console.log(`The server is running at ${HOST}:${PORT}...`);
})

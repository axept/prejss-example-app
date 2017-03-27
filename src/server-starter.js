// Setup babel environment
require('babel-polyfill');
require('babel-core/register')({
  'presets': ['react', 'es2015', 'stage-0'],
  'plugins': [['transform-prejss', {'removeImports': false}]],
})

// Setup execution environment
process.env['SERVER'] = 'true';
process.env['BROWSER'] = 'false';

// Launch server app
require('./server')

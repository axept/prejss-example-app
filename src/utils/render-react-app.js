import React from 'react'
import { renderToString } from 'react-dom/server'
import jss from 'jss'
import preset from 'jss-preset-default'
import { SheetsRegistryProvider, SheetsRegistry } from 'react-jss'

export default function ({ buildID, Root, req, res }) {

  let isNotFoundError = false
  let isSSRError = false

  // Setup initial state params
  const initialState = {
    isSSR: true,
  }


  // Render react app
  let rootHTML = ''
  let criticalCSS = ''
  try {
    const sheets = new SheetsRegistry()
    rootHTML = renderToString(
      <SheetsRegistryProvider registry={sheets}>
        <Root
          intialState={initialState}
          />
      </SheetsRegistryProvider>
    )
    criticalCSS = sheets.toString()
  } catch (error) {
    console.error(error)
    isSSRError = true
  }

  // Calculate bundle script
  const bundle1 =
    (buildID !== undefined) ?
      `default-${buildID}.js` :
      `default.js`

  const renderParams = {
    rootCSSClasses: '',
    language: 'en-US',
    criticalCSS,
    rootHTML,
    bundle1,
  }

  if (isNotFoundError) {
    res.status(404)
  } else if (isSSRError) {
    res.status(500)
  } else {
    res.render('react-app', renderParams)
  }
}

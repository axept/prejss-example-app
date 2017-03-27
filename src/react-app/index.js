import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/demo'

const root = document.getElementById('root')
const initialState = window.__INITIAL_STATE__ || {}

ReactDOM.render((
  <Root
    initialState={initialState}
    />
), root)


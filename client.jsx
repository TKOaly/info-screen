import ReactDOM from 'react-dom'
import React from 'react'
import App from './components/App.jsx'

const rootElem = document.getElementById('root')

console.log(window.INITIAL_STATE)

ReactDOM.hydrate(<App initialState={window.INITIAL_STATE} />, rootElem)

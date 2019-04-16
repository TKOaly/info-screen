import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../components/App'
import { SheetsRegistry } from 'jss';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import { fetchUpcomingEvents } from '../services/tkoalyEventService'
import { fetchChecmicumFoodlist, fetchExactumFoodlist } from '../services/unicafeFoodListService'


const index = (_, res) => {

  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: {
      primary: green,
      accent: red,
      type: 'light',
    },
  });

    // Create a new class name generator.
    const generateClassName = createGenerateClassName();

  const initialStatePromise = Promise.all([fetchUpcomingEvents(), fetchChecmicumFoodlist(), fetchExactumFoodlist()])

  initialStatePromise.then(([events, chemicum, exactum]) => {
    const rootComponent = ReactDOMServer.renderToString(
    <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
        <App initialState={{events, chemicum, exactum}} />
      </MuiThemeProvider>
    </JssProvider>
    )
    // Grab the CSS from our sheetsRegistry.
    const css = sheetsRegistry.toString()
    const html = `
      <html>
        <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        <link rel="stylesheet" href="/css/carousel.min.css">
        <link rel="stylesheet" href="/css/overrides.css">
        <style id="jss-server-side">${css}</style>
        <script>window.INITIAL_STATE=${JSON.stringify({ events, chemicum, exactum })}</script>
        </head>
        <body>
          <div id="root">
            ${rootComponent}
          </div>
        </body>
        <script src="/js/bundle.js" type="text/javascript"></script>
      </html>
    `
    res.send(html)
  }).catch(e => {
    console.error(e)
    res.send('Internal server error')
  })
}

export default index

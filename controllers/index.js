import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";
import theme from "../components/Theme";
import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { fetchUpcomingEvents } from "../services/tkoalyEventService";
import {
  fetchChecmicumFoodlist,
  fetchExactumFoodlist
} from "../services/unicafeFoodListService";

const index = (_, res) => {
  const sheets = new ServerStyleSheets();

  const initialStatePromise = Promise.all([
    fetchUpcomingEvents(),
    fetchChecmicumFoodlist(),
    fetchExactumFoodlist()
  ]);

  initialStatePromise
    .then(([events, chemicum, exactum]) => {
      const rootComponent = ReactDOMServer.renderToString(
        sheets.collect(
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App initialState={{ events, chemicum, exactum }} />
          </ThemeProvider>
        )
      );
      // Grab the CSS from our sheetsRegistry.
      const css = sheets.toString();
      const html = `
      <html>
        <head>
        <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500">
        <link rel="stylesheet" href="/css/carousel.min.css">
        <link rel="stylesheet" href="/css/overrides.css">
        <style id="jss-server-side">${css}</style>
        <script>window.INITIAL_STATE=${JSON.stringify({
          events,
          chemicum,
          exactum
        })}</script>
        </head>
        <body>
          <div id="root">
            ${rootComponent}
          </div>
        </body>
        <script src="/js/bundle.js" type="text/javascript"></script>
      </html>
    `;
      res.send(html);
    })
    .catch(e => {
      console.error(e);
      res.send("Internal server error");
    });
};

export default index;

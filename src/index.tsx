import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import configureStore from "./configureStore";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import theme from "./theme";
const history = createBrowserHistory();
const stories = configureStore(history);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CookiesProvider>
      <Provider store={stories}>
        <SnackbarProvider maxSnack={3}>
          <App history={history} />
        </SnackbarProvider>
      </Provider>
    </CookiesProvider>
    <CssBaseline />
  </ThemeProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();

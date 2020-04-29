import React from "react";
import theme from "../src/untils/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import configureStore from "../src/configureStore";
import CssBaseline from "@material-ui/core/CssBaseline";
const history = createBrowserHistory();
const store = configureStore(history);
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
const ThemeDecorator = (storyFn) => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <div style={{ padding: 5 }}>
        <Router>{storyFn()}</Router>
      </div>
    </Provider>
    <CssBaseline />
  </ThemeProvider>
);

export default ThemeDecorator;

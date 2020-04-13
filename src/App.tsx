import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MasterContainer from "./containers/master";

export const App = () => {
  return (
    <Router>
      <MasterContainer />
    </Router>
  );
};
export default App;

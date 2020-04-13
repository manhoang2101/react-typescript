import React from "react";
import App from "./App";
import MasterContainer from "./containers/master";
import { shallow } from "enzyme";
test("renders call MasterContainer", () => {
  const wrapper = shallow(<App />);
  const masterContainer = <MasterContainer />;
  expect(wrapper.contains(masterContainer)).toEqual(true);
});

import React from "react";
import App from "./App";
import MasterContainer from "./containers/master.container";
import { shallow } from "enzyme";
test("renders call MasterContainer", () => {
  const wrapper = shallow(<App />);
  const masterContainer = <MasterContainer />;
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.contains(masterContainer)).toEqual(true);
});

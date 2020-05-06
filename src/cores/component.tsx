import React from "react";

class CoreComponent<P, S> extends React.Component<P, S> {
  constructor(prop: Readonly<P>, state?: S) {
    super(prop);
  }
}
export default CoreComponent;

import React from "react";
import AppLoginContainer from "../../src/containers/auth/login.container";
export const Login = () => {
  return <AppLoginContainer onSubmit={(data) => console.log(data)} />;
};
export default { title: "Containers/Auth" };

import React from "react";
import { Redirect } from "react-router-dom";

let signout = () => {
  localStorage.clear();
  return <Redirect to exact path="/home"></Redirect>;
};

export default signout;

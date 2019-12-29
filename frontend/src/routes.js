import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/main";
import Patient from "./pages/patient";
import Schedule from "./pages/schedule";
import "./pages/baseStyles.css";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/patients/:id" component={Patient} />
      <Route path="/schedules" component={Schedule} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

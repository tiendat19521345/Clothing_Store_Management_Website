import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";

const RoutesLayout = () => {
  
  
  return (
    <Switch>
      <Route path="/customers">
        <Customers></Customers>
      </Route>

      <Route path="/">
        <Dashboard></Dashboard>
      </Route>
    </Switch>
  );
};

export default RoutesLayout;

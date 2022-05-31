import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../pages/login/Login";

import Layout from "../components/layout/Layout";

const RoutesApp = () => {
  const [isAuticated, setIsAuticated] = useState(false);
  return (
    <Switch>

      <Route path="/home">
        <Layout />
      </Route>

    </Switch>
  );
};

export default RoutesApp;

import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";


import Layout from "../components/layout/Layout";

const RoutesApp = () => {
  const [isAuticated, setIsAuticated] = useState(false);
  return (
    <Switch>
        
      
        <Route exact path="/home">
          <Layout />
        </Route>
        
        <Route path="/">
          <Redirect to="/home" />
        </Route>


    </Switch>
    
  );
};

export default RoutesApp;

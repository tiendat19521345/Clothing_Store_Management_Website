import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";
import Dashboard from "../pages/dashboard/Dashboard";
import Customers from "../pages/customers/Customers";
import Orders from "../pages/orders/Orders";
import OrderDetail from "../pages/orders/orderdetail/OrderDetail";
import Returns from "../pages/returns/Returns";
import ReturnOrderDetail from "../pages/returns/return_order_detail/ReturnOrderDetail";
import ReturnBill from "../pages/returns/return_bill/ReturnBill";

const RoutesLayout = () => {
  return (
    <Switch>
      <Route path="/customers">
        <Customers></Customers>
      </Route>
      <Route path="/orders">
        <Orders></Orders>
      </Route>
      <Route path="/orderDetail">
        <OrderDetail></OrderDetail>
      </Route>
      <Route path="/returns">
        <Returns></Returns>
      </Route>
      <Route path="/returnOrderDetail">
        <ReturnOrderDetail></ReturnOrderDetail>
      </Route>
      <Route path="/returnBill">
        <ReturnBill></ReturnBill>
      </Route>
      <Route path="/">
        <Dashboard></Dashboard>
      </Route>
    </Switch>
  );
};

export default RoutesLayout;

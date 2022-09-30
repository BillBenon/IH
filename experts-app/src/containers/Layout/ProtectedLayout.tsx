import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "../PrivateRoute";
import { DashboardPage } from "../../pages/Dashboard";

export const ProtectedLayout = () => {
  return (
    <>
      <Switch>
        <PrivateRoute
          path="/expert/dashboard"
          component={DashboardPage}
          exact
        />
      </Switch>
    </>
  );
};

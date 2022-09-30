import React, { useState, useEffect } from "react";
import { Route, RouteProps } from "react-router-dom";
import { useHistory, useLocation } from "react-router";
import ExpertView from "../../pages/ExpertView";
import { Auth, B2B_MenuItems, RoleType, RouterMap } from "../../utilities/constants";

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  const [isValidUser, setValidUser] = useState(false);
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    Auth()
      .then((user: any) => {
        if (!user) {
          history.push("/login");
          return;
        } else if (user.roleType === RoleType.HIRING_MANAGER) {
          pathname === "/" && history.push(RouterMap[B2B_MenuItems.jobs]);
        } else {
          pathname === "/" && history.push(RouterMap[user.lastActivity.level1]);
        }
        setValidUser(true);
        return;
      })
  });

  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {(isValidUser &&
              <ExpertView>
                <Component {...props} />
              </ExpertView>
            )}
          </>
        )
      }}
    />
  );
};

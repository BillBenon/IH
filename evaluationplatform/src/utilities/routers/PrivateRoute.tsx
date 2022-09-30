import { LoginPage } from 'pages';
import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { isCandidateAuthenticated } from '../../services/browserStorageService';

interface IPrivateRouteProps extends RouteProps {
    component: any;
}

export const PrivateRoute = ({ component: Component, location, ...rest }: IPrivateRouteProps & any) => {

    const isAuth = () => {
        return isCandidateAuthenticated();
    }

    return (
        <Route
            {...rest}
            render={(props: any) => (
                isAuth() ? (<Component {...props} {...rest} />) : (<LoginPage {...props} {...rest}/>)
            )} />
    )
}
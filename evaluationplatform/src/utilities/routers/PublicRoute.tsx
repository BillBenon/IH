import React from 'react';
import { Redirect, Route, RouteProps, useLocation } from 'react-router';
import { notEmpty } from 'utilities/helperFunctions';
import { getValueBrowserStorage, isCandidateAuthenticated } from '../../services/browserStorageService';
import queryString from 'query-string'
import { Candidate_Track_Id, FLOW_TYPE } from 'utilities/constants';

interface IPrivateRouteProps extends RouteProps {
    component: any;
}


export const PublicRoute = ({ component: Component, location, ...rest }: IPrivateRouteProps) => {
    const { search } = useLocation()
    const _queryParams: any = queryString.parse(search)
    const isAuth = () => {
        if(_queryParams.candidateId)
            return false;
        return isCandidateAuthenticated();
    }

    const isAnyTrack = () => {
        if (_queryParams.lptrackid && _queryParams?.lpflowtype !== FLOW_TYPE.mockInterview )
            return true;
        return notEmpty(getValueBrowserStorage(Candidate_Track_Id));
    }

    return (
        <Route
            {...rest}
            render={(props) => (
                isAuth()
                    ? ((isAnyTrack() && <Redirect to={{
                        pathname: '/question',
                        search: location?.search
                    }} />) || (!isAnyTrack() && <Redirect to={'/settings'} />))
                    : (<Component {...props} {...rest} />)
            )} />
    )
}
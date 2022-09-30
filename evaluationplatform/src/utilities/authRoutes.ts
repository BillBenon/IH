import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { SettingsDescriptionPage } from 'pages/SettingsDescriptionPage';

const locationHelper = locationHelperBuilder({});

interface IState {
  auth: any;
}

export const userIsAuthenticated = connectedRouterRedirect({
  redirectPath: '/login',
  authenticatedSelector: (state: IState) => (state.auth.user ? true : false),
  wrapperDisplayName: 'UserIsAuthenticated',
  allowRedirectBack: false,
});

export const userIsNotAuthenticated = connectedRouterRedirect({
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
  allowRedirectBack: false,
  authenticatedSelector: (state: IState) => (state.auth.user ? false : true),
  wrapperDisplayName: 'UserIsNotAuthenticated',
});


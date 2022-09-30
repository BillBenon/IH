import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './history';
import { SnackbarProvider } from 'notistack';
import store from 'store';

export const renderWithProviders = (children, customStore = {}, injectedReducer, wrapperOptions) => {
  return render(allTheProviders({ children, customStore, injectedReducer }), {
    wrapper: () => allTheProviders({ children, customStore, injectedReducer }),
    ...wrapperOptions,
  });
};

const allTheProviders = ({ children, customStore, injectedReducer }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider maxSnackBar={3}>{children}</SnackbarProvider>
      </ConnectedRouter>
    </Provider>
  );
};

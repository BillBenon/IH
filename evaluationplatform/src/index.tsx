import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { history } from './utilities';
import { SnackbarProvider } from 'notistack';
import store from './store';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback, { errorHandler } from 'components/Error/ErrorFallback';
import { GlobalContext } from 'context/globalContext';

(window as any).renderMicroApp = (containerId: string) => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider maxSnack={3}>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
            <GlobalContext>
              <App />
            </GlobalContext>
          </ErrorBoundary>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById(containerId),
  );
  serviceWorker.unregister();
}

(window as any).unmountMicroApp = (containerId: string) => {
  const node = document.getElementById(containerId)
  node && ReactDOM.unmountComponentAtNode(node);
};

if (!document.getElementById('MicroApp-container')) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <SnackbarProvider maxSnack={3}>
          <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
            <GlobalContext>
              <App />
            </GlobalContext>
          </ErrorBoundary>
        </SnackbarProvider>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
}

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';

import { setExpert } from 'features/auth/authSlice';
import React, { FC, lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import BrowserStorage from 'utils/broswer-storage';

import { RootState } from './rootReducer';
import { useAppDispatch } from './store';
import { MenuVisibilityProvider } from 'context/menuVisibility';
import { AppHistoryProvider } from 'context/appHistory';
import { toast } from 'react-toastify';

const Auth = lazy(() => import('features/auth/Auth'));
const Home = lazy(() => import('features/home/Home'));

const App: FC = () => {
  const dispatch = useAppDispatch();
  const { expert, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    toast.configure()
    onLoad();
  }, []);

  async function onLoad() {
    const exp = await BrowserStorage.getItem('expertadmin');
    dispatch(setExpert(exp));
  }

  return (
    <AppHistoryProvider>
      <MenuVisibilityProvider>
        <Router>
          <Switch>
            <Route path="/">
              <Suspense fallback={<p>Loading...</p>}>
                {!loading && (expert ? <Home /> : <Auth />)}
              </Suspense>
            </Route>
          </Switch>
        </Router>
      </MenuVisibilityProvider>
    </AppHistoryProvider>
  );
};

export default App;

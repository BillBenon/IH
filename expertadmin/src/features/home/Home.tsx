import OuterDiv from 'components/OuterDiv';
import Topbar from 'containers/Common/Topbar';
import { Sidebar } from 'containers/Question/Sidebar';
import { useMenuVisibility } from 'context/menuVisibility';
import AddOrEditProduct from 'features/addOrEditProducts/AddOrEditProduct';
import React, { FC, lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { Expert } from 'types';
import { isSuperAdmin } from 'utils/commonutils';

import { useHome } from './useHome';

const Home: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const roleType = useSelector((state: any) => state?.auth?.expert?.roleType)
  const { expert, handleLogout } = useHome();
  const { menuWidthPx } = useMenuVisibility()!;

  useEffect(() => {
    if (location.pathname == '/' && roleType !== 'MARKETING') history.push('/tracks');
  }, []);

  const Questions = lazy(() => import('features/questions/Questions'));
  const AddOrEditQuestion = lazy(() => import('features/addOrEditQuestion/AddOrEditQuestion'));
  const Capabilities = lazy(() => import('features/capabilities/Capabilities'));
  const Candidates = lazy(() => import('features/candidates/Candidates'));
  const AddOrEditCapability = lazy(() => import('features/addOrEditCapability/AddOrEditCapability'));
  const Tracks = lazy(() => import('features/tracks/Tracks'));
  const TrackSettings = lazy(() => import('features/trackSettings/TrackSettings'));
  const AddOrEditTrack = lazy(() => import('features/addOrEditTrack/AddOrEditTrack'));
  const UpdateTrackSettings = lazy(() => import('features/trackSettings/UpdateTrackSettings'));
  const Experts = lazy(() => import('features/experts/Experts'));
  const AddOrEditExpert = lazy(() => import('features/addOrEditExpert/AddOrEditExpert'));
  const GetPPPProduct = lazy(() => import('features/products/Products'));
  const ToolsDashboard = lazy(() => import('features/tools/toolsDashboard'));

  return (
    <>
      <Topbar onLogout={handleLogout} expert={expert} />
      <Sidebar />
      <OuterDiv {...{ menuWidthPx: menuWidthPx }}>
        <Suspense fallback={<p>Loading...</p>}>
          <Route path="/questions" exact component={Questions} />
          <Route path="/questions/:id" component={AddOrEditQuestion} />
          <Route path="/capabilities" exact component={Capabilities} />
          <Route path="/your-candidates" exact component={Candidates} />
          <Route path="/products" exact component={GetPPPProduct} />
          <Route path="/products/:id" exact component={AddOrEditProduct} />
          <Route
            path="/capabilities/:id"
            exact
            component={AddOrEditCapability}
          />
          <Route path="/tracks" exact component={Tracks} />
          <Route path="/tracks/:id" component={AddOrEditTrack} />
          <Route path="/trackSettings" exact component={TrackSettings} />
          <Route path="/trackSettings/:id" exact component={UpdateTrackSettings} />
          {isSuperAdmin(expert as Expert) && (<>
            <Route path="/experts" exact component={Experts} />
            <Route path="/experts/:id" component={AddOrEditExpert} />
            <Route path="/mail-tool" component={ToolsDashboard} />
          </>)}
        </Suspense>
      </OuterDiv>
    </>
  );
};

export default Home;

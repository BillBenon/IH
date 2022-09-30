import { useLoader } from 'context/loaderContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CreateHiringManager } from 'types/CreateHiringManager';
import { signupAction } from '../../actions/auth/authActions';
import { RootState } from '../../store';
import { B2B_MenuItems, RouterMap } from '../../utilities/constants';

export const useProvideAuth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const Loader = useLoader();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSignup = (signupInfo: CreateHiringManager) => {
    dispatch(signupAction(signupInfo));
  }

  useEffect(() => {
    if (user?.expertId) {
      Loader.hideLoader();
      history.push(RouterMap[B2B_MenuItems.jobs]);
    }
  }, [user]);


  return [{ handleSignup }];
};

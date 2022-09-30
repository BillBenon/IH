import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { setEntityState } from 'features/auth/authActions';
import { setExpert } from 'features/auth/authSlice';
import { useSelector } from 'react-redux';
import { Entity } from 'types';

export const useHome = () => {
  const dispatch = useAppDispatch();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const { expertId } = expert!;
  const handleLogout = () => {
    dispatch(setExpert());
  };

  const updateEntityState = (data: Entity[]) => {
    dispatch(setEntityState({ expertId, updatedBy: expertId, entities: data }));
  };

  return { expert, handleLogout, updateEntityState };
};

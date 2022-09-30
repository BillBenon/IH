import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ExpertTree,
  UpdateExpertRequest,
} from 'types';
import BrowserStorage from 'utils/broswer-storage';
import { getFolderPathAfterDomainName, isNumeric } from 'utils/commonutils';
import { MenuItems } from 'utils/constants';

import {
  getExpertDetails,
  updateExpert,
  addExpert,
} from './addOrEditExpertActions';
import {
  reset,
  setExpertSuccess,
  setExpertState,
  setInitialExpert,
  updateSelectedExpert,
  handleOpenAddEditExpert,
  updateExpertOverview,
} from './addOrEditExpertSlice';

export const useAddOrEditExpert = () => {
  const params: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const loggedInexpert = useSelector((state: RootState) => state.auth.expert);
  const {
    loading,
    saveSuccess,
    expert,
    expertSuccess,
    openAddEditExpert,
    selectedExpert,
    expertDetail,
    expertOverviewTree
  } = useSelector((state: RootState) => state.addOrEditExpert);
  const { expertId } = expert;
  const { expertId: loginExpertId } = loggedInexpert!;
  //const market = Market.INTERVIEWHELP;

  const fetchExpertDetails = async (paramId: string) => {
    if (paramId) {
      if (!isNumeric(paramId)) {
        const expertId = paramId;
        dispatch(getExpertDetails({ expertId, loginExpertId }));
      } else {
        const values = await BrowserStorage.getItem(MenuItems.experts);
        const inx =
          values && values?.findIndex((val: any) => val.param === paramId);
        if (inx != undefined && inx != -1 && values[inx]?.data) {
          dispatch(setInitialExpert(values[inx].data));
        } else {
          dispatch(setInitialExpert());
        }
      }
    }
  };

  const saveExpertDetails = (
    data: UpdateExpertRequest,
    expId?: string
  ) => {
    data['photoURL'] = getFolderPathAfterDomainName(data?.photoURL!);
    data.loginExpertId = loginExpertId;
    data.accessLevels = ["ALL"];
    (data.reviews || []).forEach((rev) => {
      rev.date = moment(rev.date, 'YYYY-MM-DD').format('MM/DD/YYYY')
    })
    if (!data.expertId) data.expertId = selectedExpert;
    if (!isNumeric(expId ?? params.id))
      dispatch(
        updateExpert({
          ...data,
          expertId
        })
      );
    else dispatch(addExpert(data));
  };

  const updateExpertState = (state: string) => {
    dispatch(setExpertState(state));
  };

  const setSelectedExpert = (id: string) => {
    dispatch(updateSelectedExpert(id));
  };

  const setOpenAddEditExpert = (payload: boolean) => {
    dispatch(handleOpenAddEditExpert(payload));
  };

  const updateOverview = (overview?: ExpertTree) => {
    dispatch(updateExpertOverview(overview));
  };


  const resetExpertSuccess = () => {
    dispatch(setExpertSuccess());
  };

  const initializeAddOrEditExpert = () => {
    dispatch(reset());
  };

  return {
    saveExpertDetails,
    fetchExpertDetails,
    updateExpertState,
    setSelectedExpert,
    setOpenAddEditExpert,
    updateOverview,
    resetExpertSuccess,
    initializeAddOrEditExpert,
    params,
    expert,
    loading,
    saveSuccess,
    expertSuccess,
    selectedExpert,
    openAddEditExpert,
    expertDetail,
    expertOverviewTree,
  };
};

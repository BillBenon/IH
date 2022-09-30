import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useAppHistory } from 'context/appHistory';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GetResultsForExpertSearchReq } from 'types';
import { isNumeric } from 'utils/commonutils';
import { MenuItems, Routes } from 'utils/constants';
import { getAllExperts } from './expertActions';
import { setexpertInputFilter, setPaginationFilter, reset } from './expertSlice';

export const useExperts = () => {
  const history = useHistory();
  const { recentItems, pushHistory } = useAppHistory();
  const { loading, experts, totalExperts, filterRequest } = useSelector((state: RootState) => state.expert);
  const loginExpertId = useSelector((state:RootState) => state.auth.expert?.expertId)
  const dispatch = useAppDispatch();

  const fetchExperts = () => {
    dispatch(
      getAllExperts({
        ...filterRequest,
        loginExpertId: loginExpertId || ''
      })
    );
  };

  const setExpertFilter = (request: GetResultsForExpertSearchReq) => {
    const {
      loginExpertId,
      fullname,
      email,
      roleType,
      expertCategory,
    } = request;
    dispatch(
      setexpertInputFilter({
        loginExpertId,
        fullname,
        email,
        roleType,
        expertCategory,
      })
    );
  };

  const setPaginationFilters = (skipCount: number) => {
    dispatch(setPaginationFilter({ skipCount }));
  };

  const routeToAddOrEditExpert = (
    isAdd?: boolean,
    expertId?: string,
    title?: string
  ) => {
    if (!expertId) {
      // capabilityId = selectedCapability?.capabilityId;
    }
    if (!isAdd && expertId) {
      pushHistory(MenuItems.experts, expertId, { title });
      history.push(Routes[MenuItems.experts] + `/${expertId}`);
    } else {
      history.push(
        Routes[MenuItems.experts] +
          `/${
            (recentItems[MenuItems.experts]?.filter((m: any) =>
              isNumeric(m.param)
            )?.length || 0) + 1
          }`
      );
    }
  };

  const initializeExpert = () => {
    dispatch(reset());
  };

  return [
    {
      routeToAddOrEditExpert,
      setExpertFilter,
      setPaginationFilters,
      fetchExperts,
      initializeExpert,
      loading,
      experts,
      totalExperts,
      filterRequest
    },
  ];
};

import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useAppHistory } from 'context/appHistory';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { GetCapabilitiesRequest } from 'types';
import { isNumeric } from 'utils/commonutils';
import { MenuItems, Routes } from 'utils/constants';

import {
  getAllCapabilities,
  getCategoriesAndSubcategories,
} from './capabilityActions';
import {
  setCapabilityInputFilter,
  setPaginationFilter,
  reset,
} from './capabilitySlice';

export const useCapabilities = () => {
  const history = useHistory();
  const { recentItems, pushHistory } = useAppHistory();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const {
    loading,
    capabilities,
    totalCapabilities,
    categorySubcategoryList,
    filterRequest,
  } = useSelector((state: RootState) => state.capability);
  const dispatch = useAppDispatch();
  const { expertId } = expert!;

  const fetchCapabilities = () => {
    dispatch(
      getAllCapabilities({
        ...filterRequest,
        expertId,
        updatedDateTo: filterRequest.updatedDateFrom
          ? filterRequest.updatedDateTo
          : '',
      })
    );
  };

  const setCapabilityFilter = (request: GetCapabilitiesRequest) => {
    const {
      textToSearch,
      searchInTitle,
      searchInDescription,
      updatedDateFrom,
      categoryId,
      subCategoryId,
      subcategoryCheck,
    } = request;
    dispatch(
      setCapabilityInputFilter({
        textToSearch,
        searchInTitle,
        searchInDescription,
        updatedDateFrom,
        categoryId,
        subCategoryId,
        subcategoryCheck,
      })
    );
  };

  const setPaginationFilters = (skipCount: number) => {
    dispatch(setPaginationFilter({ skipCount }));
  };

  const routeToAddOrEditCapability = (
    isAdd?: boolean,
    capabilityId?: string,
    title?: string
  ) => {
    if (!capabilityId) {
      // capabilityId = selectedCapability?.capabilityId;
    }
    if (!isAdd && capabilityId) {
      pushHistory(MenuItems.capabilities, capabilityId, { title });
      history.push(Routes[MenuItems.capabilities] + `/${capabilityId}`);
    } else {
      history.push(
        Routes[MenuItems.capabilities] +
          `/${
            (recentItems[MenuItems.capabilities]?.filter((m: any) =>
              isNumeric(m.param)
            )?.length || 0) + 1
          }`
      );
    }
  };

  const getAllCategoriesAndSubCategories = () => {
    dispatch(getCategoriesAndSubcategories({ expertId }));
  };

  const initializeCapability = () => {
    dispatch(reset());
  };

  return [
    {
      routeToAddOrEditCapability,
      setCapabilityFilter,
      setPaginationFilters,
      fetchCapabilities,
      getAllCategoriesAndSubCategories,
      initializeCapability,
      loading,
      capabilities,
      totalCapabilities,
      filterRequest,
      categorySubcategoryList,
    },
  ];
};

import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { useSelector } from "react-redux";
import {
  setPaginationFilter,
  reset,
  setPaginationFilterWithSearch,
  changeProductType,
} from "./productSlice";
import { useHistory } from "react-router-dom";
import { useAppHistory } from "context/appHistory";
import { MenuItems, Routes } from "utils/constants";
import { isNumeric } from "utils/commonutils";

import { getAllProducts } from "./productActions";
import { ProductFilter } from "types";

export const useProducts = () => {
  const history = useHistory();
  const { recentItems, pushHistory } = useAppHistory();

  const {
    loading,
    products,
    totalProducts,
    filterRequest,
    productType,
  } = useSelector((state: RootState) => state.products);
  const dispatch = useAppDispatch();

  const fetchProducts = () => {
    dispatch(getAllProducts({ ...filterRequest }));
  };

  const fetchProductsSearch = (filterRequest1: ProductFilter) => {
    const WithSkipLimit = { ...filterRequest, ...filterRequest1 };

    dispatch(getAllProducts({ ...WithSkipLimit }));
  };

  const setPaginationFilters = (skipCount: number) => {
    dispatch(setPaginationFilter({ skipCount }));
  };

  const setPaginationFiltersWithSearch = (filterRequest: ProductFilter) => {
    dispatch(setPaginationFilterWithSearch(filterRequest));
  };

  const initializeProducts = () => {
    dispatch(reset());
  };

  const changeProductTypeD = (payload: string) => {
    dispatch(changeProductType(payload));
  };

  const routeToAddOrEditProduct = (
    isAdd?: boolean,
    productId?: string,
    title?: string
  ) => {
    if (!productId) {
      // capabilityId = selectedCapability?.capabilityId;
    }
    if (!isAdd && productId) {
      pushHistory(MenuItems.products, productId, { title });
      history.push(Routes[MenuItems.products] + `/${productId}`);
    } else {
      history.push(
        Routes[MenuItems.products] +
          `/${
            (recentItems[MenuItems.products]?.filter((m: any) =>
              isNumeric(m.param)
            )?.length || 0) + 1
          }`
      );
    }
  };

  return [
    {
      fetchProducts,
      loading,
      products,
      productType,
      totalProducts,
      setPaginationFilters,
      initializeProducts,
      filterRequest,
      routeToAddOrEditProduct,
      setPaginationFiltersWithSearch,
      fetchProductsSearch,
      changeProductTypeD,
    },
  ];
};

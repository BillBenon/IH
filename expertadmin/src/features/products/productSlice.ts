import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PaginationFilters, ProductFilter, Products } from "types";
import { initialProductFilter } from "utils/defaults";

import { getAllProducts } from "./productActions";

interface IInitialState {
  loading: boolean;
  success: boolean;
  error: boolean;
  products: Products[];
  totalProducts: number;
  filterRequest: ProductFilter;
  productType: string;
}

const initialState: IInitialState = {
  loading: false,
  success: false,
  error: false,
  products: [],
  totalProducts: 0,
  filterRequest: initialProductFilter,
  productType: "",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    changeProductType(state, { payload }: PayloadAction<any>) {
      state.productType = payload;
    },

    setPaginationFilter(state, { payload }: PayloadAction<PaginationFilters>) {
      if (payload.count != undefined) state.filterRequest.limit = payload.count;
      state.filterRequest.offset = payload.skipCount;
    },

    setPaginationFilterWithSearch(
      state,
      { payload }: PayloadAction<ProductFilter>
    ) {
      if (payload.limit != undefined)
        state.filterRequest.productType = payload.productType;
      state.filterRequest.subProductType = payload.subProductType;
      state.filterRequest.productName = payload.productName;
    },

    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload?.data?.products;
      state.totalProducts = action.payload?.data?.totalCount;

      state.success = true;
      state.loading = false;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  setPaginationFilter,
  setPaginationFilterWithSearch,
  changeProductType,
} = productSlice.actions;

export default productSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  EditProductData,
  ExpertList,
  TrackList,
  expertMeetingData,
  ClassInfo,
  TagsList,
} from "types";
import {
  defaultClassInfo,
  defaultMeetingData,
  initialEditData,
} from "utils/defaults";
import {
  getAllEnumsArr,
  addProduct,
  getAllExpertsList,
  getAllMArkets,
  getAllTracksForProduct,
  getProductByProductId,
  updateProductA,
  updatePriceSTRIPE,
  getProductsByExpertOrTracks,
  getExpertMeetingsTalkToExpert,
  createClassInfo,
  getClassInfo,
  updateClassInfo,
  getProductTagsInfo,
} from "./addorEditProductActions";

interface ProductState {
  trackList: undefined | TrackList[];
  marketList: undefined | { label: ""; value: "" }[];
  expertList: undefined | ExpertList[];
  success: boolean;
  loading: boolean;
  error: boolean;
  editProduct: EditProductData;
  savedResponse: EditProductData;
  editDataLoaded: boolean;
  addSuccess: boolean;
  productList: EditProductData[];
  serviceTypeEnum: [];
  expertMeetings: expertMeetingData[];
  classInfo: ClassInfo[];
  loadingClassInfo: boolean;
  classInfoError: boolean;
  tagsList: undefined | TagsList[];
}

const initialState = {
  error: false,
  success: false,
  loading: false,
  editProduct: initialEditData,
  editDataLoaded: false,
  addSuccess: false,
  savedResponse: initialEditData,
  productList: [initialEditData],
  serviceTypeEnum: [],
  expertMeetings: [defaultMeetingData],
  loadingClassInfo: false,
  classInfoError: false,
  classInfo: [defaultClassInfo],
} as ProductState;

const addOrEditProductSlice = createSlice({
  name: "addOrEditProduct",
  initialState,
  reducers: {
    setDefaultProductNameAsPerExpert: (
      state,
      { payload }: PayloadAction<any>
    ) => {
      state.editProduct.name =
        state.editProduct.subProductType == "expertMeeting"
          ? `${payload}, Coaching, ${payload}, Mock Interview`
          : `${payload}, Response Review`;
    },
    reset: (state) => {
      state.addSuccess = false;
      state.savedResponse = initialEditData;
      state.productList = [initialEditData];
      state.serviceTypeEnum = [];
      state.expertMeetings = [defaultMeetingData];
      state.classInfo = [];
      state.editProduct = initialEditData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.fulfilled, (state, action) => {
        if (action.payload?.data.apiStatus == "ERROR") {
          state.error = true;
          state.success = false;
          alert(action.payload?.data.apiMessage);
        } else {
          const editProduct = action.payload?.data.output.product;
          editProduct.active = editProduct.active ? "1" : "0";
          if (editProduct.subscriptionProduct) {
            editProduct.productCategory = 1;
          } else if (editProduct.contractProduct) {
            editProduct.productCategory = 2;
          } else if (editProduct.free) {
            editProduct.productCategory = 3;
          } else {
            editProduct.productCategory = 4;
          }
          if (state.trackList?.length) {
            editProduct.tracks = editProduct.tracks.map((val: string) => {
              return {
                value: val,
                label:
                  state.trackList?.find((ele: any) => ele.value == val)
                    ?.label || "",
              };
            });
          }

          editProduct.serviceEntities = editProduct.serviceEntities?.map(
            (elem: any) => {
              return {
                value: elem.id,
                label: elem.name,
              };
            }
          );

          state.editProduct = editProduct;
          state.error = false;
          state.success = true;
          state.addSuccess = true;
          state.savedResponse = action.payload?.data.output.product;
        }

        state.loading = false;

        // action is inferred correctly here if using TS
      })
      .addCase(addProduct.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
      })
      .addCase(addProduct.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllTracksForProduct.fulfilled, (state, action) => {
        state.trackList = action.payload?.data.output.tracks.map((ele: any) => {
          return { label: ele.title, value: ele.trackId };
        });
        state.success = true;
        state.loading = false;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(getAllTracksForProduct.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
        state.editDataLoaded = false;
      })
      .addCase(getAllTracksForProduct.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(getProductByProductId.fulfilled, (state, action) => {
        const editProduct = action.payload?.data.output.product;
        editProduct.active = editProduct.active ? "1" : "0";
        if (editProduct.subscriptionProduct) {
          editProduct.productCategory = 1;
        } else if (editProduct.contractProduct) {
          editProduct.productCategory = 2;
        } else if (editProduct.free) {
          editProduct.productCategory = 3;
        } else {
          editProduct.productCategory = 4;
        }
        if (state.trackList?.length) {
          editProduct.tracks = editProduct.tracks.map((val: string) => {
            return {
              value: val,
              label:
                state.trackList?.find((ele: any) => ele.value == val)?.label ||
                "",
            };
          });
        }
        editProduct.serviceEntities = editProduct.serviceEntities?.map(
          (elem: any) => {
            return {
              value: elem.id,
              label: elem.name,
            };
          }
        );

        state.editProduct = editProduct;
        state.success = true;
        state.loading = false;
        state.error = false;
        state.editDataLoaded = true;
      })
      .addCase(getProductByProductId.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
        state.editDataLoaded = false;
      })
      .addCase(getProductByProductId.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(updateProductA.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.error = false;
        alert(action.payload?.data.apiMessage);
      })
      .addCase(updateProductA.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
      })
      .addCase(updateProductA.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getAllEnumsArr.fulfilled, (state, action) => {
        const serviceTypeArr = action.payload?.data?.output?.metadata?.ServiceType.map(
          (elem: any) => {
            return {
              value: elem.value,
              label: elem.description,
            };
          }
        );
        state.serviceTypeEnum = serviceTypeArr;
      })
      .addCase(getAllMArkets.fulfilled, (state, action) => {
        state.marketList = action.payload?.data.output.map((ele: any) => {
          return { label: ele.textId, value: ele.textId };
        });
        state.success = true;
        state.loading = false;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(getAllMArkets.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
        state.editDataLoaded = false;
      })
      .addCase(getAllMArkets.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(getAllExpertsList.fulfilled, (state, action) => {
        state.expertList = action.payload?.data.output.experts.map(
          (ele: any) => {
            return { label: ele.fullName, value: ele.expertId };
          }
        );
        state.success = true;
        state.loading = false;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(getAllExpertsList.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
        state.editDataLoaded = false;
      })
      .addCase(getAllExpertsList.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(updatePriceSTRIPE.fulfilled, (state, action) => {
        if (action.payload?.data.apiStatus == "ERROR") {
          state.error = true;
          state.success = false;
        } else {
          state.success = true;
          state.error = false;
        }

        state.loading = false;
        alert(action.payload?.data.apiMessage);
      })
      .addCase(updatePriceSTRIPE.rejected, (state) => {
        state.success = false;
        state.loading = false;
        state.error = true;
        state.editDataLoaded = false;
      })
      .addCase(updatePriceSTRIPE.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(getProductsByExpertOrTracks.fulfilled, (state, action) => {
        if (action.payload?.data.apiStatus == "ERROR") {
          state.error = true;
          state.success = false;
          state.loading = false;
        } else {
          const editProduct = action.payload?.data.output?.product;
          state.productList = editProduct;
          state.success = true;
          state.error = false;
          state.editDataLoaded = true;
          state.loading = false;
        }
      })
      .addCase(getProductsByExpertOrTracks.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
        state.editDataLoaded = false;
      })
      .addCase(getExpertMeetingsTalkToExpert.fulfilled, (state, action) => {
        state.expertMeetings = action.payload?.data.output?.meetingDetails;
        state.success = true;
        state.loading = false;
        state.error = false;
      })
      .addCase(getExpertMeetingsTalkToExpert.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })

      .addCase(createClassInfo.pending, (state) => {
        state.loadingClassInfo = true;
        state.classInfoError = false;
      })
      .addCase(createClassInfo.fulfilled, (state, action) => {
        if (action.payload?.data?.output)
          state.classInfo = [...state.classInfo, action.payload?.data?.output];
        state.loadingClassInfo = false;
        state.classInfoError = false;
      })
      .addCase(createClassInfo.rejected, (state) => {
        state.loadingClassInfo = false;
        state.classInfoError = true;
      })

      .addCase(getClassInfo.pending, (state) => {
        state.loadingClassInfo = true;
        state.classInfoError = false;
      })
      .addCase(getClassInfo.fulfilled, (state, action) => {
        if (action.payload?.data?.output) {
          state.classInfo = action.payload?.data?.output;
        }
        state.loadingClassInfo = false;
        state.classInfoError = false;
      })
      .addCase(getClassInfo.rejected, (state) => {
        state.loadingClassInfo = false;
        state.classInfoError = true;
      })

      .addCase(updateClassInfo.pending, (state) => {
        state.loadingClassInfo = true;
        state.classInfoError = false;
      })
      .addCase(updateClassInfo.fulfilled, (state, action) => {
        if (action.payload?.data?.output)
          state.classInfo = action.payload?.data?.output;
        state.loadingClassInfo = false;
        state.classInfoError = false;
      })
      .addCase(updateClassInfo.rejected, (state) => {
        state.loadingClassInfo = false;
        state.classInfoError = true;
      })
      .addCase(getProductTagsInfo.pending, (state) => {
        state.loadingClassInfo = true;
        state.classInfoError = false;
      })
      .addCase(getProductTagsInfo.fulfilled, (state, action) => {
        if (action.payload?.data?.output)
          state.tagsList = action.payload?.data.output.config.values;
        state.loadingClassInfo = false;
        state.classInfoError = false;
      })
      .addCase(getProductTagsInfo.rejected, (state) => {
        state.loadingClassInfo = false;
        state.classInfoError = true;
      });
    // ADD CASE
  },
});

export const {
  reset,
  setDefaultProductNameAsPerExpert,
} = addOrEditProductSlice.actions;

export default addOrEditProductSlice.reducer;

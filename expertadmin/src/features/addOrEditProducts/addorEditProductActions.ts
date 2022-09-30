import { createAsyncThunk } from "@reduxjs/toolkit";
import { addOrEditProducts } from "api/addOrEditProducts";

import {
  ClassInfo,
  ClassInfoRequest,
  GetAllTracksEnrollType,
  GetMeetings,
  GetProductByIdRequest,
  ProductRequest,
  ProductsExpertTrack,
  UpdatePriceRequest,
  UpdateProductRequest,
} from "types";

const {
  getAllEnums,
  createProduct,
  getProductById,
  updateProduct,
  getAllMarkets,
  getAllTracks,
  getAllExperts,
  updatePrice,
  getProductsByExpertOrTrack,
  getExpertMeetings,
  createProductClassInfo,
  getProductClassInfo,
  updateProductClassInfo,
  getProductTags,
} = addOrEditProducts;

export const addProduct = createAsyncThunk(
  `addOrEditProduct/addTrack`,
  async (data: ProductRequest) => {
    const response = await createProduct(data);
    return response;
  }
);

export const getAllTracksForProduct = createAsyncThunk(
  `addOrEditProduct/getTracks`,
  async (payload: GetAllTracksEnrollType) => {
    const response = await getAllTracks(payload);
    return response;
  }
);

export const getAllMArkets = createAsyncThunk(
  `addOrEditProduct/getAllMarkets`,
  async () => {
    const response = await getAllMarkets();
    return response;
  }
);

export const getAllExpertsList = createAsyncThunk(
  `addOrEditProduct/getAllExpertsList`,
  async () => {
    const response = await getAllExperts();
    return response;
  }
);

export const getAllEnumsArr = createAsyncThunk(
  `addOrEditProduct/getAllEnumsArr`,
  async (enumType: string) => {
    const response = await getAllEnums(enumType);
    return response;
  }
);

export const getProductByProductId = createAsyncThunk(
  `addOrEditProduct/getProductById`,
  async (getProductByIdRequest: GetProductByIdRequest) => {
    const response = await getProductById(getProductByIdRequest);
    return response;
  }
);

export const updateProductA = createAsyncThunk(
  `addOrEditProduct/updateProduct`,
  async (updateProductRequest: UpdateProductRequest) => {
    const response = await updateProduct(updateProductRequest);
    return response;
  }
);

export const updatePriceSTRIPE = createAsyncThunk(
  `addOrEditProduct/updatePrice`,
  async (updatePriceRequest: UpdatePriceRequest) => {
    const response = await updatePrice(updatePriceRequest);
    return response;
  }
);

export const getProductsByExpertOrTracks = createAsyncThunk(
  `addOrEditProduct/getProductsByExpertAndTrack`,
  async (getProductsPayload: ProductsExpertTrack) => {
    const response = await getProductsByExpertOrTrack(getProductsPayload);
    return response;
  }
);

export const getExpertMeetingsTalkToExpert = createAsyncThunk(
  `addOrEditProduct/getExpertMeetingsTalkToExpert`,
  async (getMeetingsPayload: GetMeetings) => {
    const response = await getExpertMeetings(getMeetingsPayload);
    return response;
  }
);

export const createClassInfo = createAsyncThunk(
  `addOrEditProduct/createClassInfo`,
  async (classInfo: ClassInfo) => {
    const response = await createProductClassInfo(classInfo);
    return response;
  }
);

export const getClassInfo = createAsyncThunk(
  `addOrEditProduct/getClassInfo`,
  async (classInfoRequest: ClassInfoRequest) => {
    const response = await getProductClassInfo(classInfoRequest);
    return response;
  }
);

export const updateClassInfo = createAsyncThunk(
  `addOrEditProduct/updateClassInfo`,
  async (classInfo: ClassInfo) => {
    const response = await updateProductClassInfo(classInfo);
    return response;
  }
);

export const getProductTagsInfo = createAsyncThunk(
  `addOrEditProduct/getProductTags`,
  async () => {
    return await getProductTags();
  }
);

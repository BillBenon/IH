import { post as postEvaluation } from "api/evaluationPlatformApi";
import { post as postEvaluationPlatformTalkToExpert } from "api/evaluationPlatformTalkToExpertApi";
import { post } from "api/pppserviceApi";
import { post as postClasses } from "api/classesApi";
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
import { API, CONFIGTYPES } from "utils/constants";

const createProduct = (createProductRequest: ProductRequest) => {
    return post(API.PPP_CREATEPRODUCT, createProductRequest);
};

const getProductById = (getProductByIdRequest: GetProductByIdRequest) => {
    return post(API.PPP_GETPRODUCTBYID, getProductByIdRequest);
};

const updateProduct = (updateProductRequest: UpdateProductRequest) => {
    return post(API.PPP_UPDATEPRODUCT, updateProductRequest);
};

const getAllEnums = (enumType: string) => {
    const requestData = {
        types: [enumType],
    };
    return postClasses(API.GET_ENUMS, requestData);
};

const updatePrice = (updatePriceRequest: UpdatePriceRequest) => {
    return post(API.PPP_UPDATEPRICE, updatePriceRequest);
};

const getAllMarkets = () => {
    return postEvaluation(API.GETALLMARKETS);
};

const getAllTracks = (payload: GetAllTracksEnrollType) => {
    return postEvaluation(API.GETALLTRACKSADDPRODUCT, payload);
};

const getAllExperts = () => {
    return postEvaluation(API.GETALLEXPERTS);
};
const getProductsByExpertOrTrack = (
    getProductsPayload: ProductsExpertTrack
) => {
    return post(API.PPP_GETPRODUCTSFORTRACKANDEXPERT, getProductsPayload);
};

const getExpertMeetings = (payload: GetMeetings) => {
    return postEvaluationPlatformTalkToExpert(API.GETMEETINGS, payload);
};

const createProductClassInfo = (payload: ClassInfo) => {
    return postClasses(API.PPP_CREATECLASSINFO, payload);
};

const getProductClassInfo = (payload: ClassInfoRequest) => {
    return postClasses(API.PPP_GETCLASSINFO, payload);
};

const updateProductClassInfo = (payload: ClassInfo) => {
    return postClasses(API.PPP_UPDATECLASSINFO, payload);
};

const getProductTags = () => {
    return postClasses(API.GETCONFIG, { type: CONFIGTYPES.PRODUCTTAGS });
};

export const addOrEditProducts = {
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
};

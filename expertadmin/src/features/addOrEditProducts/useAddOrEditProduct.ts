import { RootState } from "app/rootReducer";
import { useAppDispatch } from "app/store";
import { useSelector } from "react-redux";
import {
  GetAllTracksEnrollType,
  GetMeetings,
  GetProductByIdRequest,
  ProductRequest,
  ProductsExpertTrack,
  UpdatePriceRequest,
  UpdateProductRequest,
  ClassInfo,
  ClassInfoRequest,
} from "types";
import { useParams } from "react-router-dom";
import {
  addProduct,
  getAllTracksForProduct,
  getProductByProductId,
  updateProductA,
  getAllMArkets,
  getAllEnumsArr,
  getAllExpertsList,
  updatePriceSTRIPE,
  getProductsByExpertOrTracks,
  getExpertMeetingsTalkToExpert,
  createClassInfo,
  getClassInfo,
  updateClassInfo,
  getProductTagsInfo,
} from "./addorEditProductActions";
import {
  setDefaultProductNameAsPerExpert,
  reset,
} from "./addOrEditProductSlice";

export const useAddOrEditProduct = () => {
  const params: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const product = useSelector((state: RootState) => state.addOrEditProducts);
  const { expertList } = product;
  const expert = useSelector((state: RootState) => state.auth.expert);
  const { expertId } = expert!;

  const resetState = () => {
    dispatch(reset());
  };

  const createProducts = async (product: ProductRequest) => {
    dispatch(addProduct({ ...product }));
  };

  const getInitialTracks = (payload: GetAllTracksEnrollType) => {
    dispatch(getAllTracksForProduct(payload));
  };

  const getInitialMarkets = () => {
    dispatch(getAllMArkets());
  };

  const getInitialExperts = () => {
    dispatch(getAllExpertsList());
  };

  const getProductById = (getProductByIdRequest: GetProductByIdRequest) => {
    dispatch(getProductByProductId(getProductByIdRequest));
  };

  const updateProduct = (updateProductRequest: UpdateProductRequest) => {
    dispatch(updateProductA(updateProductRequest));
  };

  const updatePrice = (updatePriceRequest: UpdatePriceRequest) => {
    dispatch(updatePriceSTRIPE(updatePriceRequest));
  };

  const setDefaultProductNameAsPerExperts = (expertName: string) => {
    dispatch(setDefaultProductNameAsPerExpert(expertName));
  };

  const loadInitialDataAdd = async () => {
    await Promise.all([
      dispatch(getAllExpertsList()),
      dispatch(getAllMArkets()),
      dispatch(getAllEnumsArr("ServiceType")),
    ]);
  };

  const loadInitialDataEdit = async (
    getProductByIdRequest: GetProductByIdRequest,
    payload: GetAllTracksEnrollType
  ) => {
    await Promise.all([
      dispatch(getAllExpertsList()),
      dispatch(getAllMArkets()),
      dispatch(getAllTracksForProduct(payload)),
      dispatch(getAllEnumsArr("ServiceType")),
    ]);
    dispatch(getProductByProductId(getProductByIdRequest));
  };

  const getProductsByExpertorTrack = (payload: ProductsExpertTrack) => {
    dispatch(getProductsByExpertOrTracks(payload));
  };

  const fetchExpertMeetings = (getMeetingsPayload: GetMeetings) => {
    dispatch(getExpertMeetingsTalkToExpert(getMeetingsPayload));
  };

  const dispatchCreateClassInfo = (payload: ClassInfo) => {
    dispatch(createClassInfo(payload));
  };

  const dispatchUpdateClassInfo = (payload: ClassInfo) => {
    dispatch(updateClassInfo(payload));
  };

  const dispatchGetClassInfo = (payload: ClassInfoRequest) => {
    dispatch(getClassInfo(payload));
  };
  const getInitialTags = () => {
    dispatch(getProductTagsInfo());
  };

  return [
    {
      product,
      params,
      expertId,
      expertList,
      createProducts,
      getInitialTracks,
      resetState,
      getProductById,
      updateProduct,
      getInitialMarkets,
      getInitialExperts,
      setDefaultProductNameAsPerExperts,
      loadInitialDataAdd,
      loadInitialDataEdit,
      updatePrice,
      getProductsByExpertorTrack,
      fetchExpertMeetings,
      dispatchCreateClassInfo,
      dispatchUpdateClassInfo,
      dispatchGetClassInfo,
      getInitialTags,
    },
  ];
};

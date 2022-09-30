import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { BreadcrumbsContent } from 'components/Breadcrumbs';
import { IdText } from 'containers/Common/HybridListView';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  CreateTreeRequest,
  ExpertAllDetail,
  TrackDetails,
  TrackQuestion,
} from 'types';
import BrowserStorage from 'utils/broswer-storage';
import { getFolderPathAfterDomainName, isNumeric } from 'utils/commonutils';
import {
  DefaultPaginationCount,
  Entity,
  Market,
  MenuItems,
} from 'utils/constants';

import {
  addCapabilityQuestions,
  addTrack,
  checkAndUpdateTrackHierarchy,
  checkAndValidateTrack,
  editTrack,
  fetchQuestionsFromCapability,
  fetchSubcategoryByCategoryId,
  fetchTrackDetails,
  fetchTrackSummary,
  fetchTrackTags,
  getEnums,
  getExperts,
  getMarkets,
  getTrackTreeData,
  insertTrackTree,
  updateTrackComplete,
} from './addOrEditTrackActions';
import {
  handleCheckedCapabilities,
  handleCheckedCategories,
  handleCheckedQuestions,
  handleCheckedSubCategories,
  removeExpertsToAdd,
  reset,
  resetExpertsToAdd,
  setAttachQuestionToCapability,
  setBreadcrumbs,
  setCapabilitiesToAttach,
  setExpandedKeys,
  setExpertRequestSkipCount,
  setExpertRequestText,
  setInitialTrack,
  setTrackState,
  updateHighlightedExpert,
  updateIsCapabilityAdd,
  updateSelectedItems,
  resetValidation,
  updateTrackTree,
} from './addOrEditTrackSlice';

export const useAddOrEditTrack = () => {
  const params: { id: string } = useParams();
  const dispatch = useAppDispatch();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const {
    isPendingSave,
    checkedQuestions,
    checkedCapabilities,
    checkedSubCategories,
    checkedCategories,
    trackSummary,
    addCapabilityQuestionsSuccess,
    track,
    selectedItems,
    loading,
    saveSuccess,
    trackTypes,
    trackSubTypes,
    experts,
    totalExperts,
    expertRequest,
    expertsToAdd,
    markets,
    trackTree,
    getTrackTreeLoading,
    capabilityQuestions,
    getQuestionsFromCapabilitySuccess,
    isAttachQuestionsToCapability,
    capabilitiesToAttach,
    updatingHierarchy,
    updatingHierarchySuccess,
    validateTrackSuccess,
    validatingTrack,
    validateTrackErrors,
    publishTrackSuccess,
    publishingTrack,
    breadcrumbs,
    isCapabilityAdd,
    expandedKeys,
    subCategories,
    insertTreeSuccess,
    trackTags,
  } = useSelector((state: RootState) => state.addOrEditTrack);
  const { trackId } = track;
  const { expertId } = expert!;
  const market = Market.INTERVIEWHELP;

  const getTracksDetails = async () => {
    if (params.id) {
      if (!isNumeric(params.id)) {
        const trackId = params.id;
        dispatch(fetchTrackDetails({ trackId, expertId }));
      } else {
        const values = await BrowserStorage.getItem(MenuItems.tracks);
        const inx =
          values && values?.findIndex((val: any) => val.param === params.id);
        if (inx != undefined && inx != -1 && values[inx]?.data) {
          dispatch(setInitialTrack(values[inx].data));
        } else {
          dispatch(setInitialTrack());
        }
      }
    }
  };

  const getTrackTree = (tId?: string) => {
    if (!isNumeric(params.id)) {
      dispatch(getTrackTreeData({ trackId: tId ?? params.id, expertId }));
    }
  };

  const saveTrackDetails = (data: TrackDetails, expertIds: string[]) => {
    data['logo'] = data?.logo && getFolderPathAfterDomainName(data.logo);
    if (!isNumeric(params.id))
      dispatch(
        editTrack({
          ...data,
          trackId,
          expertIds,
          expertId,
          market,
          updatedBy: expertId,
        })
      );
    else
      dispatch(
        addTrack({ ...data, expertIds, expertId, market, createdBy: expertId })
      );
  };

  const fetchEnums = (types: string[]) => {
    dispatch(getEnums({ types, expertId }));
  };

  const getAllExperts = (textToSearch?: string, skipCount?: number) => {
    dispatch(
      getExperts({
        expertId,
        skipCount: skipCount || 0,
        count: DefaultPaginationCount,
        textToSearch: textToSearch || '',
      })
    );
  };

  const setHighlightedExpert = (expert: ExpertAllDetail) => {
    dispatch(updateHighlightedExpert(expert));
  };

  const setExpertsToAdd = (expertsToAdd: ExpertAllDetail[]) => {
    dispatch(resetExpertsToAdd(expertsToAdd));
  };

  const handleExpertSearchSkipCount = (skipcount: number) => {
    dispatch(setExpertRequestSkipCount(skipcount));
  };

  const handleExpertSearchText = (text: string) => {
    dispatch(setExpertRequestText(text));
  };

  const deleteExpertsToAdd = (expertId: string) => {
    dispatch(removeExpertsToAdd(expertId));
  };

  const getAllMarkets = () => {
    dispatch(getMarkets({ expertId }));
  };

  const publishTrack = () => {
    dispatch(
      updateTrackComplete({ expertId, trackId: params.id, updatedBy: expertId })
    );
  };

  const updateTrackState = (state: string) => {
    dispatch(setTrackState(state));
  };

  const updateHierarchy = () => {
    if (!isNumeric(params.id))
      dispatch(checkAndUpdateTrackHierarchy({ trackId: params.id, expertId }));
  };

  const setIsCapabilityAdd = (val: boolean) => {
    dispatch(updateIsCapabilityAdd(val));
  };

  const getSubCategoriesByCategoryId = (categoryId: string) => {
    dispatch(fetchSubcategoryByCategoryId({ categoryId, expertId }));
  };

  const setTrackTree = (trackTree: CreateTreeRequest) => {
    const tree = { ...trackTree };
    let cats = tree.categories?.slice();
    cats = cats?.map((cat) => {
      return {
        ...cat,
        entity: Entity.CATEGORY,
        capabilities: cat.capabilities?.map((cap) => {
          return {
            ...cap,
            entity: Entity.CAPABILITY,
            questions: cap.questions?.map((ques) => {
              return {
                ...ques,
                entity: Entity.QUESTION,
              };
            }),
          };
        }),
        subCategories: cat.subCategories?.map((subcat) => {
          return {
            ...subcat,
            entity: Entity.SUBCATEGORY,
            capabilities: subcat.capabilities?.map((cap) => {
              return {
                ...cap,
                entity: Entity.CAPABILITY,
                questions: cap.questions?.map((ques) => {
                  return {
                    ...ques,
                    entity: Entity.QUESTION,
                  };
                }),
              };
            }),
          };
        }),
      };
    });
    tree.categories = cats;
    dispatch(insertTrackTree({ ...tree, expertId, updatedBy: expertId }));
  };

  const setSelectedItems = (selectedItems: IdText[]) => {
    dispatch(updateSelectedItems(selectedItems));
  };

  const getCapabilityQuestions = (capabilityId: string) => {
    dispatch(fetchQuestionsFromCapability({ expertId, capabilityId }));
  };

  const addQuestionsToCapability = (
    capabilityId: string,
    questionIds: string[]
  ) => {
    dispatch(addCapabilityQuestions({ capabilityId, questionIds, expertId }));
  };

  const updateAttachQuestionToCapability = (val: boolean | undefined) => {
    dispatch(setAttachQuestionToCapability(val));
  };

  const updateCapabilitiesToAttach = (val: any) => {
    dispatch(setCapabilitiesToAttach(val));
  };

  const getTrackSummary = () => {
    dispatch(fetchTrackSummary({ trackId: params.id, expertId }));
  };

  const validateTrack = () => {
    dispatch(checkAndValidateTrack({ trackId: params.id, expertId }));
  };

  const updateBreadcrumbs = (data: BreadcrumbsContent[]) => {
    dispatch(setBreadcrumbs(data));
  };

  const setCheckedQuestions = (data: IdText[]) => {
    dispatch(handleCheckedQuestions(data));
  };

  const setCheckedCapabilities = (data: IdText[]) => {
    dispatch(handleCheckedCapabilities(data));
  };

  const setCheckedCategories = (data: IdText[]) => {
    dispatch(handleCheckedCategories(data));
  };

  const setCheckedSubCategories = (data: IdText[]) => {
    dispatch(handleCheckedSubCategories(data));
  };

  const initializeTrack = () => {
    dispatch(reset());
  };

  const initializeValidation = () => {
    dispatch(resetValidation());
  };

  const handleExpandedKeys = (data: any) => {
    dispatch(setExpandedKeys(data));
  };

  const insertQuestionsInTrack = (
    newquestions: TrackQuestion[],
    categoryId: string,
    capabilityId: string,
    subCategoryId?: string,
    localtree?: CreateTreeRequest
  ) => {
    const categories = (localtree ?? trackTree)?.categories?.slice() ?? [];
    const inx = categories?.findIndex((cat) => cat.categoryId === categoryId);
    if (categories && inx != undefined && inx > -1) {
      const category = { ...categories[inx] };
      if (!subCategoryId) {
        const capabilities = category.capabilities?.slice();
        const capInx = capabilities?.findIndex(
          (cap) => cap.capabilityId == capabilityId
        );
        if (capInx != undefined && capInx > -1) {
          const capability = { ...capabilities[capInx] };
          capability.questions = newquestions;
          capabilities.splice(capInx, 1, capability);
        }
        category.capabilities = capabilities;
        categories.splice(inx, 1, category);
        return { ...(localtree ?? trackTree), categories: categories ?? [] };
      } else {
        const subCatInx = category.subCategories?.findIndex(
          (sub) => sub.subCategoryId === subCategoryId
        );
        if (subCatInx != undefined && subCatInx > -1) {
          const subcats = category.subCategories.slice();
          const subcategory = { ...subcats[subCatInx] };
          const capabilities = subcategory.capabilities?.slice();
          const capInx = capabilities?.findIndex(
            (cap) => cap.capabilityId == capabilityId
          );
          if (capInx != undefined && capInx > -1) {
            const capability = { ...capabilities[capInx] };
            capability.questions = newquestions;
            capabilities.splice(capInx, 1, capability);
          }
          subcategory.capabilities = capabilities;
          subcats.splice(subCatInx, 1, subcategory);
          category.subCategories = subcats;
        }
        categories.splice(inx, 1, category);
        return { ...(localtree ?? trackTree), categories: categories ?? [] };
      }
    }
  };

  const addToBreadcrumbs = (brcb: BreadcrumbsContent[], title: string) => {
    brcb.push({ title });
    updateBreadcrumbs(brcb);
  };

  const findAndUpdateToBreadcrumbs = (
    brcb: BreadcrumbsContent[],
    title: string
  ) => {
    const inx = brcb.findIndex((b) => b.title == title);
    if (inx == -1) {
      addToBreadcrumbs(brcb, title);
    } else {
      updateBreadcrumbs(brcb);
    }
  };

  const appendTrackTree = (data?: CreateTreeRequest) => {
    dispatch(updateTrackTree(data));
  };

  const getTrackTags = () => {
    dispatch(fetchTrackTags(expertId))
  }

  return {
    findAndUpdateToBreadcrumbs,
    updateAttachQuestionToCapability,
    addToBreadcrumbs,
    insertQuestionsInTrack,
    getCapabilityQuestions,
    addQuestionsToCapability,
    handleExpertSearchSkipCount,
    deleteExpertsToAdd,
    handleExpertSearchText,
    setHighlightedExpert,
    saveTrackDetails,
    getTracksDetails,
    setExpertsToAdd,
    getAllExperts,
    fetchEnums,
    getAllMarkets,
    publishTrack,
    updateTrackState,
    setTrackTree,
    getTrackTree,
    setSelectedItems,
    updateCapabilitiesToAttach,
    getTrackSummary,
    updateHierarchy,
    validateTrack,
    updateBreadcrumbs,
    setIsCapabilityAdd,
    setCheckedQuestions,
    setCheckedCapabilities,
    setCheckedCategories,
    setCheckedSubCategories,
    initializeTrack,
    handleExpandedKeys,
    getSubCategoriesByCategoryId,
    initializeValidation,
    appendTrackTree,
    getTrackTags,
    trackTags,
    isPendingSave,
    subCategories,
    expandedKeys,
    isCapabilityAdd,
    breadcrumbs,
    publishTrackSuccess,
    publishingTrack,
    trackSummary,
    expertId,
    selectedItems,
    loading,
    saveSuccess,
    trackId,
    track,
    trackTypes,
    trackSubTypes,
    params,
    experts,
    totalExperts,
    expertsToAdd,
    expertRequest,
    markets,
    trackTree,
    getTrackTreeLoading,
    insertTreeSuccess,
    capabilityQuestions,
    addCapabilityQuestionsSuccess,
    getQuestionsFromCapabilitySuccess,
    isAttachQuestionsToCapability,
    capabilitiesToAttach,
    updatingHierarchy,
    updatingHierarchySuccess,
    validatingTrack,
    validateTrackSuccess,
    validateTrackErrors,
    checkedQuestions,
    checkedCapabilities,
    checkedSubCategories,
    checkedCategories,
  };
};

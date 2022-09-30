import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BreadcrumbsContent } from 'components/Breadcrumbs';
import { IdText } from 'containers/Common/HybridListView';
import {
  CreateTreeRequest,
  ExpertAllDetail,
  GetExpertsRequest,
  MarketDetail,
  SubCategory,
  TrackDetails,
  TrackErrors,
  TrackSummary,
  ValueDescription,
} from 'types';
import { DefaultPaginationCount, Enum, State } from 'utils/constants';
import { initialTrack } from 'utils/defaults';

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

interface IInitialState {
  error: boolean;
  success: boolean;
  loading: boolean;
  track: TrackDetails;
  saveSuccess: boolean;
  trackTypes: ValueDescription[];
  trackSubTypes: ValueDescription[];
  experts: ExpertAllDetail[];
  totalExperts: number;
  expertsToAdd: ExpertAllDetail[];
  expertRequest: GetExpertsRequest;
  markets: MarketDetail[];
  trackTree?: CreateTreeRequest;
  getTrackTreeLoading: boolean;
  insertTreeSuccess: boolean;
  selectedItems: IdText[];
  getQuestionsFromCapabilitySuccess: boolean;
  addCapabilityQuestionsSuccess: boolean;
  fetchTrackSummarySuccess: boolean;
  capabilityQuestions: { title: string; questionId: string }[];
  isAttachQuestionsToCapability?: boolean;
  capabilitiesToAttach?: any;
  trackSummary?: TrackSummary;
  updatingHierarchy: boolean;
  updatingHierarchySuccess: boolean;
  validatingTrack: boolean;
  validateTrackSuccess: boolean;
  validateTrackErrors?: TrackErrors[];
  publishTrackSuccess: boolean;
  publishingTrack: boolean;
  breadcrumbs: BreadcrumbsContent[];
  isCapabilityAdd: boolean;
  checkedQuestions: IdText[];
  checkedCapabilities: IdText[];
  checkedCategories: IdText[];
  checkedSubCategories: IdText[];
  expandedKeys: string[];
  subCategories: SubCategory[];
  isPendingSave?: boolean;
  trackTags?: any[];
}

const initialState: IInitialState = {
  publishTrackSuccess: false,
  updatingHierarchy: false,
  updatingHierarchySuccess: false,
  error: false,
  success: false,
  loading: false,
  track: initialTrack,
  saveSuccess: false,
  trackTypes: [],
  trackSubTypes: [],
  experts: [],
  totalExperts: 0,
  expertsToAdd: [],
  markets: [],
  getTrackTreeLoading: false,
  insertTreeSuccess: false,
  selectedItems: [],
  capabilityQuestions: [],
  addCapabilityQuestionsSuccess: false,
  fetchTrackSummarySuccess: false,
  getQuestionsFromCapabilitySuccess: false,
  validatingTrack: false,
  publishingTrack: false,
  validateTrackSuccess: false,
  breadcrumbs: [],
  isCapabilityAdd: false,
  checkedQuestions: [],
  checkedCapabilities: [],
  checkedCategories: [],
  checkedSubCategories: [],
  expandedKeys: [],
  subCategories: [],
  expertRequest: {
    textToSearch: '',
    expertId: '',
    skipCount: 0,
    count: DefaultPaginationCount,
    flags: { case_sensitive: false, exact_match: false },
  },
  trackTags: []
};

const addOrEditTrackSlice = createSlice({
  name: 'addOrEditTrack',
  initialState,
  reducers: {
    setInitialTrack(
      state,
      { payload }: PayloadAction<TrackDetails | undefined>
    ) {
      if (payload) state.track = payload;
      else state.track = initialTrack;
      state.isPendingSave = false;
    },
    updateHighlightedExpert(
      state,
      { payload }: PayloadAction<ExpertAllDetail>
    ) {
      const inx = state.expertsToAdd.findIndex(
        (hh) => hh.expertId === payload.expertId
      );
      if (inx === -1) state.expertsToAdd.push(payload);
      else state.expertsToAdd.splice(inx, 1);
    },
    resetExpertsToAdd(state, { payload }: PayloadAction<ExpertAllDetail[]>) {
      state.expertsToAdd = payload;
    },
    setExpertRequestSkipCount(state, { payload }: PayloadAction<number>) {
      state.expertRequest.skipCount = payload;
    },
    setExpertRequestText(state, { payload }: PayloadAction<string>) {
      state.expertRequest.textToSearch = payload;
    },
    removeExpertsToAdd(state, { payload }: PayloadAction<string>) {
      const inx = state.track.expertIds.findIndex(
        (ex) => ex.expertId === payload
      );
      state.track.expertIds.splice(inx, 1);
    },
    setTrackState(state, { payload }: PayloadAction<string>) {
      state.track.state = payload;
      if (payload != State.DISABLED) {
        state.track.disabled = false;
        state.track.disableReason = '';
      }
    },
    updateSelectedItems(state, { payload }: PayloadAction<IdText[]>) {
      state.selectedItems = payload;
    },
    setAttachQuestionToCapability(
      state,
      { payload }: PayloadAction<boolean | undefined>
    ) {
      state.isAttachQuestionsToCapability = payload;
      if (!payload) {
        state.capabilitiesToAttach = undefined;
      }
    },
    setCapabilitiesToAttach(state, { payload }: PayloadAction<any>) {
      state.capabilitiesToAttach = payload;
    },
    setBreadcrumbs(state, { payload }: PayloadAction<BreadcrumbsContent[]>) {
      state.breadcrumbs = payload;
    },
    updateIsCapabilityAdd(state, { payload }: PayloadAction<boolean>) {
      state.isCapabilityAdd = payload;
    },
    handleCheckedQuestions(state, { payload }: PayloadAction<IdText[]>) {
      state.checkedQuestions = payload;
    },
    handleCheckedCapabilities(state, { payload }: PayloadAction<IdText[]>) {
      state.checkedCapabilities = payload;
    },
    handleCheckedCategories(state, { payload }: PayloadAction<IdText[]>) {
      state.checkedCategories = payload;
    },
    handleCheckedSubCategories(state, { payload }: PayloadAction<IdText[]>) {
      state.checkedSubCategories = payload;
    },
    reset(state) {
      state.checkedQuestions = [];
      state.checkedCapabilities = [];
      state.checkedCategories = [];
      state.checkedSubCategories = [];
      state.capabilityQuestions = [];
      state.subCategories = [];
    },
    setExpandedKeys: (state, { payload }: PayloadAction<string[]>) => {
      state.expandedKeys = payload;
    },
    resetValidation: (state) => {
      state.validateTrackErrors = undefined;
      state.validateTrackSuccess = false;
      state.validatingTrack = false;
      state.updatingHierarchySuccess = false;
    },
    updateTrackTree: (
      state,
      { payload }: PayloadAction<CreateTreeRequest | undefined>
    ) => {
      state.trackTree = payload;
      state.isPendingSave = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTrackDetails.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(fetchTrackDetails.fulfilled, (state, action) => {
      state.track = action.payload?.data?.output;
      if (state.track) {
        if (state.track.disabled) state.track.state = State.DISABLED;
      }
      state.success = true;
      state.loading = false;
    });
    builder.addCase(fetchTrackDetails.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getEnums.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getEnums.fulfilled, (state, action) => {
      const tracktypes = action.payload?.data?.output[Enum.TrackType];
      const trackSubTypes = action.payload?.data?.output[Enum.TrackSubType];
      if (tracktypes) {
        state.trackTypes = tracktypes;
      }
      if (trackSubTypes) {
        state.trackSubTypes = trackSubTypes;
      }
      state.success = true;
      state.loading = false;
    });
    builder.addCase(getEnums.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getExperts.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getExperts.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.experts = action.payload?.data?.output?.experts || [];
      state.totalExperts = action.payload?.data?.output?.count || 0;
      state.expertRequest.skipCount =
        state.expertRequest.skipCount >= state.totalExperts
          ? 0
          : state.expertRequest.skipCount;
    });
    builder.addCase(getExperts.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(getMarkets.pending, (state) => {
      state.error = false;
      state.success = false;
      state.loading = true;
    });
    builder.addCase(getMarkets.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.markets = action.payload?.data?.output || [];
    });
    builder.addCase(getMarkets.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(updateTrackComplete.pending, (state) => {
      state.error = false;
      state.publishTrackSuccess = false;
      state.publishingTrack = true;
    });
    builder.addCase(updateTrackComplete.fulfilled, (state) => {
      state.publishTrackSuccess = true;
      state.publishingTrack = false;
    });
    builder.addCase(updateTrackComplete.rejected, (state) => {
      state.error = true;
      state.publishingTrack = false;
    });
    builder.addCase(getTrackTreeData.pending, (state) => {
      state.error = false;
      state.success = false;
      state.getTrackTreeLoading = true;
    });
    builder.addCase(getTrackTreeData.fulfilled, (state, action) => {
      state.success = true;
      state.getTrackTreeLoading = false;
      state.isPendingSave = false;
      state.trackTree = action.payload?.data?.output;
      if (!state.trackTree) {
        state.trackTree = {
          trackId: state.track.trackId,
          trackName: state.track.title,
          categories: [],
          expertId: action.meta.arg.expertId,
          updatedBy: action.meta.arg.expertId,
        };
      }
    });
    builder.addCase(getTrackTreeData.rejected, (state) => {
      state.error = true;
      state.getTrackTreeLoading = false;
    });
    builder.addCase(addTrack.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
    });
    builder.addCase(addTrack.fulfilled, (state, action) => {
      if (action.payload) {
        state.saveSuccess = true;
        state.loading = false;
        state.track.trackId = action.payload?.data?.output.trackId;
        state.trackTree = {
          trackId: state.track.trackId,
          trackName: state.track.title,
          categories: [],
          expertId: action.meta.arg.expertId,
          updatedBy: action.meta.arg.expertId,
        };
        if (state.track?.disabled) state.track.state = State.DISABLED;
      } else {
        state.error = true;
        state.loading = false;
      }
    });
    builder.addCase(addTrack.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(editTrack.pending, (state) => {
      state.error = false;
      state.saveSuccess = false;
      state.loading = true;
    });
    builder.addCase(editTrack.fulfilled, (state, action) => {
      if (action.payload) {
        state.saveSuccess = true;
        state.loading = false;
        state.trackTree = {
          ...state.trackTree,
          trackName:
            action.payload?.data?.output.title ?? action.meta.arg.title,
        } as any;
      } else {
        state.error = true;
        state.loading = false;
      }
    });
    builder.addCase(editTrack.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(insertTrackTree.pending, (state) => {
      state.error = false;
      state.insertTreeSuccess = false;
      state.updatingHierarchySuccess = false;
      state.validateTrackSuccess = false;
      state.isPendingSave = false;
      state.loading = true;
    });
    builder.addCase(insertTrackTree.fulfilled, (state) => {
      state.insertTreeSuccess = true;
      state.publishTrackSuccess = false;
      state.loading = false;
    });
    builder.addCase(insertTrackTree.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchQuestionsFromCapability.pending, (state) => {
      state.error = false;
      state.getQuestionsFromCapabilitySuccess = false;
      state.loading = true;
    });
    builder.addCase(fetchQuestionsFromCapability.fulfilled, (state, action) => {
      state.getQuestionsFromCapabilitySuccess = true;
      const capabilityId = action.meta.arg.capabilityId;
      if (state.isAttachQuestionsToCapability) {
        if (!state.capabilitiesToAttach) state.capabilitiesToAttach = {};
        state.capabilitiesToAttach[capabilityId] =
          action.payload?.data?.output?.questions;
      }
      state.capabilityQuestions = action.payload?.data?.output?.questions ?? [];
      state.loading = false;
    });
    builder.addCase(fetchQuestionsFromCapability.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(addCapabilityQuestions.pending, (state) => {
      state.error = false;
      state.addCapabilityQuestionsSuccess = false;
      state.loading = true;
    });
    builder.addCase(addCapabilityQuestions.fulfilled, (state, action) => {
      state.addCapabilityQuestionsSuccess = true;
      state.capabilityQuestions = action.payload?.data?.output?.questions ?? [];
      state.loading = false;
    });
    builder.addCase(addCapabilityQuestions.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchTrackSummary.pending, (state) => {
      state.error = false;
      state.publishTrackSuccess = false;
      state.fetchTrackSummarySuccess = false;
      state.loading = true;
    });
    builder.addCase(fetchTrackSummary.fulfilled, (state, action) => {
      state.fetchTrackSummarySuccess = true;
      state.trackSummary = action.payload?.data?.output;
      state.loading = false;
    });
    builder.addCase(fetchTrackSummary.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(checkAndUpdateTrackHierarchy.pending, (state) => {
      state.error = false;
      state.updatingHierarchySuccess = false;
      state.updatingHierarchy = true;
    });
    builder.addCase(checkAndUpdateTrackHierarchy.fulfilled, (state) => {
      state.updatingHierarchySuccess = true;
      state.updatingHierarchy = false;
    });
    builder.addCase(checkAndUpdateTrackHierarchy.rejected, (state) => {
      state.error = true;
      state.updatingHierarchy = false;
    });
    builder.addCase(checkAndValidateTrack.pending, (state) => {
      state.error = false;
      state.validatingTrack = true;
    });
    builder.addCase(checkAndValidateTrack.fulfilled, (state, action) => {
      state.validateTrackSuccess = action.payload?.data?.output?.overallStatus;
      state.validatingTrack = false;
      if (action.payload?.data?.output?.errors?.length) {
        state.validateTrackErrors = action.payload?.data?.output?.errors;
      } else {
        state.validateTrackSuccess = true;
        state.validateTrackErrors = undefined;
      }
    });
    builder.addCase(checkAndValidateTrack.rejected, (state) => {
      state.error = true;
      state.validatingTrack = false;
    });
    builder.addCase(fetchSubcategoryByCategoryId.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(fetchSubcategoryByCategoryId.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.subCategories = action.payload?.data?.output;
    });
    builder.addCase(fetchSubcategoryByCategoryId.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
    builder.addCase(fetchTrackTags.pending, (state) => {
      state.error = false;
      state.loading = true;
    });
    builder.addCase(fetchTrackTags.fulfilled, (state, action) => {
      state.error = false;
      state.loading = false;
      state.trackTags = action.payload?.data?.output?.values;
    });
    builder.addCase(fetchTrackTags.rejected, (state) => {
      state.error = true;
      state.loading = false;
    });
  },
});

export const {
  reset,
  updateTrackTree,
  resetValidation,
  setExpandedKeys,
  handleCheckedQuestions,
  handleCheckedCapabilities,
  handleCheckedCategories,
  handleCheckedSubCategories,
  setBreadcrumbs,
  updateIsCapabilityAdd,
  setInitialTrack,
  removeExpertsToAdd,
  updateHighlightedExpert,
  resetExpertsToAdd,
  setExpertRequestSkipCount,
  setExpertRequestText,
  setTrackState,
  updateSelectedItems,
  setAttachQuestionToCapability,
  setCapabilitiesToAttach,
} = addOrEditTrackSlice.actions;

export default addOrEditTrackSlice.reducer;

import { post } from 'api';
import { ExpertId, GetResultForTrackSettingsRequest, TrackId, UpdateTrackLandingPage, RefreshInput } from 'types';
import { API } from 'utils/constants';

const getTracks = (payload: GetResultForTrackSettingsRequest) => {
  return post(API.GETALLTRACKSFORLANDING, payload);
};

const getTracksForCombobox = (payload: ExpertId) => {
  return post(API.GETTRACKSFORCOMBOBOX, payload);
}


const createTrackLandingPageDetail = (payload: ExpertId & TrackId) => {
  return post(API.CREATETRACKLANDINGPAGEDETAIL, payload);
}

const updateTrackLandingPageDetail = (payload: UpdateTrackLandingPage) => {
  return post(API.UPDATETRACKLANDINGPAGEDETAIL, payload);
}

const getTrackLandingPageDetails = (payload: TrackId & ExpertId) => {
  return post(API.GETTRACKLANDINGPAGEDETAILS, payload);
}

const refreshDataFromTrackAndProduct = (payload: RefreshInput) => {
  return post(API.REFRESHDATAFROMTRACKANDPRODUCT, payload);
}

export const trackSettings = {
  getTracks,
  getTracksForCombobox,
  createTrackLandingPageDetail,
  updateTrackLandingPageDetail,
  getTrackLandingPageDetails,
  refreshDataFromTrackAndProduct,
};

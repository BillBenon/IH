import { post } from '../utilities';
import {
  IGetMarketInfoRequest,
  ICreateNewCandidateForMarketRequest,
  ICreateCandidateTrackForCandidateRequest,
  IGetDetailsForCandidatebyCandidateTrackIdRequest,
  IGetTracksForCandidateRequest,
  ILogin,
  ISaveResponseForQuestionOfCandidateTracks,
  ISubmitResponseToExpert,
  ICandidateViewedExpertFeedback,
  IGetAnswerStatusRequest,
  IForgotPassword,
  IResetPassword,
  ISaveCandidateLastActivity,
  ILogClientErrors,
  IGetCandidateInfoById,
  IGetDashboardRequest,
  IGetQuestionAndExpert,
  IGetStatusScoreRequest,
  IChangeCandidateTrackPlan,
  IAddSketchAnswer,
  IGetSketchUserAnswer,
  IGetSketchExpertAnswer,
  IGETLINKEDINACCESSTOKENREQUEST,
  IVerifyEditing,
  IGetDetailsForCandidatebyCandidateAndTrackIdRequest,
  ILANDINGPAGELOGINREQUEST,
  IPENDINGSCHEDULEMEETINGS,
  IGETAVAILABLESHAREDQUESTION,
  ISHAREANSWERANDFEEDBACK,
  IGETSHAREDQUESTIONS,
  ISETTODOLIST,
  ITODOLIST,
  MENUNOTIFICATION,
  S3CURDOPRATIONS,
  GETTRACKTITLE,
} from '../types';
import { DEFAULT_TOKEN } from 'utilities/constants';

const API_PREFIX = 'evaluationPlatform';
const API_PREFIX_EXPERT = 'evaluationPlatform/expert';

const getMarketInfo = (payload: IGetMarketInfoRequest) => {
  return post(`${API_PREFIX}/getMarketInfo`, payload);
};

const getMarkets = () => {
  return post(`${API_PREFIX}/getMarkets`, { token: DEFAULT_TOKEN });
};

const getEnums = (payload: any) => {
  return post(`metadata/getEnums`, payload);
};

const createNewCandidateForMarket = (payload: ICreateNewCandidateForMarketRequest) => {
  return post(`${API_PREFIX}/createNewCandidateForMarket`, payload);
};

const createCandidateTrackForCandidate = (payload: ICreateCandidateTrackForCandidateRequest) => {
  return post(`${API_PREFIX}/createCandidateTrackForCandidate`, payload);
};

const getDetailsForCandidatebyCandidateTrackId = (payload: IGetDetailsForCandidatebyCandidateTrackIdRequest) => {
  return post(`${API_PREFIX}/getDetailsForCandidatebyCandidateTrackId`, payload);
};

const getCandidateTrackTree = (payload: IGetDetailsForCandidatebyCandidateTrackIdRequest) => {
  return post(`${API_PREFIX}/getCandidateTrackTree`, { ...payload, token: DEFAULT_TOKEN });
};

const getDetailsForCandidateByCandidateAndTrackId = (payload: IGetDetailsForCandidatebyCandidateAndTrackIdRequest) => {
  return post(`${API_PREFIX}/getDetailsForCandidateByCandidateAndTrackId`, payload);
};

const getTracksForCandidate = (payload: IGetTracksForCandidateRequest) => {
  return post(`${API_PREFIX}/getTracksForCandidate`, payload);
};

const login = (payload: ILogin) => {
  return post(`${API_PREFIX}/login`, payload);
};

const saveResponseForQuestionOfCandidateTrack = (payload: ISaveResponseForQuestionOfCandidateTracks) => {
  return post(`${API_PREFIX}/saveResponseForQuestionOfCandidateTrack`, payload);
};

const submitResponseToExpert = (payload: ISubmitResponseToExpert) => {
  return post(`${API_PREFIX}/submitResponseToExpert`, payload);
};


const verifyEditing = (payload: IVerifyEditing) => {
  return post(`${API_PREFIX}/verifyEditing`, payload);
};

const candidateViewedExpertFeedback = (payload: ICandidateViewedExpertFeedback) => {
  return post(`${API_PREFIX}/candidateViewedExpertFeedback`, payload);
};

const getAnswerStatus = (payload: IGetAnswerStatusRequest) => {
  return post(`${API_PREFIX}/getAnswerStatus`, payload);
}

const forgotPassword = (payload: IForgotPassword) => {
  return post(`${API_PREFIX}/forgetPassword`, payload);
};

const resetPassword = (payload: IResetPassword) => {
  return post(`${API_PREFIX}/resetPassword`, payload);
};

const saveCandidateLastActivity = (payload: ISaveCandidateLastActivity) => {
  return post(`${API_PREFIX}/saveCandidateLastActivity`, payload);
};

const logClientErrors = (payload: ILogClientErrors) => {
  return post(`${API_PREFIX}Utilities/logClientErrors`, payload);
};

const getCandidateInfo = (payload: IGetCandidateInfoById) => {
  return post(`${API_PREFIX}/getCandidateInfo`, payload);
}

const getDashBoardInfo = (payload: IGetDashboardRequest) => {
  return post(`${API_PREFIX}/getDashboardInfo`, payload);
};

const getQuestionAndExperts = (payload: IGetQuestionAndExpert) => {
  return post(`${API_PREFIX}/getQuestionAndExpert`, payload);
}

const getStatusScore = (payload: IGetStatusScoreRequest) => {
  return post(`${API_PREFIX}/getDashboardScore`, payload);
};

const changeCandidateTrackPlan = (payload: IChangeCandidateTrackPlan) => {
  return post(`${API_PREFIX}/changeCandidateTrackPlan`, payload);
}
const addUserSketchAnswer = (payload: IAddSketchAnswer) => {
  return post(`${API_PREFIX}/addSketchAnswer`, payload);
}
const getUserSketchAnswer = (payload: IGetSketchUserAnswer) => {
  return post(`${API_PREFIX}/getSketchAnswer`, payload);
}
const getLinkedInAccessToken = (payload: IGETLINKEDINACCESSTOKENREQUEST) => {
  return post(`${API_PREFIX}/getLinkedInAccessToken`, payload);
}

const getExpertSketchAnswer = (payload: IGetSketchExpertAnswer) => {
  return post(`${API_PREFIX_EXPERT}/getSketchFeedback`, payload);
}

const landingPageLogin = (payload: ILANDINGPAGELOGINREQUEST) => {
  return post(`${API_PREFIX}/landingPageLogin`, payload);
}

const getPendingScheduleMeetings = (payload: IPENDINGSCHEDULEMEETINGS) => {
  return post(`${API_PREFIX}/getPendingScheduleMeetings`, payload);
}

const getMenuNotificationAlert = (payload: MENUNOTIFICATION) => {
  return post(`${API_PREFIX}/getMenuNotificationAlert`, payload);
}

const getNotificationMsg = (payload: MENUNOTIFICATION) => {
  return post(`${API_PREFIX}/getMenuNotifications`, payload);
}

const candidateViewedMeetingFeedback = (payload: { "token": string, "meetingDetailId": string }) => {
  return post(`${API_PREFIX}/candidateViewedMeetingFeedback`, payload);
}

const getProductTags = () => {
  return post(`getConfig`, { type: "PRODUCTTAGS" }, {}, true);
}

const getAvailableSharedQuestion = (payload: IGETAVAILABLESHAREDQUESTION) => {
  return post(`${API_PREFIX}/getAvailableSharedQuestion`, { ...payload, token: DEFAULT_TOKEN });
}

const shareAnswerAndFeedback = (payload: ISHAREANSWERANDFEEDBACK) => {
  return post(`${API_PREFIX}/shareAnswerAndFeedback`, { ...payload, token: DEFAULT_TOKEN });
}

const getSharedQuestions = (payload: IGETSHAREDQUESTIONS) => {
  return post(`${API_PREFIX}/getSharedQuestions`, { ...payload, token: DEFAULT_TOKEN });
}

const getToDoList = (payload: ITODOLIST) => {
  return post(`${API_PREFIX}/getToDoList`, { ...payload, token: DEFAULT_TOKEN });
}

const setToDoList = (payload: ISETTODOLIST) => {
  return post(`${API_PREFIX}/setToDoList`, { ...payload, token: DEFAULT_TOKEN });
}

const getS3SignedInCredentials = (payload: S3CURDOPRATIONS) => {
  return post(`${API_PREFIX}/getS3SignedInCredentialsForFileUploading`, { ...payload, token: DEFAULT_TOKEN });
}

const getS3FolderFiles = (payload: S3CURDOPRATIONS) => {
  return post(`${API_PREFIX}/getS3FolderFiles`, { ...payload, token: DEFAULT_TOKEN });
}

const getSignedURLToGETFile = (payload: S3CURDOPRATIONS) => {
  return post(`${API_PREFIX}/getSignedURLToGETFile`, { ...payload, token: DEFAULT_TOKEN });
}

const deleteS3File = (payload: S3CURDOPRATIONS) => {
  return post(`${API_PREFIX}/deleteS3File`, { ...payload, token: DEFAULT_TOKEN });
}

const getTrackTitles = (payload: GETTRACKTITLE) => {
  return post(`${API_PREFIX}/getTrackTitles`, { ...payload, token: DEFAULT_TOKEN });
}

export const evaluationPlatformService = {
  getCandidateTrackTree,
  landingPageLogin,
  getMarketInfo,
  getEnums,
  createNewCandidateForMarket,
  createCandidateTrackForCandidate,
  getDetailsForCandidatebyCandidateTrackId,
  getDetailsForCandidateByCandidateAndTrackId,
  getTracksForCandidate,
  login,
  saveResponseForQuestionOfCandidateTrack,
  submitResponseToExpert,
  verifyEditing,
  candidateViewedExpertFeedback,
  getAnswerStatus,
  forgotPassword,
  resetPassword,
  saveCandidateLastActivity,
  logClientErrors,
  getCandidateInfo,
  getDashBoardInfo,
  getQuestionAndExperts,
  getStatusScore,
  changeCandidateTrackPlan,
  addUserSketchAnswer,
  getUserSketchAnswer,
  getExpertSketchAnswer,
  getLinkedInAccessToken,
  getPendingScheduleMeetings,
  getProductTags,
  getAvailableSharedQuestion,
  shareAnswerAndFeedback,
  getSharedQuestions,
  getToDoList,
  setToDoList,
  getMenuNotificationAlert,
  getNotificationMsg,
  candidateViewedMeetingFeedback,
  getS3SignedInCredentials,
  getS3FolderFiles,
  deleteS3File,
  getSignedURLToGETFile,
  getTrackTitles,
  getMarkets
};

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { evaluationPlatformService } from '../../services/evaluationPlatform';
import {
  ILogin,
  ISaveResponseForQuestionOfCandidateTracks,
  IGetMarketInfoRequest,
  ICreateNewCandidateForMarketRequest,
  ICreateCandidateTrackForCandidateRequest,
  IGetTracksForCandidateRequest,
  IGetDetailsForCandidatebyCandidateTrackIdRequest,
  ISubmitResponseToExpert,
  ICandidateViewedExpertFeedback,
  IGetAnswerStatusRequest,
  IForgotPassword,
  IResetPassword,
  ISaveCandidateLastActivity,
  ILogClientErrors,
  IGetCandidateInfoById,
  IGetDashboardRequest,
  IGetStatusScoreRequest,
  IChangeCandidateTrackPlan,
  IAddSketchAnswer,
  IGetDetailsForCandidatebyCandidateAndTrackIdRequest,
  IGETLINKEDINACCESSTOKENREQUEST,
  ILANDINGPAGELOGINREQUEST,
  ISHAREDQUESTIONSID,
  MENUNOTIFICATION
} from 'types';
import { Candidate_Id, Candidate_Track_Id, DEFAULT_TOKEN, QUESTION_STATUS_TEXT } from 'utilities/constants';
import _ from 'lodash';
import { getObjectFromTrack } from 'utilities';
import store from 'store';
import { getValueBrowserStorage } from 'services/browserStorageService';

const API_Prefix = 'evaluationPlatform';

interface IInitialState {
  market?: any;
  marketList: any;
  candidate?: any;
  tracksData?: any;
  currentTrack?: any;
  selectedCapabilityId: string;
  currentAnsVersionId: string;
  currentQuestionId: string;
  loading: boolean;
  saving: boolean;
  error: string | null | undefined;
  trackPlan: string;
  planState: string;
  badges: any;
  sharedQuestionIds: ISHAREDQUESTIONSID[];
  resumeSelectionOpen: boolean;
}

const initialState: IInitialState = {
  market: null,
  marketList: [],
  candidate: null,
  tracksData: null,
  currentTrack: null,
  selectedCapabilityId: '',
  currentQuestionId: '',
  currentAnsVersionId: '',
  loading: false,
  saving: false,
  error: null,
  trackPlan: '',
  planState: '',
  badges: {},
  sharedQuestionIds: [],
  resumeSelectionOpen: true
};

export const getMarketInfoAction = createAsyncThunk(
  `${API_Prefix}/getMarketinfo`,
  async (data: IGetMarketInfoRequest) => {
    const response = await evaluationPlatformService.getMarketInfo(data);
    return response;
  }
);

export const getMarketListAction = createAsyncThunk(`${API_Prefix}/getAllMarkets`, async (data: any) => {
  const response = await evaluationPlatformService.getEnums(data);
  return response;
});

export const createNewCandidateForMarketAction = createAsyncThunk(
  `${API_Prefix}/createNewCandidateForMarket`,
  async (data: ICreateNewCandidateForMarketRequest) => {
    const response = await evaluationPlatformService.createNewCandidateForMarket(data);
    return response;
  }
);

export const getTracksForCandidate = createAsyncThunk(
  `${API_Prefix}/getTracksForCandidate`,
  async (data: IGetTracksForCandidateRequest) => {
    const response = await evaluationPlatformService.getTracksForCandidate(data);
    return response;
  }
);

export const createCandidateTrackForCandidate = createAsyncThunk(
  `${API_Prefix}/createCandidateTrackForCandidate`,
  async (data: ICreateCandidateTrackForCandidateRequest) => {
    const response = await evaluationPlatformService.createCandidateTrackForCandidate(data);
    return response;
  }
);

export const getDetailsForCandidatebyCandidateTrackId = createAsyncThunk(
  `${API_Prefix}/getDetailsForCandidatebyCandidateTrackId`,
  async (data: IGetDetailsForCandidatebyCandidateTrackIdRequest) => {
    const response = await evaluationPlatformService.getDetailsForCandidatebyCandidateTrackId(data);
    return response;
  }
);

export const getDetailsForCandidateByCandidateAndTrackId = createAsyncThunk(
  `${API_Prefix}/getDetailsForCandidateByCandidateAndTrackId`,
  async (data: IGetDetailsForCandidatebyCandidateAndTrackIdRequest) => {
    const response = await evaluationPlatformService.getDetailsForCandidateByCandidateAndTrackId(data);
    return response;
  }
);

export const getLinkedInAccessToken = createAsyncThunk(
  `${API_Prefix}/getLinkedInAccessToken`,
  async (data: IGETLINKEDINACCESSTOKENREQUEST) => {
    const response = await evaluationPlatformService.getLinkedInAccessToken(data);
    return response;
  }
);

export const landingPageLogin = createAsyncThunk(
  `${API_Prefix}/landingPageLogin`,
  async (data: ILANDINGPAGELOGINREQUEST) => {
    const response = await evaluationPlatformService.landingPageLogin(data);
    return response;
  }
);

export const login = createAsyncThunk(`${API_Prefix}/login`, async (data: ILogin) => {
  const response = await evaluationPlatformService.login(data);
  return response;
});

export const saveResponseForQuestionOfCandidateTrack = createAsyncThunk(
  `${API_Prefix}/saveResponseForQuestionOfCandidateTrack`,
  async (data: ISaveResponseForQuestionOfCandidateTracks) => {
    const response = await evaluationPlatformService.saveResponseForQuestionOfCandidateTrack(data);
    return response;
  }
);

export const submitResponseToExpert = createAsyncThunk(
  `${API_Prefix}/submitResponseToExpert`,
  async (data: ISubmitResponseToExpert) => {
    const response = await evaluationPlatformService.submitResponseToExpert(data);
    return response;
  }
);

export const candidateViewedExpertFeedback = createAsyncThunk(
  `${API_Prefix}/candidateViewedExpertFeedback`,
  async (data: ICandidateViewedExpertFeedback) => {
    const response = await evaluationPlatformService.candidateViewedExpertFeedback(data);
    return response;
  }
);

export const getAnswerStatus = createAsyncThunk(
  `${API_Prefix}/getAnswerStatus`,
  async (data: IGetAnswerStatusRequest) => {
    const response = await evaluationPlatformService.getAnswerStatus(data);
    return response;
  }
);

export const forgotPassword = createAsyncThunk(`${API_Prefix}/forgotPassword`, async (data: IForgotPassword) => {
  const response = await evaluationPlatformService.forgotPassword(data);
  return response;
});

export const resetPassword = createAsyncThunk(`${API_Prefix}/resetPassword`, async (data: IResetPassword) => {
  const response = await evaluationPlatformService.resetPassword(data);
  return response;
});

export const getCandidateScheduledMeetings = createAsyncThunk(`${API_Prefix}/getPendingScheduleMeetings`, async (data: any) => {
  const response = await evaluationPlatformService.getPendingScheduleMeetings(data);
  return response;
});

export const getMenuNotificationAlert = createAsyncThunk(`${API_Prefix}/getMenuNotificationAlert`, async (data: { "trackId": string, "menu": string }) => {
  const candidateId = getValueBrowserStorage(Candidate_Id);
  const candidateTrackId = getValueBrowserStorage(Candidate_Track_Id);
  const token = DEFAULT_TOKEN;
  const response = await evaluationPlatformService.getMenuNotificationAlert({ token, candidateId, "trackId": data.trackId, candidateTrackId, "menu": data.menu });
  return response;
});

export const getNotificationMsg = createAsyncThunk(`${API_Prefix}/getMenuNotifications`, async (data: { "trackId": string, "menu": string }) => {
  const candidateId = getValueBrowserStorage(Candidate_Id);
  const candidateTrackId = getValueBrowserStorage(Candidate_Track_Id);
  const token = DEFAULT_TOKEN;
  const response = await evaluationPlatformService.getNotificationMsg({ token, candidateId, "trackId": data.trackId, candidateTrackId, "menu": data.menu });
  response["menu"] = data.menu;
  return response;
});

export const getAvailableSharedQuestion = createAsyncThunk(`${API_Prefix}/getAvailableSharedQuestion`, async (data: any) => {
  const response = await evaluationPlatformService.getAvailableSharedQuestion(data);
  return response;
});

export const saveCandidateLastActivity = createAsyncThunk(`${API_Prefix}/saveCandidateLastActivity`, async (data: {
  selectedCapabilityId?: string,
  currentQuestionId?: string,
  currentAnsVersionId?: string
}) => {
  const { currentTrack: { candidateTrack: [CT] } } = store.getState().evaluationPlatform;
  const { candidateTrackId } = CT
  const ModData: ISaveCandidateLastActivity = {
    token: DEFAULT_TOKEN,
    candidateTrackId,
    candidateTrackLastActivity: {
      key1: 'TRACK',
      value1: '',
      key2: 'CAPABILITY_ID',
      value2: data.selectedCapabilityId || '',
      key3: 'QUESTION_ID',
      value3: data.currentQuestionId || '',
      key4: 'QUESTION_ANSWER_ID',
      value4: data.currentAnsVersionId || '',
    }
  }
  const response = await evaluationPlatformService.saveCandidateLastActivity(ModData);
  return response;
});

export const getDashboardInfo = createAsyncThunk(`${API_Prefix}/getDashboardInfo`, async (data: IGetDashboardRequest) => {
  const response = await evaluationPlatformService.getDashBoardInfo(data);
  return response;
});

export const getStatusScore = createAsyncThunk(`${API_Prefix}/getDashboardScore`, async (data: IGetStatusScoreRequest) => {
  const response = await evaluationPlatformService.getStatusScore(data);
  return response;
});

export const logClientErrors = (data: { errorMessage: string, stackTrace: string, remarks: string }) => {
  let payload: ILogClientErrors = {
    applicationType: 'CANDIDATE',
    browserInfo: window.browserInfo,
    ipAddress: window.currentIP,
    errorType: 'CLIENT',
    token: DEFAULT_TOKEN,
    errorMessage: data.errorMessage,
    stackTrace: data.stackTrace,
    userId: store.getState().evaluationPlatform?.candidate?._id || '',
    remarks: data.remarks
  }
  evaluationPlatformService.logClientErrors(payload)
};

export const getCandidateInfoById = createAsyncThunk(`${API_Prefix}/getCandidateInfo`, async (data: IGetCandidateInfoById) => {
  const response = await evaluationPlatformService.getCandidateInfo(data);
  return response;
});

export const changeCandidateTrackPlan = createAsyncThunk(`${API_Prefix}/changeCandidateTrackPlan`, async (data: IChangeCandidateTrackPlan) => {
  const response = await evaluationPlatformService.changeCandidateTrackPlan(data);
  return response;
});

export const addSketchAnswer = createAsyncThunk(`${API_Prefix}/addSketchAnswer`, async (data: IAddSketchAnswer) => {
  const response = await evaluationPlatformService.addUserSketchAnswer(data);
  return response;
});

const evaluationPlatformSlice = createSlice({
  name: API_Prefix,
  initialState,
  reducers: {
    keepResumeSelectionOpen(state, action) {
      state.resumeSelectionOpen = action.payload;
    },
    setCapability(state, action) {
      state.selectedCapabilityId = action.payload;
      state.currentQuestionId = '';
      state.currentAnsVersionId = '';
    },
    setScrollPosition(state, action) {
      const { scrollTop, capabilityId } = action.payload
      let capability = state.currentTrack?.candidateTrack[0]?.capabilities.find((cap: any) => cap.capabilityId === capabilityId)
      capability && (capability.scrollPosition = { scrollTop })
    },
    setQuestionId(state, action) {
      state.currentQuestionId = action.payload;
      state.currentAnsVersionId = '';
    },
    setCurrentAnsVersionId(state, action) {
      const { questionId, ansVersionId } = action.payload;
      if (questionId) state.currentQuestionId = questionId;
      state.currentAnsVersionId = ansVersionId;
    },
    setAnswer(state, action) {
      const { capabilities, questionId, answer, isUpdate } = action.payload;
      state.currentQuestionId = questionId;
      capabilities.forEach((item: any) => {
        const capabilityIndex = _.findIndex(state.currentTrack.candidateTrack[0].capabilities, [
          'capabilityId',
          item.capabilityId,
        ]);
        const capability = state.currentTrack.candidateTrack[0].capabilities[capabilityIndex];

        const questionIndex = _.findIndex(capability.questions, (questionItem: any) => {
          return questionItem.question._id === questionId;
        });
        const question = capability.questions[questionIndex];
        const capabilityStatus = capability.capabilityStatus;
        if (isUpdate) {
          const originalAnswerIndex = _.findIndex(question.answers, (answerItem: any) => {
            return answerItem.answer._id === answer._id;
          });
          const originalAnswer = question.answers[originalAnswerIndex].answer;
          if (originalAnswer.answer === '' && originalAnswer.codeAnswer === '' && !originalAnswer.sketchAvailable) {
            question.question.status = QUESTION_STATUS_TEXT.ANSWERED;
            capabilityStatus.noOfQuestionAttempted += 1;
            capabilityStatus.unAnswered -= 1;
            capabilityStatus.savedAnswers += 1;
          } else if (answer.answer === '' && answer.codeAnswer === '' && !answer.sketchAvailable) {
            question.question.status = QUESTION_STATUS_TEXT.UNANSWERED;
            capabilityStatus.noOfQuestionAttempted -= 1;
            capabilityStatus.unAnswered += 1;
            capabilityStatus.savedAnswers -= 1;
          }
          question.answers[originalAnswerIndex].answer = { ...question.answers[originalAnswerIndex], ...answer };
        } else {
          question.answers.unshift({ answer: answer, feedbacks: [] });
          if (answer.answer === '' && answer.codeAnswer === '' && !answer.sketchAvailable && question.answers.length > 1) {
            question.question.status = QUESTION_STATUS_TEXT.UNANSWERED;
            capabilityStatus.noOfQuestionAttempted -= 1;
            capabilityStatus.unAnswered += 1;
            capabilityStatus.feedbackViewed -= 1;
            capabilityStatus.underFeedBackLoop += 1;
          } else {
            question.question.status = QUESTION_STATUS_TEXT.ANSWERED;
            capabilityStatus.noOfQuestionAttempted += 1;
            capabilityStatus.unAnswered -= 1;
            capabilityStatus.savedAnswers += 1;
          }
        }
      });
    },
    setAllFeedbacks(state, action) {
      const track = state.currentTrack;
      action.payload?.payload?.output?.answerStatus.forEach((status: any) => {
        // find answerId in track
        let answer = getObjectFromTrack(track, 'answer', status.questionAnswerId);
        if (status.expertFeedbacks?.length) {
          answer.feedbacks = status.expertFeedbacks;
          status.expertFeedbacks.forEach((feedback: any) => {
            const question = getObjectFromTrack(track, 'question', status.questionId);
            question.question.status = status.serverQuestionAnswerStatus;
            for (let cap = 0; cap < feedback?.evaluatedCapabilities?.length; cap++) {
              const capability = state.currentTrack.candidateTrack[0].capabilities.find(
                (c: any) => c.capabilityId === feedback.evaluatedCapabilities[cap].capabilityId
              );
              var index = capability.questions.findIndex((q: any) => q._id === question.question.id);
              if (index !== -1) {
                capability.capabilityStatus.feedBackRecevied++;
                cap = feedback.evaluatedCapabilities.length;
              }
            }
          });
        }
      });
    },
    setFeedback(state, action) {
      const {
        capabilities,
        // createdAt,
        // evaluatedCapabilities,
        expertId,
        // feedback,
        // feedbackId,
        // feedbackStatus,
        questionAnswerId,
        questionId,
      } = action.payload;
      capabilities.forEach((item: any) => {
        const capabilityId = item.capabilityId;
        const capabilityIndex = _.findIndex(state.currentTrack.candidateTrack[0].capabilities, [
          'capabilityId',
          capabilityId,
        ]);
        const capability = state.currentTrack.candidateTrack[0].capabilities[capabilityIndex];
        const questionIndex = _.findIndex(capability.questions, (questionItem: any) => {
          return questionItem.question._id === questionId;
        });
        const question = capability.questions[questionIndex];
        const capabilityStatus = capability.capabilityStatus;
        const originalAnswerIndex = _.findIndex(question.answers, (answerItem: any) => {
          return answerItem.answer._id === questionAnswerId;
        });
        question.answers[originalAnswerIndex].feedbacks.unshift({
          feedbackStatus: 'RESPONSE_IS_SUBMITTED_TO_EXPERT',
          expertId
        });
        question.question.status = QUESTION_STATUS_TEXT.SUBMITTED_FOR_REVIEW;
        capabilityStatus.savedAnswers -= 1;
        capabilityStatus.sendForReview += 1;
      });
    },
    handleEdit(state, action) {
      const {
        capabilities,
        questionId,
        questionAnswerId,
        enableAnswer,
        expertId
      } = action.payload;

      capabilities.forEach((item: any) => {
        const capabilityId = item.capabilityId;
        const capabilityIndex = _.findIndex(state.currentTrack.candidateTrack[0].capabilities, [
          'capabilityId',
          capabilityId,
        ]);
        const capability = state.currentTrack.candidateTrack[0].capabilities[capabilityIndex];
        const questionIndex = _.findIndex(capability.questions, (questionItem: any) => {
          return questionItem.question._id === questionId;
        });
        const question = capability.questions[questionIndex];
        const capabilityStatus = capability.capabilityStatus;
        const originalAnswerIndex = _.findIndex(question.answers, (answerItem: any) => {
          return answerItem.answer._id === questionAnswerId;
        });
        if (enableAnswer) {
          question.answers[originalAnswerIndex].feedbacks.length = 0;
          question.question.status = QUESTION_STATUS_TEXT.ANSWERED;
          capabilityStatus.savedAnswers += 1;
          capabilityStatus.sendForReview -= 1;
        }
        else {
          question.answers[originalAnswerIndex].feedbacks.unshift({
            feedbackStatus: 'EXPERT_REVIEWING_RESPONSE',
            expertId
          });
          question.question.status = QUESTION_STATUS_TEXT.UNDER_REVIEW;
          capabilityStatus.sendForReview -= 1;
          capabilityStatus.underFeedBackLoop += 1;
        }
      });
    },
    setQuestionFeedbackViewed(state, action) {
      const { capabilities, questionId, questionAnswerId } = action.payload;
      capabilities.forEach((item: any) => {
        const capabilityIndex = _.findIndex(state.currentTrack.candidateTrack[0].capabilities, [
          'capabilityId',
          item.capabilityId,
        ]);
        const capability = state.currentTrack.candidateTrack[0].capabilities[capabilityIndex];
        const questionIndex = _.findIndex(capability.questions, (questionItem: any) => {
          return questionItem.question._id === questionId;
        });
        const question = capability.questions[questionIndex];
        const originalAnswerIndex = _.findIndex(question.answers, (answerItem: any) => {
          return answerItem.answer._id === questionAnswerId;
        });
        question.answers[originalAnswerIndex].feedbacks[0].feedbackStatus = 'FEEDBACK_VIEWED_BY_CANDIDATE';
        const capabilityStatus = capability.capabilityStatus;
        question.question.status = QUESTION_STATUS_TEXT.FEEDBACK_VIEWED;
        capabilityStatus.feedbackViewed += 1;
        capabilityStatus.feedBackRecevied -= 1;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMarketInfoAction.pending, (state, action) => {
      state.market = null;
    });
    builder.addCase(getMarketInfoAction.fulfilled, (state, action) => {
      state.market = action.payload?.output;
    });
    builder.addCase(getMarketInfoAction.rejected, (state, action) => {
      state.error = action.error.message;
    });
    builder.addCase(getMarketListAction.pending, (state, action) => {
      state.marketList = null;
    });
    builder.addCase(getMarketListAction.fulfilled, (state, action) => {
      state.marketList = action.payload.metadata.Market;
    });
    builder.addCase(getMarketListAction.rejected, (state, action) => {
      state.marketList = action.error.message;
    });
    builder.addCase(createNewCandidateForMarketAction.pending, (state, action) => {
      state.candidate = null;
      state.loading = true;
    });
    builder.addCase(createNewCandidateForMarketAction.fulfilled, (state, action) => {
      state.candidate = { _id: action.payload.output.candidateId, ...action.payload.output };
      state.loading = false;
    });
    builder.addCase(createNewCandidateForMarketAction.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(getTracksForCandidate.pending, (state, action) => {
      state.tracksData = null;
      state.loading = true;
    });
    builder.addCase(getTracksForCandidate.fulfilled, (state, action) => {
      state.tracksData = action.payload.output;
      if (action.payload.output.trackNotTaken.length > 0) {
        state.candidate = { _id: action.payload.output.trackNotTaken[0].candidateId, ...state.candidate };
      } else if (action.payload.output.trackTaken.length > 0) {
        state.candidate = { _id: action.payload.output.trackTaken[0].candidateId, ...state.candidate };
      }
      state.loading = false;
    });
    builder.addCase(getTracksForCandidate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(createCandidateTrackForCandidate.pending, (state, action) => {
      state.currentTrack = null;
      state.loading = true;
    });
    builder.addCase(createCandidateTrackForCandidate.fulfilled, (state, action) => {
      state.currentTrack = action.payload.output;
      state.candidate = action.payload.output.candidate;
      state.selectedCapabilityId = action.payload.output.candidateTrack[0]?.capabilities[0]?.capabilityId;
      state.trackPlan = action.payload.output.candidateTrack[0].plan;
      state.planState = action.payload.output.candidateTrack[0].planState;
      state.loading = false;
    });
    builder.addCase(createCandidateTrackForCandidate.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(getDetailsForCandidatebyCandidateTrackId.pending, (state, action) => {
      state.currentTrack = null;
      state.loading = true;
    });
    builder.addCase(getDetailsForCandidatebyCandidateTrackId.fulfilled, (state, action) => {
      const { output } = action.payload;
      state.currentTrack = output;
      state.candidate = output.candidate;
      if (output.candidate.lastCandidateSavedSetting.candidateTrackLastActivity &&
        output.candidate.lastCandidateTrackIdWorkedOn === output.candidateTrack[0].candidateTrackId) {
        const { value1: Track } = output.candidate.lastCandidateSavedSetting.candidateTrackLastActivity

        switch (Track) {
          case "": //  TRACK 
            const { value2: lastSavedCapabilityId,
              value3: lastSavedQuestionId,
              value4: lastSavedQuestionAnsId
            } = output.candidate.lastCandidateSavedSetting.candidateTrackLastActivity

            state.selectedCapabilityId = state.selectedCapabilityId || (lastSavedCapabilityId ? lastSavedCapabilityId : output.candidateTrack[0].capabilities[0].capabilityId)
            state.currentQuestionId = state.currentQuestionId || lastSavedQuestionId
            state.currentAnsVersionId = state.selectedCapabilityId ? '' : lastSavedQuestionAnsId
            break;
        }
      }
      else
        state.selectedCapabilityId = output.candidateTrack[0].capabilities[0].capabilityId
      state.trackPlan = output.candidateTrack[0].plan;
      state.planState = output.candidateTrack[0].planState;
      state.loading = false;
    });
    builder.addCase(getDetailsForCandidatebyCandidateTrackId.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = true;
    });

    builder.addCase(getLinkedInAccessToken.pending, (state, action) => {
      state.error = "";
      state.loading = false;
    })

    builder.addCase(getLinkedInAccessToken.fulfilled, (state, action) => {
      state.candidate = { _id: action.payload.output.candidateId, ...action.payload.output };
      state.error = "";
      state.loading = false;
    })

    builder.addCase(getLinkedInAccessToken.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    })
    builder.addCase(getDetailsForCandidateByCandidateAndTrackId.pending, (state, action) => {
      state.currentTrack = null;
      state.loading = true;
    });
    builder.addCase(getDetailsForCandidateByCandidateAndTrackId.fulfilled, (state, action) => {
      const { output } = action.payload;
      state.currentTrack = output;
      state.candidate = output.candidate;
      if (output.candidate.lastCandidateSavedSetting.candidateTrackLastActivity &&
        output.candidate.lastCandidateTrackIdWorkedOn === output.candidateTrack[0].candidateTrackId) {
        const { value1: Track } = output.candidate.lastCandidateSavedSetting.candidateTrackLastActivity

        switch (Track) {
          case "": //  TRACK 
            const { value2: lastSavedCapabilityId,
              value3: lastSavedQuestionId,
              value4: lastSavedQuestionAnsId
            } = output.candidate.lastCandidateSavedSetting.candidateTrackLastActivity

            state.selectedCapabilityId = state.selectedCapabilityId || (lastSavedCapabilityId ? lastSavedCapabilityId : output.candidateTrack[0].capabilities[0].capabilityId)
            state.currentQuestionId = state.currentQuestionId || lastSavedQuestionId
            state.currentAnsVersionId = state.selectedCapabilityId ? '' : lastSavedQuestionAnsId
            break;
        }
      }
      else
        state.selectedCapabilityId = output.candidateTrack[0].capabilities[0].capabilityId
      state.trackPlan = output.candidateTrack[0].plan;
      state.planState = output.candidateTrack[0].planState;
      state.loading = false;
    });
    builder.addCase(getDetailsForCandidateByCandidateAndTrackId.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.candidate = null;
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.candidate = { _id: action.payload.output.candidateId, ...action.payload.output };
      state.loading = false;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(getCandidateInfoById.pending, (state, action) => {
      state.candidate = null;
      state.loading = true;
    });
    builder.addCase(getCandidateInfoById.fulfilled, (state, action) => {
      state.candidate = { _id: action.payload.output.candidateId, ...action.payload.output };
      state.loading = false;
    });
    builder.addCase(getCandidateInfoById.rejected, (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    });
    builder.addCase(saveResponseForQuestionOfCandidateTrack.pending, (state, action) => {
      state.saving = true;
    });
    builder.addCase(saveResponseForQuestionOfCandidateTrack.fulfilled, (state, action) => {
      state.saving = false;
    });
    builder.addCase(saveResponseForQuestionOfCandidateTrack.rejected, (state, action) => {
      state.error = action.error.message;
      state.saving = false;
    });
    builder.addCase(submitResponseToExpert.pending, (state, action) => {
      state.saving = true;
    });
    builder.addCase(submitResponseToExpert.fulfilled, (state, action) => {
      state.saving = false;
    });
    builder.addCase(submitResponseToExpert.rejected, (state, action) => {
      state.error = action.error.message;
      state.saving = false;
    });
    builder.addCase(forgotPassword.pending, (state, action) => {
      state.saving = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.saving = false;
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.error = action.error.message;
      state.saving = false;
    });
    builder.addCase(resetPassword.pending, (state, action) => {
      state.saving = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.saving = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.error = action.error.message;
      state.saving = false;
    });
    builder.addCase(getCandidateScheduledMeetings.pending, (state, action) => {
      state.saving = true;
    });
    builder.addCase(getCandidateScheduledMeetings.fulfilled, (state, action) => {
      state.saving = false;
      state.badges.mockInterviewCount = action.payload.output?.allPendingScheduleMeetings;
    });
    builder.addCase(getCandidateScheduledMeetings.rejected, (state, action) => {
      state.error = action.error.message;
      state.saving = false;
    });
    builder.addCase(getMenuNotificationAlert.pending, (state, action) => {
      state.saving = true;
    });
    builder.addCase(getMenuNotificationAlert.fulfilled, (state, action) => {
      state.saving = false;
      const notifications: any = { ...state.badges["notifications"] };
      action.payload.output?.notifications?.map((val: { "menu": string, "pendingNotification": boolean }) => {
        notifications[val["menu"]] = { ...notifications[val["menu"]], "status": val["pendingNotification"] };
        !val["pendingNotification"] && (notifications[val["menu"]]["message"] = []);
      })
      state.badges["notifications"] = notifications;
    });
    builder.addCase(getMenuNotificationAlert.rejected, (state, action) => {
      state.error = action.error.message;
      state.saving = false;
    });
    builder.addCase(getNotificationMsg.fulfilled, (state, action) => {
      const message: string[] = [];
      action.payload.output?.notifications?.map((val: { "message": string }) => {
        if (!val.message.includes(" 0 ")) {
          message.push(val.message);
        }
      })
      if (message.length == 0) {
        state.badges["notifications"][action.payload.menu]["status"] = false;
      }
      state?.badges?.["notifications"] && (state.badges["notifications"][action.payload.menu]["message"] = message);
    });
    builder.addCase(getAvailableSharedQuestion.pending, (state, action) => {
      state.saving = true;
    });
    builder.addCase(getAvailableSharedQuestion.fulfilled, (state, action) => {
      state.saving = false;
      state.sharedQuestionIds = action.payload.output?.questionIds;
    });
    builder.addCase(getAvailableSharedQuestion.rejected, (state, action) => {
      state.error = action.error.message;
      state.saving = false;
    });
  },
});

export const {
  setCapability,
  setAnswer,
  setQuestionId,
  setCurrentAnsVersionId,
  setAllFeedbacks,
  setFeedback,
  handleEdit,
  setQuestionFeedbackViewed,
  setScrollPosition,
  keepResumeSelectionOpen
} = evaluationPlatformSlice.actions;
export default evaluationPlatformSlice.reducer;

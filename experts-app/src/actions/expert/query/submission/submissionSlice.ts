import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
    AnswerWithActive,
    EvaluatedCapabilityWithActive,
    EvalWithActive,
    FeedbackWithActive,
    QuestionAnswerDetail,
} from '../../../../containers/Feedback/TabContent/Submissions/SubmissionDetail/ISubmissionDetail';
import { EXPERT_EVAL_METRICS_FEEDBACK, EXPERT_STATUS_PRIORITY, FEEDBACK_TYPES } from '../../../../utilities/constants';
import { DefaultToastSettings } from '../../../../utilities/defaults';
import { getQuestionHints, getQuestionSampleSolutions, getSubmissionDetail, saveFeedback, submitFeedback } from './submissionActions';

interface IInitialState {
    error: string | undefined,
    success: string | undefined,
    invalidSubmission: any,
    loading: boolean,
    loadingSubmissionDetails: boolean,
    detailedSubmission: any,
    activeCard: string | undefined,
    expertId: string | undefined;
    currentQuery: any,
    expandedCards: any,
    activeTab: number,
    questionHints: any,
    questionSampleSolutions: any,
}

const initialState: IInitialState = {
    error: undefined,
    success: undefined,
    loading: false,
    invalidSubmission: {},
    loadingSubmissionDetails: false,
    detailedSubmission: {},
    activeCard: undefined,
    expertId: undefined,
    currentQuery: undefined,
    expandedCards: {},
    activeTab: 0,
    questionHints: undefined,
    questionSampleSolutions: undefined,
};

const submissionSlice = createSlice({
    name: 'submission',
    initialState,
    reducers: {
        expandCollapseCard(state, { payload }) {
            if (!state.expandedCards[state.activeTab]) {
                state.expandedCards[state.activeTab] = {};
            }
            state.expandedCards[state.activeTab][payload.questionAnswerId] = !state.expandedCards[state.activeTab][payload.questionAnswerId];
        },
        setTextareaValue(state, { payload }) {
            if (state.activeCard) {
                let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                if (activeFeedback)
                    activeFeedback.feedback = payload.value;
            }
        },
        setSketchValue(state, { payload }) {
            if (state.activeCard) {
                let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                if (activeFeedback) {
                    activeFeedback.sketchData = payload.value ? JSON.parse(payload.value) : ''
                    activeFeedback.sketchAvailable = payload.value ? true : false;
                }
            }
        },
        setSliderValue(state, { payload }) {
            if (state.activeCard) {
                let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                let currentCapability = activeFeedback?.evaluatedCapabilities.find((ec: EvaluatedCapabilityWithActive) => ec.capabilityId == payload.capabilityId);
                if (currentCapability) {
                    let currentEval = currentCapability.evals.find((ev: EvalWithActive) => ev.evalId == payload.evalId);
                    if (currentEval) {
                        currentEval.evalMetricsFeedbackValue = payload.value != -10 ? payload.value : null;
                        currentEval.evalMetricsFeedback = EXPERT_EVAL_METRICS_FEEDBACK.EVAL(payload.value);
                    }
                }
            }
        },
        setCommentValue(state, { payload }) {
            if (state.activeCard) {
                let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                let currentCapability = activeFeedback?.evaluatedCapabilities.find((ec: EvaluatedCapabilityWithActive) => ec.capabilityId == payload.capabilityId);
                if (currentCapability) {
                    let currentEval = currentCapability.evals.find((ev: EvalWithActive) => ev.evalId == payload.evalId);
                    if (currentEval) {
                        currentEval.evalTextFeedback = payload.value;
                    }
                }
            }
        },
        setInvalidSubmission(state, { payload }) {
            state.invalidSubmission = payload.invalidSubmission;
        },
        setActiveCardOnHighlight(state, { payload }) {
            state.activeCard = payload.questionAnswerId;
        },
        setActiveCard(state, { payload }) {
            state.activeTab = payload.activeTab;
            state.activeCard = payload.questionAnswerId;
            state.currentQuery = payload.currentQuery;
            state.expertId = payload.expertId;
            if (!state.invalidSubmission[payload.questionAnswerId])
                state.invalidSubmission = {}
        },
        setActiveSubmission(state, { payload }) {
            let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[payload.questionAnswerId];
            let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
            if (activeanswer)
                activeanswer.isActive = false;
            if (payload.index != undefined)
                detailedSubmission.answers[payload.index].isActive = true;
        },
        setActiveEvaluatedCapabilities(state, { payload }) {
            if (state.activeCard) {
                let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                let currentCapability = activeFeedback?.evaluatedCapabilities.find((ec: EvaluatedCapabilityWithActive) => ec.capabilityId == payload.capabilityId);
                if (currentCapability)
                    currentCapability.isActive = payload.value;
            }
        },
        setActiveEval(state, { payload }) {
            if (state.activeCard) {
                let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                let currentCapability = activeFeedback?.evaluatedCapabilities.find((ec: EvaluatedCapabilityWithActive) => ec.capabilityId == payload.capabilityId);
                if (currentCapability) {
                    let currentEval = currentCapability.evals.find((ev: EvalWithActive) => ev.evalId == payload.evalId);
                    if (currentEval) {
                        currentEval.isActive = payload.value;
                    }
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSubmissionDetail.pending, (state, action) => {
            state.error = undefined;
            state.loadingSubmissionDetails = true;
        });
        builder.addCase(getSubmissionDetail.fulfilled, (state, action) => {
            state.loadingSubmissionDetails = false;
            if (!action.payload?.output?.isAnswerUpdated) {
                let newCard: QuestionAnswerDetail = {
                    questionDetail: { ...action.payload.output?.question },
                    candidateDetail: action.payload?.output.candidate,
                    experts: action.payload.output?.commonData?.experts,
                    marketInfo: action.payload.output?.marketInfo,
                    answers: (() => {
                        let ans = action.payload.output?.answers?.reverse();
                        ans[0].isActive = true;
                        ans.forEach((anw: AnswerWithActive) => {
                            anw.feedbacks.forEach((feedback: FeedbackWithActive) => {
                                feedback.isActive = true;
                                feedback.evaluatedCapabilities.forEach((ec: EvaluatedCapabilityWithActive) => {
                                    ec.isActive = true;
                                    ec.evals.forEach((ev: EvalWithActive) => {
                                        if (ev.evalTextFeedback)
                                            ev.isActive = true
                                    });
                                });
                            })
                        });
                        return ans as AnswerWithActive[];
                    })(),
                };
                if (newCard.answers?.length) {
                    if (!state.expandedCards[state.activeTab]) {
                        state.expandedCards[state.activeTab] = {}
                    }
                    if (state.currentQuery == 'FEEDBACKSENT' &&
                        (newCard.answers[0].feedbacks[0].feedbackStatus == FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT ||
                            newCard.answers[0].feedbacks[0].feedbackStatus == FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE ||
                            newCard.answers[0].feedbacks[0].expertId != state.expertId
                        )
                    ) {
                        let inx = newCard.answers.findIndex((ans: AnswerWithActive) =>
                            (ans.feedbacks[0].feedbackStatus == FEEDBACK_TYPES.FEEDBACK_VIEWED_BY_CANDIDATE ||
                                ans.feedbacks[0].feedbackStatus == FEEDBACK_TYPES.EXPERT_GIVES_FEEDBACK) &&
                            ans.feedbacks[0].expertId == state.expertId
                        )
                        if (inx > -1) {
                            state.expandedCards[state.activeTab][newCard.answers[inx].answer._id] = true;
                            state.detailedSubmission[newCard.answers[inx].answer._id] = newCard;
                        }
                    } else {
                        state.expandedCards[state.activeTab][newCard.answers[0].answer._id] = true;
                        state.detailedSubmission[newCard.answers[0].answer._id] = newCard;
                    }

                }
            }
        });
        builder.addCase(getSubmissionDetail.rejected, (state, action: any) => {
            toast.error(action.error.message, DefaultToastSettings);
            state.loadingSubmissionDetails = false;
            state.error = action.error.message;
        });
        builder.addCase(saveFeedback.pending, (state, action) => {
            state.error = undefined;
            state.loading = true;
        });
        builder.addCase(saveFeedback.fulfilled, (state, action) => {
            state.loading = false;
            if(!action.payload?.output?.isAnswerUpdated){
                if (state.activeCard) {
                    let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                    let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                    let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                    if (activeFeedback && activeFeedback.feedbackStatus != EXPERT_STATUS_PRIORITY[1])
                        activeFeedback.feedbackStatus = EXPERT_STATUS_PRIORITY[1];
                }
            }
        });
        builder.addCase(saveFeedback.rejected, (state, action: any) => {
            state.loading = false;
            state.error = action.error.message;
        });
        builder.addCase(submitFeedback.pending, (state, action) => {
            state.error = undefined;
            state.loading = true;
        });
        builder.addCase(submitFeedback.fulfilled, (state, action) => {
            toast.success(action.payload.apiMessage, DefaultToastSettings);
            state.loading = false;
            state.success = action.payload.apiMessage;
            if (state.activeCard) {
                let detailedSubmission: QuestionAnswerDetail = state.detailedSubmission[state.activeCard];
                state.expandedCards[state.activeTab][state.activeCard] = false;
                let activeanswer = detailedSubmission.answers.find((ans: AnswerWithActive) => ans.isActive);
                let activeFeedback = activeanswer?.feedbacks.find((feed: FeedbackWithActive) => feed.isActive);
                if (activeFeedback && activeFeedback.feedbackStatus != EXPERT_STATUS_PRIORITY[2])
                    activeFeedback.feedbackStatus = EXPERT_STATUS_PRIORITY[2];
            }
        });
        builder.addCase(submitFeedback.rejected, (state, action: any) => {
            toast.error(action.error.message, DefaultToastSettings);
            state.error = action.error.message;
            state.loading = false;
        });
        builder.addCase(getQuestionHints.pending, (state, action) => {
            state.error = undefined;
            state.loading = true;
        });
        builder.addCase(getQuestionHints.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.apiMessage;
            state.questionHints = action.payload.output;
        });
        builder.addCase(getQuestionHints.rejected, (state, action: any) => {
            toast.error(action.error.message, DefaultToastSettings);
            state.error = action.error.message;
        });
        builder.addCase(getQuestionSampleSolutions.pending, (state, action) => {
            state.error = undefined;
            state.loading = true;
        });
        builder.addCase(getQuestionSampleSolutions.fulfilled, (state, action) => {
            state.loading = false;
            state.success = action.payload.apiMessage;
            state.questionSampleSolutions = action.payload.output;
        });
        builder.addCase(getQuestionSampleSolutions.rejected, (state, action: any) => {
            toast.error(action.error.message, DefaultToastSettings);
            state.error = action.error.message;
        });
    },
});

export const {
    setActiveEval,
    setInvalidSubmission,
    setTextareaValue,
    setSketchValue,
    setSliderValue,
    setCommentValue,
    setActiveCard,
    setActiveSubmission,
    expandCollapseCard,
    setActiveEvaluatedCapabilities,
    setActiveCardOnHighlight,
} = submissionSlice.actions;

export default submissionSlice.reducer;

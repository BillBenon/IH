import { ToastOptions } from "react-toastify";
import { GetCandidateDetailRequest } from "../containers/Candidate/ICandidate";
import { ExpertDetail, LastActivity } from "../containers/Login/ILogin";
import BrowserCacheService from "../services/browser-cache";
import { DefaultPaginationCount, DEFAULT_TOKEN, EXPERT_EVAL_METRICS_FEEDBACK, FEEDBACK_TYPES, FilterKeys, MenuItems, QueryType } from "./constants";

export const saveFeedbackDefault = {
    token: "",
    expertId: "",
    questionAnswerId: "",
    candidateTrackId: "",
    questionId: "",
    feedbackId: "",
    feedback: "",
    evaluatedCapabilities: [
        {
            capabilityId: "",
            weight: 0,
            evals: [
                {
                    evalId: "",
                    evalText: "",
                    hint: "",
                    level: 1,
                    point: 1,
                    order: 1,
                    evalTextFeedback: "",
                    evalMetricsFeedback: EXPERT_EVAL_METRICS_FEEDBACK.EVAL(-10),
                    evalMetricsFeedbackValue: 0
                }
            ]
        }
    ],
    feedbackStatus: FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT,
}

export const InitialActivity: LastActivity = {
    token: DEFAULT_TOKEN,
    expertId: `${BrowserCacheService.getItem("auth", (value: ExpertDetail) => {
        return value.expertId;
    })}`,
    level1: MenuItems.submission,
    level2: undefined,
    level3: undefined,
    level4: undefined,
    saveQueries: [
        {
            tabOrder: "1",
            queryType: QueryType.FIXED,
            fixedQuery: FilterKeys.NEW,
            queryName: undefined,
            count: DefaultPaginationCount,
            skipCount: 0,
            orderBy: "asc",
            query: {
                dataFor: [FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT],
                filters: [],
            }
        },
    ],
};

export const DefaultToastSettings: ToastOptions = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
}

export const initialCandidateDetailFilter: GetCandidateDetailRequest = {
    candidateId: '',
    trackId: '',
  }
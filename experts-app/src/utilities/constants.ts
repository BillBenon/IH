import { ExpertDetail, Filter } from "../containers/Login/ILogin";
import BrowserCacheService from "../services/browser-cache";

import moment from "moment";
import { objectKeys, Query } from "../containers/Feedback/IFeedback";

export const DEFAULT_USER_AUTH = { id: 0, email: "" };

export const EXPERT_USER_TYPE = "Expert";

export const getUserType = (function () {
  return BrowserCacheService.getItem("userType")
    .then((value: any) => value)
    .catch((error: Error) => false);
})();

export const Auth = function () {
  return BrowserCacheService.getItem("auth")
    .then((value: ExpertDetail) => value)
    .catch((error: Error) => false);
};

// export const API_URL_PREFIX = `${USER_TYPE === EXPERT_USER_TYPE ? 'EvaluationPlatform/Expert' : 'evaluationPlatform'}`;

export const API_URL_PREFIX = "evaluationPlatform/expert";

export const CONFIG_URL_PREFIX = "config/";

export const API_URL_UTILITIES = "evaluationPlatformUtilities";

export const DEFAULT_MARKET_NAME = "INTERVIEW_HELP";

export const DEFAULT_TOKEN = "123";

export const DEFAULT_AUTO_SAVING_TIME = 3000;

export const API_PREFIX = "evaluationPlatformTalkToExpert";

export const API_PREFIX_CANDIDATE = "evaluationPlatform";

export const FEEDBACK_TYPES = {
  RESPONSE_IS_SUBMITTED_TO_EXPERT: "RESPONSE_IS_SUBMITTED_TO_EXPERT",
  EXPERT_REVIEWING_RESPONSE: "EXPERT_REVIEWING_RESPONSE",
  EXPERT_GIVES_FEEDBACK: "EXPERT_GIVES_FEEDBACK",
  FEEDBACK_VIEWED_BY_CANDIDATE: "FEEDBACK_VIEWED_BY_CANDIDATE",
};

export const FEEDBACK_ERRORS = {
  QUESTION_EXISTS: "Question already exists with this title",
};

export const PASS_ERRORS = [FEEDBACK_ERRORS.QUESTION_EXISTS];

export const EXPERT_EVAL_METRICS_FEEDBACK = {
  EVAL: (value: number) => {
    switch (value) {
      case -10:
        return "NOT_EVALUATED";
      case 0:
        return "DONT_KNOW";
      case 10:
        return "KNOWS";
      default:
        return "PARTIALLY_KNOWS";
    }
  },
};

export const EXPERT_STATUS_PRIORITY = [
  FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT,
  FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE,
  FEEDBACK_TYPES.EXPERT_GIVES_FEEDBACK,
  FEEDBACK_TYPES.FEEDBACK_VIEWED_BY_CANDIDATE,
];

interface IQuestionStatus {
  [key: string]: string;
}

export const DEFAULT_FILTER_VALUE = "None";

export const QUESTION_STATUS_TEXT: IQuestionStatus = {
  UNANSWERED: "UNANSWERED",
  ANSWERED: "ANSWERED",
  SUBMITTED_FOR_REVIEW: "SEND_FOR_REVIEW",
  UNDER_REVIEW: "UNDER_REVIEW",
  FEEDBACK_RECEIVED: "FEEDBACK_RECEIVED",
  FEEDBACK_VIEWED: "FEEDBACK_VIEWED_BY_CANDIDATE",
  LOOP_UNANSWERED: "LOOP_UNANSWERED",
  LOOP_ANSWERED: "LOOP_ANSWERED",
  LOOP_SUBMITTED_FOR_REVIEW: "LOOP_SEND_FOR_REVIEW",
  LOOP_UNDER_REVIEW: "LOOP_UNDER_REVIEW",
  LOOP_FEEDBACK_RECEIVED: "LOOP_FEEDBACK_RECEIVED",
  LOOP_FEEDBACK_VIEWED: "LOOP_FEEDBACK_VIEWED_BY_CANDIDATE",
};

export const EXPERT_FILTER_MAP = {
  candidates: "Candidates",
  capability: "Capability",
  categorySubcategory: "Sub Category",
  feedbackStatus: "Feedback Status",
  markets: "Market",
  question: "Question",
  tracks: "Tracks",
};

export const EXPERT_FILTER_KEY_MAPPING: { [key: string]: string } = {
  markets: "market",
  tracks: "track",
  capability: "capability",
  categorySubcategory: "subCategory",
  question: "question",
  feedbackStatus: "feedbackStatus",
};

export const MenuItems = {
  dashboard: "DASHBOARD",
  submission: "SUBMISSION",
  video: "VIDEO",
  settings: "SETTINGS",
  yourCandidates: "Your Candidates",
  yourMeetings: "Meetings",
  classes: "Classes",
};

export const B2B_MenuItems = {
  jobs: "JOBS",
  myDesk: "MY_DESK",
  candidateSearch: "CANDIDATE_SEARCH",
};

export const RouterMap = {
  [MenuItems.dashboard]: "/dashboard",
  [MenuItems.submission]: "/submissions",
  [MenuItems.video]: "/videos",
  [MenuItems.settings]: "/settings",
  [MenuItems.yourCandidates]: "/your-candidates",
  [MenuItems.yourMeetings]: "/your-meetings",
  [MenuItems.classes]: "/classes",
  [B2B_MenuItems.jobs]: "/jobs",
  [B2B_MenuItems.myDesk]: "/my-desk",
  [B2B_MenuItems.candidateSearch]: "/candidate-search",
};

export const B2B_Routes = ["/jobs", "/my-desk", "/candidate-search"];

export const DefaultFilters = {
  candidate: "Candidates",
  feedbacksent: "Feedback Sent",
  New: "New",
  InProgress: "In Progress",
};

export const QuestionStatus = {
  [FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT]: "New",
  [FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE]: "In Progress",
  [FEEDBACK_TYPES.EXPERT_GIVES_FEEDBACK]: "Feedback Sent",
  [FEEDBACK_TYPES.FEEDBACK_VIEWED_BY_CANDIDATE]: "Feedback Seen",
};

export const FilterKeys = {
  NEW: "NEW",
  INPROGRESS: "INPROGRESS",
  CANDIDATE: "CANDIDATE",
  FEEDBACKSENT: "DATE",
};

export const QueryType = {
  FIXED: "FIXED",
  CUSTOM: "CUSTOM",
};

export const Menuwidth = 100;

export const FeedbackSentStates = {
  Last_Seven_Days: "Last 7 Days",
  Last_Fifteen_Days: "Last 15 Days",
  Last_Thirty_Days: "Last 30 Days",
  Last_Sixty_Days: "Last 60 Days",
};

export const FeedbackSentArray = [
  {
    id:
      "FROM_" +
      moment.utc().subtract(7, "d").format("MM/DD/YYYY") +
      "_TO_" +
      moment.utc().format("MM/DD/YYYY"),
    name: FeedbackSentStates.Last_Seven_Days,
  },
  {
    id:
      "FROM_" +
      moment.utc().subtract(15, "d").format("MM/DD/YYYY") +
      "_TO_" +
      moment.utc().format("MM/DD/YYYY"),
    name: FeedbackSentStates.Last_Fifteen_Days,
  },
  {
    id:
      "FROM_" +
      moment.utc().subtract(30, "d").format("MM/DD/YYYY") +
      "_TO_" +
      moment.utc().format("MM/DD/YYYY"),
    name: FeedbackSentStates.Last_Thirty_Days,
  },
  {
    id:
      "FROM_" +
      moment.utc().subtract(60, "d").format("MM/DD/YYYY") +
      "_TO_" +
      moment.utc().format("MM/DD/YYYY"),
    name: FeedbackSentStates.Last_Sixty_Days,
  },
];

export const ButtonTypes = {
  NEW: () => {
    return {
      fixedQuery: FilterKeys.NEW,
      count: DefaultPaginationCount,
      skipCount: 0,
      query: {
        dataFor: [FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT],
        filters: [],
      } as Query,
    };
  },
  INPROGRESS: () => {
    return {
      fixedQuery: FilterKeys.INPROGRESS,
      count: DefaultPaginationCount,
      skipCount: 0,
      query: {
        dataFor: [FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE],
        filters: [],
      } as Query,
    };
  },
  CANDIDATE: (value: string, label: string, filterkey: string) => {
    return {
      fixedQuery: FilterKeys.CANDIDATE,
      count: DefaultPaginationCount,
      skipCount: 0,
      query: {
        dataFor: [
          FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT,
          FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE,
        ],
        filters: [
          {
            filterKey: filterkey,
            filterValueName: label,
            filterValueId: value,
          } as Filter,
        ],
      } as Query,
    };
  },
  FEEDBACKSENT: (value: string, label: string, filterkey: string) => {
    return {
      fixedQuery: "FEEDBACKSENT",
      count: DefaultPaginationCount,
      skipCount: 0,
      query: {
        dataFor: [
          FEEDBACK_TYPES.EXPERT_GIVES_FEEDBACK,
          FEEDBACK_TYPES.FEEDBACK_VIEWED_BY_CANDIDATE,
        ],
        filters: [
          {
            filterKey: filterkey,
            filterValueName: label,
            filterValueId: value,
          } as Filter,
        ],
      } as Query,
    };
  },
};

export const MeetingStatus = {
  RESCHEDULE: "RESCHEDULE",
  COMPLETED: "COMPLETED",
};

export const ApplicationType = {
  EXPERT: "EXPERT",
  CANDIDATE: "CANDIDATE",
};

export const ErrorType = {
  CLIENT: "CLIENT",
  SERVER: "SERVER",
};

export const answerType = {
  RICH_TEXT: "RICH_TEXT",
  CODE: "CODE",
  DRAWING: "DRAWING",
  AUDIO: "AUDIO",
  VIDEO: "VIDEO",
};

export const DefaultPaginationCount = 10;

const DEV = {
  url: {
    BASE_API_URL: "https://testapi.interviewhelp.io/es",
  },
  portal: {
    BASE_PORTAL_URL: "http://localhost:3001",
  },
};

const STAG = {
  url: {
    BASE_API_URL: "https://stagingapi.interviewhelp.io/es",
  },
  portal: {
    BASE_PORTAL_URL: "http://stagingeval.interviewhelp.io/",
  },
};

const PROD = {
  url: {
    BASE_API_URL: "https://api.interviewhelp.io/es",
  },
  portal: {
    BASE_PORTAL_URL: "https://evaluation.interviewhelp.io/",
  },
};

export const RoleType = {
  SUPER_ADMIN: "SUPER_ADMIN",
  HIRING_MANAGER: "HIRING_MANAGER",
};

export const MeetingStatusNew = {
  CLOSED: "CLOSED",
  COMPLETED: "COMPLETED",
};

export const QuestionTypes: any = {
  TRAINING: "Training",
  EVALUATION: "Evaluation",
  FREESAMPLE: "Free Sample",
  CONTENT: "Content",
  FOR_MEETING: "Custom",
  FOR_JOB: "ForJob",
};

export const StorageClient = {
  EXPERTLOGODIRECTORY: "experts/images",
};

export const BASE_API_URL =
  process.env.REACT_APP_STAGE === "development"
    ? DEV.url.BASE_API_URL
    : process.env.REACT_APP_STAGE === "staging"
    ? STAG.url.BASE_API_URL
    : PROD.url.BASE_API_URL;
export const BASE_PORTAL_URL =
  process.env.REACT_APP_STAGE === "development"
    ? DEV.portal.BASE_PORTAL_URL
    : process.env.REACT_APP_STAGE === "staging"
    ? STAG.portal.BASE_PORTAL_URL
    : PROD.portal.BASE_PORTAL_URL;
export const BASE_ASSETS_URL = "https://assets.interviewhelp.io";

export const enrollTypeNameMapper: objectKeys = {
  MUST_BUY: "Evaluation",
  CAN_ENROLL: "",
  FOR_PLACEMENT: "Placement",
};

export const trackEnrollType = {
  Evaluation: "MUST_BUY",
  Free: "CAN_ENROLL",
  Placement: "FOR_PLACEMENT",
};

export const ConfigTypes = {
  EXPERT_ON_BOARDING_VIDEO_INFO: "EXPERT_ON_BOARDING_VIDEO_INFO",
  SAW_ON_BOARDING_VIDEO: "SAW_ON_BOARDING_VIDEO",
};

export function convertTZ(date: string) {
  return new Date(
    (typeof date === "string" ? new Date(date) : date).toLocaleString("en-US")
  );
}

export const getLocalDate = (utcDate: string): string => {
  const convertedDate = convertTZ(utcDate);
  var local = moment(convertedDate).format("lll");
  return local === "Invalid date" ? utcDate : local;
};

export const FeedBackStatus: any = {
  noMeetingFeedBack: "NO_MEETING_FEEDBACK",
  expertGivingFeedBack: "EXPERT_GIVING_FEEDBACK",
  expertGivesFeedBack: "EXPERT_GIVES_FEEDBACK",
  candidateViewedFeedBack: "CANDIDATE_VIEWED_FEEDBACK",
};

export const ReviewStatus: any = {
  noMeetingReview: "NO_MEETING_REVIEW",
  candidateGivingReview: "CANDIDATE_GIVING_REVIEW",
  candidateGivesReview: "CANDIDATE_GIVES_REVIEW",
  expertViewedReview: "EXPERT_VIEWED_REVIEW",
};

export const Entity = {
  CATEGORY: "CATEGORY",
  SUBCATEGORY: "SUBCATEGORY",
  CAPABILITY: "CAPABILITY",
  QUESTION: "QUESTION",
  TRACK: "TRACK",
};

export const ColorCode = {
  Default: "#5b94e3",
  [Entity.CATEGORY]: "#978217",
  [Entity.CAPABILITY]: "rgba(123, 97, 255, 1)",
  [Entity.SUBCATEGORY]: "#A5636D",
  [Entity.QUESTION]: "rgba(0, 0, 0, 0.6)",
};

export const API_STATUSES = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

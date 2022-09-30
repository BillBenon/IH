import moment from 'moment';

export const DEFAULT_MARKET_NAME = 'INTERVIEW_HELP';

export const DEFAULT_TOKEN = '123';

export const genAutoSaving = 20000;
export const placementAutoSaveTime = 500;

export const DEFAULT_GET_ANS_STATUS_TIME = 300000;

export const CONFIG_URL_PREFIX = "config/";

interface IQuestionStatus {
  [key: string]: string;
}

export const answerType = {
  RICH_TEXT: 'RICH_TEXT',
  CODE: 'CODE',
  DRAWING: 'DRAWING',
  AUDIO: 'AUDIO',
  VIDEO: 'VIDEO'
}

export const FLOW_TYPE = {
  enroll: 'enroll',
  buy: 'buy',
  letsconnect: 'letsconnect',
  evalbuy: 'evalbuy',
  placement: 'placement',
  mockInterview: 'mockInterview',
  contract: 'contract'
};

export const QUESTION_STATUS_TEXT: IQuestionStatus = {
  UNANSWERED: 'UNANSWERED',
  ANSWERED: 'ANSWERED',
  SUBMITTED_FOR_REVIEW: 'SEND_FOR_REVIEW',
  UNDER_REVIEW: 'UNDER_REVIEW',
  FEEDBACK_RECEIVED: 'FEEDBACK_RECEIVED',
  FEEDBACK_VIEWED: 'FEEDBACK_VIEWED_BY_CANDIDATE',
  LOOP_UNANSWERED: 'LOOP_UNANSWERED',
  LOOP_ANSWERED: 'LOOP_ANSWERED',
  LOOP_SUBMITTED_FOR_REVIEW: 'LOOP_SEND_FOR_REVIEW',
  LOOP_UNDER_REVIEW: 'LOOP_UNDER_REVIEW',
  LOOP_FEEDBACK_RECEIVED: 'LOOP_FEEDBACK_RECEIVED',
  LOOP_FEEDBACK_VIEWED: 'LOOP_FEEDBACK_VIEWED_BY_CANDIDATE',
};

const DEV = {
  url: {
    BASE_API_URL: 'https://testapi.interviewhelp.io/es',
    PPP_API_URL: 'https://testapi.interviewhelp.io/pp',
    CALENDLY_URL: 'https://calendly.com/kamal95/15min'
  },
};

const PROD = {
  url: {
    BASE_API_URL: 'https://api.interviewhelp.io/es',
    PPP_API_URL: 'https://api.interviewhelp.io/pp',
    CALENDLY_URL: 'https://calendly.com/rsalota1/let-us-talk-about-next-steps'
  },
};

const STAGING = {
  url: {
    BASE_API_URL: 'https://stagingapi.interviewhelp.io/es',
    PPP_API_URL: 'https://stagingapi.interviewhelp.io/pp',
    CALENDLY_URL: 'https://calendly.com/rsalota1/let-us-talk-about-next-steps'
  },
};

export const evaluationMetricConstants = {
  NOT_EVALUATED: 'NOT_EVALUATED',
  KNOWS: 'KNOWS',
  DONT_KNOW: 'DONT_KNOW',
  PARTIALLY_KNOWS: 'PARTIALLY_KNOWS'
}

export const evalMetricsValueMapper: any = {
  PARTIALLY_KNOWS: 'Partially',
  KNOWS: 'Yes',
  DONT_KNOW: 'No',
}

export const languages = ['javascript', 'java', 'python', 'golang', 'ruby', 'csharp', 'typescript', 'mysql', 'css']

export const isProd = () => {
  return process.env.REACT_APP_MODE === 'production' ? true : false
}

export const isStage = () => {
  return process.env.REACT_APP_MODE === 'staging';
}

export const PPP_API_URL = isProd() ? PROD.url.PPP_API_URL : isStage() ? STAGING.url.PPP_API_URL : DEV.url.PPP_API_URL;
export const CALENDLY_URL = isProd() ? PROD.url.CALENDLY_URL : isStage() ? STAGING.url.CALENDLY_URL : DEV.url.CALENDLY_URL;

export const evalPlanUpgradeMessage = "Upgrade your plan";
export const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export const BASE_ASSETS_URL = "https://assets.interviewhelp.io";

export const Expert_Session_Id = "expertSessionId";
export const Plan_Session_Id = "planSessionId";
export const ExpertMeeting_Session_Id = "expertMeetingSessionId";
export const Product_Id = 'productId';
export const Track_Id = 'trackId';
export const Flowtype = 'flowtype';
export const Candidate_Track_Id = 'candidateTrackId';
export const Expert_Login = 'expertLogin';
export const Candidate_Id = 'candidateId';
export const Referral_Code = 'referralCode';
export const Company_Partner = 'company';
export const Expert_Id = 'expertID';
export const Authorization_Token = 'authorizationToken';

export const API_TIMEOUT = {
  code: 408,
  message: "API timed out"
};

export const TrackEnrollType = {
  mustBuy: "MUST_BUY",
  canEnroll: "CAN_ENROLL",
  FORPLACEMENT: 'FOR_PLACEMENT'
}

export const PlanType = {
  Free: "FREE",
  Sub: "Subscription",
  Unlimited: "Unlimited",
  Evaluation: "Evaluation",
  Placement: "Placement"
}

export const DashboardView = {
  TrackStatus: "TrackStatus",
  Score: "Score",
  SuccessPath: "SuccessPath",
  TrackPlan: "TrackPlan",
  ClassesReport:"ClassesReport"
}

export const serviceTypes = {
  MOCKUP_INTERVIEW: "MOCKUP_INTERVIEW",
  COACHING: "COACHING",
  FREE_MEETING: "FREE_MEETING",
  CAREER_CONSULTANCY: "CAREER_CONSULTANCY",
  JOB_CONSULTANCY: "JOB_CONSULTANCY"
}

export const ConfigTypes = {
  CANDIDATE_ON_BOARDING_VIDEO_INFO: "CANDIDATE_ON_BOARDING_VIDEO_INFO",
}

export function convertTZ(date: string) {
  return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US"));
}

export const getLocalDate = (utcDate: string): string => {
  const convertedDate = convertTZ(utcDate);
  var local = moment(convertedDate).format('lll');
  return local === "Invalid date" ? utcDate : local;
}

export const API_MAX_RETRIES = 3;

export const StorageClient = {
  TRACKLOGODIRECTORY: "tracks/logo",
  OTHERIMAGES: "otherimages",
};

export const ProductTypes = {
  expert: "expert",
  trackPlan: "trackPlan"
}

export const SubProductTypes = {
  expertMeeting: "expertMeeting",
  expertQuestion: "expertQuestion",
  trackPlanFree: "trackPlanFree",
  trackPlanSubscription: "trackPlanSubscription",
  trackPlanContract: "trackPlanContract",
}

export const AirtableTrackMapping: any = {
  "Software Development Manager": "https://airtable.com/embed/shrvRED8hD4CEcGVW/tblk4ksZVz2AaTtJP",
  "Software Development Engineer": "https://airtable.com/embed/shrLyJtUDXJvkMaEH/tblk4ksZVz2AaTtJP",
  "Technical Program Manager": "https://airtable.com/embed/shremojMIDfRNHI6t/tblk4ksZVz2AaTtJP",
  "Amazon Behavior Interview": "https://airtable.com/embed/shrUJHHIxG6Agurk4"
}

export const Classes: any = {
  ADC: "Advanced coding classes",
  DSD: "Distributed System Design"
}

export const DefaultButtons : any = {
  CF : "Classes Feedback"
}

export const AirtableClassMapping: any = {
  [Classes.ADC]: "https://airtable.com/embed/shrQvzd7c5DQhOyIG/tbljf2SstA54WWPn3",
  [Classes.DSD]: "https://airtable.com/embed/shrMP4HO2Xf0tHOU7/tbljf2SstA54WWPn3"
}

export const ClassAndTrackMapping: any = {
  "Software Development Engineer": [Classes.ADC, Classes.DSD, DefaultButtons.CF],
  "Software Development Manager": [Classes.DSD, DefaultButtons.CF],
  "Software Engineering Manager": [Classes.DSD, DefaultButtons.CF],
  "System Design": [Classes.ADC, Classes.DSD, DefaultButtons.CF],
}

export const FeedBackStatus: any = {
  noMeetingFeedBack: "NO_MEETING_FEEDBACK",
  expertGivingFeedBack: "EXPERT_GIVING_FEEDBACK",
  expertGivesFeedBack: "EXPERT_GIVES_FEEDBACK",
  candidateViewedFeedBack: "CANDIDATE_VIEWED_FEEDBACK"
}

export const ReviewStatus: any = {
  noMeetingReview: "NO_MEETING_REVIEW",
  candidateGivingReview: "CANDIDATE_GIVING_REVIEW",
  candidateGivesReview: "CANDIDATE_GIVES_REVIEW",
  expertViewedReview: "EXPERT_VIEWED_REVIEW",
}

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

export const MENUS = Object.freeze({
  ALL: "ALL", DASHBOARD: "DASHBOARD", TRACK: "TRACK", MOCK_AND_COACHING: "MOCK_AND_COACHING", CAREER_CONSULTANCY: "CAREER_CONSULTANCY",
  RESUME_SERVICES: "RESUME_SERVICES", COMMUNITY: "COMMUNITY", HIRING_ECOSYSTEM: "HIRING_ECOSYSTEM", SETTINGS: "SETTINGS"
})

// Default notification messages incase of no notification avilable
export const DefaultNotificationMeg: any = {
  [MENUS.DASHBOARD]: "Overall progress of your track",
  [MENUS.TRACK]: "Answer your questions and get feedback from experts",
  [MENUS.MOCK_AND_COACHING]: "Book your Mock Interview & Coaching meetings with experts",
  [MENUS.CAREER_CONSULTANCY]: "Book your Career consultancy meetings with experts",
  [MENUS.RESUME_SERVICES]: "Upload your resume", [MENUS.COMMUNITY]: "Join the community of like-minded people",
  [MENUS.HIRING_ECOSYSTEM]: "Download Interview bank & other placement options",
  [MENUS.SETTINGS]: "Manage your tracks, subscription & other account-related options"
}
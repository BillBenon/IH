import moment from "moment";

export const DEFAULT_TOKEN = "123";
export const MenuWidth = 109;
export const DefaultPaginationCount = 10;

export const CANDIDATE_PORTAL_URL = process.env.REACT_APP_CANDIDATE_APP_URL || "";

export const API = {
    LOGIN: "expertAdminLogin",
    /** questions api */
    SENDEMAILSAPI: "expert/sendEmail",

    /** questions api */
    GETQUESTION: "getResultforQuestionSearch",
    GETQUESTIONDETAIL: "getQuestionsDetails",
    UPDATEQUESTIONDETAIL: "updateQuestionDetails",
    ADDQUESTIONDETAIL: "addQuestionDetails",
    ADDHINT: "createHint",
    UPDATEHINT: "updateHint",
    GETHINTS: "getAllHints",
    SETQUESTIONCOMPLETE: "setQuestionComplete",
    ADDSAMPLESOLUTION: "createSampleSolution",
    UPDATESAMPLESOLUTION: "updateSampleSolution",
    /**capabilities api */
    GETALLCAPABILITIES: "getResultforCapabilitySearch",
    GETCAPABILITYDETAIL: "getCapabilityDetails",
    UPDATECAPABILITYDETAIL: "updateCapability",
    ADDCAPABILITYDETAIL: "createCapability",
    GETALLCATEGORIES: "getCategoryList",
    GETCATEGORIESANDSUBCATEGORIES: "getCategoryAndSubCategoryList",
    GETCANDIDATESASSOCIATEDEXPERT: "getCandidatesAssociatedByExpert",
    SETCAPABILITYCOMPLETE: "setCapabilityComplete",
    CREATECATEGORY: "createCategory",
    UPDATECATEGORY: "updateCategory",
    CREATESUBCATEGORY: "createSubCategory",
    UPDATESUBCATEGORY: "updateSubCategory",
    DELETECATEGORY: "deleteCategory",
    DELETESUBCATEGORY: "deleteSubcategory",
    GETCATEGORYDETAILS: "getCategoryDetails",
    GETSUBCATEGORYDETAILS: "getSubcategoryDetails",
    GETCATEGORYTREE: "getCategoryTree",
    ADDQUESTIONEVALUATION: "addEvaluationToCapability",
    ADDQUESTIONTOCAPABILITY: "addQuestionToCapability",
    REMOVEQUESTIONTOCAPABILITY: "removeQuestionToCapability",
    SETENTITYSTATE: "setEntityState",
    /** tracks api */
    GETALLTRACKS: "getResultForTrackSearch",
    UPDATETRACK: "updateTrack",
    GETTRACKDETAILS: "getTrackDetails",
    CREATETRACK: "createTrack",
    GETENUMS: "getEnums",
    GETEXPERTS: "getExperts",
    GETMARKETS: "getMarkets",
    SETTRACKCOMPLETE: "setTrackComplete",
    GETTRACKTREE: "getTrackTree",
    CREATETRACKTREE: "createTrackTree",
    VALIDATETRACK: "validateTrack",
    GETTRACKSUMMARY: "getTrackSummary",
    UPDATETRACKHIERARCHY: "updateTrackHierarchy",
    GETQUESTIONSFROMCAPABILITY: "getQuestionsFromCapability",
    ADDQUESTIONSTOCAPABILITY: "addQuestionsToCapability",
    GETSUBCATEGORYLISTBYCATEGORYID: "getSubcategoryListByCategoryId",
    GETCONFIG: "getConfig",
    /** track landing page api */
    GETALLTRACKSFORLANDING: "getResultsForTrackLandingPageSearch",
    GETTRACKSFORCOMBOBOX: "getTracksForComboBox",
    CREATETRACKLANDINGPAGEDETAIL: "createTrackLandingPageDetail",
    UPDATETRACKLANDINGPAGEDETAIL: "updateTrackLandingPageDetail",
    GETTRACKLANDINGPAGEDETAILS: "getTrackLandingPageDetails",
    REFRESHDATAFROMTRACKANDPRODUCT: "refreshDataFromTrackAndProduct",
    GETALLTRACKSADDPRODUCT: "getTracks",
    GETALLEXPERTS: "getExperts",
    UPDATELANDINPAGEPRICE: "updateLandingPageProductPrice",
    // Experts Api
    GetResultsForExpertSearch: "getResultsForExpertSearch",
    GETEXPERTDETAIL: "getExpertDetails",
    UPDATEEXPERTDETAIL: "updateExpert",
    ADDEXPERT: "createExpert",
    UPDATECANDIDATEPLAN: "updateCandidatePlan",
    // MARKETS
    GETALLMARKETS: "getMarkets",

    // EvaluationPlatformTalkToExpert
    GETMEETINGS: "getMeetings",

    // PAYMENT AND PRODUCT APIS
    PPP_PRODUCT: "getProducts",
    GET_ENUMS: "metadata/getEnums",
    PPP_CREATEPRODUCT: "createProduct",
    PPP_GETPRODUCTBYID: "getProductsById",
    PPP_UPDATEPRODUCT: "updateProduct",
    PPP_UPDATEPRICE: "changeStripePrice",
    PPP_GETPRODUCTSFORTRACKANDEXPERT: "getProductsForTrackAndExpert",
    PPP_CREATECLASSINFO: "createClassInfo",
    PPP_GETCLASSINFO: "getClassInfo",
    PPP_GETRESULTFORCLASSSEARCH: "getResultForClassSearch",
    PPP_UPDATECLASSINFO: "updateClassInfo",

    // GET CANDIDATE AUTHROIZATION TOKEN
    GETCANDIDATEAUTHTOKEN: "getCandidateAuthorizationToken",
};

export const Entity = {
    CATEGORY: "CATEGORY",
    SUBCATEGORY: "SUBCATEGORY",
    CAPABILITY: "CAPABILITY",
    QUESTION: "QUESTION",
    TRACK: "TRACK",
};

export const TemplateTypes = {
    DEFAULT: "DEFAULT_TEMPLATE",
    MARKETING: "MARKET_TEMPLATE",
    CUSTOMIZED: "CUSTOMIZED",
};

export const View = {
    TRACKSUMMARY: "TrackSummary",
    CATEGORY: "CATEGORY",
    VIEWCATEGORY: "VIEWCATEGORY",
    SUBCATEGORY: "SUBCATEGORY",
    VIEWSUBCATEGORY: "VIEWSUBCATEGORY",
    CAPABILITY: "CAPABILITY",
    VIEWCAPABILITY: "VIEWCAPABILITY",
    QUESTION: "QUESTION",
    VIEWQUESTION: "VIEWQUESTION",
    TRACK: "TRACK",
    EDITCATEGORY: "EDITCATEGORY",
    EDITSUBCATEGORY: "EDITSUBCATEGORY",
    EDITCAPABILITY: "EDITCAPABILITY",
    EDITQUESTION: "EDITQUESTION",
};

export const Enum = {
    TrackSubType: "TrackSubType",
    TrackType: "TrackType",
};

export const ColorCode = {
    Default: "#5b94e3",
    [Entity.CATEGORY]: "#978217",
    [Entity.CAPABILITY]: "rgba(123, 97, 255, 1)",
    [Entity.SUBCATEGORY]: "#A5636D",
    [Entity.QUESTION]: "rgba(0, 0, 0, 0.6)",
};

export const MenuItems = {
    tracks: "TRACKS",
    questions: "QUESTIONS",
    capabilities: "CAPABILITIES",
    yourCandidates: "YOURCANDIDATES",
    trackSettings: "TRACKSETTINGS",
    experts: "EXPERTS",
    products: "PRODUCTS",
    mailTool: "MAILTOOL"
};

export const Routes = {
    [MenuItems.tracks]: "/tracks",
    [MenuItems.questions]: "/questions",
    [MenuItems.capabilities]: "/capabilities",
    [MenuItems.yourCandidates]: "/your-candidates",
    [MenuItems.trackSettings]: "/trackSettings",
    [MenuItems.experts]: "/experts",
    [MenuItems.products]: "/products",
    [MenuItems.mailTool]: "/mail-tool",
};

export const LastModifiedOptions = {
    Last_Seven_Days: "Last 7 Days",
    Last_Fifteen_Days: "Last 15 Days",
    Last_Thirty_Days: "Last 30 Days",
    Last_Sixty_Days: "Last 60 Days",
};

export const AnswerTypeEnum = [
    "RICH_TEXT",
    "CODE",
    "DRAWING",
    "AUDIO",
    "VIDEO",
];

export const QuestionTypeEnum = ["TRAINING", "EVALUATION", "FREESAMPLE"];

export const AnswerType = {
    [AnswerTypeEnum[0]]: "Rich Text",
    [AnswerTypeEnum[1]]: "Code",
    [AnswerTypeEnum[2]]: "Drawing",
    [AnswerTypeEnum[3]]: "Audio",
    [AnswerTypeEnum[4]]: "Video",
};

export const QuestionType: any = {
    [QuestionTypeEnum[0]]: "Training",
    [QuestionTypeEnum[1]]: "Evaluation",
    [QuestionTypeEnum[2]]: "Free Sample",
};

export const State = {
    INPROGRESS: "In Progress",
    COMPLETED: "Completed",
    DISABLED: "Disabled",
    PUBLISHED: "Published",
};

export const Difficulty = {
    EASY: "Easy",
    MEDIUM: "Medium",
    HARD: "Hard",
};

export const LastModifiedDates = [
    {
        id: moment.utc().subtract(7, "d").format("MM/DD/YYYY"),
        name: LastModifiedOptions.Last_Seven_Days,
    },
    {
        id: moment.utc().subtract(15, "d").format("MM/DD/YYYY"),
        name: LastModifiedOptions.Last_Fifteen_Days,
    },
    {
        id: moment.utc().subtract(30, "d").format("MM/DD/YYYY"),
        name: LastModifiedOptions.Last_Thirty_Days,
    },
    {
        id: moment.utc().subtract(60, "d").format("MM/DD/YYYY"),
        name: LastModifiedOptions.Last_Sixty_Days,
    },
];

export const productCategories = [
    {
        type: "None",
        value: 0,
    },
    {
        type: "SubscriptionProduct",
        value: 1,
    },

    {
        type: "ContractProduct",
        value: 2,
    },
    {
        type: "Free",
        value: 3,
    },
    {
        type: "EvaluationProduct",
        value: 4,
    },
];

export const filterProductCategories = [
    {
        type: "None",
        value: "None",
    },
    {
        type: "isSubscriptionProduct",
        value: "isSubscriptionProduct",
    },

    {
        type: "isContractProduct",
        value: "isContractProduct",
    },
    {
        type: "isFree",
        value: "isFree",
    },
    {
        type: "isEvaluationProduct",
        value: "isEvaluationProduct",
    },
];
export const productOrder = [
    {
        type: "one",
        value: "one",
    },
    {
        type: "two",
        value: "two",
    },
    {
        type: "three",
        value: "three",
    },
    {
        type: "four",
        value: "four",
    },
    {
        type: "none",
        value: "none",
    },
];

export const productTypes = [
    {
        label: "Expert",
        value: "expert",
    },
    {
        label: "TrackPlan",
        value: "trackPlan",
    },
    {
        label: "Class",
        value: "ihclass",
    },
];

export const SubProductType = {
    EXPERTQUESTION: "expertQuestion",
    EXPERTMEETING: "expertMeeting",
    TRACKPLANPLACEMENT: "trackPlanPlacement",
    TRACKPLANFREE: "trackPlanFree",
    TRACKPLANSUBSCRIPTION: "trackPlanSubscription",
    TRACKPLANCONTRACT: "trackPlanContract",
    TRACKPLANEVALUATION: "trackPlanEvaluation",
    MONTHLYSUBSCRIPTION: "monthlySubscription",
};

export const ProductType = {
    EXPERT: "expert",
    TRACKPLAN: "trackPlan",
    IHCLASS: "ihclass",
};

export const EnrollType = {
    FOR_PLACEMENT: "FOR_PLACEMENT",
    CAN_ENROLL: "CAN_ENROLL",
    MUST_BUY: "MUST_BUY",
};

export const subProductTypes = [
    {
        label: "Expert Question",
        value: SubProductType.EXPERTQUESTION,
        parent: [ProductType.EXPERT],
    },
    {
        label: "Expert Meeting",
        value: SubProductType.EXPERTMEETING,
        parent: [ProductType.EXPERT],
    },
    {
        label: "Track Plan Placement",
        value: SubProductType.TRACKPLANPLACEMENT,
        parent: [ProductType.TRACKPLAN],
    },
    {
        label: "Track Plan Free",
        value: SubProductType.TRACKPLANFREE,
        parent: [ProductType.TRACKPLAN],
    },
    {
        label: "Track Plan Subscription",
        value: SubProductType.TRACKPLANSUBSCRIPTION,
        parent: [ProductType.TRACKPLAN],
    },
    {
        label: "Track Plan Contract",
        value: SubProductType.TRACKPLANCONTRACT,
        parent: [ProductType.TRACKPLAN],
    },
    {
        label: "Track Plan Evaluation",
        value: SubProductType.TRACKPLANEVALUATION,
        parent: [ProductType.TRACKPLAN],
    },
    {
        label: "Monthly Subscription",
        value: SubProductType.MONTHLYSUBSCRIPTION,
        parent: [ProductType.IHCLASS],
    },
];

export const productBooleanCheck = [
    {
        type: "Yes",
        value: true,
    },
    {
        type: "No",
        value: false,
    },
];

export const TimePeriod = {
    PAST: "PAST",
    CURRENT: "CURRENT",
    FUTURE: "FUTURE",
    ALL: "ALL",
};

export const recurringPriceType = [
    {
        label: "Day",
        value: "day",
    },
    {
        label: "Week",
        value: "week",
    },
    {
        label: "Month",
        value: "month",
    },
    {
        label: "Year",
        value: "year",
    },
];

export const Market = {
    INTERVIEWHELP: "INTERVIEW_HELP",
};

export const PageType = {
    ADDQUESTION: "Add Question",
    EDITQUESTION: "Edit Question",
};

export const TrackType = {
    TPM: "Technical Project Manager",
    SDM: "SDM",
    SDE: "SDE",
    TEST: "TEST",
    TEST_TPM: "TEST_TPM",
    TEST_SDM: "TEST_SDM",
    TEST_SDE: "TEST_SDE",
    TEST_TRACK1: "TEST_TRACK1",
    TEST_TRACK2: "TEST_TRACK2",
    TEST_TRACK3: "TEST_TRACK",
};

export const CONFIGTYPES = {
    TRACKTAGS: "TRACKTAGS",
    PRODUCTTAGS: "PRODUCTTAGS"
};

export const EventProps = {
    QUESTIONADDEDFROMCAPABILITY: "Question Added from capability",
    QUESTIONADDED: "Question Added",
    QUESTIONUPDATED: "Question Updated",
    QUESTIONREMOVED: "Question Added",
    CAPABILITYUPDATED: "Capability Updated",
};

export const StorageClient = {
    ENDPOINT: "s3.amazonaws.com",
    TRACKLOGODIRECTORY: "tracks/logo",
    OTHERIMAGES: "otherimages",
};

export const trackEnrollTypes: any = {
    MUST_BUY: "Paid",
    CAN_ENROLL: "Free",
};

export const RoleType = [
    { label: "NOT AVAILABLE", value: "NOT_AVAILABLE" },
    { label: "EXPERT", value: "EXPERT" },
    { label: "EXPERT ADMIN", value: "EXPERT_ADMIN" },
    { label: "SUPER ADMIN", value: "SUPER_ADMIN" },
    { label: "MARKETING", value: "MARKETING" },
];

export const AccessLevels = {
    ALL: "ALL",
    ADMIN_ALL: "ADMIN_ALL",
    ADMIN_INSERT: "ADMIN_INSERT",
    ADMIN_DELETE: "ADMIN_DELETE",
    ADMIN_SEARCH: "ADMIN_SEARCH",
    EXPERT_ALL: "EXPERT_ALL",
    EXPERT_VIEW: "EXPERT_VIEW",
    EXPERT_EDIT_CANDIDATE_RESPONSE: "EXPERT_EDIT_CANDIDATE_RESPONSE",
    EXPERT_GIVE_FEEDBACK: "EXPERT_GIVE_FEEDBACK",
    EXPERT_SEE_CANDIDATE_DASHBOARD: "EXPERT_SEE_CANDIDATE_DASHBOARD",
    EXPERT_SEE_OTHER_EXPERT_FEEDBACK: "EXPERT_SEE_OTHER_EXPERT_FEEDBACK",
};

export const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const TrackVideoTypes = {
    SELLING: "SELLING",
};
export const TrackVideoTypesArr = [
    {
        label: "Selling",
        value: TrackVideoTypes.SELLING,
    },
];

export const API_STATUSES = {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
}
export enum ToolsDashBoard {
    CREATE_EMAIL,
    EMAIL_STATUS
}
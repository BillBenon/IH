import { Market, CommonData } from "../../../IFeedback";

export interface SampleSolution {
    description: string;
    hints: string[];
    title?: string;
}

export interface CapabilityDetail {
    capabilityId: string;
    evaluationIds: string[];
    order: number;
}

export interface QuestionDetail {
    _id: string;
    title: string;
    description: string;
    status: string;
    underFeedbackLoop: boolean;
    level: number;
    createdBy: string;
    market: string;
    createdAt: Date;
    updatedAt: Date;
    disabled: boolean;
    disableReason: string;
    questionType: string;
    questionHint: string[];
    solutionIds: string[];
    hintIds: string[];
    sampleSolutions: SampleSolution[];
    capabilities: CapabilityDetail[];
}

export interface AnswerObject {
    _id: string;
    answer: string;
    candidateTrackId: string;
    questionId: string;
    capabilityIds: string[];
    createdAt: Date;
    version: string;
    forceFlag: boolean;
    containRecording?: boolean;
}

export interface Eval {
    evalId: string;
    evalText: string;
    hint: string;
    level: number;
    point: number;
    order: number;
    evalTextFeedback: string;
    evalMetricsFeedback: string;
    evalMetricsFeedbackValue: number;
}

export interface EvaluatedCapability {
    capabilityId: string;
    weight: number;
    evals: EvalWithActive[];
}

export interface EvalWithActive extends Eval {
    isActive: boolean;
}

export interface Feedback {
    _id: string;
    candidateId: string;
    trackId: string;
    candidateTrackId: string;
    questionId: string;
    questionAnswerId: string;
    expertId: string;
    feedback: string;
    evaluatedCapabilities: EvaluatedCapabilityWithActive[];
    createdAt: string;
    feedbackAt: string;
    viewedAt: string;
    feedbackStatus: string;
}

export interface EvaluatedCapabilityWithActive extends EvaluatedCapability {
    isActive: boolean;
}

export interface AnswerContainer {
    answer: AnswerObject;
    feedbacks: FeedbackWithActive[];
}

export interface FeedbackWithActive extends Feedback {
    isActive: boolean;
    sketchAvailable: boolean;
    sketchData?: string;
}

export interface Track {
    id: string;
    name: string;
    description: string;
}

export interface Candidate {
    additionalProp1: string;
    additionalProp2: string;
    additionalProp3: string;
}

export interface Market2 {
    id: string;
    name: string;
    description: string;
}

export interface NameIdPair {
    id: string;
    name: string;
}

export interface Capability2 {
    id: string;
    name: string;
    description: string;
}

export interface Question2 {
    id: string;
    name: string;
    description: string;
}

export interface QuestionAnswerDetail {
    answers: AnswerWithActive[];
    marketInfo: Market;
    candidateDetail: Candidate;
    questionDetail: QuestionDetail;
    experts: NameIdPair[];
}

export interface AnswerWithActive extends AnswerContainer {
    isActive: boolean;
}

export interface DetailedSubmission {
    apiStatus: string;
    apiMessage: string;
    expert: string;
    candidateTrackId: string;
    question: QuestionDetail;
    answers: AnswerContainer[];
    track: Track;
    market: Market;
    candidate: Candidate;
    commonData: CommonData;
}

export interface DetailedSubmissionInput {
    token: string;
    expertId: string;
    candidateTrackId: string;
    questionId: string;
}

export interface EvaluatedCapability {
    capabilityId: string;
    weight: number;
    evals: EvalWithActive[];
}

export interface SaveFeedbackInput extends Feedback {
    token: string;
    feedbackId: string;
}

export interface InvalidSubmission {
    feedback: [];
    eval: [];
}

interface IGetSketch {
    token: string,
    candidateTrackId: string,
    questionId: string,
    questionAnswerId: string
}

export interface IGetSketchUserAnswer extends IGetSketch {
    capabilityIds: Array<string>,
    expertId: string,
}

export interface IGetSketchFeedbackAnswer extends IGetSketch {
    feedbackId: string;
    expertId: string;
}

export interface IAddSketchFeedback {
    token: string,
    expertId: string,
    questionAnswerId: string,
    candidateTrackId: string,
    questionId: string,
    feedbackId: string,
    sketchData: string
}

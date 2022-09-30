export interface IProductsForCandidate {
    plan: IPlan;
    productInfo: IProductsInfo[];
    paymentHistory: IPaymentHistory[];
}

export interface IPlan {
    displayName: string;
    email: string;
    market: string;
    plan: string;
    track: string;
    planState: string;
}

export interface IProductsInfo {
    description: string;
    displayDescription: string;
    displayName: string;
    id: string;
    contractProduct: boolean;
    stripeProduct: boolean;
    subscriptionProduct: boolean;
    name: string;
    order: number;
    price: number;
    stripePriceID: string;
    stripeProductId: string;
    canBuy: boolean;
    free: boolean;
    nextStep: string;
    followUp: string;
    planName: string;
    tracks: string[];
    expert: string;
}

export interface ICreateCheckoutRequestData {
    quantity: number;
    productId: string;
    successUrl: string;
    failureUrl: string;
    candidateId: string;
    market: string;
    track: string;
    questionId: string | null;
    expertId: string | null;
    answerId: string | null;
}

export interface IExpertProductInfo {
    candidateID: string;
    email: string;
    market: string;
    track: string;
    experts: string[];
}

export interface IGetQuestionFeedbackPurchase {
    candidateID: string;
    market: string;
    questionId: string;
    track: string;
}

export interface IGetProductsForTrack {
    candidateID: string;
    email: string;
    market: string;
    track: string;
}

export interface IPaymentMethod {
    country: string;
    last4: string;
    phone: boolean;
    customerId: string;
    name: string;
    exp_month: string;
    id: string;
    exp_year: string;
    cardBrand: string;
    email: string;
}

export interface ICheckoutSavedCard {
    track: string;
    market: string;
    quantity: number;
    productId: string;
    candidateId: string;
    questionId: string | null;
    expertId: string | null;
    answerId: string | null;
    paymentMethodId: string | null;
}

export interface IGetContractPlanStatus {
    candidateId: string;
    trackId: string;
    market: string
}

export interface IPaymentHistory {
    productId: string;
    id: string;
    subscriptionProduct: boolean;
    paid: number;
    stripecandidateId: string;
    stripetransactionId: string;
    subscriptionId: string;
    timestamp: string;
    trackId: string;
    expertId: string;
    questionId: string;
    contractProduct: string;
    refundAmount: number;
    cancellationDate: string;
    productName: string;
    meetingId: string;
}

export interface IChangePlan {
    candidateId: string;
    productId: string;
    trackId: string;
    expertId: string;
    planState: string;
    market: string;
}

export interface ICancelPlan {
    candidateId: string;
    productId: string;
    trackId: string;
    refund: boolean;
}
export interface IProductsByType {
    candidateId: string,
    expertId: string,
    serviceTypes: string[],
    trackIds: string[],
    productType: string,
    subProductType: string,
    count?: number,
    skipCount?: number,
}
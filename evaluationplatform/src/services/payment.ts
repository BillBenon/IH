import { IChangePlan, ICancelPlan, ICheckoutSavedCard, ICreateCheckoutRequestData, IExpertProductInfo, IGetContractPlanStatus, IGetProductsForTrack, IGetQuestionFeedbackPurchase, IProductsByType } from 'types/Payments';
import { post, get } from '../utilities';

const getStripePublishKey = () => {
    return get(`config`, {}, {}, true).then(p => p.output);
};

const checkoutPaymentSession = (payload: ICreateCheckoutRequestData) => {
    return post('create-checkout-session', payload, {}, true).then(p => p.output);
};

const getExpertProducts = (payload: IExpertProductInfo) => {
    return post(`stripe/getExpertProductInfo`, payload, {}, true).then(p => p.output);
}

const getQuestionFeedbackPurchase = (payload: IGetQuestionFeedbackPurchase) => {
    return post(`stripe/getQuestionFeedBackPurchase`, payload, {}, true).then(p => p.output);
}

const getProductsForTrack = (payload: IGetProductsForTrack) => {
    return post(`stripe/getProductForCandidate`, payload, {}, true).then(p => p.output);
}

const verifyCheckout = (payload: any) => {
    return post(`checkout-session`, payload, {}, true).then(p => p.output);
}

const getPaymentMethods = (payload: any) => {
    return post(`paymentmethods`, payload, {}, true).then(p => p.output);
}

const checkoutWithSavedCard = (payload: ICheckoutSavedCard) => {
    return post(`paymentintent`, payload, {}, true).then(p => p.output);
}

const validateFullAccessPlan = (payload: IGetContractPlanStatus) => {
    return post(`stripe/validateFullAccessPlan`, payload, {}, true).then(p => p.output);
}

const cancelSubscriptionPlan = (payload: ICancelPlan) => {
    return post(`stripe/cancelSubscription`, payload, {}, true).then(p => p.output);
}

const getExpertMeetingProducts = (payload: IProductsByType) => {
    return post(`stripe/getProductsByProductServiceTypes`, payload, {}, true).then(p => p.output);
}

const setMeetingDetailId = (payload: any) => {
    return post(`stripe/setMeetingId`, payload, {}, true).then(p => p.output);
}

const getPaymentHistoryOfPaidMeeting = (payload: any) => {
    return post(`stripe/getPaymentHistoryWithEmptyMeetingId`, payload, {}, true).then(p => p.output);
}

export const paymentService = {
    getStripePublishKey,
    checkoutPaymentSession,
    getExpertProducts,
    getQuestionFeedbackPurchase,
    getProductsForTrack,
    verifyCheckout,
    getPaymentMethods,
    checkoutWithSavedCard,
    validateFullAccessPlan,
    cancelSubscriptionPlan,
    getExpertMeetingProducts,
    setMeetingDetailId,
    getPaymentHistoryOfPaidMeeting
};

import { useSelector } from 'react-redux';
import { evaluationPlatformService } from 'services';
import { paymentService } from 'services/payment';
import { RootState } from 'store';
import { IGetQuestionAndExpert, IGetTracksForCandidateRequest } from 'types';
import { ICancelPlan, ICheckoutSavedCard, ICreateCheckoutRequestData, IGetProductsForTrack, IPaymentHistory, IProductsForCandidate, IProductsInfo } from 'types/Payments';
import { notEmpty } from 'utilities';
import { DEFAULT_MARKET_NAME, DEFAULT_TOKEN, PlanType, Plan_Session_Id, TrackEnrollType } from 'utilities/constants';
import moment from 'moment';
import { getValueBrowserStorage, setValueBrowserStorage } from 'services/browserStorageService';
import { useStripePayment } from 'components/Common/customHooks/stipePayment';

export const usePlanProducts = () => {
    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const { startCheckout } = useStripePayment();

    const getProductForCandidate = (trackId: string): Promise<IProductsForCandidate> => {
        if (notEmpty(candidateInfo) && notEmpty(candidateInfo.email) && notEmpty(candidateInfo._id)) {
            const payload: IGetProductsForTrack = {
                candidateID: candidateInfo._id,
                email: candidateInfo.email,
                market: DEFAULT_MARKET_NAME,
                track: trackId
            }
            return paymentService.getProductsForTrack(payload);
        }
        else return Promise.reject({ message: 'Paramters not valid' });
    }

    const proceedToCheckout = (productId: string, trackId: string, successUrl: string, failureUrl: string): Promise<any> => {
        const candidateId = getValueBrowserStorage('candidateId');
        const payload: ICreateCheckoutRequestData = {
            quantity: 1,
            productId: productId,
            candidateId: candidateId ? candidateId : candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            track: trackId,
            successUrl: successUrl,
            failureUrl: failureUrl,
            questionId: null,
            expertId: null,
            answerId: null
        };
        return paymentService.checkoutPaymentSession(payload);
    }

    const getPaymentMethods = (): Promise<any> => {
        return paymentService.getPaymentMethods({ candidateId: candidateInfo._id })
            .then(res => res.paymentData)
            .catch(err => err);
    }

    const doDirectPayment = (paymentMethodId: string | null, productId: string, trackId: string) => {
        const payload: ICheckoutSavedCard = {
            quantity: 1,
            productId: productId,
            candidateId: candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            track: trackId,
            expertId: null,
            questionId: null,
            answerId: null,
            paymentMethodId: paymentMethodId
        };
        return paymentService.checkoutWithSavedCard(payload);
    }

    const getAllTakenTracks = (): Promise<any[]> => {
        const payload: IGetTracksForCandidateRequest = {
            token: DEFAULT_TOKEN,
            candidateId: candidateInfo._id,
            trackEnrollTypes: [TrackEnrollType.canEnroll, TrackEnrollType.mustBuy]
        }
        return evaluationPlatformService.getTracksForCandidate(payload)
            .then(res => {
                return res.output?.trackTaken;
            });
    }

    async function prepareHistoryData({ paymentHistory, productInfo }: IProductsForCandidate) {
        try {
            const historyData: any = { plans: [], questionExperts: [], expertMeetings: [] };
            if (paymentHistory.length > 0) {
                const questionData: any = await fetchQuestionExpertDetails(paymentHistory);

                paymentHistory.forEach((item: IPaymentHistory) => {
                    if (isPlanProduct(item)) {
                        historyData.plans.push({
                            prodName: getProductName(productInfo, item.productId),
                            date: getLocalDate(item.timestamp),
                            planType: item.contractProduct ? "Unlimited" : item.subscriptionProduct ? "Subscription" : '',
                            price: getPlanPrice(item.paid),
                            cancellationDate: item.cancellationDate ? getLocalDate(item.cancellationDate) : null,
                            refundAmount: getPlanPrice(item.refundAmount),
                            subscriptionProduct: item.subscriptionProduct
                        })
                    }
                    else if (isMeetingProduct(item)) {
                        historyData.expertMeetings.push({
                            prodName: item.productName,
                            date: getLocalDate(item.timestamp),
                            price: getPlanPrice(item.paid)
                        })
                    } else {
                        let expert = questionData.output?.experts?.find((q: any) => q.expertId === item.expertId);
                        historyData.questionExperts.push({
                            date: getLocalDate(item.timestamp),
                            price: getPlanPrice(item.paid),
                            questionTitle: questionData.output?.questions?.find((q: any) => q.questionId === item.questionId)?.title,
                            expertName: expert != null ? `${expert.fullName}` : '',
                            expertCompany: expert != null ? `@${expert.workingAt}` : ''
                        });
                    }
                });
            }

            return historyData;
        }
        catch (err: any) {
            console.log(err);
        }
    }

    const fetchQuestionExpertDetails = (paymentHistory: IPaymentHistory[]): Promise<any> => {
        const payload: IGetQuestionAndExpert = {
            token: DEFAULT_TOKEN,
            market: DEFAULT_MARKET_NAME,
            trackId: paymentHistory[0].trackId,
            expertIds: [],
            questionIds: []
        };

        paymentHistory
            .filter(p => notEmpty(p.questionId) && notEmpty(p.expertId) && !p.subscriptionProduct && !p.contractProduct)
            .forEach(p => {
                payload.expertIds.push(p.expertId);
                payload.questionIds.push(p.questionId)
            });

        return evaluationPlatformService.getQuestionAndExperts(payload);
    }

    const getLocalDate = (utcDate: string): string => {
        var stillUtc = moment.utc(utcDate).toDate();
        var local = moment(stillUtc).local().format('lll');
        return local === "Invalid date" ? utcDate : local;
    }

    const getPlanPrice = (minimumDenomination: number): string => {
        return `$${(minimumDenomination / 100).toFixed(2)}`;
    }

    const getProductName = (plans: IProductsInfo[], id: string): string => {
        const pIndex = plans.findIndex(x => x.id === id);
        return pIndex >= 0 ? plans[pIndex].displayName : '';
    }

    const isPlanProduct = (item: IPaymentHistory) => item.contractProduct || item.subscriptionProduct || (!notEmpty(item.questionId) && !notEmpty(item.expertId));

    const isMeetingProduct = (item: IPaymentHistory) => notEmpty(item.meetingId) && item.meetingId !== "NA";

    async function continueCheckout(productId: string, trackId: string, successUrl: string, failureUrl: string) {
        try {
            const sessionRes = await proceedToCheckout(productId as string, trackId, successUrl, failureUrl);
            setValueBrowserStorage(Plan_Session_Id, sessionRes.stripeSessionId);
            startCheckout(sessionRes.stripeSessionId);
        }
        catch (err: any) {
            throw err;
        }
    }

    const cancelSubscription = (productId: string, trackId: string) => {
        const payload: ICancelPlan = {
            productId,
            trackId,
            candidateId: candidateInfo._id,
            refund: true
        };
        return paymentService.cancelSubscriptionPlan(payload);
    }

    return { getProductForCandidate, proceedToCheckout, getPaymentMethods, doDirectPayment, getAllTakenTracks, prepareHistoryData, continueCheckout, cancelSubscription };
}

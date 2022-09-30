import { useSelector } from 'react-redux';
import { paymentService } from 'services/payment';
import { RootState } from 'store';
import { ICheckoutSavedCard, ICreateCheckoutRequestData, IExpertProductInfo, IGetContractPlanStatus, IGetQuestionFeedbackPurchase } from 'types/Payments';
import { getCurrentDomainUrl } from 'utilities';
import { DEFAULT_MARKET_NAME, PlanType } from 'utilities/constants';

export const useQuestions = () => {
    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const { trackId } = useSelector((state: RootState) => state.payment);
    const experts = useSelector((state: RootState) => state.evaluationPlatform?.currentTrack?.candidateTrack[0]?.experts);
    const candidateTrack = useSelector((state: RootState) => state.evaluationPlatform?.currentTrack?.candidateTrack[0]);
    const { trackPlan, planState } = useSelector((state: RootState) => state.evaluationPlatform);

    const proceedToCheckout = (productId: string, expertId: string, questionId: string, answerId: string): Promise<any> => {
        const payload: ICreateCheckoutRequestData = {
            quantity: 1,
            productId: productId,
            candidateId: candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            track: trackId,
            expertId: expertId,
            questionId: questionId,
            answerId: answerId,
            successUrl: `${getCurrentDomainUrl()}/question`,
            failureUrl: `${getCurrentDomainUrl()}/question`,
        };
        return paymentService.checkoutPaymentSession(payload);
    }

    const getAnswersList = (questionId:string, capabilityId:string) => {
        let capability = candidateTrack?.capabilities.find((cap: any) => cap.capabilityId === capabilityId)
        let question = capability?.questions.find((q: any) => q.question._id === questionId);
        return question || question.answers
    }

    const getExpertProductsInfo = (questionId: string): Promise<any> => {
        let expertInfo: any = [];
        const payload: IExpertProductInfo = {
            candidateID: candidateInfo._id,
            email: candidateInfo.email,
            market: DEFAULT_MARKET_NAME,
            track: trackId,
            experts: experts?.map((x: any) => x._id)
        }

        const payload2: IGetQuestionFeedbackPurchase = {
            candidateID: candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            questionId: questionId,
            track: trackId,
        }

        return Promise.all([paymentService.getExpertProducts(payload), paymentService.getQuestionFeedbackPurchase(payload2)])
            .then((expertProdInfo: any) => {
                experts.forEach((x: any) => {
                    const expIndex = expertProdInfo[0]?.experts?.findIndex((e: any) => e.expertId === x._id && e.subProductType ==='expertQuestion');
                    const expPurchaseIndex = expertProdInfo[1]?.experts?.findIndex((e: any) => e.expertId === x._id);
                    if (expIndex != null && expIndex >= 0) {
                        expertInfo.push({
                            ...x,
                            ProductId: expertProdInfo[0].experts[expIndex].ProductId,
                            priceInfo: expertProdInfo[0].experts[expIndex].priceInfo / 100,
                            paid: expPurchaseIndex != null && expPurchaseIndex >= 0 ? true : false
                        });
                    }
                    else {
                        x.priceInfo && expertInfo.push({ ...x });
                    }
                });

                return expertInfo;
            })
            .catch(err => err);
    }

    const getPaymentMethods = (): Promise<any> => {
        return paymentService.getPaymentMethods({ candidateId: candidateInfo._id })
            .then(res => res.paymentData)
            .catch(err => err);
    }

    const doDirectPayment = (paymentMethodId: string, productId: string, expertId: string, questionId: string, answerId: string) => {
        const payload: ICheckoutSavedCard = {
            quantity: 1,
            productId: productId,
            candidateId: candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            track: trackId,
            expertId: expertId,
            questionId: questionId,
            answerId: answerId,
            paymentMethodId: paymentMethodId
        };
        return paymentService.checkoutWithSavedCard(payload);
    }

    const isFullAccessPlan = (): boolean => {
        return ((trackPlan.toLowerCase() === "contract" || trackPlan === PlanType.Unlimited) && planState.toLowerCase() === "active")
            || (trackPlan.toLowerCase() === PlanType.Evaluation.toLowerCase())
    }

    const validateFullAccessPlan = (): Promise<boolean> => {
        const payload: IGetContractPlanStatus = {
            candidateId: candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            trackId: trackId
        }
        return paymentService.validateFullAccessPlan(payload).then((res: any) => {
            return res.PlanType.toLowerCase() === trackPlan.toLowerCase()
                && res.PlanState.toLowerCase() === "active";
        }).catch(() => false);
    }

    const getExperts = () => {
        return experts;
    }

    const getExpertName = (expertId: string): string => {
        const ind = experts.findIndex((e: any) => e._id === expertId);
        return ind >= 0 ? `${experts[ind].fullname}@${experts[ind].workingAt}` : '';
    }

    return {
        proceedToCheckout,
        getExpertProductsInfo,
        getPaymentMethods,
        doDirectPayment,
        isFullAccessPlan,
        getExperts,
        validateFullAccessPlan,
        getExpertName,
        getAnswersList
    };
}

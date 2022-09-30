import { useStripePayment } from 'components/Common/customHooks/stipePayment';
import { usePlanProducts } from 'containers/PlanAndPayment/PlanProducts/usePlanProducts';
import { useMessagePopup } from 'context/messagePopup';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { IProductsForCandidate, IProductsInfo } from 'types/Payments';
import { getCurrentDomainUrl } from 'utilities';
import { DEFAULT_TOKEN, PlanType } from 'utilities/constants';
import { changeCandidateTrackPlan } from 'store/evaluationPlatform';
import { IChangeCandidateTrackPlan } from 'types';
import { evaluationPlatformService } from 'services';

export const useTrackPanel = () => {
    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const currentMarket = useSelector((state: RootState) => state.evaluationPlatform?.market?.textId)
    const { getProductForCandidate, continueCheckout } = usePlanProducts();
    const { startCheckout } = useStripePayment();
    const message = useMessagePopup();

    const getEvaluationProductId = async (trackId: string): Promise<string> => {
        try {
            const output = await getProductForCandidate(trackId);
            const evalProduct = getProductByPlanType(output.productInfo, PlanType.Evaluation);
            return evalProduct ? evalProduct.id : ""
        }
        catch (err: any) {
            message.fail("Product not found");
            throw err;
        }
    }

    const continueToCheckoutPage = async (productId: string, trackId: string) => {
        try {
            await continueCheckout(
                productId,
                trackId,
                `${getCurrentDomainUrl()}/settings/tracks`,
                `${getCurrentDomainUrl()}/settings/tracks`);
        }
        catch (err: any) {
            throw err;
        }
    }

    const getProductByPlanType = (products: IProductsInfo[], planType: string) => {
        const foundInd = products.findIndex(x => x.planName.toLowerCase() == planType.toLowerCase());
        return foundInd >= 0 ? products[foundInd] : null;
    }

    const changeCandidateTrackPlan = async (trackId: string, plan: string, displayPlanName: string, planState: string): Promise<any> => {
        const _payload: IChangeCandidateTrackPlan = {
            token: DEFAULT_TOKEN,
            market: currentMarket,
            candidateId: candidateInfo._id,
            trackId,
            plan,
            displayPlanName,
            planState
        }
        try {
            const result = await evaluationPlatformService.changeCandidateTrackPlan(_payload);
            return true;
        }
        catch (err: any) {
            throw err;
        }
    }

    return { getEvaluationProductId, continueToCheckoutPage, changeCandidateTrackPlan };
}

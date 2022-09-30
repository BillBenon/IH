import { LoaderContextType } from "context/loaderDots";
import {
    DEFAULT_MARKET_NAME,
    DEFAULT_TOKEN,
    Flowtype,
    Track_Id,
    Product_Id,
    Plan_Session_Id,
    FLOW_TYPE,
    Candidate_Track_Id,
    Candidate_Id,
} from "utilities/constants";
import { paymentService } from 'services/payment';
import { ICreateCheckoutRequestData } from 'types/Payments';
import { getCurrentDomainUrl, notEmpty } from '../../utilities';
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { getValueBrowserStorage, setValueBrowserStorage } from "services/browserStorageService";
import { handleProductBuyFlow } from "../../utilities/landingPageUtil";

type Props = {
    props: any;
    loader: LoaderContextType;
    startCheckout: (sessionId: string) => Promise<void>;
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
    continueCheckout: (productId: string, trackId: string, successUrl: string, failureUrl: string, expertId: string, candidateID?:string) => Promise<void>;
}

export const handleLandingPageSignupSuccess = ({
    props,
    loader,
    startCheckout,
    enqueueSnackbar,
  continueCheckout
}: Props) => {
    const flowType = getValueBrowserStorage(Flowtype);
    if (flowType === FLOW_TYPE.enroll || flowType === FLOW_TYPE.placement) {
        handleEnrollAndPlacementFlow(props, loader);
    } else if (flowType === FLOW_TYPE.evalbuy || flowType === FLOW_TYPE.buy) {
        handleBuyAndEvalBuyFlow({ props, loader, enqueueSnackbar, startCheckout,continueCheckout });
    } else if(flowType === FLOW_TYPE.mockInterview){
        handleProductBuyFlow({ props,loader, enqueueSnackbar,continueCheckout});
    }
};

const handleEnrollAndPlacementFlow = (signupProps: any, loader: LoaderContextType) => {
    const candidateId = getValueBrowserStorage(Candidate_Id);
    const trackId = getValueBrowserStorage(Track_Id);
    loader.showLoader();
    signupProps.createCandidateTrackForCandidate({
        candidateId,
        trackId,
        token: DEFAULT_TOKEN,
    }).then((response: any) => {
        const candidateTrackId = response?.payload.output.candidateTrack[0].candidateTrackId;
        setValueBrowserStorage(Candidate_Track_Id, candidateTrackId);
        signupProps.history.push('/question');
        loader.hideLoader();
    });
};

const handleBuyAndEvalBuyFlow = async ({ loader, enqueueSnackbar, startCheckout }: Props) => {
    const candidateId = getValueBrowserStorage(Candidate_Id);
    const productId = getValueBrowserStorage(Product_Id);
    const trackId = getValueBrowserStorage(Track_Id);
    loader.showLoader();
    if (notEmpty(productId)) {
        const successUrl = `${getCurrentDomainUrl()}/settings/tracks`;
        const payload: ICreateCheckoutRequestData = {
            quantity: 1,
            productId: productId || '',
            candidateId: candidateId || '',
            market: DEFAULT_MARKET_NAME,
            track: trackId || '',
            successUrl: successUrl,
            failureUrl: successUrl,
            questionId: null,
            expertId: null,
            answerId: null
        };
        const session = await paymentService.checkoutPaymentSession(payload);
        const planSessionId = session.stripeSessionId;
        setValueBrowserStorage(Plan_Session_Id, planSessionId);
        startCheckout(planSessionId);
    } else {
        enqueueSnackbar("Product not found", {
            variant: 'error',
            autoHideDuration: 2500,
        });
        loader.hideLoader();
    }
};
import { LoaderContextType } from "context/loaderDots";
import {
    DEFAULT_MARKET_NAME,
    DEFAULT_TOKEN,
    Flowtype,
    Track_Id,
    Product_Id,
    FLOW_TYPE,
    Plan_Session_Id,
    TrackEnrollType,
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
    search: string;
    startCheckout: (sessionId: string) => Promise<void>;
    continueCheckout: (productId: string, trackId: string, successUrl: string, failureUrl: string, expertId: string, candidateID?:string) => Promise<void>;
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
}

export const handleLandingPageLoginSuccess = ({
    props,
    loader,
    search,
    startCheckout,
    enqueueSnackbar,
  continueCheckout
}: Props) => {
    const flowType = getValueBrowserStorage(Flowtype);
    if (flowType === FLOW_TYPE.enroll || flowType === FLOW_TYPE.placement) {
        handleEnrollAndPlacementFlow(props, loader, search);
    } else if (flowType === FLOW_TYPE.evalbuy) {
        handleEvalBuyFlow({ props, loader, search, startCheckout, enqueueSnackbar,continueCheckout });
    } else if (flowType === FLOW_TYPE.buy) {
        handleBuyFlow({ props, loader, search, startCheckout, enqueueSnackbar,continueCheckout });
    } else if(flowType === FLOW_TYPE.mockInterview){
        handleProductBuyFlow({ props, loader, enqueueSnackbar,continueCheckout});
    }
};

const handleEnrollAndPlacementFlow = (loginProps: any, loader: LoaderContextType, search: string) => {
    const candidateId = getValueBrowserStorage('candidateId');
    const trackId = getValueBrowserStorage(Track_Id);
    loader.showLoader();
    const request = {
        trackId,
        candidateId,
        token: DEFAULT_TOKEN,
    };
    loginProps.createCandidateTrackForCandidate(request).then((createResponse: any) => {
        if (createResponse.error?.message.includes('already exists')) {
            loginProps.getDetailsForCandidateByCandidateAndTrackId(request).then((getResponse: any) => {
                handlePlacementFlow(getResponse?.payload.output.candidateTrack[0].candidateTrackId, loginProps, search);
                loader.hideLoader();
            })
        } else {
            handlePlacementFlow(createResponse?.payload.output.candidateTrack[0].candidateTrackId, loginProps, search);
        }
    });
};

const handlePlacementFlow = (candidateTrackId: any, props: any, search: string) => {
    setValueBrowserStorage('candidateTrackId', candidateTrackId);
    props.history.push({
        pathname: '/question',
        search
    });
}

const handleEvalBuyFlow = async ({ loader, enqueueSnackbar, startCheckout }: Props) => {
    const candidateId = getValueBrowserStorage('candidateId');
    const callbackUrl = `${getCurrentDomainUrl()}/settings/tracks`;
    loader.showLoader();
    handleTrackBuy({
        candidateId,
        startCheckout,
        enqueueSnackbar,
        loader,
        callbackUrl
    });
};

const handleTrackBuy = async ({ candidateId, startCheckout, enqueueSnackbar, loader, callbackUrl }: any) => {
    const trackId = getValueBrowserStorage(Track_Id);
    const productId = getValueBrowserStorage(Product_Id);
    if (notEmpty(productId)) {
        const payload: ICreateCheckoutRequestData = {
            quantity: 1,
            productId: productId || '',
            candidateId: candidateId || '',
            market: DEFAULT_MARKET_NAME,
            track: trackId || '',
            successUrl: callbackUrl,
            failureUrl: callbackUrl,
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
}

const handleBuyFlow = async ({ props, loader, enqueueSnackbar, startCheckout }: Props) => {
    const candidateId = getValueBrowserStorage('candidateId');
    const trackId = getValueBrowserStorage(Track_Id);
    const trackEnrollTypes = [TrackEnrollType.mustBuy, TrackEnrollType.canEnroll]
    loader.showLoader();
    props.getTracksForCandidate(({ candidateId, token: DEFAULT_TOKEN, trackEnrollTypes })).then((response: any) => {
        const trackNotTaken = response?.payload.output.trackNotTaken || [];
        const isTrackNotTaken = trackNotTaken.find((trackObj: any) => trackObj.trackId === trackId);
        const callbackUrl = isTrackNotTaken ? `${getCurrentDomainUrl()}/settings/tracks` : `${getCurrentDomainUrl()}/settings/payments`;
        handleTrackBuy({
            candidateId,
            loader,
            enqueueSnackbar,
            startCheckout,
            callbackUrl
        });
    })

}

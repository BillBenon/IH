import { getValueBrowserStorage, setValueBrowserStorage } from 'services/browserStorageService';
import {
    Company_Partner,
    Flowtype,
    FLOW_TYPE,
    Product_Id,
    Track_Id,
    Expert_Id,
    Candidate_Id,
    DEFAULT_TOKEN,
    Candidate_Track_Id
} from "./constants";
import { getCurrentDomainUrl } from "./helperFunctions";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { LoaderContextType } from "../context/loaderDots";

export const FormHeading = (isLoginPage: boolean) => {
    const flowtype = getValueBrowserStorage(Flowtype);
    const textInitial = isLoginPage ? 'Sign In to proceed further' : 'Create an account to proceed further';
    if (flowtype === FLOW_TYPE.enroll) {
        return textInitial;
    }
    if (flowtype === FLOW_TYPE.buy || flowtype === FLOW_TYPE.evalbuy || flowtype === FLOW_TYPE.mockInterview) {
        return `${textInitial} with payment`;
    }
    if (flowtype === FLOW_TYPE.placement) {
        return `${textInitial} evaluation process`;
    }
};

type queryParamsType = {
    lpflowtype: string;
    lpproductid: string;
    lptrackid: string;
    company: string;
    lpexpertid:string;
}

export const setStorageFromLangingPageParams = ({
    company,
    lpflowtype,
    lpproductid,
    lptrackid,
    lpexpertid
}: queryParamsType) => {
    if (lpflowtype && lpproductid && lptrackid) {
        setValueBrowserStorage(Flowtype, lpflowtype);
        setValueBrowserStorage(Product_Id, lpproductid);
        setValueBrowserStorage(Track_Id, lptrackid);
    }
    if (lpexpertid) {
        setValueBrowserStorage(Expert_Id, lpexpertid);
    }
    if (company) {
        setValueBrowserStorage(Company_Partner, company);
    }
};

export const loginButtonLabel = () => {
    const flowtype = getValueBrowserStorage(Flowtype);
    return (flowtype === FLOW_TYPE.buy || flowtype === FLOW_TYPE.evalbuy|| flowtype === FLOW_TYPE.mockInterview) ? 'Sign In & Buy' : 'Sign In & Enroll'
};

export const signupButtonLabel = () => {
    const flowtype = getValueBrowserStorage(Flowtype);
    return (flowtype === FLOW_TYPE.buy || flowtype === FLOW_TYPE.evalbuy || flowtype === FLOW_TYPE.mockInterview) ? 'Register & Buy' : 'Register & Enroll';
}

export const isOpenedFromLandingPages = () => {
    const flowtype = getValueBrowserStorage(Flowtype);
    const productId = getValueBrowserStorage(Product_Id);
    const trackId = getValueBrowserStorage(Track_Id);
    return flowtype && productId && trackId ? true : false;
}

export const showPartnerName = () => {
    const flowtype = getValueBrowserStorage(Flowtype);
    const company = getValueBrowserStorage(Company_Partner);
    return isOpenedFromLandingPages() && company && flowtype === FLOW_TYPE.placement ? true : false;
}

type Props = {
    props: any;
    loader: LoaderContextType;
    enqueueSnackbar: (message: SnackbarMessage, options?: OptionsObject | undefined) => SnackbarKey;
    continueCheckout: (productId: string, trackId: string, successUrl: string, failureUrl: string, expertId: string, candidateID?:string) => Promise<void>;
}

export const handleProductBuyFlow = async ({ props, loader, enqueueSnackbar,continueCheckout }: Props) => {
    const candidateId = getValueBrowserStorage(Candidate_Id);
    const trackId = getValueBrowserStorage(Track_Id);
    loader.showLoader();
    const request = {
        trackId,
        candidateId,
        token: DEFAULT_TOKEN,
    };
    const productId = getValueBrowserStorage(Product_Id);
    const expertId = getValueBrowserStorage(Expert_Id);
    const successUrl = `${getCurrentDomainUrl()}/meetings`;
    if(productId && trackId && expertId && candidateId) {
        props.createCandidateTrackForCandidate(request).then(async (response: any) => {
            if (response.error?.message.includes('already exists')) {
                props.getDetailsForCandidateByCandidateAndTrackId(request).then(async () => {
                    continueCheckout(productId, trackId, successUrl, successUrl, expertId, candidateId);

                })
            } else {
                const candidateTrackId = response?.payload.output.candidateTrack[0].candidateTrackId;
                setValueBrowserStorage(Candidate_Track_Id, candidateTrackId);                
                continueCheckout(productId, trackId, successUrl, successUrl, expertId, candidateId);
            }
        });
    } else {
        enqueueSnackbar("Product not found", {
            variant: 'error',
            autoHideDuration: 2500,
        });
        loader.hideLoader();
    }
}
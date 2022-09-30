import { useStripePayment } from "components/Common/customHooks/stipePayment";
import { useSelector } from "react-redux";
import { setValueBrowserStorage } from "services/browserStorageService";
import { paymentService } from "services/payment";
import { RootState, useAppDispatch } from "store";
import { getNotificationMsg } from "store/evaluationPlatform";
import { createNewMeeting, getDetailedExpertsByServiceTypes, getExpertDetail, getExpertsByTrack, getMeetings, saveNotes, setErrorMessage } from "store/talkToExpert";
import { ICheckoutSavedCard, ICreateCheckoutRequestData, IProductsByType } from "types/Payments";
import { IExpertMeeting } from "types/TalkToExpert";
import { notEmpty } from "utilities";
import { DEFAULT_MARKET_NAME, DEFAULT_TOKEN, Expert_Session_Id, getLocalDate, MENUS, PlanType, ProductTypes, serviceTypes, SubProductTypes } from "utilities/constants";
import { TalkToExpertPages } from ".";
import { CandidateReviewComponent } from "./candidateReviewComponent";
import ExpertNotesComponent from "./expertNotesComponent";
import MeetingNotes from "./meetingNotes";
import { IFocussedModule } from "./meetingTypes";
type LabelValue = {
    label: string;
    value: string | number | undefined | any;
    type?: "rating" | "link" | "upload" | "resume-upload";
    tooltip?: string;
    component?: any;
    nameOnly?: boolean;
}

export const useTalkToExperts = () => {
    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const { trackId, trackPlan, planState } = useSelector((state: RootState) => state.payment);
    const { experts } = useSelector((state: RootState) => state.talkToExpert);
    const dispatch = useAppDispatch();
    const { startCheckout } = useStripePayment();

    const getExperts = () => {
        const payload = {
            token: DEFAULT_TOKEN,
            candidateId: candidateInfo._id,
            trackIds: [trackId],
            serviceTypes: [serviceTypes.MOCKUP_INTERVIEW, serviceTypes.COACHING],
            productType: ProductTypes.expert,
            subProductType: SubProductTypes.expertMeeting

        };
        dispatch(getNotificationMsg({ trackId, "menu": MENUS.MOCK_AND_COACHING })); // Update MOCK_AND_COACHING notifications
        dispatch(getExpertsByTrack(payload));
    }

    const getFreeConsultancyExperts = () => {
        const payload = {
            token: DEFAULT_TOKEN,
            candidateId: candidateInfo._id,
            trackIds: [trackId],
            serviceTypes: [serviceTypes.FREE_MEETING],
            productType: ProductTypes.expert,
            subProductType: SubProductTypes.expertMeeting
        };
        dispatch(getDetailedExpertsByServiceTypes(payload));
    }

    const getConsultancyExperts = () => {
        const payload = {
            token: DEFAULT_TOKEN,
            candidateId: candidateInfo._id,
            trackIds: [trackId],
            serviceTypes: [serviceTypes.CAREER_CONSULTANCY],
            productType: ProductTypes.expert,
            subProductType: SubProductTypes.expertMeeting
        };
        dispatch(getExpertsByTrack(payload));
    }

    const getExpertDetails = (expertId: string) => {
        const payload = {
            token: DEFAULT_TOKEN,
            expertId: expertId,
        };
        dispatch(getExpertDetail(payload));
    }

    const getCandidateNameEmail = () => {
        return {
            name: candidateInfo.fullname,
            email: candidateInfo.email
        }
    }

    async function createRecentMeeting(expertId: string, meetingReference: string, meetingPurpose: string, resumeUrl?: string, candidateNotes?: string, trackId?: string, serviceType?: string, focusedModules?: IFocussedModule[]) {
        const payload = {
            token: DEFAULT_TOKEN,
            candidateId: candidateInfo._id,
            expertId: expertId,
            meetingReference: meetingReference,
            meetingPurpose: meetingPurpose,
            resumeUrl,
            candidateNotes,
            trackId,
            serviceType,
            focusedModules
        }

        return dispatch(createNewMeeting(payload));
    }

    const getExpertProducts = async (expertId: string): Promise<any[]> => {
        const payload: IProductsByType = {
            candidateId: candidateInfo._id,
            productType: ProductTypes.expert,
            subProductType: SubProductTypes.expertMeeting,
            serviceTypes: [serviceTypes.MOCKUP_INTERVIEW, serviceTypes.COACHING],
            expertId: expertId,
            trackIds: [trackId]
        }
        try {
            const expertProds = await paymentService.getExpertMeetingProducts(payload);
            return expertProds.product;
        }
        catch (err: any) {
            dispatch(setErrorMessage(err));
            return [];
        }
    }

    const getConsultancyProducts = async (expertId: string): Promise<any[]> => {
        const payload: IProductsByType = {
            candidateId: candidateInfo._id,
            productType: ProductTypes.expert,
            subProductType: SubProductTypes.expertMeeting,
            serviceTypes: [serviceTypes.CAREER_CONSULTANCY],
            expertId: expertId,
            trackIds: [trackId]
        }
        try {
            const expertProds = await paymentService.getExpertMeetingProducts(payload);
            return expertProds.product;
        }
        catch (err: any) {
            dispatch(setErrorMessage(err));
            return [];
        }
    }

    const getScheduledMeetings = (meetingType: string, serviceTypes: string) => {
        const payload = {
            token: DEFAULT_TOKEN,
            candidateId: candidateInfo._id,
            meetingType,
            //serviceTypes
        }

        dispatch(getMeetings(payload));
    }

    const prepareMeetingInfo = (meetings: IExpertMeeting[], meetingType?: TalkToExpertPages) => {
        let meetingsInfo: any[] = [];   
        meetings.forEach(meeting => {
            let infoList: LabelValue[] = [];
            infoList.push({ label: 'Scheduled on:', value: getLocalDate(meeting.createdAt) });
            infoList.push({ label: 'Scheduled with:', value: getExpertById(meeting.expertId) });
            infoList.push({ label: 'Meeting time:', value: notEmpty(meeting.meetingTime) ? getLocalDate(meeting.meetingTime) : '' });
            infoList.push({ label: 'Meeting Title:', value: meeting.meetingPurpose });
            infoList.push({ label: 'Zoom meeting ID:', value: meeting.zoomMeetingId });
            infoList.push({ label: 'Zoom meeting link:', value: meeting.zoomMeetingLink, type: "link" });
            infoList.push({ label: 'Zoom meeting passcode:', value: meeting.zoomMeetingPassword });
            infoList.push({ label: 'Zoom meeting video link:', value: meeting.zoomMeetingRecordedVideoLink, type: "link" });
            infoList.push({ label: 'Zoom meeting video password:', value: meeting.zoomMeetingRecordedVideoLinkPassword });
            infoList.push({ label: 'Track Name', value: meeting.trackName });
            infoList.push({ label: 'Resume Link', nameOnly: true, value: meeting.resumeUrl || "No Resume Available", type: meeting.resumeUrl ? (meetingType === TalkToExpertPages.PMeetings ? 'link' : "resume-upload") : "upload" });
            infoList.push({
                label:'', value: meeting.candidateNotes, component: MeetingNotes
            });
            if (meetingType === TalkToExpertPages.PMeetings && meeting.expertFeedback?.comment) infoList.push({
                label: '', value: meeting.expertFeedback?.comment, component: ExpertNotesComponent
            });
            if(meetingType === TalkToExpertPages.PMeetings) infoList.push({
                label: ``, value: meeting.candidateFeedback, component: CandidateReviewComponent
            });
            meetingsInfo.push(
                {
                    details: infoList,
                    id: meeting.meetingDetailId,
                    zoomMeetingId: meeting.zoomMeetingId,
                    remarks: meeting.remarks,
                    candidateFeedbackProvided: !!meeting.candidateFeedback,
                    reviewStatus: meeting.reviewStatus,
                    feedbackStatus: meeting.feedbackStatus,
                    showFeedbackBtn: meetingType === TalkToExpertPages.PMeetings,
                    focusedModules: meeting.focusedModules,
                });
        });

        return meetingsInfo;
    }

    const saveCustomerNotes = (value: string, id: string) => {
        console.log(value);
        const payload = {
            token: DEFAULT_TOKEN,
            meetingDetailId: id,
            candidateNotes: value
        };
        dispatch(saveNotes(payload));
    }

    const getExpertById = (id: string) => experts.find((x:any) => x.expertId === id)?.fullName ?? 'unknown';

    const proceedToCheckout = (productId: string, trackId: string, successUrl: string, failureUrl: string, expertId: string, candidateID?:string): Promise<any> => {
        const payload: ICreateCheckoutRequestData = {
            quantity: 1,
            productId: productId,
            candidateId: candidateID || candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            track: trackId,
            successUrl: successUrl,
            failureUrl: failureUrl,
            questionId: null,
            expertId: expertId,
            answerId: null
        };
        return paymentService.checkoutPaymentSession(payload);
    }

    async function continueCheckout(productId: string, trackId: string, successUrl: string, failureUrl: string, expertId: string, candidateID?:string) {
        try {
            const sessionRes = await proceedToCheckout(productId as string, trackId, successUrl, failureUrl, expertId, candidateID);
            setValueBrowserStorage(Expert_Session_Id, sessionRes.stripeSessionId);
            startCheckout(sessionRes.stripeSessionId);
        }
        catch (err: any) {
            throw err;
        }
    }

    const doDirectPayment = (paymentMethodId: string | null, productId: string, trackId: string, expertId: string) => {
        const payload: ICheckoutSavedCard = {
            quantity: 1,
            productId: productId,
            candidateId: candidateInfo._id,
            market: DEFAULT_MARKET_NAME,
            track: trackId,
            expertId: expertId,
            questionId: null,
            answerId: null,
            paymentMethodId: paymentMethodId
        };
        return paymentService.checkoutWithSavedCard(payload);
    }

    const setMeetingDetailIdToPaymentHistory = async (paymentHistoryId: string, meetingDetailId: string) => {
        const payload: any = {
            meetingId: meetingDetailId,
            paymentHistoryId: paymentHistoryId
        }

        try {
            const response = await paymentService.setMeetingDetailId(payload);
        }
        catch (err: any) {
            dispatch(setErrorMessage(err));
            throw err;
        }
    }

    /**
     * this function is primarily used to check whether payment has been made for the product.
     * returns paymentHistoryId if not
     */
    const getPaymentHistoryIdOfPaidMeeting = async (productId: string, expertId: string) => {
        const payload: any = {
            candidateID: candidateInfo._id,
            productId,
            expertID: expertId
        }

        try {
            const response = await paymentService.getPaymentHistoryOfPaidMeeting(payload);
            return response.paymentInfo;
        }
        catch (err: any) {
            dispatch(setErrorMessage(err));
            throw err;
        }
    }

    const isActiveContractPlan = (): boolean => {
        return ((trackPlan.toLowerCase() == "contract" || trackPlan == PlanType.Unlimited)
            && planState.toLowerCase() == "active");
    }

    return {
        getExperts,
        getExpertDetails,
        getCandidateNameEmail,
        createRecentMeeting,
        getExpertProducts,
        getScheduledMeetings,
        prepareMeetingInfo,
        saveCustomerNotes,
        continueCheckout,
        doDirectPayment,
        setMeetingDetailIdToPaymentHistory,
        getPaymentHistoryIdOfPaidMeeting,
        isActiveContractPlan,
        getFreeConsultancyExperts,
        getConsultancyExperts,
        getConsultancyProducts,
    };
}
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { ButtonsBar } from 'components/Common/ButtonsBar';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { ModalComponent } from 'components/Common/Modal/Modal';
import { CalendlyPopup } from 'components/Modals/CalendlyPopup';
import { PaymentMethodsModal } from 'components/Modals/PaymentMethodModal';
import ScheduledMeetings from 'components/TalkToExpert/scheduledMeetings';
import { SuccessPayment } from 'containers/PlanAndPayment/PaymentAcknowledgement/successPayment';
import { usePlanProducts } from 'containers/PlanAndPayment/PlanProducts/usePlanProducts';
import { ResumeReview } from 'containers/ResumeReview';
import ExpertProducts from 'containers/TalkToExpert/expertProducts';
import { useTalkToExperts } from 'containers/TalkToExpert/useTalkToExpert';
import { useLoader } from 'context/loaderDots';
import { useMessagePopup } from 'context/messagePopup';
import _ from 'lodash';
import { useSnackbar, VariantType } from 'notistack';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { evaluationPlatformService } from 'services';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { RootState } from 'store';
import styled from 'styled-components';
import { IPaymentMethod } from 'types/Payments';
import { getCurrentDomainUrl, getUniqueId, notEmpty, scrollWindowToElement } from 'utilities';
import { Candidate_Id, Expert_Session_Id, FLOW_TYPE, serviceTypes } from 'utilities/constants';
import { ExpertCards } from "./ExpertCards";
const Main = styled.div`
    .content {
        padding: 1rem 2rem;
    }
`;

enum TalkToExpertPages {
    FreeMeetings,
    Experts,
    PMeetings,
    UMeetings
}

interface ISelectedProductInfo {
    productId: string;
    price: string;
}

type CurrentSessionPaymentDetailType = {
    expertId: string;
    productId: string;
    paymentHistoryId: string;
}

const PageButtons = [
    { label: 'Free Session', value: TalkToExpertPages.FreeMeetings },
    { label: 'Schedule Meeting', value: TalkToExpertPages.Experts },
    { label: 'Upcoming Meetings', value: TalkToExpertPages.UMeetings },
    { label: 'Past Meetings', value: TalkToExpertPages.PMeetings }
]

const SchedulingStep = {
    ResumeReview: "ResumeReview",
    CandidateNotes: "CandidateNotes",
    CalendlyPopup: "CalendlyPopup"
}

export const CareerConsultancyContainer = () => {
    const [resumeUrl, setResumeUrl] = useState<string | undefined>();
    const [selectedButton, setSelectedButton] = useState<TalkToExpertPages>(PageButtons[0].value);
    const [openCalendly, setOpenCalendly] = useState(false);
    const [calendlyDetails, setCalendlyDetails] = useState({ name: '', email: '', cUrl: '' });
    const [selectedExpertId, setSelectedExpertId] = useState<string>('');
    const [expertProducts, setExpertProducts] = useState<any[]>([]);
    const [filteredExpertProducts, setFilteredExpertProducts] = useState<any[]>([]);
    const [meetingsWithLabel, setMeetingsWithLabel] = useState<any[]>([]);
    const [scrollToViewId, setScrollToViewId] = useState<string>('');
    const [notesSavingId, setNotesSavingId] = useState<string>('');
    const [selectedProductInfo, setSelectedProductInfo] = useState<ISelectedProductInfo | null>(null);
    const [openPaymentMethods, setOpenPaymentMethods] = useState(false);
    const [savedCards, setSavedCards] = useState<IPaymentMethod[]>([]);
    const [currentSessionPaymentDetail, setCurrentSessionPaymentDetail] = useState<CurrentSessionPaymentDetailType>({ expertId: '', productId: '', paymentHistoryId: '' });
    const [isOngoingPayment, setIsOngoingPayment] = useState<boolean>(false);
    const [isResumeReviewOpen, setResumeReviewOpen] = useState(false);
    const [schedulingStep, setSchedulingStep] = useState<string | undefined>();
    const [candidateNotesForExpert, setCandidateNotesForExpert] = useState<string>("");
    const [calendyDefaultOpen, setCalendyDefaultOpen] = useState<boolean>(true);
    const loader = useLoader();
    const message = useMessagePopup();
    const { enqueueSnackbar } = useSnackbar();
    const { search } = useLocation();
    const _queryParams: any = queryString.parse(search);
    const {
        getExpertDetails,
        getConsultancyExperts,
        getFreeConsultancyExperts,
        getCandidateNameEmail,
        getConsultancyProducts,
        createRecentMeeting,
        getScheduledMeetings,
        prepareMeetingInfo,
        saveCustomerNotes,
        continueCheckout,
        doDirectPayment,
        setMeetingDetailIdToPaymentHistory,
        getPaymentHistoryIdOfPaidMeeting,
        isActiveContractPlan
    } = useTalkToExperts();
    const { loading, error, experts: trackExperts, meetings, saving, selectedExertDetail, detailedExperts } = useSelector((root: RootState) => root.talkToExpert);
    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const trackId = useSelector((state: RootState) => state.payment.trackId);
    const [autoSaveNotes] = useState<any>({ call: _.debounce(saveCustomerNotes, 1000) });
    const { completePaymentAcknowledgement } = SuccessPayment();
    const { getPaymentMethods } = usePlanProducts();
    const [productFilterModal, setProductFilterModal] = useState<boolean>(false);
    const [productTags, setProductTags] = useState<any>();
    const [tagfilter, setTagfilter] = useState<any>({});
    const expertProductsMap = useMemo(() => {
        const epMap: { [key: string]: any[] } = {};
        trackExperts.forEach((e: any) => {
            epMap[e.expertId] = [];
        });

        return epMap;
    }, [trackExperts]);


    const getExpertDetail = async () => {
        if (selectedExpertId) {
            getExpertDetails(selectedExpertId);
        }
    }


    /** useEffects */
    useEffect(() => {
        completePayment();
    }, []);

    useEffect(() => {
        notEmpty(candidateInfo) && notEmpty(candidateInfo._id) && notEmpty(trackId) && getFreeConsultancyExperts();
    }, [candidateInfo, trackId]);

    useEffect(() => {
        loading ? loader.showLoader() : loader.hideLoader();
    }, [loading]);

    useEffect(() => {
        notEmpty(error) && showNotify('error', error);
    }, [error]);

    useEffect(() => {
        selectExpert();
    }, [trackExperts]);

    useEffect(() => {
        if (notEmpty(currentSessionPaymentDetail.paymentHistoryId)) selectExpert();
    }, [currentSessionPaymentDetail]);

    useEffect(() => {
        const setProducts = async () => {
            if (notEmpty(selectedExpertId)) {
                loader.showLoader();
                let prods = await getConsultancyProducts(selectedExpertId);
                loader.hideLoader();
                expertProductsMap[selectedExpertId] = prods;
                setExpertProducts(prods);
                setFilteredExpertProducts(prods);
            }
        }

        setProducts();
    }, [selectedButton, selectedExpertId]);

    useEffect(() => {
        switch (selectedButton) {
            case TalkToExpertPages.UMeetings:
                getScheduledMeetings("UPCOMING", serviceTypes.CAREER_CONSULTANCY);
                break;
            case TalkToExpertPages.PMeetings:
                getScheduledMeetings("PAST", serviceTypes.CAREER_CONSULTANCY);
                break;
        }
    }, [selectedButton]);

    useEffect(() => {
        getExpertDetail();
    }, [selectedExpertId])

    useEffect(() => {
        setMeetingsWithLabel(prepareMeetingInfo(meetings ?? []));
    }, [meetings]);

    useEffect(() => {
        if (notEmpty(scrollToViewId)) {
            setSelectedButton(TalkToExpertPages.UMeetings);
        }
    }, [scrollToViewId]);

    useEffect(() => {
        if (notEmpty(meetingsWithLabel) && notEmpty(scrollToViewId)) {
            scrollWindowToElement('meeting' + scrollToViewId);
            setScrollToViewId('');
        }
    }, [meetingsWithLabel]);

    useEffect(() => {
        isOngoingPayment && openCalendlyIfRequired();
        isOngoingPayment && setIsOngoingPayment(false);

        if (expertProducts.length !== 0 && calendyDefaultOpen) {
            setCalendyDefaultOpen(false);
            handleProductFlowByQueryParams();
        }

    }, [expertProducts]);
    /** useEffects end */

    const redirectToCheckout = () => {
        const successUrl = `${getCurrentDomainUrl()}/meetings`;
        const candidateId = getValueBrowserStorage(Candidate_Id);
        if (_queryParams?.lpproductid && _queryParams?.lptrackid && _queryParams?.lpexpertid && candidateId) {
            continueCheckout(_queryParams?.lpproductid, _queryParams?.lptrackid, successUrl, successUrl, _queryParams?.lpexpertid, candidateId);
        }
    }

    const handleProductFlowByQueryParams = () => {
        const queryParamProduct = expertProducts.find(
            (eProd) => eProd.id == _queryParams?.lpproductid
        );

        if (_queryParams?.lpexpertid && queryParamProduct !== undefined && (isActiveContractPlan() || queryParamProduct?.isBought)) {
            toggleResumeReviewModal();
        } else {
            redirectToCheckout();
        }
    }
    /** useEffects end */

    const completePayment = () => {
        completePaymentAcknowledgement(Expert_Session_Id).then((prodData: any) => {
            if (notEmpty(prodData)) {
                message.load('Payment Successful. Opening scheduler...');
                setIsOngoingPayment(true);
                setCurrentSessionPaymentDetail({
                    expertId: prodData.responseJson.metadata.expertId,
                    productId: prodData.responseJson.metadata.productId,
                    paymentHistoryId: prodData.paymentId
                });
            }
        });
    }

    const selectExpert = () => {
        if (notEmpty(currentSessionPaymentDetail.paymentHistoryId) && trackExperts.length > 0) {
            if (currentSessionPaymentDetail.expertId == selectedExpertId) {
                openCalendlyIfRequired();
            }
            else setSelectedExpertId(currentSessionPaymentDetail.expertId);
        } else if (!notEmpty(currentSessionPaymentDetail.paymentHistoryId) && trackExperts.length > 0) {
            let _queryExpId = _queryParams?.lpexpertid;
            let defaultExpertId =
                _queryParams?.lpflowtype === FLOW_TYPE.mockInterview &&
                    _queryExpId &&
                    trackExperts.find((tExp) => tExp.expertId === _queryExpId) !==
                    undefined
                    ? _queryExpId
                    : trackExperts[0].expertId;
            setSelectedExpertId(defaultExpertId);
        }
        setFilteredExpertProducts(expertProducts);
        setTagfilter({});
    }

    const openCalendlyIfRequired = () => {
        if (notEmpty(currentSessionPaymentDetail.paymentHistoryId)) {
            message.close();
            toggleResumeReviewModal();
        }
    }

    const btnSelectHandler = (selectedValue: TalkToExpertPages) => {
        setSelectedButton(selectedValue);
        if (selectedValue === TalkToExpertPages.Experts) {
            notEmpty(candidateInfo) && notEmpty(candidateInfo._id) && notEmpty(trackId) && getConsultancyExperts();
        }
    }

    const selectExpertHandler = (tabIndex: number) => {
        if (tabIndex >= 0) {
            setSelectedExpertId(trackExperts[tabIndex].expertId);
            setTagfilter({});
        }
    }

    const scheduleButtonHandler = async (productId: string, price: string) => {
        if (currentSessionPaymentDetail?.productId == productId || isActiveContractPlan()) {
            toggleResumeReviewModal();
        }
        else {
            loader.showLoader();
            try {
                const paymentHistoryId = await getPaymentHistoryIdOfPaidMeeting(productId, selectedExpertId);
                if (notEmpty(paymentHistoryId)) {
                    setCurrentSessionPaymentDetail({
                        productId: productId,
                        expertId: selectedExpertId,
                        paymentHistoryId: paymentHistoryId
                    });
                }
                else await buyProduct(productId, price);
            }
            catch { }
            finally { loader.hideLoader() }
        }
    }

    async function buyProduct(productId: string, price: string) {
        loader.showLoader();
        try {
            const paymentMethods = await getPaymentMethods();
            if (notEmpty(paymentMethods)) {
                setSavedCards(paymentMethods);
                setSelectedProductInfo({
                    productId: productId,
                    price: '$' + price
                });
                setOpenPaymentMethods(true);
            }
            else {
                try {
                    loader.showLoader();
                    await continueCheckout(
                        productId,
                        trackId,
                        `${getCurrentDomainUrl()}/meetings`,
                        `${getCurrentDomainUrl()}/meetings`,
                        selectedExpertId
                    );
                    loader.hideLoader();
                } catch (err: any) {
                    enqueueSnackbar(err, {
                        variant: 'error',
                        autoHideDuration: 2500,
                    });
                    loader.hideLoader();
                }
            }
            loader.hideLoader();
        }
        catch (err: any) {
            loader.hideLoader();
            enqueueSnackbar(err, {
                variant: 'error',
                autoHideDuration: 2500,
            });
        }
    }

    const bookAppointment = (expertDetail?: any) => {
        const currentCandidate = getCandidateNameEmail();
        setCalendlyDetails({
            name: `${currentCandidate.name}-${getUniqueId(5)}`,
            email: currentCandidate.email,
            cUrl: expertDetail?.calendlyURL ?? selectedExertDetail?.calendlyURL ?? '',
        });

        setOpenCalendly(true);
    }

    const getMeetingPurpose = () => {
        const meetingTitle: string = expertProducts.find((x: any) => x.id === currentSessionPaymentDetail.productId)?.displayName ?? '';
        return meetingTitle;
    }

    const meetingBookedHandler = () => {
        setOpenCalendly(false);
        loader.showLoader();
        setTimeout(async () => {
            try {
                const response: any = await createRecentMeeting(selectedExpertId, calendlyDetails.name, getMeetingPurpose(), resumeUrl, candidateNotesForExpert, trackId, serviceTypes.FREE_MEETING);
                if (notEmpty(currentSessionPaymentDetail.paymentHistoryId)) {
                    await setMeetingDetailIdToPaymentHistory(currentSessionPaymentDetail.paymentHistoryId, response.payload.meeting.meetingDetailId);
                    getConsultancyExperts();
                }
                getExpertDetail();
                setCurrentSessionPaymentDetail({ expertId: '', productId: '', paymentHistoryId: '' });
                showNotify('success', 'Meeting booked successfully');
                setScrollToViewId(response.payload.meeting.meetingDetailId);
            }
            catch { }
        }, 3000);
    }

    const rteChangeHandler = (value: string, source: any, id: string, zoomMeetingId: string) => {
        if (source == "user") {
            setCandidateNotes(value, id);
            setNotesSavingId(id);
            autoSaveNotes.call(value, id, zoomMeetingId);
        }
    }

    const setCandidateNotes = (value: string, id: string) => {
        const _meetings = [...meetingsWithLabel];
        _meetings.find(x => x.id == id).notes = value;
        setMeetingsWithLabel(_meetings);
    }

    function showNotify(type: VariantType, message: string) {
        enqueueSnackbar(message, {
            variant: type,
            autoHideDuration: 2000,
        });
    }

    const getSelectedTabIndex = (): number => {
        const ind = trackExperts.findIndex((x: any) => x.expertId === selectedExpertId);
        return ind >= 0 ? ind : 0;
    }

    async function onPaymentMethodSelect(paymentMethodId: string) {
        if (paymentMethodId === "new") {
            if (selectedProductInfo) {
                try {
                    loader.showLoader();
                    await continueCheckout(
                        selectedProductInfo.productId as string,
                        trackId,
                        `${getCurrentDomainUrl()}/meetings`,
                        `${getCurrentDomainUrl()}/meetings`,
                        selectedExpertId
                    );
                    loader.hideLoader();
                }
                catch (err: any) {
                    enqueueSnackbar(err, {
                        variant: 'error',
                        autoHideDuration: 2500,
                    });
                    loader.hideLoader();
                }
            }
        } else if (notEmpty(paymentMethodId)) {
            await makePayment(paymentMethodId);
        }
    }

    function toggleResumeReviewModal() {
        setResumeReviewOpen(!isResumeReviewOpen);
        setSchedulingStep(SchedulingStep.ResumeReview)
    }

    async function makePayment(paymentMethodId: string | null) {
        loader.showLoader();
        try {
            if (selectedProductInfo) {
                const checkout = await doDirectPayment(paymentMethodId, selectedProductInfo.productId, trackId, selectedExpertId);
                if ((notEmpty(checkout.paymentData) && checkout.paymentData[0]?.paid && checkout.paymentData[0]?.status == "succeeded")) {
                    loader.hideLoader();
                    message.success('Voila! Payment Successful. Go ahead and book your slot', (r) => {
                        scheduleButtonHandler(selectedProductInfo.productId, selectedProductInfo.price);
                    });
                }
                else {
                    loader.hideLoader();
                    message.fail('Oh no! Payment Failed');
                }
            }
        }
        catch (err: any) {
            loader.hideLoader();
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
                autoHideDuration: 2500,
            });
        }
    }

    const clearSelectedProductInfo = () => {
        setSelectedProductInfo(null);
    }

    const handleResumeContinue = () => {
        if (schedulingStep === SchedulingStep.CandidateNotes) {
            bookAppointment();
            toggleResumeReviewModal();
            setSchedulingStep(undefined);
        }
        else if (schedulingStep === SchedulingStep.ResumeReview) {
            setSchedulingStep(SchedulingStep.CandidateNotes);
        }
    }

    const onTagFilterChange = (key: string, val: string) => {
        let filter = { ...tagfilter };
        let keyValArr = filter[key];
        const inx = keyValArr?.indexOf(val);
        if (inx !== undefined && inx > -1) {
            keyValArr.splice(inx, 1);
        } else {
            if (!keyValArr) {
                keyValArr = [];
            }
            keyValArr.push(val);
        }
        filter[key] = keyValArr;
        setTagfilter(filter);
    }

    const handleProductFilter = () => {
        let prods = expertProducts.slice();
        const tagkeys = Object.keys(tagfilter);
        if (tagkeys.length && tagkeys.some((tag: string) => tagfilter[tag].length)) {
            prods = prods.filter(prod => prod.tags?.some((tag: any) => tagfilter[tag.key]?.some((filter: string) => tag.value?.includes(filter))));
        }
        setFilteredExpertProducts(prods);
    }

    const handleAdvanceOptions = async () => {
        setProductFilterModal(true);
        const data: any = await evaluationPlatformService.getProductTags();
        setProductTags(data?.output.config?.values);
    }

    const bookFreeMeeting = (expertDetail: any) => {
        setSelectedExpertId(expertDetail.expertId);
        bookAppointment(expertDetail);
    }

    return (
        <Main>
            <ButtonsBar
                buttonsInfo={PageButtons}
                selectedPage={selectedButton}
                handleClick={btnSelectHandler}
                showOptions={false}
                onOptionsClick={() => handleAdvanceOptions()}
            />
            <div className="content">
                {selectedButton === TalkToExpertPages.FreeMeetings && <ExpertCards experts={detailedExperts} handleCtaAction={(expertId: string) => bookFreeMeeting(expertId)} />}
                {selectedButton === TalkToExpertPages.Experts &&
                    <ExpertProducts
                        experts={trackExperts}
                        products={filteredExpertProducts}
                        selectExpertHandler={selectExpertHandler}
                        selectedTabIndex={getSelectedTabIndex()}
                        scheduleButtonHandler={scheduleButtonHandler}
                        selectedExpertId={selectedExpertId}
                        isContractPlan={isActiveContractPlan()}
                        selectedExertDetail={selectedExertDetail}
                    />}
                {(selectedButton === TalkToExpertPages.PMeetings || selectedButton === TalkToExpertPages.UMeetings) && <ScheduledMeetings
                    meetingType={'' + selectedButton}
                    meetings={meetingsWithLabel}
                    RTOnChange={rteChangeHandler}
                    saving={saving}
                    updatingMeetingId={notesSavingId}
                    getMeetings={(meetingType: "PAST" | "UPCOMING") => getScheduledMeetings(meetingType, serviceTypes.CAREER_CONSULTANCY)}
                />}
            </div>
            <ModalComponent
                handleClose={() => setProductFilterModal(false)}
                show={productFilterModal}
                footer={
                    <div>
                        <Button type="button" onClick={handleProductFilter}>{'Filter Products'}</Button>
                    </div>
                }
            >
                <div className="mt-4">
                    {productTags?.map((tags: any) => <div key={tags.key} className="d-flex flex-column">
                        <span className="font-weight-bold"><u>{tags.key}</u></span>
                        <div>
                            {tags.value?.map((val: any) => {
                                const tagVal = tagfilter[tags.key];
                                const isChecked = tagVal?.indexOf(val) > -1;
                                return <FormControlLabel
                                    label={val}
                                    control={<Checkbox onChange={() => onTagFilterChange(tags.key, val)} color='primary' checked={isChecked} />}
                                />
                            }
                            )}
                        </div>
                    </div>)}
                </div>
            </ModalComponent>
            <ModalComponent
                handleClose={toggleResumeReviewModal}
                show={isResumeReviewOpen}
                footer={
                    <div>
                        <Button type="button" onClick={handleResumeContinue}>{'Continue'}</Button>
                    </div>
                }
            >
                <>
                    {schedulingStep === SchedulingStep.ResumeReview && <div>
                        <div className="h5 m-3 text-center">
                            <span>{'Select Resume'}</span>
                        </div>
                        <ResumeReview resumeUrl={resumeUrl} setResumeUrl={setResumeUrl} />
                    </div>}
                    {schedulingStep === SchedulingStep.CandidateNotes && <div>
                        <div className="h6 m-3 text-center">
                            <span>{'Enter questions or notes you want to share with Expert'}</span>
                        </div>
                        <RichTextEditor
                            disabled={false}
                            id={`notesForExpert`}
                            value={candidateNotesForExpert}
                            onChange={setCandidateNotesForExpert}
                            customStyles={{ height: '120px', boxShadow: 'none', border: '1px solid #ccc' }}
                        />
                    </div>}
                </>
            </ModalComponent>
            <CalendlyPopup
                open={openCalendly}
                onClose={() => setOpenCalendly(false)}
                onConfirm={meetingBookedHandler}
                details={calendlyDetails}
            />
            {
                selectedProductInfo && <PaymentMethodsModal
                    open={openPaymentMethods}
                    cards={savedCards}
                    amount={selectedProductInfo.price}
                    onClose={() => {
                        clearSelectedProductInfo();
                        setOpenPaymentMethods(false)
                    }
                    }
                    onSelect={onPaymentMethodSelect}
                />
            }
        </Main>
    )
}
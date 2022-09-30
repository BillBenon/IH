import { useStripePayment } from 'components/Common/customHooks/stipePayment';
import { ChooseExpertModal } from 'components/Modals/ChooseExpertModal';
import { PaymentMethodsModal } from 'components/Modals/PaymentMethodModal';
import { useQuestions } from 'components/Question/useQuestions';
import { useLoader } from 'context/loaderDots';
import { useMessagePopup } from 'context/messagePopup';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { setValueBrowserStorage } from 'services/browserStorageService';
import { IPaymentMethod } from 'types/Payments';
import { notEmpty } from 'utilities';
import { Expert_Session_Id } from 'utilities/constants';

interface ISelectedExpertInfo {
    productId: string;
    expertId: string;
    price: string;
}

export const ExpertSelectionModal = ({ isShowChooseExpert, setShowChooseExpert, questionId, answerId, submitFeedbackToExpert }: any) => {
    const loader = useLoader();
    const { enqueueSnackbar } = useSnackbar();
    const { startCheckout } = useStripePayment();
    const [savedCards, setSavedCards] = useState<IPaymentMethod[]>([]);
    const [openPaymentMethods, setOpenPaymentMethods] = useState(false);
    const { getPaymentMethods, proceedToCheckout, doDirectPayment, isFullAccessPlan, validateFullAccessPlan } = useQuestions();
    const [selectedExpertInfo, setSelectedExpertInfo] = useState<ISelectedExpertInfo>({ productId: '', expertId: '', price: '' });
    const message = useMessagePopup();
    const [paymentMethodModalDesc, setPaymentMethodModalDesc] = useState<string>('');
    const { getExpertProductsInfo, getExperts } = useQuestions();
    const [experts, setExperts] = useState<any>([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (isShowChooseExpert) {
            loadExperts();
        }
    }, [isShowChooseExpert]);//eslint-disable-line

    const loadExperts = () => {
        if (!isFullAccessPlan()) {
            loader.showLoader();
            getExpertProductsInfo(questionId).then(allExperts => {
                if(allExperts.length===0){
                    message.fail('No experts available at the moment. Please try again later.');
                    return;
                }
                setExperts(allExperts);
                loader.hideLoader();
                setOpenModal(true);
            }).catch(err => {
                loader.hideLoader();
                enqueueSnackbar(err?.message, {
                    variant: 'error',
                    autoHideDuration: 2500,
                });
            })
        } else {
            setExperts(getExperts());
            setOpenModal(true);
        }
    }

    const handleSubmitResponseToExpert = (productId: string, expertId: string, price: number, paid: boolean) => {
        if (!isFullAccessPlan()) {
            if (notEmpty(productId) && !paid) {
                loader.showLoader();
                setSelectedExpertInfo({
                    productId: productId,
                    expertId: expertId,
                    price: '$' + price.toFixed(2)
                });

                getPaymentMethods().then(methods => {
                    if (notEmpty(methods)) {
                        setShowChooseExpert(false);
                        setSavedCards(methods);
                        setPaymentMethodsInfo(expertId);
                        loader.hideLoader();
                    }
                    else {
                        continueCheckout(productId, expertId);
                    }
                })
            } else if (notEmpty(productId) && paid) {
                submitFeedbackToExpert(expertId);
            }
            else {
                enqueueSnackbar("Requested expert entry does not exist", {
                    variant: 'error',
                    autoHideDuration: 2500,
                });
            }
        }
        else {
            validateFullAccessPlan().then((isActiveContract: boolean) => {
                if (isActiveContract) submitFeedbackToExpert(expertId);
                else {
                    enqueueSnackbar("Plan is not contract active", {
                        variant: 'error',
                        autoHideDuration: 2500,
                    });
                }
            });
        }
    };

    const onPaymentMethodSelect = (paymentMethodId: string) => {
        if (paymentMethodId === 'new') {
            continueCheckout(selectedExpertInfo.productId, selectedExpertInfo.expertId);
        } else if (notEmpty(paymentMethodId) && notEmpty(selectedExpertInfo.productId) && notEmpty(selectedExpertInfo.expertId)) {
            loader.showLoader();
            message.load('Please wait while we process your transaction...');
            doDirectPayment(paymentMethodId, selectedExpertInfo.productId, selectedExpertInfo.expertId, questionId, answerId)
                .then(res => {
                    if (res.paymentData[0]?.paid && res.paymentData[0]?.status === "succeeded") {
                        loader.hideLoader();
                        message.load('Payment Successful... Submitting your response');
                        submitFeedbackToExpert(selectedExpertInfo.expertId);
                    } else {
                        loader.hideLoader();
                        message.fail('Oh no! Payment Failed');
                    }
                })
                .catch(err => {
                    loader.hideLoader();
                    message.fail('Oh no! Payment Failed');
                });
        } else {
            enqueueSnackbar('Something went wrong', {
                variant: 'error',
                autoHideDuration: 2500,
            });
        }
    }

    const continueCheckout = (productId: string, expertId: string) => {
        if (notEmpty(productId) && notEmpty(expertId)) {
            loader.showLoader();
            proceedToCheckout(productId, expertId, questionId, answerId)
                .then((res: any) => {
                    const sessionId = res.stripeSessionId;
                    setValueBrowserStorage(Expert_Session_Id, sessionId);
                    loader.hideLoader();
                    startCheckout(sessionId);
                })
                .catch(err => {
                    loader.hideLoader();
                    enqueueSnackbar(err?.message, {
                        variant: 'error',
                        autoHideDuration: 2500,
                    });
                });
        } else {
            enqueueSnackbar('No expert exist', {
                variant: 'error',
                autoHideDuration: 2500,
            });
        }
    }

    const clearSelectedExpertInfo = () => {
        setSelectedExpertInfo({
            productId: '',
            expertId: '',
            price: ''
        });
    }

    const setPaymentMethodsInfo = (expertId: string) => {
        const ind = experts.findIndex((e: any) => e._id === expertId);
        if (ind >= 0) {
            setPaymentMethodModalDesc(createExpertDiv(experts[ind].fullname, experts[ind].workingAt));
            setOpenPaymentMethods(true);
        }
    }

    const createExpertDiv = (name: string, company: string) => {
        return `
            <div>Submit you response to ${name} <span class="text--12 gray">@${company}</span></div> 
        `;
    }

    return (
        <>
            <ChooseExpertModal
                Modal={Modal}
                experts={experts}
                hideChooseExpert={() => {
                    setOpenModal(false)
                    clearSelectedExpertInfo()
                    setShowChooseExpert(false)
                }}
                openModal={openModal}
                handleSubmitResponseToExpert={handleSubmitResponseToExpert}
            />
            <PaymentMethodsModal
                open={openPaymentMethods}
                cards={savedCards}
                amount={selectedExpertInfo.price}
                onClose={() => {
                    clearSelectedExpertInfo()
                    setOpenPaymentMethods(false)
                }}
                onSelect={onPaymentMethodSelect}
                descHtml={paymentMethodModalDesc}
            />
        </>
    )
}
import { useMessagePopup } from 'context/messagePopup';
import { clearBrowserStorage, getValueBrowserStorage } from 'services/browserStorageService';
import { paymentService } from 'services/payment';
import { notEmpty, useQuery } from 'utilities';
import { ApiError } from 'utilities/api';
import { API_TIMEOUT, Flowtype, FLOW_TYPE } from 'utilities/constants';

export const SuccessPayment = () => {
    const query = useQuery();
    const messagePopup = useMessagePopup();

    const completePaymentAcknowledgement = (sessionKey: string): Promise<any> => {
        var session = {
            sessionId: query.get('session_id')
        };

        const sessionFromStorage = getValueBrowserStorage(sessionKey);

        if (notEmpty(sessionFromStorage)) {
            if (sessionFromStorage == session.sessionId) {
                clearBrowserStorage(sessionKey);
                messagePopup.load('Please wait while we process your transaction...');
                return paymentService.verifyCheckout(session)
                    .then(res => {
                        const responseJson = JSON.parse(res.stripeResponse);
                        if (notEmpty(responseJson) &&
                            responseJson.payment_status == "paid") {
                            return { responseJson, paymentId: res.paymentId };
                        }
                        else {
                            messagePopup.fail('Oh no! Payment Failed');
                            return null;
                        }
                    })
                    .catch((error: ApiError) => {
                        if (error.message == API_TIMEOUT.message) {
                            messagePopup.fail('Request timeout! Payment aborted.')
                        }
                        else messagePopup.fail('Oh no! Payment Failed');
                        return null;
                    });
            }
            else {
                clearBrowserStorage(sessionKey);
                const flowType = getValueBrowserStorage(Flowtype);
                if (flowType && flowType === FLOW_TYPE.buy) {
                    return Promise.reject({ type: flowType });
                } else {
                    messagePopup.fail('Oh no! Payment Failed');
                }
                return Promise.resolve(null);
            }
        }
        else {
            return Promise.resolve(null);
        }
    }

    return { completePaymentAcknowledgement };
};
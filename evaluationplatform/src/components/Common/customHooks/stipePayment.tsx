import { loadStripe } from '@stripe/stripe-js';
import { useLoader } from 'context/loaderDots';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { paymentService } from 'services/payment';
import { logClientErrors } from 'store/evaluationPlatform';
import { notEmpty } from 'utilities';

export const useStripePayment = () => {
    const loader = useLoader();
    const { enqueueSnackbar } = useSnackbar();
    const [stripeKey, setStripeKey] = useState('');

    useEffect(() => {
        async function getStripeKey() {
            if (!notEmpty(stripeKey)) {
                try {
                    loader.showLoader();
                    const response = await paymentService.getStripePublishKey();
                    loader.hideLoader();
                    setStripeKey(response.publishableKey);
                }
                catch {
                    setStripeKey('');
                    loader.hideLoader();
                }
            }
        }

        getStripeKey();
    }, []);

    async function startCheckout(sessionId: string) {
        try {
            if (stripeKey) {
                loader.showLoader();
                const stripe = await loadStripe(stripeKey);
                await stripe?.redirectToCheckout({
                    sessionId: sessionId
                });
                loader.hideLoader();
            }
        }
        catch (err: any) {
            loader.hideLoader();
            logClientErrors({ errorMessage: err, remarks: `Redirect to checkout failed`, stackTrace: '' })
            enqueueSnackbar(`Checkout Failed ${err}`, {
                variant: 'error',
                autoHideDuration: 2500,
            });
        }
    }

    return {
        stripeKey,
        startCheckout
    }
};
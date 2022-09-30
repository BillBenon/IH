import { Button } from 'components';
import Chip from 'components/Common/Chips';
import { CalendlyPopup } from 'components/Modals/CalendlyPopup';
import { PaymentMethodsModal } from 'components/Modals/PaymentMethodModal';
import { useLoader } from 'context/loaderDots';
import { useMessagePopup } from 'context/messagePopup';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IPaymentMethod, IPlan, IProductsForCandidate, IProductsInfo } from 'types/Payments';
import { getCurrentDomainUrl, notEmpty } from 'utilities';
import { usePlanProducts } from './usePlanProducts';
import { RightArrowAlt } from '@styled-icons/boxicons-regular/RightArrowAlt';
import { CALENDLY_URL, PlanType } from 'utilities/constants';
import { Checkmark } from '@styled-icons/evaicons-solid/Checkmark';
import { IsunSubscribable } from 'utilities/helperFunctions';

const PlanProductsDiv = styled.div`
  text-align: left;
  padding: 2rem 10rem;
  
  .product {
    margin: 0 auto;
    display: flex;
    margin-bottom: 2rem;
    align-items: center;
    .currentPlan {
        min-width: 160px;
    }
    .currentPlanState {
        min-width: 160px;
    }
  }

  .product-info {   
    display: flex;
    overflow: hidden;
    margin-right: 10px;
    width: 100%;

        .product-type {
            width: 25%;
            align-items: center;
            justify-content: center;
            display: flex;
            color: #5b94e3;
            font-size: 20px;
            font-weight: bold;
            padding-left: 1rem;
            margin-right: 30px;
            word-break: break-word;
        }

        .product-details {
            width: 75%;
            padding: 1rem;

            button:disabled {
                background: #D5D8DC;
            }

            button:hover:enabled {
                box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
                transition: 0.3s;
            }

            .price {
                color: #5b94e3;
                font-size: 1rem;
                font-weight: bold;
            }

            .product-checks {
                margin-left: -30px;
            }

            .product-nextStep {
                font-size: 12px;
                color: ${props => props.theme.colors.primary}
            }
        }
    }

    .followUp {
        color: ${props => props.theme.colors.primary}
    }
`;

interface ISelectedProductInfo {
    productId: string;
    price: string;
}

interface ICurrentBoughtProduct {
    id: string;
    planState: string;
}

const CheckmarkDescription = ({ desc }: any) => {
    const [lines, setLines] = useState<string[]>([]);

    useEffect(() => {
        let arr = desc.split("\n");
        setLines(arr);
    }, []);

    return (
        <>
            {lines.map((line, index) => (
                <div key={'checks' + index} className="flexrow">
                    <div className="mr--10"><Checkmark width="20" color="#5b94e3" /></div>
                    <div>{line}</div>
                </div>
            ))}
        </>
    );
}

export const TrackProducts = ({ productInfo, loadProducts, trackId, trackName, updateTrackPlan, reloadProducts, trackPlan }: IProps) => {
    const { enqueueSnackbar } = useSnackbar();
    const { proceedToCheckout, getPaymentMethods, doDirectPayment, continueCheckout, cancelSubscription } = usePlanProducts();
    const [planProductsList, setPlanProductsList] = useState<IProductsInfo[]>([]);
    const [currentBoughtProduct, setCurrentBoughtProduct] = useState<ICurrentBoughtProduct>({ id: '', planState: '' });
    const [openPaymentMethods, setOpenPaymentMethods] = useState(false);
    const [savedCards, setSavedCards] = useState<IPaymentMethod[]>([]);
    const [selectedProductInfo, setSelectedProductInfo] = useState<ISelectedProductInfo | null>(null);
    const loader = useLoader();
    const message = useMessagePopup();
    const [openCalendly, setOpenCalendly] = useState(false);

    useEffect(() => {
        if (notEmpty(productInfo)) {
            modifyProducts(productInfo);
        }
        else {
            resetAll();
        }
    }, [productInfo]);

    const modifyProducts = (p: any) => {
        if (p && p.productInfo && p.productInfo.length > 0) {
            let modifiedProductList = manipulateProductsList(p.productInfo, p.plan);
            setPlanProductsList(modifiedProductList);
            if ((!notEmpty(p.plan.plan) || p.plan.plan === "noplan")) {
                let id = modifiedProductList.find(x => x.free)?.id 
                || modifiedProductList.find(x => x.planName === PlanType.Placement)?.id
                || modifiedProductList.find(x => x.planName === PlanType.Evaluation)?.id // Eval hack
                setCurrentBoughtProduct({ id: id ? id : '', planState: '' });
            }
            else if (notEmpty(p.plan.plan)) {
                setCurrentBoughtProduct({ id: p.plan.plan, planState: p.plan.planState });
            }
        }
        else {
            resetAll();
        }
    }

    const resetAll = () => {
        setPlanProductsList([]);
        setCurrentBoughtProduct({ id: '', planState: '' });
        setSavedCards([]);
        setSelectedProductInfo(null);
    }


    async function onPaymentMethodSelect(paymentMethodId: string) {
        if (paymentMethodId == "new") {
            if (selectedProductInfo) {
                try {
                    loader.showLoader();
                    await continueCheckout(
                        selectedProductInfo.productId as string,
                        trackId,
                        `${getCurrentDomainUrl()}/settings/payments`,
                        `${getCurrentDomainUrl()}/settings/payments`
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

    async function makePayment(paymentMethodId: string | null) {
        loader.showLoader();
        try {
            if (selectedProductInfo) {
                const checkout = await doDirectPayment(paymentMethodId, selectedProductInfo.productId, trackId);
                if (isContract(selectedProductInfo.productId) || (notEmpty(checkout.paymentData) && checkout.paymentData[0]?.paid && checkout.paymentData[0]?.status == "succeeded")) {
                    loader.hideLoader();
                    message.success(notEmpty(paymentMethodId) ? 'Voila! Payment Successful' : 'Meeting booked successfully');
                    updatePlan();
                    loadProducts();
                }
                else {
                    loader.hideLoader();
                    message.fail(notEmpty(paymentMethodId) ? 'Oh no! Payment Failed' : 'Meeting booking failed');
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

    const bookAppointment = (productId: string, price: string) => {
        setSelectedProductInfo({
            productId: productId,
            price: '$' + price
        });

        setOpenCalendly(true);
    }

    async function onAppointmentBooked(e: any) {
        if (e.data.event === "calendly.event_scheduled") {
            setOpenCalendly(false);
            await makePayment(null);
        }
    }

    const manipulateProductsList = (list: IProductsInfo[], plan: IPlan): IProductsInfo[] => {
        return list.sort((a, b) => a.order - b.order)
            .map(x => {
                x.price = x.price / 100;
                return x;
            });
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
                        `${getCurrentDomainUrl()}/settings/payments`,
                        `${getCurrentDomainUrl()}/settings/payments`);
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

    const getProduct = (productId: string): IProductsInfo | undefined => {
        return planProductsList.find(p => p.id == productId);
    }

    const getProductType = (product: IProductsInfo) => {
        return product.planName;
    }

    const isContract = (productId: string): boolean => {
        return !!(getProduct(productId))?.contractProduct;
    }

    const updatePlan = () => {
        if (selectedProductInfo) {
            const product = getProduct(selectedProductInfo.productId);
            if (product) {
                updateTrackPlan(getProductType(product));
            }
        }
    }

    const getPlanState = () => {
        return notEmpty(currentBoughtProduct?.planState) && currentBoughtProduct.planState != "NA"
            ? currentBoughtProduct.planState : 'ACTIVE'
    }

    async function subscriptionBtnHandler(productId: string, price: string) {
        if (currentBoughtProduct.id == productId) {
            message.confirm('Do you really want to cancel subscription?', (res) => {
                if (res) {
                    loader.showLoader();
                    cancelSubscription(productId, trackId).then(res => {
                        loader.hideLoader();
                        if (res.status == "SUCCESS") {
                            reloadProducts();
                            updateTrackPlan(PlanType.Free);
                            enqueueSnackbar('Subsciption successfully canceled', {
                                variant: 'success',
                                autoHideDuration: 2500,
                            });
                        }
                    });
                }
            });
        } else {
            await buyProduct(productId, price);
        }
    }

    return (
        <PlanProductsDiv>
            {planProductsList.map(product => (
                <div key={product.id} className="product">
                    <div className="currentPlan">
                        {currentBoughtProduct.id === product.id &&
                            <div>Your current plan<RightArrowAlt color="#000" width="30px" /></div>}
                    </div>
                    <div className="product-info card-ih">
                        <div className="product-type">
                            <div>
                                <div>
                                    {getProductType(product) + ' Plan'}
                                </div>
                                {currentBoughtProduct.id === product.id
                                    && <Chip value={getPlanState()} color="#ABEBC6" />}
                            </div>
                        </div>
                        <div className="product-details">
                            <div className="product-name">
                                <h4>{product.displayName}</h4>
                            </div>
                            <div className="product-desc">
                                <div>{product.description}</div>
                                <hr />
                            </div>
                            <div className="product-checks">
                                <CheckmarkDescription desc={product.displayDescription} />
                            </div>
                            <div className="product-nextStep mt-3">
                                <span>{product.nextStep}</span>
                            </div>
                            <div className="mt-3">
                                {!product.free &&
                                    notEmpty(product.price) &&
                                    product.price > 0 &&
                                    <div className="price">
                                        {'$'}{`${product.price.toFixed(2)}`}
                                        {product.subscriptionProduct ? `/month` : ''}
                                    </div>}
                                {!product.free && !product.contractProduct && !IsunSubscribable(product) &&
                                    <div>
                                        <button type="button"
                                            onClick={async () => await subscriptionBtnHandler(product.id, product.price.toFixed(2))}
                                            className="text--white text--bold payment-btn"
                                            disabled={isContract(currentBoughtProduct.id)}>
                                            {currentBoughtProduct.id === product.id ? 'Cancel plan' : 'Buy'}
                                        </button>
                                    </div>}
                                {product.contractProduct &&
                                    <button type="button"
                                        onClick={() => bookAppointment(product.id, product.price.toFixed(2))}
                                        className="text--white text--bold payment-btn"
                                        disabled={currentBoughtProduct.id == product.id}>
                                        {`Let's connect`}
                                    </button>}
                            </div>
                            {currentBoughtProduct.id === product.id &&
                                currentBoughtProduct.planState.toLowerCase() === "in_progress" &&
                                <div className="followUp mt--10">
                                    <div>
                                        {product.followUp}
                                    </div>
                                </div>}
                        </div>
                    </div>
                </div>
            ))
            }
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
            <CalendlyPopup
                open={openCalendly}
                onClose={() => setOpenCalendly(false)}
                onConfirm={async (e: any) => await onAppointmentBooked(e)}
                details={{ cUrl: CALENDLY_URL }}
                customAnswers={{ a1: `Setting up a meeting for track - ${trackName}` }}
            />
        </PlanProductsDiv >
    )
}

interface IProps {
    productInfo: IProductsForCandidate | null;
    loadProducts: Function;
    trackId: string;
    trackName: string;
    updateTrackPlan: Function;
    reloadProducts: Function;
    trackPlan: string;
}

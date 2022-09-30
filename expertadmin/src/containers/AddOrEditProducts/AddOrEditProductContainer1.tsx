import { yupResolver } from "@hookform/resolvers/yup";
import { Save } from "@styled-icons/boxicons-solid/Save";
import { EditOutline } from "@styled-icons/evaicons-outline/EditOutline";
import { InformationCircle } from "@styled-icons/ionicons-sharp/InformationCircle";
import { RootState } from "app/rootReducer";
import { AddButton } from "components/AddButton";
import { AdvancedForm } from "components/AdvancedComponents/AdvancedForm";
import { DisableButton } from "components/DisableButton";
import { Heading } from "components/Heading";
import { LoaderStyles } from "components/LoaderStyles";
import { ModalComponent } from "components/Modal";
import { SearchButton } from "components/SearchButton";
import { useAddOrEditProduct } from "features/addOrEditProducts/useAddOrEditProduct";
import moment from "moment";
import React, { useEffect, useState } from "react"
import { Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { EditProductData, ProductTags } from "types";
import { isNumeric } from "utils/commonutils";
import {
    EnrollType,
    MenuItems,
    ProductType,
    productTypes,
    recurringPriceType,
    Routes,
    SubProductType,
    subProductTypes,
} from "utils/constants";
import { initialEditData } from "utils/defaults";
import { IconContainer } from "../../components/IconContainer";
import {
    fieldSize,
    localization,
    placeholder,
    productSchema,
    type,
} from "./AddOrEditProductHelper";
import { ClassInfoComponent } from "./ClassInfoComponent";
import { ExpertMeetingContainer } from "./ExpertMeetingContainer";
import { ProductListContainer } from "./ProductListContainer";
import { ProductTagComponent } from "./ProductTagComponent";

export const AddOrEditProductContainer1 = () => {
    const [
        {
            createProducts,
            product,
            params,
            resetState,
            updateProduct,
            loadInitialDataAdd,
            loadInitialDataEdit,
            updatePrice,
            getProductsByExpertorTrack,
            getInitialTracks,
            fetchExpertMeetings,
            getInitialTags,
        },
    ] = useAddOrEditProduct();

    const history = useHistory();
    const expert = useSelector((state: RootState) => state.auth.expert);
    const [defaultValue, setDefaultValue] = useState<EditProductData>(
        initialEditData
    );
    const [hiddenValues, setHiddenValues] = useState<any>();
    const [disabledValues, setDisabledvalues] = useState<any>();
    const [showExpertMeetings, setShowExpertMeeting] = useState<boolean>(false);
    const [showProductModal, setShowProductModal] = useState<boolean>(false);
    const [showExpertModal, setShowExpertModal] = useState<boolean>(false);
    const [enrollType, setEnrollType] = useState<string | undefined>();
    const [editPrice, setEditPrice] = useState<boolean>(false);
    const [options, setOptions] = useState<any>();
    const [productTags, setProductTags] = useState<ProductTags[]>([]);
    const [fieldChildren, setfieldChildren] = useState<any>();
    const methods = useForm<EditProductData>({
        resolver: yupResolver(productSchema),
        defaultValues: defaultValue,
        mode: "onChange",
        shouldFocusError: true,
    });

    useEffect(() => {
        getInitialTags();
    }, []);

    useEffect(() => {
        if (!isNumeric(params.id)) {
            loadInitialDataEdit(
                { productId: params.id },
                { enrollType: enrollType || "" }
            );
        } else {
            loadInitialDataAdd();
        }
        getInitialTracks({ enrollType: enrollType || "" });
    }, [enrollType]);

    useEffect(() => {
        if (product.editProduct) {
            if (!isNumeric(params.id)) {
                if (product.editProduct.id) {
                    history.push(
                        Routes[MenuItems.products] + `/${product.editProduct.id}`
                    );
                }
                handleHiddenValues(product.editProduct);
                handleSetOptions(product.editProduct.productType);
                handleFieldChildren();
                setProductTags(product.editProduct?.tags)
                setDefaultValue({
                    ...product.editProduct,
                    active: product.editProduct.active,
                });
            }
            if (isNumeric(params.id)) {
                resetState();
            }
            handleDisabledfields();
        }
        if (product.addSuccess) {
            history.push(Routes[MenuItems.products]);
        }
    }, [product.editProduct, product.addSuccess]);

    useEffect(() => {
        const productType = methods.getValues("productType");
        handleSetOptions(productType);
    }, [
        product.trackList,
        product.marketList,
        product.expertList,
    ]);

    useEffect(() => {
        handleHiddenValues();
        handleDisabledfields();
        handleFieldChildren();
    }, [editPrice]);

    const handleSetOptions = (productType: string | undefined) => {
        const opts = {
            serviceType: product.serviceTypeEnum,
            serviceEntities: product.trackList,
            productExpertId: product.expertList,
            market: product.marketList,
            active: [
                { label: "Active", value: "1" },
                { label: "Inactive", value: "0" },
            ],
            tracks: product.trackList,
            productType: productTypes,
            subProductType: productType
                ? subProductTypes.filter(
                    (s) => s.parent.findIndex((p) => p == productType) != -1
                )
                : subProductTypes,
            recurringPriceType: recurringPriceType,
        };
        setOptions(opts);
    };

    const handleHiddenValues = (editProduct?: EditProductData) => {
        if (!editProduct) editProduct = methods.getValues();
        const hiddenVals = {
            serviceType: !(
                editProduct.productType == ProductType.EXPERT &&
                editProduct.subProductType == SubProductType.EXPERTMEETING
            ),
            serviceEntities: !(
                editProduct.productType == ProductType.EXPERT &&
                editProduct.subProductType == SubProductType.EXPERTMEETING
            ),
            tracks:
                !editProduct.productType ||
                editProduct.productType != ProductType.TRACKPLAN,
            productExpertId: editProduct.productType != ProductType.EXPERT,
            price: !(
                editProduct?.subProductType &&
                [
                    SubProductType.TRACKPLANEVALUATION,
                    SubProductType.TRACKPLANSUBSCRIPTION,
                    SubProductType.EXPERTMEETING,
                    SubProductType.EXPERTQUESTION,
                    SubProductType.MONTHLYSUBSCRIPTION,
                ].includes(editProduct.subProductType)
            ),
            recurringPriceType: !(
                (editProduct.subProductType == SubProductType.TRACKPLANSUBSCRIPTION &&
                    isNumeric(params.id)) ||
                (editProduct.subProductType == SubProductType.TRACKPLANSUBSCRIPTION &&
                    editPrice)
            ),
            recurringFrequency: !(
                (editProduct.subProductType == SubProductType.TRACKPLANSUBSCRIPTION &&
                    isNumeric(params.id)) ||
                (editProduct.subProductType == SubProductType.TRACKPLANSUBSCRIPTION &&
                    editPrice)
            ),
            nextStep: editProduct.subProductType != SubProductType.TRACKPLANCONTRACT,
            followUp: editProduct.subProductType != SubProductType.TRACKPLANCONTRACT,
            startDate: editProduct.productType != ProductType.IHCLASS,
            endDate: editProduct.productType != ProductType.IHCLASS,
            zoomDetails: editProduct.productType != ProductType.IHCLASS,
            schedule: editProduct.productType != ProductType.IHCLASS,
            displayName: true,
        };
        setHiddenValues(hiddenVals);
    };

    const handleDisabledfields = () => {
        const disabledVals = {
            productType: !isNumeric(params.id),
            subProductType: !isNumeric(params.id),
            productExpertId: !isNumeric(params.id),
            market: !isNumeric(params.id),
            tracks: !isNumeric(params.id),
            name: product.editProduct.subProductType == SubProductType.EXPERTQUESTION,
            displayName: true,
            price: !(isNumeric(params.id) || editPrice),
        };
        setDisabledvalues(disabledVals);
    };

    const handleStatusChange = () => {
        const productType = methods.getValues("productType");
        const activeVal = methods.getValues("active");
        const expertId = methods.getValues("productExpertId");
        if (productType === "expert" && expertId && "" + activeVal == "0") {
            fetchExpertMeetings({
                expertId,
                startDate: moment().format("DD/MM/YYYY"),
                endDate: "",
            });
            setShowExpertMeeting(true);
        }
    };

    const updateProductPrice = () => {
        const formValues = methods.getValues();
        const price = formValues["price"];
        const recurringPriceType = formValues["recurringPriceType"];
        const recurringFrequency = formValues["recurringFrequency"];
        if (!price || price < 0) {
            methods.setError("price", {
                type: "error",
                shouldFocus: true,
                message: "Price Should Be Greater Than 0",
            });
            return;
        }
        if (
            product.editProduct.subProductType == SubProductType.TRACKPLANSUBSCRIPTION
        ) {
            if (!recurringPriceType) {
                methods.setError("recurringPriceType", {
                    type: "error",
                    shouldFocus: true,
                    message: "Subscription Type Is Required",
                });
                return;
            }
            if (recurringFrequency <= 0 || recurringFrequency > 12) {
                methods.setError("recurringFrequency", {
                    type: "error",
                    shouldFocus: true,
                    message:
                        "Subscription Duration Should Be Greater Than 0 And Less than 13 ",
                });
                return;
            }
        }

        updatePrice({
            price: Number(formValues["price"]),
            subscriptionProduct:
                product.editProduct.subProductType ==
                SubProductType.TRACKPLANSUBSCRIPTION,
            stripeProductId: product.editProduct.stripeProductId,
            priceType: recurringPriceType,
            interval: recurringFrequency,
            expertId: expert?.expertId,
            trackId: product.editProduct.tracks[0].value,
            productId: product.editProduct.id,
        });
    };

    const goBack = () => {
        history.push(Routes[MenuItems.products]);
    };

    const fetchDataForTrackorExpert = (type: string) => {
        const formValues = methods.getValues();
        const trackVal = formValues["tracks"];
        const expertVal = formValues["productExpertId"];
        if (type == "track" && !trackVal?.length) {
            alert("Please Select Track");
            return;
        }
        if (type == "expert" && !expertVal) {
            alert("Please Select Expert");
            return;
        }
        if (type === "track" && trackVal) {
            getProductsByExpertorTrack({
                trackId: trackVal[0]?.value,
                productExpertId: "",
            });
            setShowProductModal(true);
        } else if (expertVal) {
            getProductsByExpertorTrack({
                trackId: "",
                productExpertId: expertVal,
            });
            setShowProductModal(true);
        }
    };

    const renderTrackInfo = () => {
        return (
            <IconContainer
                onClick={() => fetchDataForTrackorExpert("track")}
                icon={InformationCircle}
            />
        );
    };

    const renderExpertInfo = () => {
        return (
            <IconContainer
                onClick={() => fetchDataForTrackorExpert("expert")}
                icon={InformationCircle}
            />
        );
    };

    const renderShowPrice = () => {
        return editPrice ? (
            <IconContainer
                onClick={() => {
                    updateProductPrice();
                    setEditPrice(false);
                }}
                icon={Save}
            />
        ) : (
            <IconContainer
                onClick={() => {
                    setEditPrice(true);
                }}
                icon={EditOutline}
            />
        );
    };

    const handleSubProductTypeChange = () => {
        handleHiddenValues();
        updateEnrollType();
        handleFieldChildren();
        const productType = methods.getValues("productType");
        const expert = methods.getValues("productExpertId");
        if (productType == ProductType.EXPERT && expert) {
            changeName();
        }
    };

    const handleExpertChange = () => {
        changeName();
    };

    const handleProductTypeChange = () => {
        handleHiddenValues();

        const productType = methods.getValues("productType");
        const productExpertId = methods.getValues("productExpertId");
        if (productType == ProductType.EXPERT && !productExpertId) {
            methods.setError("productExpertId", { message: "Expert is required" });
        }
        handleSetOptions(productType);
    };

    const updateEnrollType = () => {
        const subProductType = methods.getValues("subProductType");
        switch (subProductType) {
            case SubProductType.TRACKPLANPLACEMENT:
                setEnrollType(EnrollType.FOR_PLACEMENT);
                break;
            case SubProductType.TRACKPLANFREE:
                setEnrollType(EnrollType.CAN_ENROLL);
                break;
            case SubProductType.TRACKPLANSUBSCRIPTION:
                setEnrollType(EnrollType.CAN_ENROLL);
                break;
            case SubProductType.TRACKPLANCONTRACT:
                setEnrollType(EnrollType.CAN_ENROLL);
                break;
            case SubProductType.TRACKPLANEVALUATION:
                setEnrollType(EnrollType.MUST_BUY);
                break;
            case SubProductType.EXPERTMEETING:
                setEnrollType(undefined);
                break;
            case SubProductType.EXPERTQUESTION:
                setEnrollType(undefined);
                break;
            case SubProductType.MONTHLYSUBSCRIPTION:
                setEnrollType(undefined);
                break;
            default:
        }
    };

    const onChangeHandlers = {
        active: handleStatusChange,
        productType: () => handleProductTypeChange(),
        subProductType: () => handleSubProductTypeChange(),
        productExpertId: () => handleExpertChange(),
    };

    const handleFieldChildren = () => {
        const fieldchildren = {
            tracks: renderTrackInfo(),
            productExpertId: renderExpertInfo(),
            price: renderShowPrice(),
        };
        setfieldChildren(fieldchildren);
    };

    const setProductDefaults = (data: any = {}) => {
        const defaultData: any = {};
        defaultData.subscriptionproduct = false;
        defaultData.contractProduct = false;
        defaultData.free = false;
        defaultData.evaluation = false;
        defaultData.canBuy = false;
        defaultData.stripeProduct = false;
        defaultData.order = "none";
        return { ...defaultData, ...data };
    };

    const changeName = () => {
        const subProductType = methods.getValues("subProductType");
        const expertId = methods.getValues("productExpertId");
        const expertName = product.expertList?.find((e) => e.value == expertId)
            ?.label;
        const name =
            subProductType == SubProductType.EXPERTMEETING
                ? `${expertName}, Coaching, ${expertName}, Mock Interview`
                : `${expertName}, Response Review`;
        methods.setValue("name", name);
        methods.setValue("displayName", name);
        methods.watch("name");
    };

    const handleSaveProductDetails = () => {
        const errors = methods.errors;
        let data: any = methods.getValues();
        if (Object.keys(errors).length) return;
        switch (data.subProductType) {
            case SubProductType.TRACKPLANPLACEMENT:
                data = { ...data, ...setProductDefaults() };
                break;
            case SubProductType.TRACKPLANFREE:
                data = { ...data, ...setProductDefaults({ free: true }) };
                break;
            case SubProductType.TRACKPLANSUBSCRIPTION:
                data = {
                    ...data,
                    ...setProductDefaults({
                        subscriptionproduct: true,
                        canBuy: true,
                        stripeProduct: true,
                        order: "two",
                    }),
                };
                break;
            case SubProductType.TRACKPLANCONTRACT:
                data = {
                    ...data,
                    ...setProductDefaults({ contractProduct: true, order: "three" }),
                };
                break;
            case SubProductType.TRACKPLANEVALUATION:
                data = {
                    ...data,
                    ...setProductDefaults({
                        evaluation: true,
                        canBuy: true,
                        stripeProduct: true,
                    }),
                };
                break;
            case SubProductType.EXPERTMEETING:
                data = {
                    ...data,
                    ...setProductDefaults({ canBuy: true, stripeProduct: true }),
                };
                break;
            case SubProductType.EXPERTQUESTION:
                data = {
                    ...data,
                    ...setProductDefaults({ canBuy: true, stripeProduct: true }),
                };
                break;
            case SubProductType.MONTHLYSUBSCRIPTION:
                data = {
                    ...data,
                    ...setProductDefaults({
                        subscriptionproduct: true,
                        canBuy: true,
                        stripeProduct: true,
                        recurringPriceType: "month",
                        recurringFrequency: 1,
                    }),
                };
                break;
            default:
                data = { ...data, ...setProductDefaults() };
        }

        const tags: any = productTags?.length > 0 ? productTags : [];
        data.planName =
            data.productType == "trackPlan"
                ? data.subProductType?.split("Plan")[1]
                : data.subProductType?.split("expert")[1];
        data.expert = expert?.expertId;
        data.productExpertId = data.productExpertId || "";
        data.price = data.price || 0;
        data.track = data.tracks?.map((t: any) => t.value) || [""];
        data.tags = tags;
        data.displayName = data.name;
        data.serviceEntities = data.serviceEntities?.map((t: any) => {
            return {
                id: t.value,
                name: t.label,
            };
        });

        if (!isNumeric(params.id)) {
            updateProduct({
                id: product.editProduct.id,
                serviceType: data.serviceType,
                serviceEntities: data.serviceEntities,
                name: data.name,
                displayName: data.name,
                displayDescription: data.displayDescription,
                planName: data.planName,
                followUp: data.followUp ?? "",
                nextStep: data.nextStep ?? "",
                description: data.description,
                track: data.track,
                active: data.active == "1",
                tags: tags,
            });
        } else {
            data.active = data.active === "1";
            createProducts(data);
        }
    };

    return (
        <div>
            {product.loading && (
                <BeatLoader
                    css={LoaderStyles}
                    color={"#0000FF"}
                    loading={product.loading}
                ></BeatLoader>
            )}
            <FormProvider {...methods}>
                <Form>
                    <Row className="align-items-center m-0">
                        <Col xs={12} lg={8} md={8}>
                            <Row className="align-items-center">
                                <div className="m-3">
                                    <Heading>
                                        {!isNumeric(params.id) ? "Edit Product" : "Add Product"}
                                    </Heading>
                                </div>
                            </Row>
                        </Col>
                        <Col className="text-right">
                            <DisableButton
                                style={{ marginRight: ".5rem" }}
                                type="button"
                                onClick={() => goBack()}
                            >
                                {"Cancel"}
                            </DisableButton>
                            <AddButton
                                style={{ marginRight: ".5rem" }}
                                type="button"
                                onClick={handleSaveProductDetails}
                            >
                                {"Save"}
                            </AddButton>
                        </Col>
                    </Row>
                    <Col>
                        <AdvancedForm
                            hideFooter={true}
                            defaultValue={defaultValue}
                            type={type}
                            localization={localization}
                            fieldsize={fieldSize}
                            placeholder={placeholder}
                            advanceFormFieldChildren={fieldChildren}
                            onChangeHandlers={onChangeHandlers}
                            hiddenFields={hiddenValues}
                            disabledFields={disabledValues}
                            options={options}
                        ></AdvancedForm>
                    </Col>
                    <Col>
                        <ProductTagComponent
                            productTags={productTags}
                            setProductTags={setProductTags}
                            tagList={product.tagsList} />
                    </Col>
                </Form>
            </FormProvider>
            {!hiddenValues?.schedule && !isNumeric(params.id) && (
                <ClassInfoComponent />
            )}
            {showExpertModal && (
                <ModalComponent
                    showCloseIcon={true}
                    handleClose={() => setShowExpertModal(false)}
                    header={"Saved Response"}
                    show={showExpertModal}
                    width={"500px"}
                    body={JSON.stringify(product.savedResponse).replaceAll(",", "\n,")}
                ></ModalComponent>
            )}
            {showProductModal && (
                <ModalComponent
                    showCloseIcon={true}
                    handleClose={() => setShowProductModal(false)}
                    header={"Products"}
                    show={showProductModal}
                    width={"500px"}
                >
                    <ProductListContainer productList={product?.productList || []} />
                </ModalComponent>
            )}
            {showExpertMeetings && (
                <ModalComponent
                    show={showExpertMeetings}
                    handleClose={() => setShowExpertMeeting(false)}
                    showCloseIcon={true}
                    header={"Are you sure?"}
                    footer={
                        <SearchButton
                            style={{ padding: "10px" }}
                            onClick={() => setShowExpertMeeting(false)}
                            type="button"
                        >
                            {"Ok"}
                        </SearchButton>
                    }
                >
                    <ExpertMeetingContainer expertMeetings={product.expertMeetings} />
                </ModalComponent>
            )}
        </div>
    );
};

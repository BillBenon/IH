import { DropdownIcon } from 'components/DropdownIcon';
import { DropupIcon } from 'components/DropupIcon';
import { Heading2 } from 'components/Heading2';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { Col, Collapse, Row } from 'react-bootstrap';
import { ChevronLeft } from '@styled-icons/boxicons-regular';
import { IconContainer } from 'components/IconContainer';
import { BoldSpan } from 'components/CommonStyles';

const useForceUpdate = () => useState()[1];

export const TrackRefreshModal = forwardRef(({ trackDetails, updatedTrackDetails }: any, ref) => {
    const forceUpdate = useForceUpdate();
    const [expandtrack, setexpandtrack] = useState<boolean>(true);
    const [expandProduct, setExpandProduct] = useState<any>({});
    const [expandProducts, setExpandProducts] = useState<boolean>(false);
    const trackTempDetails = { ...trackDetails };

    const borderTop = { borderTop: '1px solid rgba(91, 148, 227, 0.2)' };

    useImperativeHandle(ref, () => ({
        save() {
            trackTempDetails.productInfo.values = trackTempDetails?.productInfo?.values?.filter((val: any) => Object.keys(val).length > 2);
            return trackTempDetails;
        },
    }));


    useEffect(() => {
        if (trackTempDetails?.productInfo?.values?.length > updatedTrackDetails?.productInfo?.values?.length) {
            const diff = (trackTempDetails?.productInfo?.values?.length - updatedTrackDetails?.productInfo?.values?.length);
            for (let i = 0; i < diff; i++) {
                updatedTrackDetails?.productInfo?.values.push({ visible: true, productId: trackTempDetails?.productInfo?.values[updatedTrackDetails?.productInfo?.values.length].productId });
            }
            return;
        }
        if (trackTempDetails?.productInfo?.values?.length < updatedTrackDetails?.productInfo?.values?.length) {
            const diff = (updatedTrackDetails?.productInfo?.values?.length - trackTempDetails?.productInfo?.values?.length);
            for (let i = 0; i < diff; i++) {
                trackTempDetails?.productInfo?.values.push({ visible: true, productId: updatedTrackDetails?.productInfo?.values[trackTempDetails?.productInfo?.values.length].productId });
            }
            return;
        }
    }, [updatedTrackDetails])

    return (
        <div>
            <div className="d-flex align-items-center justify-content-around m-0 pt-3" style={borderTop} >
                <div className="h4">{'Existing Data'}</div>
                <div className="h4">{'Data after Refresh'}</div>
            </div>
            <Row className="mx-2">
                <Col className="p-0 d-flex align-items-center">
                    <Heading2>{'Track Details'}</Heading2>
                    {expandtrack && (
                        <DropupIcon onClick={() => setexpandtrack(!expandtrack)} />
                    )}
                    {!expandtrack && (
                        <DropdownIcon
                            onClick={() => setexpandtrack(!expandtrack)}
                        />
                    )}
                </Col>
            </Row>
            <Collapse in={expandtrack}>
                <div className="mx-3">
                    <BoldSpan>{'Title'}</BoldSpan>
                    <Row className="align-items-center">
                        <Col className="card m-2 p-1">{trackTempDetails?.title.value}</Col>
                        <IconContainer
                            color={trackTempDetails?.title?.value == updatedTrackDetails?.title.value && "#ccc"}
                            onClick={(event: any) => { trackTempDetails.title.value = updatedTrackDetails?.title.value; forceUpdate(event) }}
                            icon={ChevronLeft}
                        />
                        <Col className="card m-2 p-1">{updatedTrackDetails?.title.value}</Col>
                    </Row>
                    <BoldSpan>{'Description'}</BoldSpan>
                    <Row className="align-items-center">
                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: trackTempDetails?.description.value }}></Col>
                        <IconContainer
                            color={trackTempDetails?.description?.value == updatedTrackDetails?.description.value && "#ccc"}
                            onClick={(event: any) => { trackTempDetails.description.value = updatedTrackDetails?.description.value; forceUpdate(event) }}
                            icon={ChevronLeft}
                        />
                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: updatedTrackDetails?.description.value }}></Col>
                    </Row>
                    <BoldSpan>{'Detailed Description'}</BoldSpan>
                    <Row className="align-items-center">
                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: trackTempDetails?.detailsDescription.value }}></Col>
                        <IconContainer
                            color={trackTempDetails?.detailsDescription?.value == updatedTrackDetails?.detailsDescription.value && "#ccc"}
                            onClick={(event: any) => { trackTempDetails.detailsDescription.value = updatedTrackDetails?.detailsDescription.value; forceUpdate(event) }}
                            icon={ChevronLeft}
                        />
                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: updatedTrackDetails?.detailsDescription.value }}></Col>
                    </Row>
                    <BoldSpan>{'Logo'}</BoldSpan>
                    <Row className="align-items-center">
                        <Col className="card m-2 p-1">{trackTempDetails?.logo.value ? <img height={"50px"} width={"50px"} src={trackTempDetails.logo.value} /> : 'No Logo'}</Col>
                        <IconContainer
                            color={trackTempDetails?.logo?.value == updatedTrackDetails?.logo.value && "#ccc"}
                            onClick={(event: any) => { trackTempDetails?.logo?.value == updatedTrackDetails?.logo.value; forceUpdate(event) }}
                            icon={ChevronLeft}
                        />
                        <Col className="card m-2 p-1">{updatedTrackDetails?.logo.value ? <img height={"50px"} width={"50px"} src={updatedTrackDetails.logo.value} /> : 'No Logo'}</Col>
                    </Row>
                    <BoldSpan>{'Tags'}</BoldSpan>
                    <Row className="align-items-center">
                        {!trackTempDetails?.tags?.length && <Col className="card m-2 p-1" >{'No Tags'}</Col>}
                        {trackTempDetails?.tags?.values > 0 && <Col className="card m-2 p-1">
                            {trackTempDetails?.tags?.values?.map((tag: any, inx: number) =>
                                <Col key={'source' + inx} className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: tag }}></Col>)}
                        </Col>}
                        <IconContainer
                            color={trackTempDetails?.tags?.values?.join() == updatedTrackDetails?.tags?.values?.join() && "#ccc"}
                            onClick={(event: any) => { trackTempDetails.tags.values = updatedTrackDetails?.tags?.values; forceUpdate(event) }}
                            icon={ChevronLeft}
                        />
                        {!updatedTrackDetails?.tags?.values?.length && <Col className="card m-2 p-1" >{'No Tags'}</Col>}
                        {updatedTrackDetails?.tags?.values?.length > 0 && <Col className="card m-2 p-1">
                            {updatedTrackDetails?.tags?.values?.map((tag: any, inx: number) =>
                                <Col key={'dest' + inx} className="card m-2 p-1">{updatedTrackDetails?.tags?.values[inx]}</Col>)}
                        </Col>}
                    </Row>
                </div>
            </Collapse>
            <Row className="m-0" style={borderTop}>
                <Col className="p-0 d-flex align-items-center">
                    <Heading2>{'Product Details'}</Heading2>
                    {expandProducts && (
                        <DropupIcon onClick={() => setExpandProducts(!expandProducts)} />
                    )}
                    {!expandProducts && (
                        <DropdownIcon
                            onClick={() => setExpandProducts(!expandProducts)}
                        />
                    )}
                </Col>
            </Row>
            <Collapse in={expandProducts}>
                <div className="mx-3">
                    {trackTempDetails?.productInfo?.values?.map((product: any, index: number) =>
                        <div key={index}>
                            <Row className="m-0">
                                <Col className="p-0 d-flex align-items-center">
                                    <Heading2>{product?.planName?.value || 'Plan Name ' + (index + 1)}</Heading2>
                                    {expandProduct[index] && (
                                        <DropupIcon onClick={() => setExpandProduct({ ...expandProduct, [index]: false })} />
                                    )}
                                    {!expandProduct[index] && (
                                        <DropdownIcon
                                            onClick={() => setExpandProduct({ ...expandProduct, [index]: true })}
                                        />
                                    )}
                                </Col>
                            </Row>
                            <Collapse in={expandProduct[index]}>
                                <div className="mx-3">
                                    <BoldSpan>{'Plan Name'}</BoldSpan>
                                    <Row className="align-items-center">
                                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: trackTempDetails?.productInfo?.values[index]?.planName?.value || 'No Data' }}></Col>
                                        <IconContainer
                                            color={product?.planName?.value == updatedTrackDetails?.productInfo?.values[index]?.planName?.value && "#ccc"}
                                            onClick={(event: any) => {
                                                if (!product.planName) product.planName = { visible: true, };
                                                product.planName.value = updatedTrackDetails?.productInfo?.values[index]?.planName?.value;
                                                forceUpdate(event);
                                            }}
                                            icon={ChevronLeft}
                                        />
                                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: updatedTrackDetails?.productInfo?.values[index]?.name?.value || 'No Data' }}></Col>
                                    </Row>
                                    <BoldSpan>{'Name'}</BoldSpan>
                                    <Row className="align-items-center">
                                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: trackTempDetails?.productInfo?.values[index]?.name?.value || 'No Data' }}></Col>
                                        <IconContainer
                                            color={product?.name?.value == updatedTrackDetails?.productInfo?.values[index]?.name?.value && "#ccc"}
                                            onClick={(event: any) => {
                                                if (!product.name) product.name = { visible: true, };
                                                product.name.value = updatedTrackDetails?.productInfo?.values[index]?.name?.value;
                                                forceUpdate(event);
                                            }}
                                            icon={ChevronLeft}
                                        />
                                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: updatedTrackDetails?.productInfo?.values[index]?.name?.value || 'No Data' }}></Col>
                                    </Row>
                                    <BoldSpan>{'Display Name'}</BoldSpan>
                                    <Row className="align-items-center">
                                        <Col className="card m-2 p-1">{product?.displayName?.value || 'No Data'}</Col>
                                        <IconContainer
                                            color={product?.displayName?.value == updatedTrackDetails?.productInfo?.values[index]?.displayName?.value && "#ccc"}
                                            onClick={(event: any) => {
                                                if (!product.displayName) product.displayName = { visible: true, };
                                                product.displayName.value = updatedTrackDetails?.productInfo?.values[index]?.displayName?.value;
                                                forceUpdate(event);
                                            }}
                                            icon={ChevronLeft}
                                        />
                                        <Col className="card m-2 p-1">{updatedTrackDetails?.productInfo?.values[index]?.displayName?.value}</Col>
                                    </Row>
                                    <BoldSpan>{'Description'}</BoldSpan>
                                    <Row className="align-items-center">
                                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: product?.description?.value || 'No Data' }}></Col>
                                        <IconContainer
                                            color={product?.description?.value == updatedTrackDetails?.productInfo?.values[index]?.description?.value && "#ccc"}
                                            onClick={(event: any) => {
                                                if (!product.description) product.description = { visible: true, };
                                                product.description.value = updatedTrackDetails?.productInfo?.values[index]?.description.value;
                                                forceUpdate(event);
                                            }}
                                            icon={ChevronLeft}
                                        />
                                        <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: updatedTrackDetails?.productInfo?.values[index]?.description?.value }}></Col>
                                    </Row>
                                    <>
                                        <Row className="m-0">
                                            <Col className="p-0 d-flex align-items-center">
                                                <BoldSpan>{'Key Points'}</BoldSpan>
                                                {expandProduct["point" + index] && (
                                                    <DropupIcon onClick={() => setExpandProduct({ ...expandProduct, ["point" + index]: false })} />
                                                )}
                                                {!expandProduct["point" + index] && (
                                                    <DropdownIcon
                                                        onClick={() => setExpandProduct({ ...expandProduct, ["point" + index]: true })}
                                                    />
                                                )}
                                            </Col>
                                        </Row>
                                        <Collapse in={expandProduct["point" + index]}>
                                            <div className="mx-3">
                                                {product?.displayDescription?.values?.map((point: any, inx: number) => <Row className="align-items-center" key={index + "" + inx}>
                                                    <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: point?.value }}></Col>
                                                    <IconContainer
                                                        color={point?.value == updatedTrackDetails?.productInfo?.values[index]?.displayDescription?.values[inx]?.value && "#ccc"}
                                                        onClick={() => { point.value = updatedTrackDetails?.productInfo?.values[index]?.displayDescription?.values[inx]?.value }}
                                                        icon={ChevronLeft}
                                                    />
                                                    <Col className="card m-2 p-1" dangerouslySetInnerHTML={{ __html: updatedTrackDetails?.productInfo?.values[index]?.displayDescription?.values[inx]?.value }}></Col>
                                                </Row>)}
                                            </div>
                                        </Collapse>
                                    </>
                                </div>
                            </Collapse>
                        </div>
                    )}
                </div>
            </Collapse>
        </div>
    )
})

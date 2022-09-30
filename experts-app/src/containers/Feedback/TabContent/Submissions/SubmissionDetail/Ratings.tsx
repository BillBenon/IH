import 'rc-tooltip/assets/bootstrap.css';

import Slider from 'rc-slider';
import React, { useEffect } from 'react';
import { Col, Collapse, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';

import { handle } from './SliderTooltipHander';
import { EvalInprogressDot, InformationCircleIcon, PencilIcon, RowHeader, SliderHeading } from './SubmissionDetail.styles';
import useSubmissionDetail from './SubmissionDetail.utils';
import RichTextEditor from '../../../../../components/Common/Editors/RichTextEditor';

export const RatingComponent: React.FC<any> = (props) => {
    const [{ handleExpandedEval, invalidSubmission }] = useSubmissionDetail();

    const handleSliderChangeEvent = (changeEvent: number) => {
        if (changeEvent >= 0 || changeEvent === -10) props.setValue(changeEvent);
    }

    const commentChangeHandler = (value: string) => {
        props.setComment(value);
    }

    return (<Col xs={12} md={12} lg={12}>
        <Col xs={12} md={12} lg={12}>
            <Row>
                <RowHeader className="ml-3">
                    <SliderHeading>{props.evalText}
                        <OverlayTrigger
                            key={"top"}
                            placement={"top"}
                            overlay={
                                <Tooltip id={props.evalId}>
                                    {props.hint}
                                </Tooltip>
                            }
                        >
                            <InformationCircleIcon className="ml-1 mb-1" />
                        </OverlayTrigger>
                    </SliderHeading>
                </RowHeader>
            </Row>
            <Row style={{ width: '40em' }}>
                <Col>
                    <Row>
                        <Slider
                            disabled={!props.editable}
                            handle={handle}
                            className={'ml-5 mb-5 mt-2'}
                            defaultValue={0}
                            value={props.value ?? -10}
                            startPoint={-10}
                            min={-10}
                            max={10}
                            trackStyle={{ backgroundColor: '#5B94E3', border: '#5B94E3' }}
                            dotStyle={{ backgroundColor: '#5B94E3', border: '#5B94E3' }}
                            activeDotStyle={{ backgroundColor: '#5B94E3', border: '#5B94E3' }}
                            handleStyle={{ backgroundColor: '#5B94E3', border: '#5B94E3', boxShadow: 'none' }}
                            marks={{
                                "-10": {
                                    style: {
                                        color: isNaN(props.value) || props.value == -10 ? '#5B94E3' : 'rgba(22, 22, 22, 0.6)',
                                        display: 'contents',
                                        fontSize: '14px',
                                    },
                                    label: 'No Evaluation'
                                },
                                0: {
                                    style: {
                                        color: props.value == 0 ? '#5B94E3' : 'rgba(22, 22, 22, 0.6)',
                                        fontSize: '14px'
                                    },
                                    label: '0'
                                },
                                10: {
                                    style: {
                                        color: props.value == 10 ? '#5B94E3' : 'rgba(22, 22, 22, 0.6)',
                                        fontSize: '14px'
                                    },
                                    label: '10'
                                }
                            }}
                            onChange={(data: number) => props.editable && handleSliderChangeEvent(data)}
                        />
                    </Row>
                </Col>
                <Col className="ml-2 d-flex justify-content-start">
                    <>
                        <PencilIcon onClick={() => props.value != -10 && (props.onExpandEval ? props.onExpandEval(props.capabilityId, props.evalId, !props.isActive) : handleExpandedEval(props.capabilityId, props.evalId, !props.isActive))} theme={{ color: (isNaN(props.value) || props.value == -10 || (!props.editable && !props.commentValue)) ? '#737373' : '#5B94E3' }} />
                        {!!props.commentValue && <EvalInprogressDot />}
                    </>
                    {invalidSubmission[props.questionAnswerId]?.eval?.includes(props.evalId) && <small className="text-danger small pl-2">{'Comment Required'}</small>}
                </Col>
            </Row>
            <Row>
                <Col xs={10} md={10} lg={10}>
                    <Collapse in={props.isActive}>
                        <Form>
                            <Form.Group controlId={"comment" + Math.random()}>
                                <RichTextEditor
                                    placeholder={'Add Comment'}
                                    onChange={(data: string) => props.editable && commentChangeHandler(data)}
                                    disabled={!props.editable || (isNaN(props.value) || props.value == -10)}
                                    id={`eval-${props.evalId}`}
                                    value={props.commentValue}
                                    customStyles={{ height: '70px', borderBottom: invalidSubmission[props.questionAnswerId]?.eval?.includes(props.evalId) ? '1px solid red' : '1px solid #8D8D8D' }} />
                            </Form.Group>
                        </Form>
                    </Collapse>
                </Col>
            </Row>
        </Col>
    </Col>)
}
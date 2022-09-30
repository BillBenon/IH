import Modal from 'react-modal';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import React, { useEffect, useRef, useState } from 'react';
import { Button, IconButton, Link } from '@material-ui/core';
import { Attachment } from '@styled-icons/entypo/Attachment';
import { Accordion, Col, Collapse, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import styled from 'styled-components';
import ReactTooltip from 'react-tooltip';
import AccordionToggle from '../../../../../components/Common/AccordionToggleHook';
import { AppLink } from '../../../../../components/Common/AppLink';
import RichTextEditor from '../../../../../components/Common/Editors/RichTextEditor';
import SketchingEditor from '../../../../../components/Common/Editors/SketchingEditor';
import { ModalComponent } from '../../../../../components/Modals/Modal';
import { submissionService } from '../../../../../services/submission';
import { ButtonTypes, DEFAULT_TOKEN } from '../../../../../utilities/constants';
import { SmallSpan, Subheader } from '../Submissions.styles';
import { Guidelines } from './Guidellnes';
import { Eval, EvaluatedCapability, EvaluatedCapabilityWithActive, IGetSketchUserAnswer, SaveFeedbackInput } from './ISubmissionDetail';
import { RatingComponent } from './Ratings';
import { DropdownIcon, DropupIcon, InnerSpan, SubmissionHeader } from './SubmissionDetail.styles';
import useSubmissionDetail from './SubmissionDetail.utils';
import { getModalDefaultSettings } from '../../../../../utilities';
import useSubmissions from '../Submissions.utils';
import { useLoader } from '../../../../../context/loaderContext';
import { useMessagePopup } from '../../../../../context/messagePopContext';
import { saveFeedback } from '../../../../../actions/expert/query/submission/submissionActions';
import useQueryFilters from '../../TabContent.utils';
import { DefaultToastSettings } from '../../../../../utilities/defaults';

const StyledRichTextEditor = styled.div`
    position: relative;
    .attachment{
        position: absolute;
        right: 0.75em;
        bottom: 0.75em;
        :focus{
            outline: 0 !important;
        }
    }
`
const StyledAttachmentIcon = styled(Attachment) <{ isSketchAvailable: boolean }>`
  color: ${(props: any) => props.isSketchAvailable ? '#5B94E3' : 'grey'};
  width: 24px;
  transform: rotate(315deg);
`

const StyledSketchModal = styled.div`
  width: 100%;
  .copyPreviewSec{
    float: right;
    display: flex;
    div, .apply_btn{
      margin-left: 10px;
      &:focus{
        outline: none !important;
      }
    }
    a{
      position: absolute;
      display: block;
      font-size: 12px;
      text-decoration: underline;
      color: #5b94e3;
      cursor: pointer;
    }
    button:disabled{
      background-color: grey;
      color: white;
      &:hover{
        background-color: grey;
        color: white;
      }
    }
    .apply_btn {
      background-color: white;
      border-radius: 20px;
      border: 1px solid;
      color: #5b94e3;
      width: 60px;
      height: 25px;
      padding: 0;
      font-size: 15px;
      &:hover{
        background: #5b94e3;
        color: white;
      }
  }

`

const modalStyles : Modal.Styles = {
    ...getModalDefaultSettings('80%'),
    content: {
        ...getModalDefaultSettings('80%').content,
        height: '80%',
        padding: '10px',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column'
    }
}

export const FeedbackComponent: React.FC<any> = (props) => {
    const dispatch = useDispatch()
    const { sketchAvailable,
        candidateTrackId,
        _id: feedbackId,
        questionId,
        questionAnswerId,
        expertId,
        editable,
        sketchData,
        historySketchData } = props
    const [{
        unsetInvalidSubmission,
        invalidSubmission,
        getExpertByExpertId,
        expert,
        updateCommentValue,
        handleSaveFeedback,
        updateSliderValue,
        updateTextareaValue,
        updateSketchValue,
        handleExpandedEvaluationCapability,
    }] = useSubmissionDetail();
    const Loader = useLoader()
    const [{ setQuery }] = useQueryFilters()
    const [{ getQuesDetailsByQuestionId }] = useSubmissions();
    const questionDetails = getQuesDetailsByQuestionId(questionId)
    const messagePop = useMessagePopup()
    const [showSketchModal, setshowSketchModal] = useState(false)
    const [previewModal, setPreviewModal] = useState(false)
    const [copyDataFrom, setCopyDataFrom] = useState<any>();
    const [isupdating, setIsUpdating] = useState(false);
    const [viewGuidelines, setViewGuidelines] = useState(false);

    const debouncedSave = useRef(debounce(async (nextValue: SaveFeedbackInput) => {
    const res: any = await  dispatch(saveFeedback({ ...nextValue, token: DEFAULT_TOKEN, feedbackId: nextValue._id }));
        if(res.type.includes('fulfilled') && res.payload?.output?.isAnswerUpdated){
            toast.error(res.payload.apiMessage, DefaultToastSettings)
            setQuery(ButtonTypes.NEW())
        }
    }, 1000)).current;

    const handleSliderChange = (value: number, capabilityId: string, evalId: string) => {
        const { value: nextValue } = { value };
        if (props.handleSliderChange) {
            props.handleSliderChange(nextValue, capabilityId, evalId);
        } else {
            setIsUpdating(true);
            updateSliderValue(nextValue, capabilityId, evalId);
            unsetInvalidSubmission();
        }
    }

    const handleCommentChange = (value: string, capabilityId: string, evalId: string) => {
        const { value: nextValue } = { value };
        if (props.handleCommentChange) {
            props.handleCommentChange(nextValue, capabilityId, evalId);
        } else {
            setIsUpdating(true);
            updateCommentValue(nextValue, capabilityId, evalId)
            unsetInvalidSubmission();
        }
    }

    const getQuillContent = (str: string) => str.replace(/<(.|\n)*?>/g, '').trim()

    const handleTextareaChange = (value: string) => {
        if (getQuillContent(value) !== '') {
            if (props.handleFeedbackchange) {
                props.handleFeedbackchange(value);
            } else {
                setIsUpdating(true);
                updateTextareaValue(value);
                unsetInvalidSubmission();
            }
        }
    }

    useEffect(() => {
        if (props && isupdating) {
            debouncedSave(props);
            setIsUpdating(false);
        }
    }, [props])

    const getSketch = (getSketchParams = {}) => {
        Loader.showLoader();
        if((getSketchParams as any)?.capabilityIds){
            return submissionService.getUserSketch({
                candidateTrackId,
                questionAnswerId,
                questionId,
                token:DEFAULT_TOKEN,
                expertId,
                ...getSketchParams,
            } as IGetSketchUserAnswer)
            .finally(() => Loader.hideLoader())
        }
        return submissionService.getExpertSketch({
            candidateTrackId,
            expertId,
            feedbackId,
            questionAnswerId,
            questionId,
            token:DEFAULT_TOKEN,
            ...getSketchParams,
        }).finally(() => Loader.hideLoader())
    }

    const saveExpertSketch = (sketchData: string) => {
        Loader.showLoader()
        return submissionService.addExpertSketch({
            candidateTrackId,
            expertId,
            feedbackId,
            questionAnswerId,
            questionId,
            sketchData,
            token:DEFAULT_TOKEN
        }).then((res) => { 
            if(res.output?.isAnswerUpdated){
                toast.error(res.apiMessage, DefaultToastSettings)
                closeModal()
                setQuery(ButtonTypes.NEW())
            }
            else{
                updateSketchValue(sketchData)
            }
         })
        .finally(() => Loader.hideLoader())
    }

    const closeModal = () => setshowSketchModal(false)

    const handleCopySketchDropdown = (e: any) => e.target.value ? setCopyDataFrom(JSON.parse(e.target.value)) : setCopyDataFrom(null)

    const handleSketchPreview = (e: any) => {
        e.preventDefault();
        setPreviewModal(true)
    }

    const copyDataToCurrent = () => {
        messagePop.confirm(`Your current diagram will be overwritten by ${copyDataFrom?.name}. Do you want to proceed ?`, (res) => {
            if (res)
                getSketch(copyDataFrom?.value).then((res: any) => {
                    saveExpertSketch(res?.output?.sketchData)
                        .finally(() => setCopyDataFrom(''))
                })
        })
    }

    return (<>
            <SubmissionHeader>
                <>
                    {props.editable ? 'Give Feedback' : 'Feedback'}
                </>
            {!!props.expertId && <Subheader>
                {'by ' + (props.expertId === expert.expertId ? 'you' : getExpertByExpertId(props.expertId, props.questionAnswerId))}
            </Subheader>}
                {invalidSubmission[props.questionAnswerId]?.feedback?.includes(props.questionAnswerId) && <small className="text-danger small pl-3">{'Feedback Required'}</small>}
                <SmallSpan className="pr-0">
                    {props.editable ?
                        <AppLink onClick={() => setViewGuidelines(true)} variant="link">{'View Guidelines'}</AppLink> :
                        <Moment format="MMM DD,YYYY" style={{ paddingRight: "0.75rem" }}>
                            {props.createdAt}
                        </Moment>}
                </SmallSpan>
            </SubmissionHeader>
            
        <StyledRichTextEditor>
            <RichTextEditor
                value={props.feedback || props.placeholder}
                disabled={!props.editable}
                onChange={(data: string) => props.editable && handleTextareaChange(data)}
                id={props.questionId}
                placeholder={props.placeholder || 'Enter your feedback here...'}
            />
            {(sketchAvailable || editable) && <IconButton
                className={'attachment'}
                data-tip="System Design"
                data-for="expertsketch"
                onClick={() => setshowSketchModal(true)}>
                <ReactTooltip id="expertsketch" type="dark" />
                <StyledAttachmentIcon
                    isSketchAvailable={sketchAvailable || false} />
            </IconButton>}
        </StyledRichTextEditor>
            <Accordion defaultActiveKey={props.questionAnswerId}>
                <SubmissionHeader>
                    <>
                        {'Evaluation Metrics'}
                    </>
                    <AccordionToggle eventKey={props.questionAnswerId} />
                </SubmissionHeader>
                <Accordion.Collapse eventKey={props.questionAnswerId}>
                <>
                        {props.evaluatedCapabilities?.map((capability: EvaluatedCapabilityWithActive, i: number) =>
                            <Row key={capability.capabilityId + i}>
                                {!!props.getCapabilityByCapabilityId && <Col xs={12} md={12} lg={12} className="m-3">
                                    <InnerSpan>{props.getCapabilityByCapabilityId(capability.capabilityId)?.name}</InnerSpan>
                                    {capability.isActive && <DropupIcon onClick={() => handleExpandedEvaluationCapability(capability.capabilityId, false)} />}
                                    {!capability.isActive && <DropdownIcon onClick={() => handleExpandedEvaluationCapability(capability.capabilityId, true)} />}
                                </Col>}
                                <Collapse in={capability.isActive}>
                                    <div>
                                        {capability.evals?.map((evaluation: Eval, ei: number) =>
                                            <RatingComponent
                                                editable={props.editable}
                                                key={evaluation.evalId + ei}
                                                setValue={(val: number) => handleSliderChange(val, capability.capabilityId, evaluation.evalId)}
                                                setComment={(val: string) => handleCommentChange(val, capability.capabilityId, evaluation.evalId)}
                                                commentValue={props?.evaluatedCapabilities
                                                    .find((cap: EvaluatedCapability) => cap.capabilityId === capability.capabilityId)?.evals
                                                    .find((e: Eval) => e.evalId === evaluation.evalId)?.evalTextFeedback}
                                                value={props?.evaluatedCapabilities
                                                    .find((cap: EvaluatedCapability) => cap.capabilityId === capability.capabilityId)?.evals
                                                    .find((e: Eval) => e.evalId === evaluation.evalId)?.evalMetricsFeedbackValue ?? -10}
                                                {...evaluation}
                                                questionAnswerId={props.questionAnswerId}
                                                capabilityId={capability.capabilityId}
                                                onExpandEval={props.onExpandEval}
                                            />
                                        )}
                                    </div>
                                </Collapse>
                            </Row>)}
                    </>
                </Accordion.Collapse>
            </Accordion>
            <ModalComponent
                handleClose={() => setViewGuidelines(false)}
                show={viewGuidelines}
                showCloseIcon={true}
                header={'Guidelines'}
            >
                <Guidelines
                    capabilities={props.evaluatedCapabilities.map((cap: EvaluatedCapability) => {
                        return {
                            id: cap.capabilityId,
                            name: (props.getCapabilityByCapabilityId && props.getCapabilityByCapabilityId(cap.capabilityId))?.name || "",
                            hints: cap.evals.map((ev: Eval) => ev.hint)
                        }
                    })}
                />
            </ModalComponent>
        
        
        {/* modal for sketch */}
        <Modal
            ariaHideApp={false}
            isOpen={showSketchModal}
            style={modalStyles}>
            <StyledSketchModal>
                <span>Q: {questionDetails?.name}</span>
                {editable && historySketchData.length > 0 && (<>
                    <span className='copyPreviewSec'>
                    Copy design from:
                        <div>
                            <select defaultValue='' value={JSON.stringify(copyDataFrom) || ''} onChange={handleCopySketchDropdown}>
                                <option value=''>Please select a version</option>
                                {historySketchData?.map((sketch: any) => <option key={sketch.name} value={JSON.stringify(sketch)}>{sketch.name}</option>)}
                            </select>

                            {copyDataFrom?.name && <Link onClick={handleSketchPreview}>Preview</Link>}
                        </div>
                        <Button disabled={!copyDataFrom?.name} className='apply_btn' onClick={copyDataToCurrent}>Apply</Button>
                    </span>
                </>)}
            </StyledSketchModal>
            <SketchingEditor
                id='expertSketch'
                isSketchAvailable={sketchAvailable}
                getSketch={getSketch}
                sketchData={sketchData}
                handleSketchSave={saveExpertSketch}
                disabled={!editable}
                CloseModal={closeModal}/>
        </Modal>
        <Modal
            ariaHideApp={false}
            isOpen={previewModal}
            style={modalStyles}>
        <div>Preview of {copyDataFrom?.name}</div>
            <SketchingEditor
                id='previewSketch'
                disabled={true}
                isSketchAvailable={true}
                getSketch={() => getSketch(copyDataFrom?.value)}
                CloseModal={() => setPreviewModal(false)}/>
        </Modal>
        </>
    )
}
import { IconButton, Link } from '@material-ui/core';
import { Attachment } from '@styled-icons/entypo/Attachment';
import useStateRefInSync from 'components/Common/customHooks/useStateRefInSync';
import CodeEditor from 'components/Common/Editors/CodeEditor';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import SketchingEditor from 'components/Common/Editors/SketchingEditor';
import _ from 'lodash';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { saveCandidateLastActivity } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { IAddSketchAnswer, IGetSketchExpertAnswer, ISaveResponseForQuestionOfCandidateTracks as IPayload } from 'types';
import { answerType, DEFAULT_TOKEN, Expert_Login, genAutoSaving, languages, placementAutoSaveTime, QUESTION_STATUS_TEXT, TrackEnrollType } from 'utilities/constants';
import { getEnrollmentType, getModalDefaultSettings, getQuillContent, getSketchDataCopyFromArray, usePrevious } from 'utilities/helperFunctions';

import { Paint } from "@styled-icons/boxicons-regular/Paint";
import { SettingsVoice } from "@styled-icons/material-sharp/SettingsVoice";
import { RecordVoiceOver } from "@styled-icons/material-sharp/RecordVoiceOver";
import { Button } from 'components/Common/Button';
import { IconContainer } from 'components/Common/IconContainer';
import { ModalComponent } from 'components/Common/Modal/Modal';
import { AttachmentPickerObject, AttachmentsList } from 'components/Uploader/AttachmentsList';
import { AwsUploader } from 'components/Uploader/AwsUploader';
import { useLoader } from 'context/loaderDots';
import { useMessagePopup } from 'context/messagePopup';
import 'react-tabs/style/react-tabs.css';
import ReactTooltip from 'react-tooltip';
import { evaluationPlatformService } from 'services';
import { VoiceRecorderModal } from './VoiceRecorderModal';
import { getFolderPathAfterDomainName } from 'utilities/commonUtils';

const AnswerContainer = styled.div`
  width: 100%;
  height: auto;
  transition: 1s;
  position: relative;
  .sketch{
    z-index: 2;
    position: absolute;
    right: ${(props: any) =>`${props.theme.recordingOn ? '7.5em' : '4.75em'}`};
    bottom: 0.75em;
    :focus{
        outline: 0 !important;
      }
  }
  .attachment{
    z-index: 2;
    position: absolute;
    right: ${(props: any) =>`${props.theme.recordingOn ? '5.5em' : '2.75em'}`};
    bottom: 0.75em;
    :focus{
        outline: 0 !important;
      }
  }
  .audioRecorder {
    z-index: 2;
    position: absolute;
    right: 0.75em;
    bottom: 0.75em;
    :focus{
        outline: 0 !important;
    }
  }
  .action-icon {
    width: 25px;
  }
  .action-icon svg {
    width: 100%;
    height: 100%;
    color: #e33271;
  }
  .disabled {
    cursor: not-allowed !important;
  }
  .react-tabs{
    border-top-right-radius: 0.75rem;
    border-top-left-radius: 0.75rem;
  }
  .react-tabs__tab-list{
    margin: 0;
    border-top-right-radius: inherit;
    border-top-left-radius: inherit;
    text-align: left;
    box-shadow: 0px -2px 8px 0 rgba(0,0,0,0.25);
  }
  .react-tabs__tab-panel{
    textarea{
      box-shadow: 0px 0px 10px rgba(0,0,0,0.25) !important;
    }
  }
  .react-tabs__tab{
    top: 0;
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    bottom: 0;
    div{
      display: flex;
    }
    select{
      height: 0px;
      width: 0px;
      border: 0px;
      background: center;
      padding-top: 15px;
      &:focus {
        box-shadow: none;
      }
    }
  }
  .react-tabs__tab--selected{
    color: white;
    background-color: #5b94e3;
  }
  .function__icons {
    right: 16px;
    position: absolute;
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    justify-content: space-between;
    align-items: center;
    padding-top: 19px;
    padding-bottom: 19px;
  }
  .function__icons img {
    cursor: pointer;
    transform: ${(props: any) => (props.isMaximizeContent ? 'rotate(180deg)' : 'none')};
    transition: 1s ease all;
  }
`;

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

interface IProps {
  handleMaximizeContent: any;
  isMaximizeContent: boolean;
  candidateTrackId: string;
  capabilityId: string;
  questionId: string;
  textId: string;
  answer: any;
  setAnswer: any;
  saveResponseForQuestionOfCandidateTrack: any;
  isSaved: boolean;
  setIsSaved: any;
  questionStatusText: string;
  setQuestionStatusText: any;
  question: any;
  answerStatus: string;
  answerVersion: number;
  setQuestionId: Function;
  questionInfo?: any;
  isMeetingView?: boolean;
  handleAnswerShare?: () => void;
  totalAnswerVersions: number;
  setMinimizeRecording?: Function;
  minimizedModelIndex?: string;
  currModelIndex?: string;
  openRecorder: string;
  setOpenRecorder: any;
}

const modalStyle: Modal.Styles = {
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

export const AnswerField: React.FC<IProps> = (props) => {
  const dispatch = useDispatch()
  const loader = useLoader();
  const messagePopup = useMessagePopup()
  const { enqueueSnackbar } = useSnackbar();
  const directory = (getValueBrowserStorage('candidateId') as string) + "/" + props.capabilityId + "/" + props.question._id;

  const [attachments, setAttachments] = useState<AttachmentPickerObject[]>([]);
  const [isAttachmentModalOpen, setIsAttachmentModalOpen] = useState(false);
  const [s3Objs, setS3Objs] = useState<any[]>([]);
  const [isDisabled, setDisable] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [copyDataFrom, setCopyDataFrom] = useState<any>('');
  const [hasSaveError, setHasSaveError] = useState(false);
  const [richText, updateRichText, richTextRef] = useStateRefInSync(props.answer?.answer?.answer || '')
  const [codeAns, updateCodeAns, codeAnsRef] = useStateRefInSync(props?.answer?.answer?.codeAnswer || '')
  const [codeType, updateCodeType, codeTypeRef] = useStateRefInSync(props?.answer?.answer?.codeType || languages[0])
  const [tabIndex, setTabIndex] = useState(codeAns ? 0 : 1);
  const [sketchModal, setSketchModal] = useState<boolean>(false);
  const [containRecording, setContainRecording] = useState<boolean | undefined>();
  const saving = useSelector((state: any) => state.evaluationPlatform.saving);
  const selectedCapabilityId = useSelector((state: any) => state.evaluationPlatform.selectedCapabilityId);
  const prevSelectedCapabilityId = usePrevious(selectedCapabilityId);
  const capabilities = useSelector((state: any) => state.evaluationPlatform.currentTrack?.candidateTrack[0].capabilities)
  const capabiltyInfo = capabilities?.find((c: any) => c.capabilityId === props.capabilityId)
  const questionInfo = props.questionInfo || capabiltyInfo?.questions?.find((x: any) => x.question._id === props.questionId)
  const historySketchData = getSketchDataCopyFromArray(questionInfo?.answers);
  const totalVersions = (questionInfo?.answers?.filter((ans: any) => !!ans.feedbacks?.length));
  const [recordingsDir, setRecordingsDir] = useState<string>();
  const [attachmentsDir, setAttachmentsDir] = useState<string>();

  const setRecordingsDirAsPerDisabled = () => {
    const subtractableAnswerVersion = props.answerVersion == -1 ? 0 : props.answerVersion;
    const currVersion = (props.totalAnswerVersions && props.totalAnswerVersions != 0) ?
      (props.totalAnswerVersions - subtractableAnswerVersion) : 1;
    setRecordingsDir(directory + "/recordings/v" + (currVersion));
    setAttachmentsDir(directory + "/attachment/v" + (currVersion));
  }

  const getQuestionAttachments = () => {
    const files: any = [];
    const objs: any = [];
    evaluationPlatformService.getS3FolderFiles({
      candidateTrackId: props.candidateTrackId!, path: attachmentsDir!
    }).then(res => {
      res.output.files.map((url: string, index: number) => {
        if (!url.includes("~audio~") && !url.includes("~video~")) {
          files.push({
            label: '' + files.length,
            id: url + index,
            background: url,
            onClick: () => handleImageUpload(),
          });
          objs.push(url);
        }
      })
      setAttachments([...files]);
      setS3Objs(objs);
    }).catch(e => {
      console.log('failed loading attachments from aws', e);
    })
  }

  const handleImageUpload = () => {
    getQuestionAttachments();
  };

  const handleAttachmentRemove = (index: number) => {
    evaluationPlatformService.deleteS3File({
      candidateTrackId: props.candidateTrackId,
      path: getFolderPathAfterDomainName(s3Objs[index])
    }).then(res => console.log("File removed"))
      .catch(err => console.log('Unable to remove object', err))
      .finally(() => getQuestionAttachments())
  }

  let hasNeedToSave = useRef(false);

  useEffect(() => {
    if (containRecording) {
      handleSaveQuestion()
    }
  }, [containRecording])

  useEffect(() => {
    const expertLogin = (getValueBrowserStorage(Expert_Login) !== null);
    if (props.answer && (props.question.status !== QUESTION_STATUS_TEXT.UNANSWERED || props.answerVersion > 0)) {
      if ((props.question.status !== QUESTION_STATUS_TEXT.UNANSWERED && props.question.status !== QUESTION_STATUS_TEXT.ANSWERED)
        || props.answerVersion > 0) {
        setDisable(true);
      }
      else if (props.question.status === QUESTION_STATUS_TEXT.UNANSWERED || props.question.status === QUESTION_STATUS_TEXT.ANSWERED) {
        setDisable(false);
      }
      // updateRichText(props.answer?.answer?.answer);
    } else {
      props.setQuestionStatusText('');
      // updateRichText('')
      setDisable(false);
      props.setIsSaved(false);
    }

    if (expertLogin) {
      setDisable(true);
    }
    // updateCodeAns(props.answer?.answer?.codeAnswer || '')
    // updateCodeType(props.answer?.answer?.codeType || languages[0])
    // eslint-disable-next-line
  }, [props.answerStatus]);

  useEffect(() => {
    setRecordingsDirAsPerDisabled();
  }, [isDisabled, props.answerVersion, props.totalAnswerVersions])

  useEffect(() => {
    if (props.answer && (props.question.status !== QUESTION_STATUS_TEXT.UNANSWERED || props.answerVersion > 0)) {
      updateRichText(props.answer?.answer?.answer);
    } else {
      updateRichText('')
    }
    updateCodeAns(props.answer?.answer?.codeAnswer || '')
    updateCodeType(props.answer?.answer?.codeType || languages[0])
  }, [props.answerVersion, selectedCapabilityId, props.answer])

  useEffect(() => {
    setTabIndex(props?.answer?.answer?.codeAnswer || (!props?.answer?.answer?.codeAnswer && !props?.answer?.answer?.answer) ? 0 : 1)
  }, [props.answerVersion, selectedCapabilityId])

  useEffect(() => {
    checkStatusText();
    // eslint-disable-next-line
  }, [props.isSaved, hasSaveError]);

  useEffect(() => {
    if (!!prevSelectedCapabilityId && !!selectedCapabilityId && prevSelectedCapabilityId !== selectedCapabilityId) {
      props.setQuestionStatusText('');
      props.setIsSaved(false);
    }
    // eslint-disable-next-line
  }, [selectedCapabilityId]);

  useEffect(() => {
    if (props.answer?.answer?.codeAnswer && (props.answer?.answer?.codeType !== codeType)) {
      handleTextChange();
    }
  }, [codeType])

  function toggleAttachmentModal(o: any) {
    setIsAttachmentModalOpen(!isAttachmentModalOpen)
  }

  function showAttachments() {
    getQuestionAttachments();
    setIsAttachmentModalOpen(true);
  }

  const checkStatusText = () => {
    if (hasSaveError) {
      props.setQuestionStatusText('An error occured while saving your response.');
      return;
    }
  };

  const checkHasNeedToSave = () => {
    if (props.answerStatus === QUESTION_STATUS_TEXT.ANSWERED || props.answerStatus === QUESTION_STATUS_TEXT.UNANSWERED) {
      if (props?.question?.answerType === answerType.CODE) {
        if (props.answer?.answer?.codeAnswer && (props.answer?.answer?.codeType !== codeType)) {
          hasNeedToSave.current = true;
          return;
        }
        if (codeAnsRef.current.trim() === '') {
          updateCodeAns('')
          if (props.answer && props.answer?.answer?.codeAnswer !== '') {
            hasNeedToSave.current = true;
            return
          }
        }
        else if (codeAnsRef.current !== props.answer?.answer?.codeAnswer) {
          hasNeedToSave.current = true;
          return;
        }
      }

      if (getQuillContent(richTextRef.current) === '') {
        updateRichText('')
        if (props.answer && props.answer?.answer?.answer !== '')
          hasNeedToSave.current = true
        else
          hasNeedToSave.current = false;
        return;
      }

      if (props.answer === null && getQuillContent(richTextRef.current) !== '') {
        hasNeedToSave.current = true;
        return;
      }
      if (props.answer && props.answer?.answer?.answer !== richTextRef.current) {
        hasNeedToSave.current = true
      }
    }
    else {
      hasNeedToSave.current = false;
    }
  };

  const handleSaveQuestion = (nextProps?: IProps) => {
    const localProps = nextProps ?? props;
    const capabilityIds: string[] =
      localProps.answer?.answer && localProps.answer.answer?.capabilityIds ? [...localProps.answer.answer?.capabilityIds] : [];
    if (capabilityIds.indexOf(localProps.capabilityId) < 0) capabilityIds.push(localProps.capabilityId);
    if (saving) {
      return;
    }
    dispatch(saveCandidateLastActivity({
      selectedCapabilityId: localProps.capabilityId,
      currentQuestionId: localProps.questionId,
    }))
    const payload: IPayload = {
      token: DEFAULT_TOKEN,
      candidateTrackId: localProps.candidateTrackId,
      capabilityIds,
      questionId: localProps.questionId,
      answer: richTextRef.current,
      codeAnswer: codeAnsRef.current,
      codeType: codeTypeRef.current || undefined,
      containRecording
    };
    let isUpdate = false;

    if (localProps.answer) {
      isUpdate = true;
      payload.questionAnswerId = localProps.answer.answer._id;
    }
    localProps.setQuestionStatusText('Saving...');
    localProps
      .saveResponseForQuestionOfCandidateTrack(payload)
      .then((res: any) => {
        if (res.payload) {
          hasNeedToSave.current = false;
          localProps.setIsSaved(true);
          const answer = res.payload.output;
          const data = {
            _id: answer.questionAnswerId,
            questionId: answer.questionId,
            answer: answer.answer,
            capabilityIds,
            codeAnswer: answer.codeAnswer,
            codeType: answer.codeType,
            candidateTrackId: answer.candidateTrackId,
            updateAt: new Date(answer.updateAt).toUTCString(),
            sketchAvailable: answer.sketchAvailable
          };
          localProps.setAnswer({
            capabilities: localProps.question.capabilities,
            questionId: localProps.questionId,
            answer: data,
            isUpdate,
          });
        } else {
          enqueueSnackbar(res.error?.message, {
            variant: 'error',
            autoHideDuration: 2500,
          });
          setHasSaveError(true);
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err?.message, {
          variant: 'error',
          autoHideDuration: 2500,
        });
        hasNeedToSave.current = false
        setHasSaveError(true);
      });
  };

  const handleTextChange = (nextProps?: IProps) => {
    setHasSaveError(false);
    checkHasNeedToSave();
    if (hasNeedToSave.current) {
      setHasSaveError(false);
      (nextProps ?? props).setIsSaved(false);
      handleSaveQuestion(nextProps);
    }
  };

  const debounced = useRef(_.debounce((nextProps: any) => handleTextChange(nextProps), getEnrollmentType() === TrackEnrollType.FORPLACEMENT ? placementAutoSaveTime : genAutoSaving)).current;

  useEffect(() => {
    return () => {
      debounced.cancel()
    }
  }, [props.answerVersion])

  const handleBlur = () => {
    debounced.cancel();
    if (isDisabled)
      return;
    checkHasNeedToSave();
    if (hasNeedToSave.current) {
      setHasSaveError(false);
      props.setIsSaved(false);
      handleSaveQuestion();
    }
  };

  const handleSelect = ({ target: { value } }: any) => updateCodeType(value)

  const enableAudioRecored = () => props.minimizedModelIndex === '-1' || props.minimizedModelIndex === props.currModelIndex;

  const codeOnChange = (newCode: string) => {
    if (newCode !== codeAns) {
      debounced(props)
      updateCodeAns(newCode)
    }
  }

  const RTOnChange = (value: string, oldValue: string, source: string) => {
    if (source === 'user') {
      debounced(props)
      updateRichText(value)
    }
  }

  const handleSketchSave = (sketchData: string) => {
    // save Api Call
    loader.showLoader();
    const payload: IAddSketchAnswer = {
      candidateTrackId: props.candidateTrackId,
      capabilityIds: props.answer?.answer?.capabilityIds || [props.capabilityId],
      questionAnswerId: props.answer?.answer?._id,
      questionId: props.questionId,
      token: DEFAULT_TOKEN,
      sketchData
    }
    return evaluationPlatformService.addUserSketchAnswer(payload).then((res) => {
      props.setAnswer({
        capabilities: props.question.capabilities,
        questionId: props.questionId,
        answer: {
          _id: payload.questionAnswerId || res.output.questionAnswerId,
          questionId: payload.questionId,
          capabilityIds: payload.capabilityIds,
          answer: props.answer?.answer?.answer || '',
          codeAnswer: props.answer?.answer?.codeAnswer || '',
          codeType: props.answer?.answer?.codeType || languages[0],
          sketchData: sketchData ? JSON.parse(sketchData) : '',
          sketchAvailable: sketchData ? true : false,
          updateAt: new Date(res.output.updateAt).toUTCString(),
          candidateTrackId: payload.candidateTrackId,
        },
        isUpdate: props.answer ? true : false,
      });
    })
      .finally(loader.hideLoader)
  }

  const getSketch = (getSketchParams = {}) => {
    // getApi Call 
    loader.showLoader();
    if ((getSketchParams as any)?.expertId) {
      return evaluationPlatformService.getExpertSketchAnswer({
        token: DEFAULT_TOKEN,
        candidateTrackId: props.candidateTrackId,
        questionAnswerId: props.answer.answer._id,
        questionId: props.questionId,
        ...getSketchParams
      } as IGetSketchExpertAnswer)
        .finally(loader.hideLoader)
    }
    return evaluationPlatformService.getUserSketchAnswer({
      candidateTrackId: props.candidateTrackId,
      capabilityIds: props.answer.answer?.capabilityIds,
      questionAnswerId: props.answer.answer._id,
      questionId: props.questionId,
      token: DEFAULT_TOKEN,
      ...getSketchParams
    }).finally(loader.hideLoader)
  }

  const getEditors = (type: string) => {
    const textEditor = <RichTextEditor
      disabled={isDisabled}
      placeholder="Type your response here..."
      value={richText}
      onBlur={handleBlur}
      onChange={RTOnChange}
      id={props.textId}
      data-testid="answerfield-textarea"
    />
    const codeEditor = <CodeEditor
      disabled={isDisabled}
      codeType={codeType}
      onBlur={handleBlur}
      onChange={codeOnChange}
      code={codeAns}
      id={`code-${props.textId}`}
    />
    switch (type) {
      case answerType.RICH_TEXT:
        return textEditor;
      case answerType.CODE:
        return <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
          <TabList>
            <Tab style={{ borderTopLeftRadius: 'inherit' }}>
              <div>
                {`Code ${codeAns !== '' ? ` °` : ''}`}
                <Form.Control
                  onChange={handleSelect}
                  value={codeType}
                  as="select">
                  {languages.map(lang => <option disabled={isDisabled && codeType !== lang ? true : false} key={lang}>{lang}</option>)}
                </Form.Control>
              </div>
            </Tab>
            <Tab>{`Text ${getQuillContent(richText) !== '' ? ` °` : ''}`}</Tab>
          </TabList>

          <TabPanel>
            {codeEditor}
          </TabPanel>
          <TabPanel>
            {textEditor}
          </TabPanel>
        </Tabs>
      default:
        return textEditor
    }
  }

  const handleRecordingModalClose = (isCancel?: boolean, cantainRecording?: boolean) => {
    if (isCancel) return;
    const recordingText = "[This answer contains recordings]";
    if (richText.indexOf(recordingText) === -1 && cantainRecording) {
      richTextRef.current = "[This answer contains recordings]\n" + richText;
      updateRichText(richTextRef.current);
    }
    else {
      richTextRef.current = richText.replace("[This answer contains recordings]\n", "");
      updateRichText(richTextRef.current);
    }
    setContainRecording(cantainRecording);
  }

  const openSketchModal = () => { handleBlur(); setSketchModal(true); }

  const isSketchEnabled = props?.answer?.answer?.sketchAvailable || !isDisabled || props.isMeetingView

  const handleSketchPreview = (e: any) => {
    e.preventDefault();
    setPreviewModal(true)
  }

  const copyDataToCurrent = () => {
    messagePopup.confirm(`Your current diagram will be overwritten by ${copyDataFrom?.name}. Do you still want to proceed ?`, (res) => {
      if (res)
        getSketch(copyDataFrom?.value).then((res: any) => {
          handleSketchSave(res?.output?.sketchData)
            .finally(() => setCopyDataFrom(''))
        })
    })
  }

  const handleCopySketchDropdown = (e: any) => e.target.value ? setCopyDataFrom(JSON.parse(e.target.value)) : setCopyDataFrom(null)

  return (
    <>
      <AnswerContainer {...props} data-testid="answerfield-container" theme={{ 'recordingOn': props.minimizedModelIndex === props.currModelIndex }}>
        {isSketchEnabled && <IconButton
          className={'sketch'}
          data-tip="System Design"
          data-for="usersketch"
          onClick={openSketchModal}>
          <ReactTooltip id="usersketch" type="dark" />
          <IconContainer icon={Paint} disableHover={props?.answer?.answer?.sketchAvailable || false} className={`action-icon`} />
        </IconButton>}
        {<>
          <IconButton
            className={'attachment'}
            data-tip="Upload and View Files"
            data-for="attachment"
            onClick={showAttachments}>
            <ReactTooltip id="attachment" type="dark" />
            <IconContainer icon={Attachment} className={`action-icon`} />
          </IconButton>
          <IconButton
            className={`audioRecorder`}       //  ${!enableAudioRecored() ? 'disabled' : ''}
            data-tip={props.minimizedModelIndex === props.currModelIndex ? 'Recording is on for this answer' : "Record your answers as audio or video"}
            data-for="recorder"
            onClick={() => {
              // if (enableAudioRecored()) {  
              props.setOpenRecorder(props.currModelIndex);
              props.setMinimizeRecording && props.setMinimizeRecording('-1')
            }}>
            <ReactTooltip id="recorder" type="dark" />
            <IconContainer icon={props.minimizedModelIndex === props.currModelIndex ? RecordVoiceOver : SettingsVoice} className={`action-icon`}
              label={props.minimizedModelIndex === props.currModelIndex ? 'Recording' : ''} />    {/* ${!enableAudioRecored() ? 'disabled' : ''} */}
          </IconButton>
        </>}

        {getEditors(props?.question?.answerType)}

        <Modal
          isOpen={sketchModal}
          style={modalStyle}>
          <StyledSketchModal>
            <span>Q: {props.question.title}</span>
            {!isDisabled && historySketchData.length > 0 && (<>
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
            id='userSketch'
            disabled={isDisabled}
            isSketchAvailable={props.answer?.answer?.sketchAvailable || false}
            CloseModal={() => { setSketchModal(false); setCopyDataFrom('') }}
            handleSketchSave={handleSketchSave}
            getSketch={getSketch}
            sketchData={props.answer?.answer?.sketchData}
          />
        </Modal>
        <Modal
          isOpen={previewModal}
          style={modalStyle}>
          <div>Preview of {copyDataFrom?.name}</div>
          <SketchingEditor
            id='previewSketch'
            disabled={true}
            isSketchAvailable={true}
            CloseModal={() => setPreviewModal(false)}
            // handleSketchSave={handleSketchSave}
            getSketch={() => getSketch(copyDataFrom?.value)}
          />
        </Modal>
        <ModalComponent
          handleClose={toggleAttachmentModal}
          show={isAttachmentModalOpen}
        >
          <div>
            <div className="h3 mb-3">
              <span>{'Attachments'}</span>
            </div>
            <div className="d-flex justify-content-between">
              <AttachmentsList items={attachments} onRemove={handleAttachmentRemove} isReadOnly={isDisabled || props.isMeetingView} />
              {!props.isMeetingView && !isDisabled && <AwsUploader
                onUpload={handleImageUpload}
                directory={attachmentsDir!}
                candidateTrackId={props.candidateTrackId}
              />}
            </div>
          </div>
        </ModalComponent>
        {props.openRecorder === props.currModelIndex &&
          <VoiceRecorderModal isReadOnly={isDisabled || props.isMeetingView} isOpen={props.openRecorder === props.currModelIndex}
            onClose={(isCancel?: boolean, cantainRecording?: boolean) => { props.setOpenRecorder('-1'); handleRecordingModalClose(isCancel, cantainRecording); }} directory={recordingsDir!}
            candidateTrackId={props.candidateTrackId}
            setMinimizeRecording={props.setMinimizeRecording}
            minimizedModelIndex={props.minimizedModelIndex}
            currModelIndex={props.currModelIndex} />}
      </AnswerContainer>
    </>
  );
};

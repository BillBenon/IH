import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft';
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight';
import styled from 'styled-components';
import { evaluationPlatformService } from 'services/evaluationPlatform';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { Col, Row } from 'react-bootstrap';
import { QuestionField } from '..';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SketchingEditor from 'components/Common/Editors/SketchingEditor';
import { DEFAULT_TOKEN } from 'utilities/constants';
import { useLoader } from 'context/loaderDots';
import { AttachmentPickerObject, AttachmentsList } from 'components/Uploader/AttachmentsList';
import RecordingsList from 'components/AudioRecorder/components/recordings-list';
import { Audio } from 'components/AudioRecorder/types/recorder';
import { Attachment } from '@styled-icons/entypo/Attachment';
import { Paint } from "@styled-icons/boxicons-regular/Paint";
import { SettingsVoice } from "@styled-icons/material-sharp/SettingsVoice";
import { IconContainer } from 'components/Common/IconContainer';

interface ISharedAnswerComponent {
  questionId: string;
  capabilityId: string;
  setCurrentAnsVersionId: Function;
}

const RightIcon = styled(ChevronRight)`
    height: 24px;
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

const LeftIcon = styled(ChevronLeft)`
    height: 24px;
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

const SharedAnswerHeader = styled.span`
    line-height: 16px;
    color: #525252;
`;

export const SharedAnswerComponent = ({ questionId, capabilityId }: ISharedAnswerComponent) => {
  const [question, setQuestion] = useState<any>();
  const [totalAnswers, setTotalAnswers] = useState<number>(0);
  const [currentCandidateInx, setCurrentCandidateInx] = useState<number>(0);
  const [currentAnswerInx, setCurrentAnswerInx] = useState<number>(0);
  const [attachmentsDir, setAttachmentsDir] = useState<string>();
  const candidateTrackId = getValueBrowserStorage('candidateTrackId')
  const loader = useLoader();
  const [attachments, setAttachments] = useState<AttachmentPickerObject[]>([]);
  const [existingRecordings, setExistingRecordings] = useState<Audio[]>();
  const [recordingsDir, setRecordingsDir] = useState<string>();
  const [activeTabInx, setActiveTabInx] = useState<number>(0);
  const [openRecorder, setOpenRecorder] = useState<string>('-1');
  
  const getSharedAnswers = async () => {
    if (candidateTrackId) {
      const payload = {
        questionId,
        candidateTrackId,
      }
      const data = await evaluationPlatformService.getSharedQuestions(payload);
      setQuestion(data.output.sharedQuestion);
      setTotalAnswers(data.output.totalCount);
      data.output.totalCount && setCurrentCandidateInx(0);
    }
  }

  const getSketch = () => {
    if (candidateTrackId && currentAnswerInx !== undefined) {
      loader.showLoader();
      return evaluationPlatformService.getUserSketchAnswer({
        candidateTrackId: question.candidate[currentCandidateInx].candidateTrackId,
        capabilityIds: [capabilityId],
        questionAnswerId: question.candidate[currentCandidateInx].answers[currentAnswerInx].answer._id,
        questionId: question.questionId,
        token: DEFAULT_TOKEN,
      }).finally(loader.hideLoader)
    }
  }

  // Need to check it in ui
  const getQuestionAttachments = () => {
    const files: any = [];
    const objs: any = [];
    evaluationPlatformService.getS3FolderFiles({
      candidateTrackId: candidateTrackId ? candidateTrackId : "", path: attachmentsDir ? attachmentsDir : ''
    }).then(res => {
      res.output.files.map((url: string, index: number) => {
        files.push({
          label: '' + files.length,
          id: url + index,
          background: url
        });
        objs.push(url);
      })
      setAttachments([...files]);
    }).catch(e => {
      console.log('failed loading attachments from aws', e);
    })
  }

  const getRecordings = () => {
    const files: Audio[] = [];
    evaluationPlatformService.getS3FolderFiles({
      candidateTrackId: candidateTrackId ? candidateTrackId : "", path: recordingsDir ? recordingsDir : ''
    }).then(res => {
      res.output.files.map((url: string) => {
        const type = url.split("~")[1];
        files.push({
          key: url,
          audio: type === "audio" ? url : undefined,
          video: type === "video" ? url : undefined,
          file: null,
        });
      })
      setExistingRecordings([...files]);
    }).catch(e => {
      console.log('failed loading recordings from aws', e);
    })
  }

  const renderQuestionField = useMemo(() => {
    const setCurrentAnswerVersion = ({ questionId, ansVersionId }: { questionId: string, ansVersionId: number }) => {
      const inx = question.candidate[currentCandidateInx].answers.findIndex((a: any) => a.answer._id === ansVersionId);
      setActiveTabInx(0);
      setCurrentAnswerInx(inx);
    }

    return !!(candidateTrackId && question && currentCandidateInx !== undefined) && 
    <QuestionField
      communityVersion={true}
      candidateTrackId={candidateTrackId}
      capabilityId={capabilityId}
      questionSet={{ question, answers: question.candidate[currentCandidateInx].answers }}
      handleMaximizeContent={() => { }}
      isMaximizeContent={false}
      setAnswer={() => { }}
      saveResponseForQuestionOfCandidateTrack={() => { }}
      setQuestionId={() => { }}
      currentQuestionId={question.questionId}
      submitResponseToExpert={() => { }}
      setFeedback={() => { }}
      handleEdit={() => { }}
      setQuestionFeedbackViewed={() => { }}
      candidateViewedExpertFeedback={() => { }}
      candidate={question.candidate[currentCandidateInx]}
      setCurrentAnsVersionId={setCurrentAnswerVersion}
      saveCandidateLastActivity={() => { }}
      goToPaymentPage={() => { }}
      triggerFeedback={false}
      setTriggerFeedback={() => { }}
      handleAnswerShare={() => { }}
      openRecorder={openRecorder}
      setOpenRecorder={setOpenRecorder}
    />
  }, [capabilityId, question, candidateTrackId, currentCandidateInx])

  useEffect(() => {
    getSharedAnswers();
  }, [])

  useEffect(() => {
    if (question) {
      setAttachmentsDir((question.candidate[currentCandidateInx].candidateId as string) + "/" + capabilityId + "/" + question.questionId);
      setRecordingsDir((question.candidate[currentCandidateInx].candidateId as string) + "/" + capabilityId + "/" + question.questionId + "/recordings/v" + (currentAnswerInx + 1))
    }
  }, [question, currentCandidateInx, capabilityId, currentAnswerInx])

  return (
    <>
      {totalAnswers ? <Row className="mb-1 mt-1 border-bottom pb-2">
        <Col xs="10">
          <SharedAnswerHeader className="mb-2 mt-2 pr-2 h6 text-info"> {`(${currentCandidateInx + 1} of ${totalAnswers})`}</SharedAnswerHeader>
        </Col>
        <Col xs="2" className={'d-inline text-right pr-2'}>
          <LeftIcon
            onClick={() => { setCurrentCandidateInx(currentCandidateInx - 1); setActiveTabInx(0) }}
            theme={{ disabled: !currentCandidateInx }}
          />
          <RightIcon
            onClick={() => { setCurrentCandidateInx(currentCandidateInx + 1); setActiveTabInx(0) }}
            theme={{ disabled: totalAnswers - 1 === currentCandidateInx }}
          />
        </Col>
      </Row> : <div className="h6">{'No answers shared'}</div>}
      {!!totalAnswers && <Row className={'mb-2'}>
        <Col style={{ letterSpacing: '0.32px' }} className={'h6 small'}>
          {renderQuestionField}
          <div className="px-5">
            <Tabs selectedIndex={activeTabInx} onSelect={(index) => setActiveTabInx(index)}>
              <TabList>
                <Tab><div className="d-flex align-items-center"><IconContainer icon={Paint} />Drawings</div></Tab>
                <Tab onClick={getQuestionAttachments}><div className="d-flex align-items-center"><IconContainer icon={Attachment} />Attachments</div></Tab>
                <Tab onClick={getRecordings}><div className="d-flex align-items-center"><IconContainer icon={SettingsVoice} />Recordings</div></Tab>
              </TabList>
              <TabPanel>
                {(currentAnswerInx && question.candidate[currentCandidateInx].answers[currentAnswerInx].answer.sketchData) ? <SketchingEditor
                  id='userSketch'
                  height={500}
                  isViewOnly={true}
                  disabled={true}
                  isSketchAvailable={true}
                  getSketch={getSketch}
                  sketchData={currentAnswerInx && question.candidate[currentCandidateInx].answers[currentAnswerInx].answer?.sketchData}
                /> : <div>No Drawings Available</div>}
              </TabPanel>
              <TabPanel>
                {attachments?.length ? <AttachmentsList items={attachments} /> : <div>No Attachments Available</div>}
              </TabPanel>
              <TabPanel>
                {existingRecordings?.length ? <RecordingsList
                  existingRecordings={existingRecordings || []}
                /> : <div>No Recordings Available</div>}
              </TabPanel>
            </Tabs>
          </div>
        </Col>
      </Row>}
    </>
  );
}

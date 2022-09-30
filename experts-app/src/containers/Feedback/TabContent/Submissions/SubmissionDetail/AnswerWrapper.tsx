import React, { useState } from 'react';
import styled from 'styled-components';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import useSubmissions from '../Submissions.utils';
import { answerType, DEFAULT_TOKEN } from '../../../../../utilities/constants';
import CodeEditor from '../../../../../components/Common/Editors/CodeEditor';
import RichTextEditor from '../../../../../components/Common/Editors/RichTextEditor';
import SketchingEditor from '../../../../../components/Common/Editors/SketchingEditor';
import { submissionService } from '../../../../../services/submission';
import { Attachment } from '@styled-icons/entypo/Attachment';
import { IconButton } from '@material-ui/core';
import { getModalDefaultSettings } from '../../../../../utilities';
import { useLoader } from '../../../../../context/loaderContext';

import 'react-tabs/style/react-tabs.css';


interface IAnswerWrapper {
    answer: any;
    questionId: string;
    candidateTrackId: string;
    expertId: string;
}

const StyledTabs = styled.span`
    .react-tabs__tab--selected{
        font-weight: bold;
        border-color: white;
        border-bottom: 3px solid #5b94e3 !important;
    }
    .react-tabs__tab{
        bottom: 0;
    }
    .react-tabs__tab-list{
        margin: 0 0 2px;
        border-bottom: 0;
    }`

const StyledAttachmentIcon = styled(Attachment) <{ isSketchAvailable: boolean }>`
  color: ${(props: any) => props.isSketchAvailable ? '#5B94E3' : 'grey'};
  width: 24px;
  transform: rotate(315deg);
`

const StyledAnwerWrapper = styled.div`
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

const AnswerWrapper: React.FC<IAnswerWrapper> = props => {
    const Loader = useLoader();
    const { answer: { answer, codeAnswer, codeType, sketchAvailable, capabilityIds, _id } } = props.answer;
    const [showSketchModal, setshowSketchModal] = useState(false)
    const [{ getQuesDetailsByQuestionId }] = useSubmissions();
    const [tabIndex, setTabIndex] = useState(0);

    const questionDetails = getQuesDetailsByQuestionId(props.questionId)

    const RTEEditor = <RichTextEditor
        value={props.answer?.answer.answer || ''}
        disabled={true}
        id={props.questionId}
    />
    const codeEditor = <CodeEditor
        disabled={true}
        codeType={codeType}
        code={codeAnswer}
        id={`code-${props.questionId}`}
    />

    const getEditor = () => {
        switch (questionDetails?.answerType) {
            case answerType.CODE:
                return <StyledTabs>
                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                        <TabList>
                            <Tab>
                                <div>
                                    {`Code ${codeAnswer !== '' ? ` °` : ''}`}
                                </div>
                            </Tab>
                            <Tab>{`Text ${answer !== '' ? ` °` : ''}`}</Tab>
                        </TabList>

                        <TabPanel>
                            {codeEditor}
                        </TabPanel>
                        <TabPanel>
                            {RTEEditor}
                        </TabPanel>
                    </Tabs>
                </StyledTabs>
            default:
                return <>{RTEEditor}</>
        }
    }

    const getSketch = () => {
        Loader.showLoader();
        return submissionService.getUserSketch({
            candidateTrackId: props.candidateTrackId,
            capabilityIds: capabilityIds,
            questionAnswerId: _id,
            questionId: props.questionId,
            token: DEFAULT_TOKEN,
            expertId: props.expertId
        }).finally(() => Loader.hideLoader())
    }

    const closeModal = () => setshowSketchModal(false)

    return (<StyledAnwerWrapper>
        {getEditor()}
        {sketchAvailable && <IconButton
            className={'attachment'}
            data-tip="System Design"
            data-for="usersketch"
            onClick={() => setshowSketchModal(true)}>
            <ReactTooltip id="usersketch" type="dark" />
            <StyledAttachmentIcon
                isSketchAvailable={props?.answer?.answer?.sketchAvailable || false} />
        </IconButton>}
        <Modal
            ariaHideApp={false}
            isOpen={showSketchModal}
            style={{
                ...getModalDefaultSettings('80%'),
                content: {
                    ...getModalDefaultSettings('80%').content,
                    height: '80%',
                    padding: '10px',
                    display: 'flex',
                    overflow: 'hidden',
                    flexDirection: 'column'
                }
            }}>
            <div className="question__title" style={{ width: '100%' }}>
                <span>Q: {questionDetails?.name}</span>
            </div>
            <SketchingEditor
                id='usersketch'
                isSketchAvailable={sketchAvailable}
                getSketch={getSketch}
                disabled={true}
                CloseModal={closeModal} />
        </Modal>
    </StyledAnwerWrapper>)
}

export default AnswerWrapper;
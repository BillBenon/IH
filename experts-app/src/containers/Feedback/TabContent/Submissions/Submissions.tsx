import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip';
import parse from 'html-react-parser';

import UserProfileIcon from '../../../../assets/icons/common/user-profile-icon.svg';
import { ModalComponent } from '../../../../components/Modals/Modal';
import { Paginator } from '../../../../components/Paginator';
import { answerType, enrollTypeNameMapper, QuestionStatus, trackEnrollType } from '../../../../utilities/constants';
import { CapabilityId, Market, Submission, TrackId } from '../../IFeedback';
import { CustomModalHeader } from './CustomModalHeader';
import { SubmissionDetail } from './SubmissionDetail';
import useSubmissionDetail from './SubmissionDetail/SubmissionDetail.utils';
import {
    AnswerDiv,
    Chip,
    ChipWrapper,
    NormalSpan,
    QuestionDiv,
    SmallSpan,
    StatusSpan,
    SubmissionContent,
    SubmissionWrapper,
    UserDescriptor,
    UserPic,
    TrackEnrollWrapper,
    PlacementPartnerWrapper
} from './Submissions.styles';
import useSubmissions from './Submissions.utils';
import RichTextEditor from '../../../../components/Common/Editors/RichTextEditor';

export const Submissions = () => {
    const [showMarket, setShowMarket] = useState(false);
    const [currentMarket, setCurrentMarket] = useState<Market | undefined>();
    const [showTrack, setShowTrack] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<TrackId | undefined>();


    const handleCurrentMarket = (id: string) => {
        setCurrentMarket(getMarketByMarketId(id));
        setShowMarket(true);
    }

    const handleCurrentTrack = (id: string) => {
        setCurrentTrack(getTrackByTrackId(id));
        setShowTrack(true);
    }

    const [{
        activeTab,
        lastActivity,
        totalResultCount,
        submissions,
        highlightedCards,
        setSkipCount,
        handleHighlightedCard,
        getCandidateNameById,
        getTrackByTrackId,
        getMarketByMarketId,
        getQuestionByQuestionId,
        getQuesDetailsByQuestionId,
        getQuestionTitleByQuestionId
    }] = useSubmissions();

    const [{
        handleCurrentCapability,
        setShowCapabilityModal,
        showCapabilityModal,
        currentCapability,
    }] = useSubmissionDetail();
    return (
        <SubmissionWrapper>
            {submissions?.length && lastActivity.saveQueries[activeTab] ?
                <Paginator
                    count={lastActivity.saveQueries[activeTab].count}
                    total={totalResultCount}
                    skipcount={lastActivity.saveQueries[activeTab].skipCount}
                    onAction={(e: number) => setSkipCount(e)}

                /> : null}
            {submissions?.map((submission: Submission) => {
                let questionDetails = getQuesDetailsByQuestionId(submission.questionId)
                let isCodeAnsShown = questionDetails?.answerType === answerType.CODE ? submission.latestAnswer?.codeAnswer ? true : false : false
                let answerToShow = questionDetails?.answerType === answerType.CODE ?
                    submission.latestAnswer?.codeAnswer ? submission.latestAnswer.codeAnswer : submission.latestAnswer.answer :
                    submission.latestAnswer.answer;
                let trackInfo = getTrackByTrackId(submission.trackId)
                return <SubmissionContent
                    onClickCapture={() => handleHighlightedCard(submission.latestAnswer.questionAnswerId)}
                    style={highlightedCards[activeTab] == submission.latestAnswer?.questionAnswerId ? { border: '1px solid #5B94E3' } : { border: '0' }} key={submission.latestAnswer?.questionAnswerId}>
                    <Row>
                        <Col xs={12} md={7} lg={7}>
                            <Row>
                                <Col xs={1} sm={1} md={1} lg={1}>
                                    <UserPic data-tip={(submission as any)["emailaddress"]} data-for="emailaddress" theme={UserProfileIcon} />
                                    <ReactTooltip id={"emailaddress"} type="dark" />
                                </Col>
                                <UserDescriptor xs={8} sm={7} md={5} lg={5}>
                                    <NormalSpan>
                                        {getCandidateNameById(submission.candidateId)}
                                    </NormalSpan>
                                    <ChipWrapper>
                                        <Chip onClick={() => handleCurrentMarket(submission.marketId)} theme={{ color: "#FFFF", backgroundcolor: "#6929C4" }}>{getMarketByMarketId(submission.marketId)?.name}</Chip>
                                        <Chip onClick={() => handleCurrentTrack(submission.trackId)} theme={{ color: "#FFFF", backgroundcolor: "#009D9A" }}>{getTrackByTrackId(submission.trackId)?.name}</Chip>
                                    </ChipWrapper>
                                    <TrackEnrollWrapper >{trackInfo?.trackEnrollType && enrollTypeNameMapper[trackInfo.trackEnrollType]}</TrackEnrollWrapper>
                                </UserDescriptor>
                                <Col xs={2} md={5} lg={5}>
                                    <StatusSpan>
                                        {QuestionStatus[submission.status]}
                                    </StatusSpan>
                                    <ChipWrapper>
                                        <Chip style={{ paddingLeft: "0", pointerEvents: "none" }} theme={{ color: "#8D8D8D", backgroundcolor: "#FFF" }}>{'status'}</Chip>
                                    </ChipWrapper>
                                </Col>
                            </Row>
                        </Col>
                        <SmallSpan xs={12} md={5} lg={5}>{'Received '}<Moment fromNow>{submission.feedbackAt}</Moment></SmallSpan>
                    </Row>
                    <SubmissionDetail {...submission}>
                        <QuestionDiv>{'Q) ' + getQuestionTitleByQuestionId(submission.questionId)}</QuestionDiv>
                        <QuestionDiv className="pr-0" theme={{ lineClamp: 1 }}>{getQuestionByQuestionId(submission.questionId)}</QuestionDiv>
                        <ChipWrapper>
                            {submission.capabilityIds?.map((capability: CapabilityId, cai: number) => <Chip key={capability.id + cai} onClick={() => handleCurrentCapability(capability.id)} theme={{ color: "#171414", backgroundcolor: "#E5E0DF" }}>{capability.name}</Chip>)}
                        </ChipWrapper>
                        <AnswerDiv
                            className="pr-0"
                            theme={{ lineClamp: 1 }}>{
                                isCodeAnsShown ?
                                    answerToShow.substr(0, 100) :
                                    parse(answerToShow.substr(0, 100))
                            }</AnswerDiv>
                    </SubmissionDetail>
                </SubmissionContent>
            }
            )
            }
            {submissions?.length && lastActivity.saveQueries[activeTab] ?
                <Paginator
                    count={lastActivity.saveQueries[activeTab].count}
                    total={totalResultCount}
                    skipcount={lastActivity.saveQueries[activeTab].skipCount}
                    onAction={(e: number) => setSkipCount(e)}
                /> : null}
            <ModalComponent
                show={showCapabilityModal}
                handleClose={() => setShowCapabilityModal(false)}
                showCloseIcon={true}
                header={currentCapability?.name as string}
                body={currentCapability?.description}
                subheader={'Capability'}
            />
            <ModalComponent
                show={showMarket}
                handleClose={() => setShowMarket(false)}
                showCloseIcon={true}
                headerComponent={<CustomModalHeader headerText={currentMarket?.name} subheaderText={'Market'} />}
                body={currentMarket?.description}
            />
            <ModalComponent
                show={showTrack}
                handleClose={() => setShowTrack(false)}
                showCloseIcon={true}
                headerComponent={<CustomModalHeader headerText={currentTrack?.name} subheaderText={'Track'} icon={currentTrack?.logo} />}
            >
                <RichTextEditor
                    value={currentTrack?.description || ''}
                    disabled={true}
                    id={currentTrack?.id || ''}
                    customStyles={{
                        height: 'auto',
                        boxShadow: 'none',
                        resize: 'none',
                        background: 'white',
                        minHeight: 'auto',
                        border: 'none'
                    }}
                />
                {currentTrack?.placementPartner && (
                    <PlacementPartnerWrapper>
                        <h6>
                            <span className='noteSpan'>Note:</span>
                            {`This track is a placement track for  `}
                            <b>{currentTrack.placementPartner.name}</b>
                            {` partner.`}
                        </h6>
                        <div>
                            <span className='partnerName'>
                                {`${currentTrack.placementPartner.name}:  `}
                            </span>
                            <span className='partnerDesc'>
                                <RichTextEditor
                                    value={currentTrack.placementPartner.description || ''}
                                    disabled={true}
                                    id={currentTrack?.id || ''}
                                    customStyles={{
                                        height: 'auto',
                                        boxShadow: 'none',
                                        resize: 'none',
                                        background: 'white',
                                        minHeight: 'auto',
                                        border: 'none'
                                    }}
                                />
                            </span>
                        </div>
                    </PlacementPartnerWrapper>
                )}
                {currentTrack?.trackEnrollType === trackEnrollType.Evaluation && (
                    <span style={{
                        fontWeight: 'bold',
                        bottom: '0',
                    }}>{`note: This track is an Evaluation track.`}</span>
                )}
            </ModalComponent>
        </SubmissionWrapper >
    );
};

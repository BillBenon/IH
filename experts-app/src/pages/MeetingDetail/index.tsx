import { CaretLeft, Save } from "@styled-icons/boxicons-regular";
import { IconContainer } from 'components/Common/IconContainer/IconContainer';
import {
    BigSpan
} from 'components/CommonStyles';
import { IMeetingDetail } from 'containers/Meeting/meetingTypes';
import MeetingDetailsComponent from "containers/Meeting/tab/MeetingDetailsComponent";
import { useLoader } from 'context/loaderContext';
import { useMessagePopup } from 'context/messagePopContext';
import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';
import { meetingService } from 'services/meeting';
import styled from 'styled-components';
import { FEEDBACK_TYPES } from 'utilities/constants';
import OuterDiv from "../../components/Common/OuterDivComponent";
import { MeetingQuestionComponent } from "../../containers/Meeting/tab/components/MeetingQuestionComponent";
import { useMenuVisibility } from "../../providers/menuVisibilityProvider";
import { useSelector } from "react-redux"

const MeetingDetailsHeader = styled.div`
    padding-right: 6.6rem;
    padding-left: 0.5rem;
    position: fixed;
    width: 100%;
    top: 3.5rem;
    background: white;
    height: 65px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 10px 30px 0px rgb(82 63 105 / 5%);
    z-index: 100;
`;

const Main = styled.div<any>`
    margin-top: 4rem !important;
    .meeting-details {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;

        & .detail {
            text-align: left;
            margin-bottom: 1rem;
            width:25%;
        }

        & .detail:nth-of-type(4n) {
            margin-right: 0;	
        }
        
        & .detail:nth-of-type(4n+1) {
            margin-left: 0;	
        }
        & .textWrapper {
          overflow-wrap: break-word;
        }
    }
`;

export const MeetingDetailPage = () => {
    const [meetingDetails, setMeetingDetails] = useState<IMeetingDetail>();
    const [update, forceUpdate] = useState<boolean>(false);
    const { search } = useLocation();
    const _queryParams: any = queryString.parse(search);
    const history = useHistory();
    const { isMenuVisible } = useMenuVisibility()!;
    const Loader = useLoader();
    const message = useMessagePopup();
    const [isQuestionAdded, setIsQuestionAdded] = useState<boolean>(false);

    // eslint-disable-next-line no-lone-blocks
    {/** get expertId from state */}
    const {expertId} = useSelector((state: any) => state.auth.user);

    const submitFeedback = async () => {
        const response = await meetingService.getFeedbackStats({ meetingDetailId: _queryParams.meetingDetailId, expertId });
        if (!response.output.unAttemptedFeedbackCount) {
            Loader.showLoader();
            await meetingService.submitMeetingStructureFeedback({ meetingDetailId: _queryParams.meetingDetailId, expertId })
            Loader.hideLoader();
            history.goBack();
        } else {
            const text = `You have ${response.output.unAttemptedFeedbackCount} meeting questions/s without feedback`;
            message.fail(text)
        }
    }

    const onModuleSelectionClose = async () => {
        await getMeetingDetails(_queryParams.meetingDetailId);
    }

    const onQuestionAdd = async () => {
        await getMeetingDetails(_queryParams.meetingDetailId);
    }

    useEffect(() => {
        if (_queryParams.meetingDetailId) {
            getMeetingDetails(_queryParams.meetingDetailId);
        }
    }, []);

    const getMeetingDetails = async (meetingDetailId: string) => {
        let response = await meetingService.getMeetingDetails({ meetingDetailId })
        setMeetingDetails({ ...response.output });
        forceUpdate(!update);
    }

    const meetingComponent = useMemo(() => {
        return <MeetingDetailsComponent meeting={meetingDetails} />;
    }, [meetingDetails])


    return (
        <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
            <MeetingDetailsHeader>
                <Col>
                    <Button className="d-flex align-items-center btn-sm mr-2" variant='secondary' onClick={() => history.goBack()}><IconContainer color="white" icon={CaretLeft} /></Button>
                </Col>
                <Col>
                    <BigSpan>{'Meeting With ' + (meetingDetails?.candidateName || "")}</BigSpan>
                </Col>
                <Col className="d-flex text-right justify-content-end">
                    {meetingDetails?.structureFeedbackStatus !== FEEDBACK_TYPES.EXPERT_GIVES_FEEDBACK && meetingDetails?.structureFeedbackStatus &&
                        <Button disabled={!meetingDetails?.focusedModules?.length} className="d-flex align-items-center btn-sm" onClick={submitFeedback}><IconContainer color="white" icon={Save} />{'Submit Feedback to Candidate'}</Button>
                    }
                </Col>
            </MeetingDetailsHeader>
            <Main className="m-4">
                {meetingComponent}
                {meetingDetails?.trackId && meetingDetails?.candidateId && meetingDetails?.meetingDetailId && meetingDetails?.serviceType &&
                    <MeetingQuestionComponent
                        trackId={meetingDetails.trackId}
                        candidateId={meetingDetails.candidateId}
                        meetingDetailId={meetingDetails.meetingDetailId}
                        serviceType={meetingDetails.serviceType}
                        onModuleSelectionClose={onModuleSelectionClose}
                        onDelete={onModuleSelectionClose}
                        onQuestionAdd={onQuestionAdd}
                        readonly={meetingDetails?.structureFeedbackStatus === FEEDBACK_TYPES.EXPERT_GIVES_FEEDBACK}
                        setIsQuestionAdded={(status: boolean) => {setIsQuestionAdded(status); getMeetingDetails(_queryParams.meetingDetailId)}}
                    />
                }
            </Main>
        </OuterDiv>
    )
}

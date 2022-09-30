import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { RootState } from "store";
import { Container } from 'react-bootstrap';
import { getLocalDate } from '../../utilities/constants'
import Rating from '@material-ui/lab/Rating';
import RichTextEditor from "../../components/Common/Editors/RichTextEditor";
import { talkToExpertService } from "../../services/talkToExpert";
import { StructuredFeedbackComponent } from './StructuredFeedbackComponent';
import { IFocussedModule } from './meetingTypes';

const Main = styled.div<any>`
    padding: 2rem;

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
        * .textWrapper {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`;

const MeetingCard = styled(Container)`
    background: #FFFFFF;
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin: 10px 0;
    padding: 1rem;
    min-width: 100%;
    @media (min-width: 1200px) {
        max-width: 1190px;
    }
    @media (min-width: 1300px) {
        max-width: 1290px;
    }
`;

const MeetingModulesWrapper = styled.div<any>`
  height: 100px;
`;

const MeetingDetailsComponent = (props: any) => {
    const { experts } = useSelector((state: RootState) => state.talkToExpert);
    const { search } = useLocation();
    const [meetingDetails, setMeetingDetails] = useState<any>();
    const _queryParams: any = queryString.parse(search);

    useEffect(() => {
        talkToExpertService.getMeetingDetails({ meetingDetailId: _queryParams?.meetingDetailId }).then((response) => setMeetingDetails(response.output));
    }, [])

    const getExpertById = (id: string) => experts.find((x: any) => x.expertId === id)?.fullName ?? 'unknown';

    const renderdetails = (label: string, value: any, type: any) => {
        if (type === "link") {
            return <div key={'detail'} className={"detail"}>
                <div className='d-flex'><b>{label}:</b></div>
                <a target="_blank" rel="noopener noreferrer" href={value} className="textWrapper"><small>{value}</small></a>
            </div>
        }
        return <div key={'detail'} className={"detail"}>
            <div className='d-flex'><b>{label} : </b></div>
            <div className="textWrapper"><small dangerouslySetInnerHTML={{ __html: value }}></small></div>
        </div>
    }

    const renderFocusedModules = (label: string, focussedModules: IFocussedModule[]) => {
        return <MeetingModulesWrapper className="mb-3">
                <div className='d-flex'><b>{label} : </b></div>
                <div className="overflow-auto" style={{height: "80%"}}>
                    {focussedModules.map(cat => cat.children.map(subcat => subcat.children.map(cap => <span className='w-100 d-flex mb-1 border-bottom'>{cat.entityTitle + " | " + subcat.entityTitle + " | " + cap.entityTitle}</span>)))}
                </div>
        </MeetingModulesWrapper>

    }

    const renderFeedBack = (label: string, value: any) => {
        return <div className={"w-100 text-left mb-2"}>
            <div><b>{label}</b></div>
            {value.rating && <div className="d-flex align-items-start">
                <Rating
                    name="rating"
                    value={value.rating}
                    disabled={true}
                />
            </div>}
            <RichTextEditor
                disabled={true}
                placeholder="Notes.."
                value={value.comment}
                onChange={() => { }}
                id={'Feedback'}
                customStyles={{ background: 'white', height: '150px', border: '1px solid #ccc', boxShadow: 'none' }}
            />
        </div>
    }

    const renderCandidateNotes = (label: string, notes: string) => {
        return <div className={"w-100 text-left mb-2"}>
            <div><b>{label}</b></div>
            <RichTextEditor
                disabled={true}
                placeholder="Notes.."
                value={notes}
                onChange={() => { }}
                id={'Feedback'}
                customStyles={{ background: 'white', height: '150px', border: '1px solid #ccc', boxShadow: 'none' }}
            />
        </div>
    }

    return (
        <Main>
            <MeetingCard id={'meeting'} className="mt-2">
                <div className="meeting-details">
                    {meetingDetails?.createdAt && renderdetails("Scheduled on", getLocalDate(meetingDetails.createdAt), "")}
                    {meetingDetails?.expertId && renderdetails("Scheduled with", getExpertById(meetingDetails.expertId), "")}
                    {meetingDetails?.meetingTime && renderdetails("Meeting time", getLocalDate(meetingDetails.meetingTime), "")}
                    {meetingDetails?.meetingPurpose && renderdetails("Meeting Title", meetingDetails.meetingPurpose, "")}
                    {meetingDetails?.zoomMeetingId && renderdetails("Zoom meeting ID", meetingDetails.zoomMeetingId, "")}
                    {meetingDetails?.zoomMeetingLink && renderdetails("Zoom meeting link", meetingDetails.zoomMeetingLink, "link")}
                    {meetingDetails?.zoomMeetingPassword && renderdetails("Zoom meeting passcode", meetingDetails.zoomMeetingPassword, "")}
                    {meetingDetails?.zoomMeetingRecordedVideoLink && renderdetails("Zoom meeting video link", meetingDetails.zoomMeetingRecordedVideoLink, "")}
                    {meetingDetails?.zoomMeetingRecordedVideoLinkPassword && renderdetails("Zoom meeting video password", meetingDetails.zoomMeetingRecordedVideoLinkPassword, "")}
                    {meetingDetails?.trackName && renderdetails("Track Name", meetingDetails.trackName, "")}
                    {meetingDetails?.resumeLink && renderdetails("Your Resume Link", meetingDetails.resumeUrl, "link")}
                    {meetingDetails?.candidateFeedback && renderCandidateNotes("Your Questions & Notes to expert", meetingDetails.candidateNotes)}
                    {meetingDetails?.candidateFeedback && renderFeedBack("Your meeting review", meetingDetails.candidateFeedback)}
                    {meetingDetails?.expertFeedback && renderFeedBack("Expert Feedback", meetingDetails.expertFeedback)}
                    {meetingDetails?.focusedModules && renderFocusedModules("Meeting Modules", meetingDetails.focusedModules)}
                </div>
            </MeetingCard>
            {meetingDetails?.focusedModules && !!meetingDetails?.focusedModules.length && <MeetingCard id={'meeting'} className="mt-2">
                <StructuredFeedbackComponent meetingDetailId={_queryParams?.meetingDetailId} expertName={getExpertById(meetingDetails.expertId)} />
            </MeetingCard>}
        </Main>
    );
}
export default MeetingDetailsComponent;
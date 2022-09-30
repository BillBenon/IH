import { Download } from '@styled-icons/boxicons-regular';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Rating from "react-rating";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import RichTextEditor from '../../../components/Common/Editors/RichTextEditor';
import { IconContainer } from '../../../components/Common/IconContainer/IconContainer';
import { meetingService } from '../../../services/meeting';
import { getLocalDate, StorageClient } from '../../../utilities/constants';
import { IFocussedModule, IMeetingDetail } from '../meetingTypes';
import { Collapsible } from './components/Collapsible';
import { MeetingModulesWrapper } from './components/MeetingModulesWrapper';
const Main = styled.div<any>`
    .meeting-details {
        display: flex;
        flex-wrap: wrap;
        padding: 1rem;
        position: relative;

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

interface IMeetingDetailsComponent {
    meeting?: IMeetingDetail
}

const MeetingDetailsComponent = ({ meeting }: IMeetingDetailsComponent) => {
    const [meetingDetails, setMeetingDetails] = useState<IMeetingDetail | undefined>(meeting);
    const { search } = useLocation();
    const _queryParams: any = queryString.parse(search);

    useEffect(() => {
        if (_queryParams.meetingDetailId && !meeting) {
            meetingService.getMeetingDetails({ meetingDetailId: _queryParams.meetingDetailId }).then((response) => {
                setMeetingDetails(response.output)
            })
        } else {
            setMeetingDetails(meeting)
        }
    }, [meeting])

    const getFileNameFromURL = (url: string) => {
        if (url) {
            var m = url.split('/');
            if (m && m.length > 1) {
                return decodeURIComponent(m[m.length - 1]);
            }
        }
        return "";
    }

    const renderdetails = (label: string, value: any) => {
        return <div className={"detail"}>
            <div className='d-flex'><b>{label} : </b></div>
            <div className="textWrapper"><small dangerouslySetInnerHTML={{ __html: value }}></small></div>
        </div>
    }

    const renderFeedBack = (label: string, value: any) => {
        return <div className={"w-100 text-left mb-2"}>
            <div><b>{label}</b></div>
            <RichTextEditor
                disabled={true}
                placeholder="Notes.."
                value={value}
                onChange={() => { }}
                id={'Feedback'}
                customStyles={{ height: '70px' }}
            />
        </div>
    }

    const renderCandidateReview = (label: string, value: any) => {
        return <div className={"w-100 text-left mb-2"}>
            <div><b>{label}</b></div>
            <div className="mt-4">
                <div className="small font-weight-bold">{'Candidate Overall Meeting Experience:'}</div>
                <div className="mb-2">
                    <Rating
                        emptySymbol={<img height={'30px'} width="30px" src={require("./icons/star-empty.png")} />}
                        fullSymbol={<img height={'30px'} width="30px" src={require("./icons/star-fill.png")} />}
                        readonly={true}
                        initialRating={value.rating || 0}
                    />
                </div>
                <div className="small font-weight-bold">{'Candidate views about you:'}</div>
                <RichTextEditor
                    disabled={true}
                    placeholder="Notes.."
                    value={value.comment}
                    onChange={() => { }}
                    id={'candidateNote'}
                    customStyles={{ background: 'white', height: '150px', border: '1px solid #ccc', boxShadow: 'none' }}
                />
            </div>
        </div>
    }

    const renderMeetingModules = (label: string, focussedModules: IFocussedModule[]) => {
        return <MeetingModulesWrapper className='mb-3'>
                <div><b>{label}</b></div>
                <div className="overflow-auto" style={{height: "80%"}}>
                    {focussedModules.map(cat => cat.children?.map(subcat => subcat.children?.map(cap => <span className='w-100 d-flex mb-1 border-bottom'>{cat.entityTitle + " | " + subcat.entityTitle + " | " + cap.entityTitle}</span>)))}
                </div>
        </MeetingModulesWrapper>
    }

    return (
        <Main className="mb-3">
            <MeetingCard id={'meeting'} className="mt-2">
                <div className="meeting-details">
                    <Collapsible
                        title={
                            <>
                                {meetingDetails?.createdAt && renderdetails("Scheduled On", getLocalDate(meetingDetails.createdAt))}
                                {meetingDetails?.candidateName && renderdetails("Scheduled With", meetingDetails.candidateName)}
                                {meetingDetails?.meetingTime && renderdetails("Meeting Time", getLocalDate(meetingDetails.meetingTime))}
                                {meetingDetails?.meetingPurpose && renderdetails("Meeting Title", meetingDetails.meetingPurpose)}
                            </>
                        }
                    >
                        {meetingDetails?.zoomMeetingId && renderdetails("Zoom meeting ID", meetingDetails.zoomMeetingId)}
                        {meetingDetails?.zoomMeetingLink &&
                            <div className="detail">
                                <div><b>Zoom meeting link:</b></div>
                                <a target="_blank" rel="noopener noreferrer" href={meetingDetails.zoomMeetingLink} className="textWrapper"><small>{meetingDetails.zoomMeetingLink}</small></a>
                            </div>}

                        {meetingDetails?.resumeUrl &&
                            <div className="detail">
                                <div><b>Candidate's resume:</b></div>
                                <div><small>
                                    <div className='d-flex align-items-center py-1'>
                                        <span className="mr-1">{getFileNameFromURL(meetingDetails && meetingDetails.resumeUrl)}</span>
                                        <a href={meetingDetails.resumeUrl}  download>
                                            <IconContainer icon={Download} />
                                        </a>
                                    </div>
                                </small></div>
                            </div>}
                        {meetingDetails?.trackName && renderdetails("Track Name", meetingDetails.trackName)}
                        {meetingDetails?.serviceType && renderdetails("Service Type", meetingDetails.serviceType)}
                        {meetingDetails?.focusedModules && renderMeetingModules("Meeting Modules", meetingDetails.focusedModules)}
                        {meetingDetails?.candidateNotes && renderFeedBack("Candidate Questions & Notes to You", meetingDetails.candidateNotes)}
                        {meetingDetails?.expertFeedback && renderFeedBack("Feedback & Notes for Candidate", meetingDetails.expertFeedback.comment)}
                        {meetingDetails?.candidateFeedback && renderCandidateReview("Candidate review for the Meeting", meetingDetails.candidateFeedback)}
                    </Collapsible>
                </div>
            </MeetingCard>
        </Main>
    );
}
export default MeetingDetailsComponent;
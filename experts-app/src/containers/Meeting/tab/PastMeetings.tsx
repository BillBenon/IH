import { UserReceived } from "@styled-icons/remix-fill/UserReceived";
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IconContainer } from '../../../components/Common/IconContainer/IconContainer';
import { SearchButton } from '../../../components/SearchButton';
import { RootState } from '../../../store';
import { getLocalDate, ReviewStatus } from '../../../utilities/constants';
import useCandidate from '../../Candidate/Candidate.utils';
import { Candidates } from '../../Candidate/ICandidate';
import { SubmissionContent } from '../../Feedback/TabContent/Submissions/Submissions.styles';
import useMeeting from '../../Meeting/Meeting.utils';
import CandidateNotesComponent from './components/CandidateNotesComponent';
import CandidateReviewComponent from "./components/CandidateReviewComponent";
import ExpertFeedbackComponent from './components/ExpertFeedbackComponent';
import { MarkAsCloseModal } from './components/MarkAsCloseModal';
import { useHistory } from 'react-router';
import { IFocussedModule } from "../meetingTypes";
import { Collapsible } from "./components/Collapsible";
import { MeetingModulesWrapper } from "./components/MeetingModulesWrapper";

const PastMeetingWrapper = styled.div`
  margin: 10px;
`;

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
    & .textWrapper {
      overflow-wrap: break-word;
    }
  }
`;

interface IPastMeeting {
  navigateToCompletedMeetings: Function;
}

export const PastMeeting: React.FC<IPastMeeting> = ({ navigateToCompletedMeetings }) => {
  const history = useHistory();
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);
  const todayDate = moment().subtract(1, 'd').format('YYYY-MM-DD');

  const [
    {
      getAllCandidatesAssociatedByExpert,
      meetingCandidates,
    },
  ] = useCandidate();

  const [
    {
      meetingLoading,
      meetings,
      resetMeetingList,
      getAllMeetingList
    },
  ] = useMeeting();


  const [candidateId, setCandidateId] = useState('');
  const [startDate, setStartDate] = useState(moment().subtract(2, 'months').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState(moment().subtract(1, 'd').format('YYYY-MM-DD'));
  const [showMarkAsCloseModal, setShowMarkAsCloseModal] = useState<boolean>(false);
  const [meetingId, setMeetingId] = useState<string>();
  const [reviewStatus, setReviewStatus] = useState<string>();

  useEffect(() => {
    getAllCandidatesAssociatedByExpert();
    resetMeetingList();
    getResult();
  }, []);

  const setFormData = (e: any, fieldName: string) => {
    switch (fieldName) {
      case 'candidateId':
        setCandidateId(e.target.value);
        break;
      case 'startDate':
        setStartDate(e.target.value);
        if (e.target.value !== '' && endDate !== '') {
          let start1 = moment(e.target.value);
          let end1 = moment(endDate);
          let diff = end1.diff(start1, 'days');
          if (diff < 0) {
            setEndDate(e.target.value);
          }
        }
        break;
      case 'endDate':
        setEndDate(e.target.value);
        break;
      case 'reviewStatus':
        setReviewStatus(e.target.value);
        break;
    }
  }

  const handleMeetingNotes = (meeting: any) => {
    history.push(`meeting?meetingDetailId=${meeting.meetingDetailId}`)
  }
  
  const getResult = () => {
    const searchObj = {
      meetingType: 'CUSTOM_DATE',
      expertId: expertId,
      candidateId: candidateId,
      startDate: '',
      endDate: '',
      reviewStatus,
    };
    if (startDate !== '') {
      searchObj['startDate'] = moment(startDate).format("MM/DD/YYYY");
    }
    if (endDate !== '') {
      searchObj['endDate'] = moment(endDate).format("MM/DD/YYYY");
    }
    getAllMeetingList(searchObj);
  }

  const handleMarkAsClose = (meetingId: string) => {
    setShowMarkAsCloseModal(true);
    setMeetingId(meetingId);
  }

  const getFileNameFromURL = (url: string) => {
    if (url) {
      var m = url.split('/');
      if (m && m.length > 1) {
        return decodeURIComponent(m[m.length - 1]);
      }
    }
    return "";
  }

  const renderMeetingModules = (label: string, focussedModules: IFocussedModule[]) => {
    return <MeetingModulesWrapper className="mb-3">
      <div><b>{label}</b></div>
      <div className="overflow-auto" style={{height: "80%"}}>
        {focussedModules.map(cat => cat.children?.map(subcat => subcat.children?.map(cap => <span className='w-100 d-flex mb-1 border-bottom'>{cat.entityTitle + " | " + subcat.entityTitle + " | " + cap.entityTitle}</span>)))}
      </div>
    </MeetingModulesWrapper>
  }


  return (
    <PastMeetingWrapper>
      <Form
        style={{ padding: '10px' }}
      >
        <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
          <Col md={9} lg={9} sm={12} className="d-flex pl-0">
            <Col className="mr-0 pr-0" md={3} lg={3} sm={10}>
              <label>Select Candidate</label>
              <select name="candidateId" value={candidateId} onChange={(e) => setFormData(e, 'candidateId')} className="form-control">
                <option value=''>All Candidate</option>
                {meetingCandidates?.map(
                  (data: Candidates, index) => (
                    <option key={index + "candidateId"} value={data.candidateId}>
                      {data.candidateName} ({data.candidateEmail})
                    </option>
                  )
                )}
              </select>
            </Col>

            <Col className="mr-0 pr-0" md={3} lg={3} sm={10}>
              <label>Start Date</label>
              <input type="date" max={todayDate} name="startDate" onChange={(e) => setFormData(e, 'startDate')} value={startDate} placeholder='Start Date' className="form-control" />
            </Col>

            <Col className="mr-0 pr-0" md={3} lg={3} sm={10}>
              <label>End Date</label>
              <input type="date" max={todayDate} disabled={startDate === ''} min={startDate} name="endDate" onChange={(e) => setFormData(e, 'endDate')} value={endDate} placeholder='Start Date' className="form-control" />
            </Col>
            <Col className="mr-0 pr-0" md={3} lg={3} sm={10}>
              <label>Meeting Review</label>
              <select name="reviewStatus" value={reviewStatus} onChange={(e) => setFormData(e, 'reviewStatus')} className="form-control">
                <option value={undefined}>All</option>
                <option value={ReviewStatus.expertViewedReview}>{'Meeting with seen reviews'}</option>
                <option value={ReviewStatus.candidateGivesReview}>{'Meeting with unseen reviews'}</option>
              </select>
            </Col>
            <Col md={3} lg={3} sm={10}>
              <label>&nbsp;</label>
              <SearchButton
                type="button"
                onClick={getResult}
                style={{ width: '200px' }}
              >
                {(meetingLoading) ? 'Loading...' : 'Show Meetings'}
              </SearchButton>
            </Col>
          </Col>
        </Row>
      </Form>

      <Main>
        {meetings.map((meeting, ind) => (
          <div className="d-flex">
            {meeting.candidateFeedback && meeting.reviewStatus !== ReviewStatus.expertViewedReview && <IconContainer icon={UserReceived} tooltip="Review Received" />}
            <SubmissionContent key={'meeting' + ind} id={'meeting' + meeting.id}>
              <div className="meeting-details">
                <Collapsible
                  title={
                    <>
                      <div className="detail">
                        <div><b>Scheduled On:</b></div>
                        <div><small>{getLocalDate(meeting.createdAt)}</small></div>
                      </div>
                      <div className="detail">
                        <div><b>Scheduled With:</b></div>
                        <div><small>{meeting.candidateName}</small></div>
                      </div>
                      <div className="detail">
                        <div><b>Meeting Time</b></div>
                        <div><small>{getLocalDate(meeting.meetingTime)}</small></div>
                      </div>
                      <div className="detail">
                        <div><b>Meeting Title</b></div>
                        <div><small>{meeting.meetingPurpose}</small></div>
                      </div>
                    </>
                  }  
                >
                  <div className="detail">
                    <div><b>Zoom meeting ID</b></div>
                    <div><small>{meeting.zoomMeetingId}</small></div>
                  </div>
                  <div className="detail">
                    <div><b>Zoom meeting link</b></div>
                    <div><a target="_blank" rel="noopener noreferrer" href={meeting.zoomMeetingLink} className="textWrapper"><small>{meeting.zoomMeetingLink}</small></a></div>
                  </div>
                  <div className="detail">
                    <div><b>Track name</b></div>
                    <div className='textWrapper'><small>{meeting.trackName || "Not available"}</small></div>
                  </div>
                  <div className="detail">
                  <div><b>Service Type</b></div>
                  <div className='textWrapper'><small>{meeting.serviceType || "Not available"}</small></div>
                </div>
                  <div className="detail">
                    <div><b>Candidate's resume</b></div>
                    <div><small>
                      {meeting.resumeUrl ? <div className='d-flex align-items-center py-1'>
                        <span className="mr-1">{getFileNameFromURL(meeting.resumeUrl)}</span>
                      </div>
                        : 'Not available'}</small></div>
                  </div>
                  {meeting?.focusedModules && renderMeetingModules("Meeting Modules", meeting.focusedModules)}
                  <div className="detail col-12 p-0 mb-3">
                    <CandidateNotesComponent meeting={meeting} />
                  </div>
                  {meeting.candidateFeedback && <div className="detail col-12 p-0 mb-3">
                    <CandidateReviewComponent meeting={meeting} getMeetings={getResult} />
                  </div>}
                  <div className="detail col-12 p-0 mb-3">
                    <ExpertFeedbackComponent meeting={meeting} getMeetings={getResult} />
                  </div>
                  <div className="d-flex justify-content-end">
                    {!meeting.meetingStatus && <Button className="btn=sm" onClick={() => handleMarkAsClose(meeting.meetingDetailId)}>{'Mark as Close'}</Button>}
                    <Button className="ml-2 btn-sm" onClick={() => handleMeetingNotes(meeting)}>{'Feeedback Details'}</Button>
                  </div>
                </Collapsible>
              </div>
            </SubmissionContent>
          </div>
        ))}
        {showMarkAsCloseModal && meetingId && <MarkAsCloseModal
          showMarkAsClose={showMarkAsCloseModal}
          setShowMarkAsCloseModal={(val: boolean) => { setShowMarkAsCloseModal(val); setMeetingId(undefined) }}
          onSubmitSuccess={navigateToCompletedMeetings}
          meetingId={meetingId}
        />}
      </Main>
    </PastMeetingWrapper>
  )
}
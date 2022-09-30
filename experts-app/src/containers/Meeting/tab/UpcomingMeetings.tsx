import { Download } from '@styled-icons/boxicons-regular';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { candidateService } from 'services/candidate';
import styled from 'styled-components';
import { downloadFile } from 'utilities/commonUtils';
import { IconContainer } from '../../../components/Common/IconContainer/IconContainer';
import { SearchButton } from '../../../components/SearchButton';
import { RootState } from '../../../store';
import { getLocalDate } from '../../../utilities/constants';
import useCandidate from '../../Candidate/Candidate.utils';
import { Candidates } from '../../Candidate/ICandidate';
import { SubmissionContent } from '../../Feedback/TabContent/Submissions/Submissions.styles';
import useMeeting from '../../Meeting/Meeting.utils';
import { GetMeetingRequest } from '../IMeeting';
import { IFocussedModule } from '../meetingTypes';
import CandidateNotesComponent from './components/CandidateNotesComponent';
import { Collapsible } from './components/Collapsible';
import { MeetingModulesWrapper } from './components/MeetingModulesWrapper';

const UpcomingMeetingWrapper = styled.div`
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

export const UpcomingMeeting: React.FC = () => {
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);
  const searchObj: GetMeetingRequest = {
    meetingType: 'TODAY',
    expertId: expertId,
    candidateId: '',
    startDate: '',
    endDate: ''
  }
  const todayDate = moment().format('YYYY-MM-DD');

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
      getAllMeetingList,
    },
  ] = useMeeting();

  const history = useHistory();

  const [meetingType, setMeetingType] = useState('TODAY');
  const [candidateId, setCandidateId] = useState('');
  const [startDate, setStartDate] = useState(todayDate);
  const [endDate, setEndDate] = useState(todayDate);

  useEffect(() => {
    getAllCandidatesAssociatedByExpert();
    resetMeetingList();
    getAllMeetingList(searchObj);
  }, []);


  const setFormData = (e: any, fieldName: string) => {
    switch (fieldName) {
      case 'meetingType':
        setMeetingType(e.target.value);
        break;
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
    }
  }

  const handleMeetingNotes = (meeting: any) => {
    history.push(`meeting?meetingDetailId=${meeting.meetingDetailId}`)
  }

  const getResult = () => {
    const searchObj = {
      meetingType: meetingType,
      expertId,
      candidateId: candidateId,
      startDate: '',
      endDate: ''
    };
    if (startDate !== '') {
      searchObj['startDate'] = moment(startDate).format("MM/DD/YYYY");
    }
    if (endDate !== '') {
      searchObj['endDate'] = moment(endDate).format("MM/DD/YYYY");
    }
    getAllMeetingList(searchObj);
  }

  const renderMeetingModules = (label: string, focussedModules: IFocussedModule[]) => {
    return <MeetingModulesWrapper className="mb-3">
      <div><b>{label}</b></div>
      <div className="overflow-auto" style={{height: "80%"}}>
        {focussedModules.map(cat => cat.children?.map(subcat => subcat.children?.map(cap => <span className='w-100 d-flex mb-1 border-bottom'>{cat.entityTitle + " | " + subcat.entityTitle + " | " + cap.entityTitle}</span>)))}
      </div>
    </MeetingModulesWrapper>
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

  const getResumeFromS3 = (url: string) => {
    candidateService.getSignedURLToGETFile({
      expertId: expertId,
      path: url
    }).then(res => {
      downloadFile(res.output.url);
    })
  }

  return (
    <UpcomingMeetingWrapper>
      <Form
        style={{ padding: '10px 0' }}
      >
        <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
          <Col md={10} lg={10} sm={12} className="d-flex pl-0 justify-content-between">
            <div className='d-flex align-items-center w-100'>
              <Col className="mr-0 px-0" md={3} lg={3} sm={10}>
                <label>Meeting For</label>
                <select name="meetingType" value={meetingType} className="form-control" onChange={(e) => setFormData(e, 'meetingType')}>
                  <option value='TODAY'>Today</option>
                  <option value='THIS_WEEK'>This Week</option>
                  <option value='CUSTOM_DATE'>Custom Date</option>
                </select>
              </Col>
              <Col className="mr-0 pr-0" md={3} lg={3} sm={10}>
                <label>Select Candidate</label>
                <select name="candidateId" value={candidateId} onChange={(e) => setFormData(e, 'candidateId')} className="form-control">
                  <option value=''>All Candidate</option>
                  {meetingCandidates?.map(
                    (data: Candidates, index: number) => (
                      <option key={index + "candidateId"} value={data.candidateId}>
                        {data.candidateName} ({data.candidateEmail})
                      </option>
                    )
                  )}
                </select>
              </Col>

              {(meetingType === 'CUSTOM_DATE') ?
                <Col className="mr-0 pr-0" md={3} lg={3} sm={10}>
                  <label>Start Date</label>
                  <input type="date" min={todayDate} name="startDate" onChange={(e) => setFormData(e, 'startDate')} value={startDate} placeholder='Start Date' className="form-control" />
                </Col> : ''}

              {(meetingType === 'CUSTOM_DATE') ?
                <Col className="mr-0 pr-0" md={3} lg={3} sm={10}>
                  <label>End Date</label>
                  <input type="date" disabled={startDate === ''} min={startDate} name="endDate" onChange={(e) => setFormData(e, 'endDate')} value={endDate} placeholder='Start Date' className="form-control" />
                </Col> : ''}
            </div>

            <Col md={2} lg={2} sm={10}>
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
          <SubmissionContent className="mt-2" key={'meeting' + ind} id={'meeting' + meeting.meetingDetailId}>
            <div className="meeting-details">
            <Collapsible 
              title={
                <>
                  <div className="detail">
                    <div><b>Scheduled on:</b></div>
                    <div><small>{getLocalDate(meeting.createdAt)}</small></div>
                  </div>
                  <div className="detail">
                    <div><b>Scheduled with:</b></div>
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
                  <div><b>Zoom Meeting Link</b></div>
                  <div className='textWrapper'><a target="_blank" rel="noopener noreferrer" href={meeting.zoomMeetingLink} className="textWrapper"><small>{meeting.zoomMeetingLink}</small></a></div>
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
                      <a href="#" onClick={() => (getResumeFromS3(meeting.resumeUrl))}>
                        <IconContainer icon={Download} />
                      </a>
                    </div>
                      : 'Not available'}</small></div>
                </div>
                {meeting?.focusedModules && renderMeetingModules("Meeting Modules", meeting.focusedModules)}
                <div className="detail col-12 p-0 mb-3">
                  <CandidateNotesComponent meeting={meeting} />
                </div>
                <div className="d-flex justify-content-end">
                  <Button className="btn-sm" onClick={() => handleMeetingNotes(meeting)}>{meeting.structureFeedbackStatus ? "View Meeting Details" : 'Start Candidate Meeting'}</Button>
                </div>
            </Collapsible>
            </div>
          </SubmissionContent>
        ))}
      </Main>
    </UpcomingMeetingWrapper>
  )
}


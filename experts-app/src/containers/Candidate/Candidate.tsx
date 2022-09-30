import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { candidateService } from 'services/candidate';
import styled from 'styled-components';
import { buildUrlWithParams } from 'utilities/commonUtils';
import { SearchButton } from '../../components/SearchButton';
import { API_STATUSES, BASE_PORTAL_URL, DEFAULT_TOKEN } from '../../utilities/constants';
import useCandidate from './Candidate.utils';
import { Candidates, CandidateTrack } from './ICandidate';
import './styles.css';


const CandidateWrapper = styled.div`
  margin: 10px;
`;

export const Candidate: React.FC = () => {
  const [
    {
      loading,
      getAllCandidatesAssociatedByExpert,
      getCandidateTrackList,
      resetTrackList,
      feedbackCandidates,
      trackList,
      expertId,
    },
  ] = useCandidate();
  const [candidateId, setCandidateId] = useState('');
  const [trackId, setTrackId] = useState('');

  useEffect(() => {
    resetTrackList();
    getAllCandidatesAssociatedByExpert();
  }, []);

  const handleCandidateChange = (event: any, fieldName: string) => {
    if (fieldName === 'candidateId') {
      setCandidateId(event.target.value);
      const candidateObj = feedbackCandidates.filter((elem: Candidates) => {
        return elem.candidateId === event.target.value;
      });
      getCandidateTrackList(candidateObj[0]);
      setTrackId('');
    }
    else if (fieldName === 'trackId') {
      setTrackId(event.target.value);
    }
  };

  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleCandidateFilter = async (event: any) => {
    event.preventDefault();
    setIsRedirecting(true)
    if (candidateId !== '' && trackId !== '') {
      const response = await candidateService.getCandidateAuthorizationToken({expertId, token: DEFAULT_TOKEN, candidateId});
      if (response.apiStatus === API_STATUSES.SUCCESS) {
        const {authorizationToken: token} = response.output;
        let urlParams =  {
          candidateId, 
          trackid: trackId, 
          authorizationToken: token,
          lpflowtype: "enroll"
        }
        const url = buildUrlWithParams(BASE_PORTAL_URL, urlParams);
        window.open(url);
      } else {
        toast.error("Something went wrong");
      }
    }
    setIsRedirecting(false)
  }

  return (
    <CandidateWrapper>
      <Form
        style={{ padding: '10px' }}
      >
        <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
          <Col md={9} lg={9} sm={12} className="d-flex pl-0">
            <Col className="mr-0 pr-0" md={4} lg={4} sm={10}>
              <select name="candidateId" className="form-control" onChange={(e) => handleCandidateChange(e, 'candidateId')}>
                <option value={''}>{(loading) ? 'Loading...' : 'Select Candidate'}</option>
                {feedbackCandidates?.map(
                  (data: Candidates, index) => (
                    <option key={index + "candidateId"} value={data.candidateId}>
                      {data.candidateName} ({data.candidateEmail})
                    </option>
                  )
                )}
              </select>
            </Col>
            <Col className="mr-0 pr-0" md={4} lg={4} sm={10}>
              <select name="trackId" value={trackId} className="form-control" onChange={(e) => handleCandidateChange(e, 'trackId')}>
                <option value={''}>{'Select Candidate Track'}</option>
                {trackList?.map(
                  (data: CandidateTrack, index) => (
                    <option key={index} value={data.candidateTrackId}>
                      {data.title}
                    </option>
                  )
                )}
              </select>
            </Col>
            <Col md={4} lg={4} sm={10}>
              <SearchButton
                onClick={(e) => handleCandidateFilter(e)}
                disabled={loading || isRedirecting}
                type="submit"
                style={{ width: '200px' }}
              >
                {'Go to Candidate Track'}
              </SearchButton>
            </Col>
          </Col>
        </Row>
      </Form>
    </CandidateWrapper>
  );
};

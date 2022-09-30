import ExpertInfo from 'components/ExpertInfo';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { talkToExpertService } from 'services/talkToExpert';
import { RootState } from 'store';
import styled from 'styled-components';
import { IGetExpertsFreeMeetingCount } from 'utilities/types';
import { Candidate_Id, PlanType } from 'utilities/constants';

const PageHeading = styled.div`
  .text {
    font-size: 1.275rem;
    color: #3f4254!important;
    font-weight: bold;
    text-align: left;
  }
  .subText {
    text-align: left;
    color: #b5b5c3!important
  }
`;

interface IExpertCards {
  experts: any[],
  handleCtaAction: Function
}

interface IExpertMeetingCountRes {
  expertId: string,
  totalFreeMeetings: number,
}

export const ExpertCards = (props: IExpertCards) => {
  const { experts = [] } = props;
  const { trackId, trackPlan } = useSelector((state: RootState) => state.payment);
  const [meetingCounts, setMeetingCount] = useState<IExpertMeetingCountRes[]>([]);

  const getMeetingCounts = async () => {
    const candidateId = getValueBrowserStorage(Candidate_Id);
    if (candidateId) {
      const input: IGetExpertsFreeMeetingCount = {
        candidateId,
        trackId,
        expertIds: experts?.map(ex => ex.expertId) || []
      };
      const data = await talkToExpertService.getExpertsFreeMeetingCount(input)
      setMeetingCount(data.output.meetingDetails as IExpertMeetingCountRes[]);
    }
  }

  useEffect(() => {
    if (experts && experts.length) {
      getMeetingCounts();
    }
  }, [experts])
  
  return (
    <>
      <PageHeading>
        {trackPlan === PlanType.Free && <div className="text mb-2">{'You will get a free career consultancy session worth $200'}</div>}
        {trackPlan === PlanType.Free && <div className="subText mb-3">{'You can consult experts for any of your career related queries & concerns.'}</div>}
      </PageHeading>
      {experts?.map((expertDetail: any) => <ExpertInfo
        fullname={expertDetail.fullName}
        workingAt={expertDetail.workingAt}
        profile={expertDetail.profile}
        isProfileExpanded={true}
        email={expertDetail.email}
        expertCategory={expertDetail.expertCategory}
        customStyle={{ boxShadow: 'none', border: 'none' }}
        photoURL={expertDetail.photoURL}
        onCtaAction={() => props.handleCtaAction(expertDetail)}
        ctaDisabled={!meetingCounts?.every((m : any)=> !m.totalFreeMeetings)}
        ctaText={meetingCounts?.every((m : any)=> !m.totalFreeMeetings) ? 'Book Free Meeting': 'Already Booked'}
      />)}
    </>
  )
}

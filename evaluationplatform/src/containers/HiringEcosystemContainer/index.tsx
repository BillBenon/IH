import { ButtonsBar } from 'components/Common/ButtonsBar';
import { ComingSoonText } from 'pages/ExpertVideoPage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { AirtableTrackMapping } from 'utilities/constants';
import { Jobs } from './Jobs';

const StyledHiringEcosystemContainer = styled.div`
  padding-top: 20px;
  padding-left: ${(props) => props.theme.isMaximizeContent ? '0px' : '78px'};
  transition: 1s;
  margin-top: 57px;
  .frame {
    background: transparent;
    border: 1px solid #ccc;;
    height: 80vh;
    width: 100%;
  }
`;

const HiringEcosystemButtons = {
  InterviewBank: "InterviewBank",
  Jobs: "Jobs",
  ApplyForYou: "ApplyForYou"
}

const PageButtons = [
  { label: 'Interview Bank', value: HiringEcosystemButtons.InterviewBank },
  { label: 'Jobs', value: HiringEcosystemButtons.Jobs },
  { label: 'Apply for you', value: HiringEcosystemButtons.ApplyForYou }
]

export const HiringEcosystemContainer = (props: any) => {
  const [selectedButton, setSelectedButton] = useState<string>(HiringEcosystemButtons.InterviewBank);
  const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
  const trackName = candidateInfo?.lastCandidateSavedSetting?.lastCandidateTrackWorkedOn;

  const btnSelectHandler = (button: string) => {
    setSelectedButton(button);
  }

  const urlsuffix = "?backgroundColor=blue&viewControls=on";

  return (
    <StyledHiringEcosystemContainer {...props}>
      <ButtonsBar
        buttonsInfo={PageButtons}
        selectedPage={selectedButton}
        handleClick={btnSelectHandler}
      />
      <div>
        {selectedButton === HiringEcosystemButtons.InterviewBank && <>
          {(trackName && AirtableTrackMapping[trackName]) ?
            <iframe
              id="hiringEcosystem"
              title="Hiring Ecosystem"
              src={AirtableTrackMapping[trackName] + urlsuffix}
              frameBorder="0"
              className="frame">
            </iframe> :
            <div>No Data Found</div>}
        </>}
        {selectedButton === HiringEcosystemButtons.Jobs && <Jobs history={props.history}/>}
        {selectedButton === HiringEcosystemButtons.ApplyForYou && <ComingSoonText />}
      </div>
    </StyledHiringEcosystemContainer>
  )
}

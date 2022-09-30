import React, { useState } from 'react';
import styled from 'styled-components';
import { ButtonsBar } from '../../components/Common/ButtonsBar';
import './styles.css';
import { useHistory } from "react-router";
import CandidateReportModal from "./CandidateReportModal";
import { PlusCircleFill } from '@styled-icons/bootstrap/PlusCircleFill';
import { CapsuleButton } from '../../components/Common/CapsuleButton';

const StyledPlusCircleFill = styled(PlusCircleFill)`
  width: 20px;
  height: auto;
  fill:#5B94E3;
`;

const ClassesWrapper = styled.div`
  margin: 10px;
  .frame {
    background: transparent;
    border: 1px solid #ccc;;
    height: 80vh;
    width: 100%;
    padding-top: 40px;
  }

  .sub-menu{
    display: flex;
    justify-content: space-between;
    gap: 2em;
    font-size: 20px;
    font-weight: bold;
    margin: 1em;
  }

  .feedback-candidate{
    margin: 1em 15px 0 0;
      :hover{
        color:blue !important;
      }
  }

`;

const Buttons = {
  CLASSES_FEEDBACK: "classesFeedback"
}

interface IPageButtons {
  label: string;
  value: string;
  children?: any;
}

const PageButtons: IPageButtons[] = [
  { label: 'Classes Feedback', value: Buttons.CLASSES_FEEDBACK }
]

export const Classes: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>(
    PageButtons[0].value
  );
  const [showCandidateReport, setShowCandidateReport] = useState(false);
  const history = useHistory();
  const AirtableTrackMapping = "https://airtable.com/embed/shriBcg1KnEPTKWwb/tblogkhHHjQi9ydhA";
  const urlsuffix = "?backgroundColor=blue&viewControls=on";

  const btnSelectHandler = (selectedValue: any) => {
    setSelectedButton(selectedValue);
    history.replace({
      pathname: '/classes',
    });
  };

  return (
    <ClassesWrapper>
      <ButtonsBar
        buttonsInfo={PageButtons}
        selectedPage={selectedButton}
        onClickHandler={btnSelectHandler}
      />
      <div className='sub-menu'>
        <a className='text-body feedback-candidate' href="https://airtable.com/shrbhlr9d45qTbNF0" target='_blank' rel="noopener noreferrer">
          <span style={{ display: "flex" }}>
          Provide Feedback to Candidate <StyledPlusCircleFill className="ml-1 text-body" />
          </span>
        </a>

          <CapsuleButton
            onClick={() => setShowCandidateReport(true)}
            text={`Provide Feedback Report URL For Candidate`}
            type="button"
            hideCount={true}
            active={true}
          />
        
      </div>
      <div className="content">
        <iframe
          id="classes"
          title="Classes"
          src={AirtableTrackMapping + urlsuffix}
          frameBorder="0"
          className="frame">
          </iframe>
      </div>
      {showCandidateReport && (
        <CandidateReportModal
          isOpen={showCandidateReport}
          closeCandidateReportModal={() => setShowCandidateReport(false)}
        />
      )}
    </ClassesWrapper>
  );
};

import { css } from '@emotion/core';
import { MainHeader, Sidebar } from 'containers';
import { ScorePage, TrackStatusPage } from 'pages';
import { TrackPlan } from 'pages/TrackPlan';
import { YourSuccessPathPage } from 'pages/YourSuccessPathPage';
import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { RootState } from 'store';
import { getDashboardInfo, getDetailsForCandidatebyCandidateTrackId, getStatusScore, setCapability, setQuestionId } from 'store/evaluationPlatform';
import styled from 'styled-components';
import { DashboardView, DEFAULT_TOKEN } from 'utilities/constants';
import { isPlacementTrack } from 'utilities/helperFunctions';
import CustomPlanCTAModal from "components/Modals/CustomPlanCTAModal"

const StyledDashboardPage = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    z-index: 100;
    position: fixed;
    width: 100%;
  }
  .button-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: solid 2px #efefef;
  }
  .page-title {
    margin-left: 20px;
    color: #5b94e3;
    font-size: 20px;
    font-weight: bold;
  }
  .main-content {
    height: 100%;
    background-color: #eff2f5;
    justify-content: center;
    align-items: center;
    position: relative;
  }
`;

const StyledMainPage = styled.div`
  padding-top: 20px;
    padding-left: ${(props) => props.theme.isMaximizeContent ? '0px' : '78px'};
    transition: 1s;
    margin-top: 57px;
    display: flex;
    flex-direction: column;
    width: ${(props) => props.theme.isMaximizeContent ? '100%' : 'calc(100% - 78px)'};
    height: calc(100vh - 80px);

  .report-message{
    position : absolute;
    top: 50%;
    left: 35%;
    font-size: 18px;
    color: grey;
  }
`;

const PageSelectButton = styled.button<any>`
  margin-left: 50px;
  border-radius: 20px;
  width: fit-content;
  height: 36px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  transition: 0.3s;
  background: ${(props) => (props.custom ? '#5B94E3' : '#e9e9e9')};
  color: ${(props) => (props.selected ? '#5B94E3' : props.custom ? 'white' : 'black')};
  padding: 9px 15px;
  cursor: pointer;
  font-family: Khula;
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  overflow: hidden;
`;

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  display: block;
`;


const DashboardPage: React.FC<any> = (props) => {
  const [selectedPage, selectPage] = useState(DashboardView.TrackPlan);
  let [isMaximizeContent, setMaximizeContent] = useState(false);
  let candidateTrackId = useSelector((state: any) => state.evaluationPlatform?.currentTrack?.candidate?.lastCandidateSavedSetting?.lastCandidateTrackIDWorkedOn)
  const apiReportUrl = useSelector((state: RootState) => state.evaluationPlatform.currentTrack?.candidateTrack?.[0].reportUrl);
  const enrollmentType = useSelector((state: RootState) => state.evaluationPlatform.currentTrack?.candidateTrack[0]?.trackEnrollType);
  const reportUrl = apiReportUrl && new URL(apiReportUrl)
  if (reportUrl) {
    reportUrl.pathname = `embed${reportUrl.pathname}`;
  }

  const [dashboardData, setDashBoardData] = useState<any>({})
  const [statusScore, setStatusScore] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true);
  const [isShowCustomPlanCTAModal, setShowCustomPlanCTAModal] = useState<boolean>(false);

  const urlSuffix = "?backgroundColor=yellow&viewControls=on";
  let pageContent: JSX.Element;
  switch (selectedPage) {
    case DashboardView.Score:
      pageContent = <ScorePage
        setQuestionId={props.setQuestionId}
        setCapability={props.setCapability}
        statusScore={statusScore} />;
      break;
    case DashboardView.TrackStatus:
      pageContent = <TrackStatusPage
        setQuestionId={props.setQuestionId}
        setCapability={props.setCapability}
        dashboardData={dashboardData} />;
      break;
    case DashboardView.SuccessPath:
      pageContent = <YourSuccessPathPage />
      break;
    case DashboardView.TrackPlan:
      pageContent = <TrackPlan />
      break;
    case DashboardView.ClassesReport:
      pageContent = reportUrl ? <iframe
        id="Classes"
        title="Classes"
        src={reportUrl.toString() + urlSuffix}
        frameBorder="0"
        style={{
          background: "transparent",
          border: "1px solid #ccc",
          height: "80vh",
          width: "100%"
        }}>
      </iframe> : <div className="report-message">Talk to your class instructors for your feedback report.</div>
      break;
  }

  const handleClickTrackStatus = () => {
    selectPage(DashboardView.TrackStatus);
  };

  const handleClickSuccessPath = () => {
    selectPage(DashboardView.SuccessPath);
  }

  const handleClickScore = () => {
    selectPage(DashboardView.Score);
  };

  const handleTrackPlan = () => {
    selectPage(DashboardView.TrackPlan);
  };

  const handleCustomTrackPlan = () => {
    setShowCustomPlanCTAModal(true);
  }

  const handleMaximizeContent = () => {
    setMaximizeContent(!isMaximizeContent);
  };

  const handleClickClasses = () => {
    selectPage(DashboardView.ClassesReport);
  };

  const ButtonsBar = () => { 
    if(!enrollmentType) return <></>;
    return (<div className="button-bar">
      <span className="page-title">Dashboard</span>
      {!isPlacementTrack() && <PageSelectButton selected={selectedPage === DashboardView.TrackPlan} onClick={handleTrackPlan}>
        Track Plan
      </PageSelectButton>}
      <PageSelectButton onClick={handleCustomTrackPlan} custom>
        Your Custom Plan
      </PageSelectButton>
      {false && <PageSelectButton disabled={true} selected={selectedPage === DashboardView.SuccessPath} onClick={handleClickSuccessPath}>
        Your Success Path
      </PageSelectButton>}
      <PageSelectButton selected={selectedPage === DashboardView.TrackStatus} onClick={handleClickTrackStatus}>
        {!isPlacementTrack() ? 'Track Status' : 'Questions Status'}
      </PageSelectButton>
      <PageSelectButton selected={selectedPage === DashboardView.Score} onClick={handleClickScore}>
        Score
      </PageSelectButton>
      {!isPlacementTrack() && <PageSelectButton selected={selectedPage === DashboardView.ClassesReport} onClick={handleClickClasses}>
        Classes Report
      </PageSelectButton>}
    </div>);
  };


  useEffect(() => {
    if (!candidateTrackId) {
      candidateTrackId = getValueBrowserStorage('candidateTrackId')
    }
    const payload = {
      token: DEFAULT_TOKEN,
      candidateTrackId,
    }
    Promise.all([props.getDashboardInfo(payload), props.getStatusScore(payload), props.getDetailsForCandidatebyCandidateTrackId(payload)])
      .then((res: any) => {
        setDashBoardData(res[0].payload.output)
        setStatusScore(res[1].payload.output)
      }).finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    if(isPlacementTrack()) {
      selectPage(DashboardView.TrackStatus);
    } else {
      selectPage(DashboardView.TrackPlan);
    }
  }, [enrollmentType])

  const MainContent = () => <div className="main-content">{pageContent}</div>;

  return (
    <StyledDashboardPage>
      <Sidebar isMaximizeContent={isMaximizeContent}/>
      <div className="content">
        <div className="header">
          <MainHeader isMaximizeContent={isMaximizeContent} handleMaximizeContent={handleMaximizeContent} color="#315cd5" />
        </div>

        <StyledMainPage theme={{ isMaximizeContent }}>
          <ButtonsBar />
          {loading ?
            <BeatLoader css={override} color={'#3694D7'} loading={props.loading} /> :
            <MainContent />
          }
        </StyledMainPage>
      </div>
      <CustomPlanCTAModal isShowCustomPlanCTA={isShowCustomPlanCTAModal} hideCustomPlanCTA={() => setShowCustomPlanCTAModal(false)}/>
    </StyledDashboardPage>
  );
};

export default connect(null, {
  getStatusScore,
  getDashboardInfo,
  getDetailsForCandidatebyCandidateTrackId,
  setCapability,
  setQuestionId
})(DashboardPage)
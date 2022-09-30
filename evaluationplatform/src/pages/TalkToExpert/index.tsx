import { MainHeader, Sidebar } from 'containers';
import { TalkToExpertContainer } from 'containers/TalkToExpert';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getDetailsForCandidatebyCandidateTrackId
} from 'store/evaluationPlatform';
import styled from 'styled-components';

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
  .main {
    padding-top: 20px;
    padding-left: ${(props) => props.theme.isMaximizeContent ? '0px' : '78px'};
    margin-top: 57px;
    display: flex;
    transition: 1s;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 80px);
  }
  
  .page-title {
    margin-left: 20px;
    color: #5b94e3;
    font-size: 20px;
    font-weight: bold;
  }
  .main-content {
    height: 100%;
  }
`;

const mapStateToProps = (state: any) => ({
  currentTrack: state.evaluationPlatform.currentTrack,
});

const mapDispatchToProps = {
  getDetailsForCandidatebyCandidateTrackId,
}

export const TalkToExpertPage: React.FC<any> = (props) => {
  let [isMaximizeContent, setMaximizeContent] = useState(false);

  const handleMaximizeContent = () => {
    setMaximizeContent(!isMaximizeContent);
  };

  return (
    <StyledDashboardPage theme={{ isMaximizeContent }}>
      <Sidebar isMaximizeContent={isMaximizeContent} />
      <div className="content">
        <div className="header">
          <MainHeader color="#315cd5" isMaximizeContent={isMaximizeContent} handleMaximizeContent={handleMaximizeContent} />
        </div>
        <div className="main">
          <TalkToExpertContainer {...props} />
        </div>
      </div>
    </StyledDashboardPage>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TalkToExpertPage);
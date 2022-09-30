import React from 'react';
import { Settings } from '@styled-icons/material/Settings';
import styled from 'styled-components';

const StyledIcon = styled(Settings)`
  color: #bfbfbf;
  width: 100px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .image-panel {
    margin-top: -50px;
  }
  .coming-soon-text {
    margin-top: 20px;
    font-size: 20px;
    color: grey;
  }
  .description-text {
    margin-top: 20px;
    font-size: 18px;
    color: grey;
  }
`;

const ImagePanel = () => (
  <div className="image-panel">
    <StyledIcon />
  </div>
);
const ComingSoonText = () => <div className="coming-soon-text">Coming soon...</div>;
const DescriptionText = () => <div className="description-text">Here you will see other settings.</div>;

export const OtherSettingsPage = () => {
  return (
    <StyledContainer>
      <ImagePanel />
      <ComingSoonText />
      <DescriptionText />
    </StyledContainer>
  );
};

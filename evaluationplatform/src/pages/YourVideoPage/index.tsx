import React from 'react';
import { Youtube } from '@styled-icons/entypo-social/Youtube';
import styled from 'styled-components';

const StyledIcon = styled(Youtube)`
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
const DescriptionText = () => <div className="description-text">Here you will see your video with expert.</div>;

export const YourVideoPage = () => {
  return (
    <StyledContainer>
      <ImagePanel />
      <ComingSoonText />
      <DescriptionText />
    </StyledContainer>
  );
};

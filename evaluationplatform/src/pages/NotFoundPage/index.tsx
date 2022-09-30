import React from 'react';
import styled from 'styled-components';

const StyledNotFoundPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  .not-found-status-code {
    font-size: 12vw;
  }
  .not-found-title {
    font-size: 2vw;
    font-weight: bold;
  }
`;

export const NotFoundPage = () => {
  return (
    <StyledNotFoundPage>
      <div className="not-found-status-code">404</div>
      <div className="not-found-title">Page Not Found</div>
    </StyledNotFoundPage>
  );
};

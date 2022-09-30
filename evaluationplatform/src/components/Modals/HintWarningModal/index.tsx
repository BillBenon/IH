import React from 'react';
import { RoundButton } from 'components';
import styled from 'styled-components';

const HintWarningModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StyledHeaderContainer = styled.div`
  font-size: 25px;
  font-weight: bold;
  text-align: left;
  width: 100%;
`;
const StyledContentContainer = styled.div`
  width: 100%;
  margin-top: 60px;
  text-align: left;
`;
const StyledButtonContainer = styled.div`
  margin-top: 60px;
`;
export const HintWarningModal = (props: any) => {
  const Modal = props.Modal;
  const HintWarningHeader = () => {
    return <StyledHeaderContainer>Hint(s)</StyledHeaderContainer>;
  };
  const HintWarningContent = () => {
    return (
      <StyledContentContainer>
        Use hints wisely because every time you ask for a hint, it will be deducted from your overall score.
      </StyledContentContainer>
    );
  };
  const HintWarningButton = (props: any) => {
    return (
      <StyledButtonContainer>
        <RoundButton
          onClick={() => {
            props.hideHintWarning();
            props.setShowHint(true);
          }}
        >
          I Acknowledge
        </RoundButton>
      </StyledButtonContainer>
    );
  };
  return (
    <Modal
      isOpen={props.isShowHintWarning}
      onRequestClose={props.hideHintWarning}
      contentLabel="Hint Warning Modal"
      style={{
        overlay: {
          left: '361px',
          background: 'rgba(0, 0, 0, 0.44)',
        },
        content: {
          position: 'absolute',
          top: 'calc(50% - 110px)',
          left: '213px',
          right: '208px',
          bottom: 'unset',
          border: '1px solid rgb(204, 204, 204)',
          background: 'white',
          overflow: 'auto',
          borderRadius: '10px',
          outline: 'none',
          padding: '40px 50px',
          height: '240px',
        },
      }}
    >
      <HintWarningModalContainer>
        <HintWarningHeader />
        <HintWarningContent />
        <HintWarningButton hideHintWarning={props.hideHintWarning} setShowHint={props.setShowHint} />
      </HintWarningModalContainer>
    </Modal>
  );
};

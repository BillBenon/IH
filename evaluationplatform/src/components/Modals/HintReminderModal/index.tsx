import React from 'react';
import { RoundButton } from 'components';
import styled from 'styled-components';

const HintReminderModalContainer = styled.div`
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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;
export const HintReminderModal = (props: any) => {
  const Modal = props.Modal;

  const HintReminderHeader = () => {
    return <StyledHeaderContainer>Are you sure you want to use your next hint?</StyledHeaderContainer>;
  };

  const HintReminderContent = () => {
    return (
      <StyledContentContainer>
        Reminder: we will deduct points from your overall score when you look at each hint.
      </StyledContentContainer>
    );
  };

  const HintReminderButton = (props: any) => {
    return (
      <StyledButtonContainer>
        <RoundButton
          onClick={() => {
            props.hideHintReminder();
            props.setShowHint(true);
          }}
        >
          No, cancel
        </RoundButton>
        <RoundButton
          onClick={() => {
            props.increaseHintIndex();
            props.hideHintReminder();
            props.setShowHint(true);
          }}
        >
          Yes, proceed
        </RoundButton>
      </StyledButtonContainer>
    );
  };
  return (
    <Modal
      isOpen={props.isShowHintReminder}
      onRequestClose={props.hideHintReminder}
      contentLabel="Hint Reminder Modal"
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
      <HintReminderModalContainer>
        <HintReminderHeader />
        <HintReminderContent />
        <HintReminderButton
          hideHintReminder={props.hideHintReminder}
          setShowHint={props.setShowHint}
          increaseHintIndex={props.increaseHintIndex}
        />
      </HintReminderModalContainer>
    </Modal>
  );
};

import React from 'react';
import { RoundButton } from 'components';
import styled from 'styled-components';
import Modal from 'react-modal';
import { getModalDefaultSettings } from 'utilities';


const CustomPlanCTAModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledButtonContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const CTAButton = styled.button<any>`
  margin-left: 50px;
  border-radius: 20px;
  width: fit-content;
  height: 36px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
  transition: 0.3s;
  background: '#5B94E3';
  color: 'white';
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

const CustomPlanCTAModal = (props: any) => {
  const modalStyle = getModalDefaultSettings('50%');

  const CustomPlanCTAContent = () => {
    return (
      <>
        <strong>{"Why don't you connect with our Expert to get your custom Track Plan?"}</strong>
        <br />
        <p>{
          "Our experts are having years of experience. Once you connect with them, they will understand your requirements and provide you best the plan which is best suited as per your need."}
        </p>
      </>
    );
  };

  const CustomPlanCTAButton = (props: any) => {
    return (
      <StyledButtonContainer>
        <CTAButton
          onClick={props.hideCustomPlanCTA}
        >
          Get Your Custom Plan
        </CTAButton>
      </StyledButtonContainer>
    );
  };
  return (
    <Modal
      isOpen={props.isShowCustomPlanCTA}
      onRequestClose={props.hideCustomPlanCTA}
      contentLabel="Custom Plan CTA Modal"
      style={modalStyle}
    >
      <CustomPlanCTAModalContainer>
        <CustomPlanCTAContent />
        <CustomPlanCTAButton
          hideCustomPlanCTA={props.hideCustomPlanCTA}
        />
      </CustomPlanCTAModalContainer>
    </Modal>
  );
};

export default CustomPlanCTAModal;
import React from 'react';
import styled from 'styled-components';
import { ToolsDashBoard } from 'utils/constants';

const BarContainer = styled.div`
  display: flex;
  align-items: center;
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
  background: '#e9e9e9';
  color: ${(props) => (props.selected ? '#5B94E3' : 'black')};
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
  display: inline-flex;
  align-items: center;
  overflow: hidden;
`;

type IProps = {
  handleClick: React.Dispatch<React.SetStateAction<ToolsDashBoard>>,
  selectedPage: ToolsDashBoard
}

const ButtonsBar = (props: IProps) => {

  return (
    <BarContainer className="button-bar mb-4">
      <span className="page-title">Tools</span>
      <PageSelectButton selected={props.selectedPage === ToolsDashBoard.CREATE_EMAIL} onClick={() => {
        props.handleClick(ToolsDashBoard.CREATE_EMAIL);
      }}>
        Create Email
      </PageSelectButton>
      <PageSelectButton selected={props.selectedPage === ToolsDashBoard.EMAIL_STATUS} onClick={() => {
        props.handleClick(ToolsDashBoard.EMAIL_STATUS);
      }}>
        Email Status
      </PageSelectButton>
    </BarContainer >
  )
};

export default ButtonsBar;  
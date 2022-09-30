import React from 'react';
import ReactTooltip from 'react-tooltip';
import { StyledPencilIcon, BluePencil } from './ContentEditIcon.styles';

interface IProps {
  handleEditClick: any
}

const ContentEditIcon = ({ handleEditClick }: IProps) => {
  return <StyledPencilIcon>
    <BluePencil
      onClick={handleEditClick}
      data-testid="answerfield-editbutton"
      data-tip="Continue editing"
      data-for="editIcon"
    />
    <ReactTooltip id="editIcon" type="dark" />
  </StyledPencilIcon>
};

export default ContentEditIcon;
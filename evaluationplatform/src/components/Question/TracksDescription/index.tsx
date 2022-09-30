import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import React, { useState } from 'react';
import styled from 'styled-components';
import { AlertIconOriginal } from '../../../assets';

const StyledTracksDescription = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  .track__description__icon {
    width: 33px;
    height: auto;
    cursor: pointer;
  }
  .track__description__text {
    .ql-disabled{
      background: white !important;
    }
    .ql-editor{
      padding-left: 0;
      min-height: auto !important;
    }
    margin-left: 19px;
    text-align: left;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
  }
`;

interface IProps {
  description: string;
}

export const TracksDescription: React.FC<IProps> = (props) => {
  let [showDescription, setShowDescription] = useState(true);
  const description = props.description;
  const handleShowDescription = () => {
    setShowDescription(!showDescription);
  };
  return (
    <StyledTracksDescription>
      <img
        className="track__description__icon"
        src={AlertIconOriginal}
        alt="alert_icon"
        onClick={handleShowDescription}
      />
      {showDescription ?
        <div className="track__description__text">
          <RichTextEditor
            disabled={true}
            id={`capDescrRTE`}
            value={description || ''}
            customStyles={{ height: 'auto', resize: 'none', boxShadow: 'none' }}
          />
        </div>
        : null}
    </StyledTracksDescription>
  );
};

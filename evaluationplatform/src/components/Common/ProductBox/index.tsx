import React from 'react';
import styled from 'styled-components';
import { notEmpty } from 'utilities';
import { Button } from '../Button/index';
import Chip, { ChipCss } from '../Chips';
import RichTextEditor from '../Editors/RichTextEditor';

type BoxCustomStyleType = {
  width?: string;
  background?: string;
  isBought?: boolean;
}

const Box3dContainer = styled.div`
  position: relative;
  min-height: 325px;
  width: ${(props: any) => props.width ?? '360px'};
  margin-bottom: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  transition: 0.3s;
  background: ${(props: any) => props.background};
  border-radius: 16px;
  margin-right: 24px;
  &:hover {
    box-shadow: 0 16px 25px 0 rgba(0, 0, 0, 0.5);
  }
  .box3d__icon {
    margin-bottom: 16px;
  }
  .box3d__body {
    height: 100%;
    color: #000;
    flex-grow: 1;
    background: unset;
  }
  .title {
    font-family: Khula;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
    text-align: left;
  }
  .text {
    margin-top: 10px 0;
    font-family: Khula;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    text-align: justify;
    letter-spacing: 0.32px;
    color: rgba(0, 0, 0, 0.74);
    height: ${(props: any) => props.isBought ? `125px` : `155px`};
  }
  
  .ql-editor{
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey; 
      border-radius: 10px;
    }
     
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: grey; 
      border-radius: 10px;
      cursor: pointer !important;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #b8b4b4; 
    }
  }

  .view_more_link {
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    letter-spacing: 0.16px;
    text-decoration-line: underline;
    color: #5b94e3;
    cursor: pointer;
  }
  .box3d__message {
    font-style: italic;
    font-size: 13px;
  }
  .box3d__foot {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    
    Button {
      color: white;
      height: auto;
      background: #e25252;
      font-size: 15px;
    }
  }
`;

export default function Box3d(props: IProps) {
  return (
    <Box3dContainer {...props.style} className={props.className}>
      {props.icon &&
        <div className="box3d__icon">
          <img src={props.icon} alt="track_icon" />
        </div>
      }
      <div className="box3d__body">
        <div className="title">{props.title}</div>
        <div className="text">
          <p className="description">
            <RichTextEditor
              doNotAllowCopy={true}
              disabled={true}
              id={`pBox-${props.id}`}
              value={props.description}
              customStyles={{ background: `${(props: any) => props.background ?? '#f9fafc'}`, maxHeight: props.isBought ?'120px': '140px', resize: 'none', boxShadow: 'none', minHeight: '0' }}
            />
          </p>
        </div>
      </div>
      {props.isBought ?
        <p className="badge badge-primary box3d__message">* You have already paid, please schedule.</p> : <></>
      }
      <div className="box3d__foot">
        <Button type="button" className="payment-btn" onClick={() => props.clickHandler(props.id, props.title)}>{props.btnLabel}</Button>
        {notEmpty(props.tag) && <Chip value={props.tag} style={props.tagCss} />}
      </div>
    </Box3dContainer>
  );
}

interface IProps {
  className?: string;
  id: string;
  title: string;
  description: string;
  icon?: string;
  btnLabel: string;
  clickHandler: (id: any, metadata: string) => void;
  tag: string;
  tagCss?: ChipCss;
  style?: BoxCustomStyleType;
  isBought?: boolean;
}
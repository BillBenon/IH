import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 390px;
  height: 569px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  font-family: Khula;
  background-image: ${(props: any) => `url(${props.background})` || 'white'};
  background-repeat: no-repeat;
  background-position: bottom;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  margin-bottom: 30px;
  &:hover {
    box-shadow: 0 16px 25px 0 rgba(0, 0, 0, 0.5);
  }
  .icon {
    margin-top: 63px;
  }
  .title {
    margin-top: 42px;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
  }
  .subtitle {
    margin-top: 17px;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
  }
  .content_text {
    text-align: left;
    margin-top: 34px;
    width: 305px;
    font-size: 16pxwi;
  }
`;

interface Props {
  className?: string;
  background: string;
  icon: string;
  title: string;
  subtitle: string;
  onClick?: any;
}

export const VerticalCard: React.FC<Props> = (props) => {
  return (
    <StyledCard {...props}>
      <div>
        <img className="icon" src={props.icon} alt="vertical_card_icon" />
      </div>
      <div className="col flex-align-center">
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.subtitle}</div>
        <div className="content_text">{props.children}</div>
      </div>
    </StyledCard>
  );
};

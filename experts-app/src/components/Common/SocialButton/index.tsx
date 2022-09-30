import React from 'react';
import styled from 'styled-components';

const StyledSocialButton = styled.button<IProps>`
  overflow: hidden;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 55px;
  padding: 0px;
  background: ${(props) => props.background1 || 'white'};
  color: ${(props) => props.color || 'black'};
  transition: 0.3s;
  .icon {
    width: 55px;
    height: 52px;
    background: ${(props) => props.background2 || 'white'};
    border-right: ${(props) => props.divide || 'none'};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: ${(props) => props.imageSize || '100%'};
  }
  .text {
    width: 100%;
    text-align: left;
    font-weight: bold;
    padding-left: 20px;
  }
  &:hover {
    opacity: 0.8;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
  }
`;

interface IProps {
  children: any;
  icon?: string;
  alt?: string;
  background1?: string;
  background2?: string;
  color?: string;
  divide?: string;
  imageSize?: string;
  className?: string;
}

export const SocialButton: React.FC<IProps> = ({ children, icon, alt, ...rest }) => {
  return (
    <StyledSocialButton {...rest}>
      <div className="icon">
        <img src={icon || ''} alt={alt || ''} />
      </div>
      <div className="text">{children}</div>
    </StyledSocialButton>
  );
};

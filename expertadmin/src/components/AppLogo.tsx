import React from 'react';
import { Row } from 'react-bootstrap';
import styled from 'styled-components';

const LogoImage = styled.img`
  width: ${(props: any) => props.imageSize || '58px'};
  height: auto;
  color: ${(props: any) => props.color || 'white'};
`;

const LogoText = styled.span`
  font-weight: ${(props: any) => props.fontWeight || 'normal'};
  line-height: 1.3;
  text-align: center;
  font-size: ${(props: any) => props.fontSize || '20px'};
  color: ${(props: any) => props.color || 'white'};
  margin-left: 10px;
`;

interface LogoProps {
  imageSize: string;
  textSize: string;
  color: string;
  logoText: string;
  logoImage: string;
  fontWeight?: string;
  className?: string;
}

export const AppLogo: React.FC<LogoProps> = (props) => {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <LogoImage src={props.logoImage} alt={props.logoText} {...props} />
      <LogoText {...props}>{props.logoText}</LogoText>
    </Row>
  );
};

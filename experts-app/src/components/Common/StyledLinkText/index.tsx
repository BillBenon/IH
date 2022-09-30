import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.span`
  &:hover {
    opacity: 0.8;
  }
  * {
    color: #5b94e3;
    font-weight: ${(props: any) => props.weight || 'bold'};
    font-size: ${(props: any) => `${props.size}px` || '16px'};
    text-decoration: none;
    cursor: pointer;
  }
`;

interface Props {
  children: any;
  weight?: string;
  size?: number;
  onClick?: () => void;
}

export const StyledLinkText: React.FC<Props> = ({ children, ...rest }) => {
  return <StyledLink {...rest}>{children}</StyledLink>;
};

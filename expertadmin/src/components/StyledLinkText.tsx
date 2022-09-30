import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.span`
  cursor: pointer;
  color: ${(props: any) => props.color || `#5b94e3`};
  font-weight: ${(props: any) => props.weight || 'normal'};
  font-size: ${(props: any) => `${props.size}px` || '14px'};
  text-decoration: none;
  &: hover {
    text-decoration: underline;
    opacity: 0.8;
  }
`;

interface Props {
  children: any;
  weight?: string;
  size?: number;
  onClick?: any;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const StyledLinkText: React.FC<Props> = ({ children, ...rest }) => {
  return (
    <StyledLink className={rest.className} {...rest} style={rest.style}>
      {children}
    </StyledLink>
  );
};

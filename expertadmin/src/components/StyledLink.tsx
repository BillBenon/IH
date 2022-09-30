import styled from 'styled-components';

export const StyledLink = styled.span`
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

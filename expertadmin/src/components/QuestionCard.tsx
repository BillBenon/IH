import styled from 'styled-components';
import { keyframes } from 'styled-components';

const shake = keyframes`
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-1deg); }
    20% { transform: translate(-3px, 0px) rotate(1deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(1deg); }
    50% { transform: translate(-1px, 2px) rotate(-1deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-1deg); }
    80% { transform: translate(-1px, -1px) rotate(1deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-1deg); }
`;

export const QuestionCard = styled.div`
  background: #ffffff;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  margin-bottom: 8px;
  padding: 16px;
  border: ${(props: any) =>
    props.isSelected && !props.disabled ? '1px solid #5B94E3' : '0'};
  background: ${(props: any) => (props.disabled ? '#f1f1f170' : '#FFF')};
  &:active {
    animation: ${(props: any) => props.disabled && shake} 0.5s;
  }
`;

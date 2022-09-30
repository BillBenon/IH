import { IconContainer } from 'components/Common/IconContainer/IconContainer';
import React from 'react'
import { ChevronDownCircle, ChevronUpCircle } from 'styled-icons/boxicons-regular';
import styled from 'styled-components';

type ICollapsibleProps = {
  children: React.ReactNode,
  title?: string | React.ReactNode,
  expanded?: boolean,
} 

const ExpansionArrowWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;



export const Collapsible: React.FC<ICollapsibleProps> = ({children, title, expanded = false}) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(expanded);

  return (
    <>
      <ExpansionArrowWrapper
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <IconContainer icon={isExpanded ? ChevronDownCircle : ChevronUpCircle } tooltip={isExpanded ? "Collapse" : "Expand"} />
      </ExpansionArrowWrapper>
      {title && title}
      {isExpanded && children}
    </>
  )
}
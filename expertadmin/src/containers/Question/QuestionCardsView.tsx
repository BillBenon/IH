import { QuestionCard } from 'components/QuestionCard';
import { StyledContainer } from 'components/StyledContainer';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledLinkText } from 'components/StyledLinkText';
import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';

interface QuestionCardsViewProps {
  id?: string;
  title?: string;
  description?: string;
  onClick?: Function;
  isSelected?: boolean;
  clampText?: boolean;
  childNodes?: ReactNode;
  footer?: ReactNode;
  disabled?: boolean;
}

export const QuestionCardsView: FC<QuestionCardsViewProps> = (props) => {
  const { id, clampText, onClick, title, description, footer } = props;
  const [lineClamp, setLineClamp] = useState(true);
  const container = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    setContainerHeight((container as any).current?.offsetHeight);
  }, [id]);

  const handleLineClamp = (event: any, val: boolean) => {
    setLineClamp(val);
    event.stopPropagation();
  };

  return (
    <QuestionCard {...props} onClick={() => onClick && onClick()}>
      <div>
        {!!title && (
          <div className="p-0">
            <StyledFormLabel>{title}</StyledFormLabel>
          </div>
        )}
        <div>
          <StyledContainer
            theme={clampText && { lineClamp: lineClamp ? 1 : 'none' }}
          >
            <span
              id={id}
              dangerouslySetInnerHTML={{ __html: description || '' }}
              ref={container}
            ></span>
            {!lineClamp && props.childNodes}
          </StyledContainer>
        </div>
      </div>
      <Col className="p-0 d-flex justify-content-between align-items-baseline">
        {footer}
        {lineClamp && id && (containerHeight > 29 || !!props.childNodes) && (
          <StyledLinkText
            size={12}
            onClick={(e: any) => handleLineClamp(e, false)}
          >
            {'Read more'}
          </StyledLinkText>
        )}
        {!lineClamp && (
          <StyledLinkText
            size={12}
            onClick={(e: any) => handleLineClamp(e, true)}
          >
            {'Read less'}
          </StyledLinkText>
        )}
      </Col>
      {props.children}
    </QuestionCard>
  );
};

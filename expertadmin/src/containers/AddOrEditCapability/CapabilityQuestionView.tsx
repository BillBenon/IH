import { BoldSpan, NormalSpan } from 'components/CommonStyles';
import { StyledLinkText } from 'components/StyledLinkText';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { CapabilityQuestionEval, CapabilityQuestionsType } from 'types';

const Heading = styled.div.attrs({
  className: 'd-flex mb-2 justify-content-between',
})`
  font-size: 14px;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.8);
`;

const EvalContainer = styled(Row).attrs({
  className: 'pb-1',
})`
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  height: 30px;
  align-items: center;
`;

const RemoveLink = styled(Col).attrs({
  className: 'text-right',
})`
  display: none;
  ${EvalContainer}:hover & {
    display: block;
  }
`;

type CapabilityQuestionViewProps = {
  question: CapabilityQuestionsType;
  onAttachEvaluation: Function;
  onQuestionRemove: Function;
  onEditQuestion: Function;
  onEvaluationRemove: Function;
  isDisabled?: boolean;
};
export const CapabilityQuestionView = ({
  question,
  onAttachEvaluation,
  onQuestionRemove,
  onEvaluationRemove,
  isDisabled,
  onEditQuestion,
}: CapabilityQuestionViewProps) => {
  const { questionId, title, evaluations } = question!;
  return (
    <>
      <Heading>
        <div className="pr-0">
          <NormalSpan>{title}</NormalSpan>
        </div>
        {!isDisabled && (
          <div className="justify-content-sm-around">
            <StyledLinkText
              onClick={() => onAttachEvaluation(questionId)}
              className="pr-2"
              size={12}
              color={'rgba(0, 0, 0, 0.4)'}
            >
              {'Attach Evaluations'}
            </StyledLinkText>
            <StyledLinkText
              className="pr-2"
              size={12}
              color={'rgba(0, 0, 0, 0.4)'}
              onClick={() => onEditQuestion(questionId)}
            >
              {'Edit'}
            </StyledLinkText>
            <StyledLinkText
              className="pr-2"
              size={12}
              color={'rgba(0, 0, 0, 0.4)'}
              onClick={() => onQuestionRemove(questionId)}
            >
              {'Remove'}
            </StyledLinkText>
          </div>
        )}
      </Heading>
      {evaluations && !!evaluations.length && (
        <>
          <Row className="mb-2">
            <Col xs={2}>
              <BoldSpan>{'EvaluationId'}</BoldSpan>
            </Col>
            <Col xs={9}>
              <BoldSpan>{'Evaluation Title'}</BoldSpan>
            </Col>
            <Col xs={1}>
              <BoldSpan>{''}</BoldSpan>
            </Col>
          </Row>
          {evaluations?.map((evalutation: CapabilityQuestionEval) => (
            <EvalContainer key={evalutation.evaluationId}>
              <Col xs={2}>
                <NormalSpan>{evalutation.evaluationId}</NormalSpan>
              </Col>
              <Col xs={9}>
                <NormalSpan>{evalutation.evalText}</NormalSpan>
              </Col>
              {!isDisabled && (
                <RemoveLink xs={1}>
                  <StyledLinkText
                    color={' rgba(226, 82, 82, 1)'}
                    size={12}
                    onClick={() =>
                      onEvaluationRemove(questionId, evalutation.evaluationId)
                    }
                  >
                    {'Remove'}
                  </StyledLinkText>
                </RemoveLink>
              )}
            </EvalContainer>
          ))}
        </>
      )}
    </>
  );
};

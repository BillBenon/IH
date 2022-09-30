import { QuestionCard } from 'components/QuestionCard';
import React from 'react';
import { Col } from 'react-bootstrap';

import { CapabilityQuestionView } from './CapabilityQuestionView';

type CapabilityQuestionsProps = {
  useQuestionFieldMethods: any;
  onAttachEvaluation: Function;
  onQuestionRemove: Function;
  onEditQuestion: Function;
  onEvaluationRemove: Function;
  isDisabled?: boolean;
};

export const CapabilityQuestions = ({
  useQuestionFieldMethods,
  onAttachEvaluation,
  onQuestionRemove,
  onEditQuestion,
  onEvaluationRemove,
  isDisabled,
}: CapabilityQuestionsProps) => {
  const { fields } = useQuestionFieldMethods;
  return (
    <div className="w-100">
      {fields?.map((field: any, index: number) => (
        <Col key={field.questionId || index}>
          <QuestionCard>
            <CapabilityQuestionView
              isDisabled={isDisabled}
              onEvaluationRemove={onEvaluationRemove}
              onEditQuestion={onEditQuestion}
              onAttachEvaluation={onAttachEvaluation}
              onQuestionRemove={onQuestionRemove}
              question={field}
            />
          </QuestionCard>
        </Col>
      ))}
    </div>
  );
};

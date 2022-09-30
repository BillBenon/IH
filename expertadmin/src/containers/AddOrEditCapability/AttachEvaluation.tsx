import { Info } from '@styled-icons/icomoon/Info';
import { NormalSpan } from 'components/CommonStyles';
import { IconContainer } from 'components/IconContainer';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledRadio } from 'components/StyledRadio';
import { useAddOrEditCapability } from 'features/addOrEditCapability/useAddOrEditCapability';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CapabilityQuestionsType, Evaluation } from 'types';

type AttachEvaluationProps = {
  capabilityId: string;
  activeQuestion: CapabilityQuestionsType;
  evaluations: Evaluation[];
};

export const AttachEvaluation = forwardRef(
  (
    { activeQuestion, evaluations, capabilityId }: AttachEvaluationProps,
    ref
  ) => {
    const { attachEvaluation } = useAddOrEditCapability();
    const [qevals, setQEvals] = useState<string[]>([]);
    const { title } = activeQuestion;

    useEffect(() => {
      setQEvals(activeQuestion.evaluations?.map((e) => e.evaluationId) ?? []);
    }, [activeQuestion]);

    useImperativeHandle(ref, () => ({
      attachEvaluation() {
        const data = prepareData();
        attachEvaluation(data, activeQuestion.questionId);
        return qevals;
      },
      getSelectedEvaluations() {
        return qevals;
      },
    }));

    const prepareData = () => {
      return [{ capabilityId, evaluationIds: qevals }];
    };

    const handleQEvals = (evaluationId: string) => {
      const existingEvals = [...qevals];
      const inx = existingEvals?.findIndex((e) => e === evaluationId);
      if (inx === -1) {
        existingEvals.push(evaluationId);
      } else {
        existingEvals.splice(inx, 1);
      }
      setQEvals(existingEvals);
    };

    return (
      <div>
        <NormalSpan className={'mb-3'}>{title}</NormalSpan>
        <StyledFormLabel className="mt-3">
          {'Available Evaluations'}
        </StyledFormLabel>
        {evaluations.map((evaluation) => (
          <div key={evaluation.id} className="d-flex">
            <StyledRadio className="mr-3"
              type="checkbox"
              label={evaluation.evalText}
              name={'Title'}
              value={evaluation.id}
              id={evaluation.id}
              onChange={() => handleQEvals(evaluation.id)}
              checked={qevals?.findIndex((e) => e === evaluation.id) !== -1}
            />
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={evaluation.id}>{evaluation.hint}</Tooltip>}
            >
              <span className="d-flex align-items-center">
                <IconContainer icon={Info} />
              </span>
            </OverlayTrigger>
          </div>
        ))}
      </div>
    );
  }
);

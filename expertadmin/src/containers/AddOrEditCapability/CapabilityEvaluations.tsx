import { DragIndicatorIcon } from 'components/CommonStyles';
import { QuestionCard } from 'components/QuestionCard';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Col } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { Evaluation } from 'types';
import { maskStringByHyphen, reorder } from 'utils/commonutils';
import { initialEvaluation } from 'utils/defaults';

import { EvaluationView } from './EvaluationView';
import { EvaluationForm } from './EvalutationForm';

type CapabilityEvaluationsProps = {
  evaluations: Evaluation[];
  updateEvaluations: Function;
  isDisabled?: boolean;
};

export const CapabilityEvaluations = forwardRef(
  (
    { evaluations, updateEvaluations, isDisabled }: CapabilityEvaluationsProps,
    ref
  ) => {
    const [editViewEvals, setEditViewEvals] = useState<any>({});
    const { watch } = useFormContext();

    useImperativeHandle(ref, () => ({
      addEvaluation() {
        if (Object.values(editViewEvals).some((e) => e)) return;
        const uniq = +new Date();
        const neweval = { ...initialEvaluation };
        neweval.id = maskStringByHyphen('' + uniq);
        neweval.order = evaluations.length + 1;
        const e = [...evaluations];
        e.push(neweval);
        updateEditEval(neweval.id);
        updateEvaluations(e);
        watch('evaluations', e);
      },
    }));

    const handleEditViewEvals = (id: string) => {
      const inx = evaluations.findIndex((field) => field.id === id);
      if (!evaluations[inx].evalText || !evaluations[inx].hint) {
        handleDelete(inx, id);
      } else {
        updateEditEval(id);
      }
    };

    const onSubmit = (id: string) => {
      updateEditEval(id);
      const form = watch();
      const inx = evaluations.findIndex((field) => field.id === id);
      const evals = evaluations.slice();
      evals[inx] = {
        ...form.evaluations[inx],
        id: evaluations[inx].id,
        order: evaluations[inx].order,
      };
      updateEvaluations(Object.values(evals));
    };

    const handleDelete = (index: number, id: string) => {
      const e = evaluations.slice();
      e.splice(index, 1);
      const editevals = { ...editViewEvals };
      delete editevals[id];
      setEditViewEvals(editevals);
      updateEvaluations(e);
    };

    const onDragEnd = (result: any) => {
      const reordered = reorder(
        evaluations,
        result.source.index,
        result.destination.index
      );
      updateEvaluations(reordered);
    };

    const updateEditEval = (id: string) => {
      const evalstate = { ...editViewEvals };
      evalstate[id] = !evalstate[id];
      setEditViewEvals(evalstate);
    };

    return (
      <div className="w-100">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppableSS">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {evaluations?.map(
                  (field: any, index: number) =>
                    field && (
                      <Draggable
                        key={field.id}
                        isDragDisabled={
                          isDisabled ||
                          Object.values(editViewEvals)?.some((e) => !!e)
                        }
                        draggableId={'' + field.id}
                        index={index}
                      >
                        {(provided) => (
                          <Col
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <QuestionCard>
                              <div className="d-flex">
                                <DragIndicatorIcon className="m-0" />
                                {!!field &&
                                  (!editViewEvals[field.id] ? (
                                    <EvaluationView
                                      {...{
                                        handleEditViewEvals,
                                        field,
                                        evaluation:
                                          evaluations && evaluations[index],
                                        isDisabled,
                                        handleDelete: (index: number) =>
                                          handleDelete(index, field.id),
                                        index,
                                      }}
                                    />
                                  ) : (
                                    <EvaluationForm
                                      disabled={isDisabled}
                                      evaluation={
                                        (evaluations && evaluations[index]) ??
                                        field
                                      }
                                      handleCancel={() =>
                                        handleEditViewEvals(field.id)
                                      }
                                      onSubmit={() => onSubmit(field.id)}
                                      index={index}
                                    />
                                  ))}
                              </div>
                            </QuestionCard>
                          </Col>
                        )}
                      </Draggable>
                    )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
);

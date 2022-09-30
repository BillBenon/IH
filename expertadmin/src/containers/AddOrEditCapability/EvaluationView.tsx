import { Delete, Edit } from '@styled-icons/material';
import {
  BoldSpan,
  LighSpan,
  NormalSpan,
  SmallSpan,
} from 'components/CommonStyles';
import { IconContainer } from 'components/IconContainer';
import React from 'react';
import { Col } from 'react-bootstrap';
import { Evaluation } from 'types';

type EvaluationViewProps = {
  handleEditViewEvals: Function;
  field: Evaluation;
  evaluation?: Evaluation;
  handleDelete: Function;
  index: number;
  isDisabled?: boolean;
};

export const EvaluationView = ({
  handleEditViewEvals,
  field,
  handleDelete,
  index,
  evaluation,
  isDisabled,
}: EvaluationViewProps) => {
  const { id, evalText, hint, level, point } = field;
  return (
    <Col className="p-0">
      <div className="d-flex w-100 mb-2 align-items-center">
        <Col className="pl-0" lg={6} md={6} xs={12}>
          <NormalSpan>{evaluation?.evalText ?? evalText}</NormalSpan>
        </Col>
        <Col className="pr-0" lg={6} md={6} xs={12}>
          <div className="d-flex flex-row-reverse">
            {!isDisabled && (
              <div>
                <IconContainer
                  onClick={() => handleDelete(index)}
                  color={'rgba(0, 0, 0, 0.4)'}
                  icon={Delete}
                />
              </div>
            )}
            {!isDisabled && (
              <div>
                <IconContainer
                  onClick={() => handleEditViewEvals(id)}
                  color={'rgba(0, 0, 0, 0.4)'}
                  icon={Edit}
                />
              </div>
            )}
            <div className="mr-3">
              <SmallSpan className="pr-1">{'Points Assigned: '}</SmallSpan>
              <BoldSpan>{evaluation?.point ?? point}</BoldSpan>
            </div>
            <div className="mr-3">
              <SmallSpan className="pr-1">{'Level: '}</SmallSpan>
              <BoldSpan>{evaluation?.level ?? level}</BoldSpan>
            </div>
            <div className="mr-3">
              <SmallSpan className="pr-1">{'ID: '}</SmallSpan>
              <BoldSpan>{id}</BoldSpan>
            </div>
          </div>
        </Col>
      </div>
      <div className="d-flex w-100">
        <LighSpan
          dangerouslySetInnerHTML={{ __html: evaluation?.hint ?? hint }}
        ></LighSpan>
      </div>
    </Col>
  );
};

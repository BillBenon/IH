import { StyledFormArea } from 'components/StyledFormArea';
import { StyledFormLabel } from 'components/StyledFormLabel';
import { StyledInput } from 'components/StyledInput';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

export const SampleEvaluation = () => {
  const evaluation = {
    evalText: 'Sample Evaluations',
    hint: 'Sampple Evaluation Hint',
    id: '000-000',
    point: 1,
    level: 1,
    order: 0,
  };
  return (
    <Col className="p-0">
      <Row className="mb-2">
        <Col xs={6}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Title'}</StyledFormLabel>
            </Col>
          </div>
          <Col className="p-0 pb-2">
            <StyledInput
              disabled={true}
              type="text"
              defaultValue={evaluation.evalText}
            />
          </Col>
        </Col>
        <Col xs={3}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Level'}</StyledFormLabel>
            </Col>
          </div>
          <Col className="p-0 pb-2">
            <StyledInput
              disabled={true}
              type="text"
              defaultValue={evaluation.level}
            />
          </Col>
        </Col>
        <Col xs={3}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Point'}</StyledFormLabel>
            </Col>
          </div>
          <Col className="p-0 pb-2">
            <StyledInput
              disabled={true}
              type="text"
              defaultValue={evaluation.point}
            />
          </Col>
        </Col>
        <Col xs={12}>
          <div className="d-flex justify-content-between align-items-baseline">
            <Col className="p-0">
              <StyledFormLabel>{'Hint'}</StyledFormLabel>
            </Col>
          </div>
          <Col className="p-0 pb-2">
            <StyledFormArea
              disabled={true}
              minRows={3}
              defaultValue={evaluation.hint}
            ></StyledFormArea>
          </Col>
        </Col>
      </Row>
    </Col>
  );
};

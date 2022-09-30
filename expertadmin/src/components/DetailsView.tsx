import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { BigSpan, ChipWrapper, SmallSpan } from 'components/CommonStyles';
import { Capability, SelectedQuestion } from 'types';
import { AnswerType, QuestionType } from 'utils/constants';
import { Chip } from 'components/Chip';
import { Grid } from 'components/Grid';

type DetailsViewProps = {
  selectedQuestion: SelectedQuestion;
  defaultPadding?: boolean;
};

export const DetailsView = ({
  selectedQuestion,
  defaultPadding,
}: DetailsViewProps) => {
  return (
    <>
      <Col
        md={12}
        lg={12}
        sm={12}
        className={`${defaultPadding ? 'pt-0 pl-0 pr-0' : 'pt-2 pb-3'}`}
      >
        <Row>
          <Col md={3} lg={3} sm={6}>
            <Grid>
              <SmallSpan>{'Question Type'}</SmallSpan>
              <BigSpan>{QuestionType[selectedQuestion.questionType]}</BigSpan>
            </Grid>
          </Col>
          <Col md={3} lg={3} sm={6}>
            <Grid>
              <SmallSpan>{'Answer Type'}</SmallSpan>
              <BigSpan>{AnswerType[selectedQuestion.answerType]}</BigSpan>
            </Grid>
          </Col>
          <Col md={3} lg={3} sm={6}>
            <Grid>
              <SmallSpan>{'Hints Available'}</SmallSpan>
              {(selectedQuestion as any).hintIds ? (
                <BigSpan>{(selectedQuestion as any).hintIds?.length}</BigSpan>
              ) : (
                'No data'
              )}
            </Grid>
          </Col>
          <Col md={3} lg={3} sm={6}>
            <Grid>
              <SmallSpan>{'Sample Solution Available'}</SmallSpan>
              <BigSpan>
                {(selectedQuestion as any).solutionIds?.length ? 'Yes' : 'No'}
              </BigSpan>
            </Grid>
          </Col>
        </Row>
      </Col>
      <Col
        md={12}
        lg={12}
        sm={12}
        className={`${defaultPadding ? 'pt-0 pl-0 pr-0' : 'pt-2 pb-3'}`}
      >
        <Row>
          <Col md={3} lg={3} sm={6}>
            <Grid>
              <SmallSpan>{'Belongs to'}</SmallSpan>
              <ChipWrapper>
                <Chip variant={'Track'} text={'Track'} />
              </ChipWrapper>
            </Grid>
          </Col>
          <Col md={9} lg={9} sm={6}>
            <Grid>
              <SmallSpan>{'Capabilities'}</SmallSpan>
              <ChipWrapper>
                {selectedQuestion?.capabilities?.length
                  ? selectedQuestion.capabilities?.map((cap: Capability) => (
                      <Chip
                        key={cap.capabilityId}
                        variant={'Capability'}
                        text={cap.capabilityName}
                      />
                    ))
                  : 'No Data'}
              </ChipWrapper>
            </Grid>
          </Col>
        </Row>
      </Col>
    </>
  );
};

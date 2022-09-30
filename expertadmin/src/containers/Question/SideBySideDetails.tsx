import { PencilSquare } from '@styled-icons/bootstrap';
import { useAppDispatch } from 'app/store';
import { DetailsView } from 'components/DetailsView';
import { LastModifiedDetail } from 'components/LastModifiedDetail';
import { LightButton } from 'components/LightButton';
import { SearchButton } from 'components/SearchButton';
import { StatusIndicator } from 'components/StatusIndicator';
import { SideBySideContainer, SideBySideFooter } from 'features/questions/questions.styles';
import { setNextSelected, setPrevSelected } from 'features/questions/questionSlice';
import { useQuestions } from 'features/questions/useQuestions';
import React, { FC } from 'react';
import { Col, Row } from 'react-bootstrap';

export const SideBySideDetails: FC<{ goBack: Function; goNext: Function }> = ({
  goBack,
  goNext,
}) => {
  const dispatch = useAppDispatch();
  const [
    {
      routeToAddOrEditQuestion,
      selectedQuestion,
      loading,
      questions,
    },
  ] = useQuestions();

  const handlePrevious = () => {
    if (!loading && selectedQuestion) {
      const inx = questions.findIndex(q => q.questionId == selectedQuestion.questionId);
      if (inx > 0) {
        dispatch(setPrevSelected(selectedQuestion.questionId));
      }
      else {
        goBack();
      }
    }
  };

  const handleNext = () => {
    if (!loading && selectedQuestion) {
      const inx = questions.findIndex(q => q.questionId == selectedQuestion.questionId);
      if (inx < questions.length - 1) {
        dispatch(setNextSelected(selectedQuestion.questionId));
      }
      else {
        goNext();
      }
    }
  };

  return (
    <Col md={6} lg={6} sm={12} className="p-0">
      {selectedQuestion && (
        <SideBySideContainer>
          <Row
            className="p-3 mr-0 ml-0"
            style={{ maxHeight: 'calc(76vh - 64px)', overflowY: 'auto' }}
          >
            <Col md={12} lg={12} sm={12} className="pt-2 pb-3">
              <Row className="align-items-center">
                <Col md={7} lg={7} sm={12}>
                  <LastModifiedDetail
                    by={selectedQuestion.createdBy}
                    datetime={selectedQuestion.updatedAt}
                  />
                </Col>
                <Col md={2} lg={2} sm={12}>
                  {selectedQuestion.state && (
                    <StatusIndicator
                      variant={selectedQuestion.state}
                      text={selectedQuestion.state}
                    />
                  )}
                </Col>
                <Col md={3} lg={3} sm={12}>
                  <SearchButton
                    type="button"
                    style={{ width: '130px' }}
                    onClick={() =>
                      routeToAddOrEditQuestion(
                        undefined,
                        undefined,
                        selectedQuestion.title
                      )
                    }
                  >
                    <PencilSquare height="16px" className="mr-2" />
                    {'Edit Details'}
                  </SearchButton>
                </Col>
              </Row>
            </Col>
            <Col
              md={12}
              lg={12}
              sm={12}
              className="pt-2 pb-3 text-justify"
              style={{ color: '#161616' }}
            >
              {selectedQuestion.title}
            </Col>
            <Col
              md={12}
              lg={12}
              sm={12}
              className="pt-2 pb-3 text-justify"
              style={{ color: 'rgba(22, 22, 22, 0.6)', whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: selectedQuestion?.description ?? "" }}
            >
            </Col>
            <DetailsView {...{ selectedQuestion }} />
          </Row>
          <SideBySideFooter>
            <LightButton onClick={handlePrevious}>{'< Previous'}</LightButton>
            <LightButton onClick={handleNext}>{'Next >'}</LightButton>
          </SideBySideFooter>
        </SideBySideContainer>
      )}
    </Col>
  );
};

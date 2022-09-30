import { Search } from '@styled-icons/boxicons-regular';
import { DetailsView } from 'components/DetailsView';
import { Error } from 'components/Error';
import { FilterInput } from 'components/FilterInput';
import { IconContainer } from 'components/IconContainer';
import { LastModifiedDetail } from 'components/LastModifiedDetail';
import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import { SearchButton } from 'components/SearchButton';
import { useQuestions } from 'features/questions/useQuestions';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { Question } from 'types';
import { DefaultPaginationCount } from 'utils/constants';

import { QuestionCardsView } from '../Question/QuestionCardsView';

const QuestionsWrapper = styled.div`
  max-height: 70vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0.5rem;
`;

interface SearchQuestionProps {
  existingQuestions: any[];
}

export const SearchQuestions = ({ existingQuestions }: SearchQuestionProps) => {
  const [
    {
      fetchQuestions,
      setPaginationFilters,
      updateSelectedquestion,
      questions,
      selectedQuestion,
      totalQuestions,
      loading,
      filterRequest,
    },
  ] = useQuestions();
  const [textToSearch, setTextToSearch] = useState<string>();
  const [activeQuestion, setActiveQuestion] = useState<string>('');

  useEffect(() => {
    fetchQuestions();
  }, [filterRequest]);

  const handleQuestionFilter = () => {
    fetchQuestions(textToSearch);
  };

  const handleHighlightedQuestion = (questionId: string) => {
    setActiveQuestion(questionId);
    const existinginx = existingQuestions.findIndex(
      (hh) => hh.questionId === questionId
    );
    if (existinginx != -1) return;
    updateSelectedquestion(questionId);
  };

  return (
    <QuestionsWrapper>
      <Col className="p-0">
        {'Search for an existing question'}
        <Row className="align-items-center justify-content-between">
          <Col lg={10} md={10} sm={10} className="pr-0">
            <FilterInput
              onKeyDown={(event: any) =>
                event.keyCode === 13 && handleQuestionFilter()
              }
              value={textToSearch}
              onChange={(e: any) => setTextToSearch(e.target.value)}
              type="text"
              placeholder="Search"
            />
          </Col>
          <Col lg={2} md={2} sm={2} className="pl-0 text-right">
            <SearchButton
              type="button"
              onClick={() => handleQuestionFilter()}
              style={{ width: '4em' }}
            >
              <IconContainer color={'##FFF'} icon={Search} />
            </SearchButton>
          </Col>
        </Row>
      </Col>
      <Col className="p-0 mt-2">
        <Row>
          <Col>{'Search Results'}</Col>
          <Col>
            <Paginator
              count={DefaultPaginationCount}
              total={totalQuestions}
              skipcount={filterRequest.skipCount}
              onAction={setPaginationFilters}
              loading={loading}
            />
          </Col>
        </Row>
        {questions.map((question: Question) => (
          <>
            {existingQuestions.findIndex(
              (hh) => hh.questionId === question.questionId
            ) != -1 &&
              activeQuestion == question.questionId && (
                <Error errorMessage={'Question is already in use.'} />
              )}
            <QuestionCardsView
              id={question.questionId}
              isSelected={selectedQuestion?.questionId == question.questionId}
              onClick={() => handleHighlightedQuestion(question.questionId)}
              key={question.questionId}
              title={question.title}
              clampText={true}
              disabled={
                existingQuestions.findIndex(
                  (hh) => hh.questionId === question.questionId
                ) != -1
              }
              description={question.description}
              childNodes={
                <DetailsView
                  defaultPadding={true}
                  selectedQuestion={question}
                />
              }
              footer={
                <LastModifiedDetail
                  by={question.createdBy}
                  datetime={question.updatedAt}
                />
              }
            ></QuestionCardsView>
          </>
        ))}
      </Col>
      <BeatLoader
        css={LoaderStyles}
        color={'#3694D7'}
        loading={loading}
      ></BeatLoader>
    </QuestionsWrapper>
  );
};

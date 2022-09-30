import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import { useQuestions } from 'features/questions/useQuestions';
import React from 'react';
import { Col } from 'react-bootstrap';
import { BeatLoader } from 'react-spinners';
import { Question } from 'types';
import { DefaultPaginationCount } from 'utils/constants';

import { QuestionCardsView } from './QuestionCardsView';

export const SideBySideList = ({ paginatorRef }: any) => {
  const [
    {
      setPaginationFilters,
      updateSelectedquestion,
      questions,
      selectedQuestion,
      totalQuestions,
      loading,
      filterRequest,
    },
  ] = useQuestions();

  return (
    <Col
      md={6}
      lg={6}
      sm={12}
      style={{ overflowY: 'auto', maxHeight: '80vh' }}
      className="pl-4"
    >
      <Paginator
        ref={paginatorRef}
        count={DefaultPaginationCount}
        total={totalQuestions}
        skipcount={filterRequest.skipCount}
        onAction={setPaginationFilters}
        loading={loading}
      />
      <BeatLoader
        css={LoaderStyles}
        color={'#3694D7'}
        loading={loading}
      ></BeatLoader>
      {questions?.map((question: Question) => (
        <QuestionCardsView
          isSelected={selectedQuestion?.questionId == question.questionId}
          onClick={() => updateSelectedquestion(question.questionId)}
          key={question.questionId}
          description={question.title}
        />
      ))}
    </Col>
  );
};

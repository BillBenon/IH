import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { Chip } from 'components/Chip';
import { EllipsedSpan } from 'components/CommonStyles';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { Paginator } from 'components/Paginator';
import { StatusIndicator } from 'components/StatusIndicator';
import { TableStyles } from 'components/TableStyles';
import { DataTable } from 'containers/Common/DataTable';
import { QuestionFilters } from 'containers/Question/QuestionFilters';
import { SideBySideDetails } from 'containers/Question/SideBySideDetails';
import { SideBySideList } from 'containers/Question/SideBySideList';
import { isEmpty } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect, useRef } from 'react';
import { Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { useLocation } from 'react-router-dom';
import { DefaultPaginationCount } from 'utils/constants';
import { initialQuestionFilter } from 'utils/defaults';

import { useQuestions } from './useQuestions';

const columns = [
  {
    Header: 'Title',
    accessor: 'title',
    Cell: function cell(data: any) {
      return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
    },
    style: {
      width: '40%',
    },
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Created by',
    accessor: 'createdBy',
    style: {
      width: '10%',
    },
  },
  {
    Header: 'Track',
    accessor: 'track',
    Cell: <Chip variant={'Track'} text={'Track'} />,
    style: {
      width: '9%',
    },
  },
  {
    Header: 'Capability',
    accessor: 'capabilities',
    Cell: function cell(data: any) {
      return (
        <Chip
          variant={'Capability'}
          text={'View Capabilities'}
          clamp={false}
          hoverContent={
            data.cell.value &&
            data.cell.value.length &&
            data.cell.value.map((val: any) => (
              <Chip
                key={val.capabilityId}
                variant={'Capability'}
                text={val.capabilityName}
                clamp={false}
              />
            ))
          }
        />
      );
    },
    style: {
      width: '14%',
    },
  },
  {
    Header: 'Status',
    accessor: 'state',
    Cell: function cell(data: any) {
      return (
        <StatusIndicator variant={data.cell.value} text={data.cell.value} />
      );
    },
    style: {
      width: '10%',
    },
  },
  {
    Header: 'Last Modified On',
    accessor: 'updatedAt',
    Cell: function cell(data: any) {
      return <Moment fromNow>{data.cell.value}</Moment>;
    },
    style: {
      width: '12%',
    },
  },
  {
    Header: '',
    accessor: 'questionId',
    Cell: () => {
      return (
        <CustomStyledIcon height={'20px'} color={'#5B94E3'} icon={EditAlt} />
      );
    },
    style: {
      width: '5%',
      textAlign: 'center',
    },
  },
];

const Questions: FC = () => {
  const [
    {
      fetchQuestions,
      setPaginationFilters,
      updateSelectedquestion,
      routeToAddOrEditQuestion,
      setQuestionFilter,
      questions,
      view,
      totalQuestions,
      loading,
      filterRequest,
    },
  ] = useQuestions();
  const { search } = useLocation();
  const paginatorRef = useRef();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    fetchQuestions();
  }, [filterRequest]);

  const handleCellClick = (questionId: string) => {
    updateSelectedquestion(questionId);
    routeToAddOrEditQuestion(
      false,
      questionId,
      questions?.find((q) => q.questionId == questionId)?.title
    );
  };

  useEffect(() => {
    const params: any = queryString.parse(search);
    if (!isEmpty(params)) {
      setQuestionFilter(params);
    } else {
      setQuestionFilter(initialQuestionFilter);
    }
  }, [search]);

  useEffect(() => {
    questions &&
      questions[0] &&
      updateSelectedquestion(questions[0]?.questionId);
  }, [questions]);

  return (
    <>
      <QuestionFilters />
      {view === 'list' && (
        <TableStyles>
          {!!totalQuestions && (
            <Paginator
              count={DefaultPaginationCount}
              total={totalQuestions}
              skipcount={filterRequest.skipCount}
              onAction={setPaginationFilters}
              loading={loading}
            />
          )}
          <DataTable
            columns={columns}
            data={questions}
            loading={loading}
            cellClickFunc={handleCellClick}
            idKey="questionId"
            hiddenColumns={['description']}
          />
          {!!totalQuestions && (
            <Paginator
              count={DefaultPaginationCount}
              total={totalQuestions}
              skipcount={filterRequest.skipCount}
              onAction={setPaginationFilters}
              loading={loading}
            />
          )}
        </TableStyles>
      )}
      {view == 'side' && !!totalQuestions && (
        <Row className="mr-0 ml-0">
          <SideBySideList paginatorRef={paginatorRef} />
          <SideBySideDetails
            goBack={() =>
              paginatorRef && (paginatorRef.current as any).goBack()
            }
            goNext={() =>
              paginatorRef && (paginatorRef.current as any).goNext()
            }
          />
        </Row>
      )}
    </>
  );
};

export default Questions;

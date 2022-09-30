import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { EllipsedSpan } from 'components/CommonStyles';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { Paginator } from 'components/Paginator';
import { TableStyles } from 'components/TableStyles';
import { DataTable } from 'containers/Common/DataTable';
import { ExpertFilters } from 'containers/Expert/ExpertFilters';
import { isEmpty, isEqual } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GetResultsForExpertSearchReq } from 'types';
import { DefaultPaginationCount } from 'utils/constants';
import { initialExpertFilter } from 'utils/defaults';

import { useExperts } from './useExperts';

const columns = [
  {
    Header: 'Name',
    accessor: 'fullname',
    Cell: function cell(data: any) {
      return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
    },
    style: {
      width: '34%',
    },
  },
  {
    Header: 'Email',
    accessor: 'email',
    Cell: function cell(data: any) {
      return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
    },
    style: {
      width: '40%',
    },
  },
  {
    Header: 'Role-Type',
    accessor: 'roleType',
  },
  {
    Header: '',
    accessor: 'expertId',
    Cell: () => {
      return (
        <CustomStyledIcon height={'20px'} color={'#5B94E3'} icon={EditAlt} />
      );
    },
    style: {
      width: '5%',
    },
  },
];

const Experts: FC = () => {
  const [
    {
      fetchExperts,
      setPaginationFilters,
      routeToAddOrEditExpert,
      setExpertFilter,
      experts,
      totalExperts,
      loading,
      filterRequest,
    },
  ] = useExperts();
  const { search } = useLocation();
  const [prevRequest, setPrevRequest] = useState<
    GetResultsForExpertSearchReq | undefined
  >();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!isEqual(prevRequest, filterRequest)) {
      fetchExperts();
      setPrevRequest(filterRequest);
    }
  }, [filterRequest]);

  const handleCellClick = (expertId: string) => {
    routeToAddOrEditExpert(
      false,
      expertId,
      experts?.find((expert) => expert.expertId == expertId)
        ?.fullname
    );
  };

  useEffect(() => {
    const params: any = queryString.parse(search);
    if (!isEmpty(params)) {
      setExpertFilter(params);
    } else {
      setExpertFilter(initialExpertFilter);
    }
  }, [search]);

  return (
    <>
      <ExpertFilters />
      <TableStyles>
        {!!totalExperts && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalExperts}
            skipcount={filterRequest.skipCount}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}
        <DataTable
          columns={columns}
          data={experts}
          loading={loading}
          cellClickFunc={handleCellClick}
          idKey="expertId"
          hiddenColumns={[]}
        />
        {!!totalExperts && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalExperts}
            skipcount={filterRequest.skipCount}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}
      </TableStyles>
    </>
  );
};

export default Experts;

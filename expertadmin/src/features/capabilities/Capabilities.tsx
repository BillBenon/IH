import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { Chip } from 'components/Chip';
import { EllipsedSpan } from 'components/CommonStyles';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { Paginator } from 'components/Paginator';
import { StatusIndicator } from 'components/StatusIndicator';
import { TableStyles } from 'components/TableStyles';
import { CapabilityFilters } from 'containers/Capability/CapabilityFilters';
import { DataTable } from 'containers/Common/DataTable';
import { isEmpty, isEqual } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect, useRef, useState } from 'react';
import Moment from 'react-moment';
import { useLocation } from 'react-router-dom';
import { GetCapabilitiesRequest } from 'types';
import { DefaultPaginationCount } from 'utils/constants';
import { initialCapabilityFilter } from 'utils/defaults';
import { useCapabilities } from './useCapabilities';


// import { CapabilityFilters } from 'containers/CapabilityFilters';
const columns = [
  {
    Header: 'Name',
    accessor: 'capabilityText',
    Cell: function cell(data: any) {
      return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
    },
    style: {
      width: '34%',
    },
  },
  {
    Header: 'Category | Sub-Category',
    accessor: 'category',
    Cell: (data: any) => {
      return (
        <Chip
          variant={'Capability'}
          text={`${data.row.values.category || '-'}  | ${data.row.values.subcategory || '-'
            }`}
          clamp={false}
        />
      );
    },
    style: {
      width: '18%',
    },
  },
  {
    Header: 'Sub-Category',
    accessor: 'subcategory',
  },
  {
    Header: 'Questions',
    accessor: 'totalQuestion',
    style: {
      width: '8%',
    },
  },
  {
    Header: 'Last Modified by',
    accessor: 'updatedBy',
    style: {
      width: '12%',
    },
  },
  {
    Header: 'Status',
    accessor: 'state',
    Cell: (data: any) => {
      return (
        <StatusIndicator
          variant={data.cell?.value}
          text={data.cell?.value || '-'}
        />
      );
    },
    style: {
      width: '11%',
    },
  },
  {
    Header: 'Last Modified On',
    accessor: 'updatedDate',
    Cell: function cell(data: any) {
      return <Moment fromNow>{data.cell?.value}</Moment>;
    },
    style: {
      width: '12%',
    },
  },
  {
    Header: '',
    accessor: 'capabilityId',
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

const Capabilities: FC = () => {
  const [
    {
      fetchCapabilities,
      setPaginationFilters,
      routeToAddOrEditCapability,
      setCapabilityFilter,
      capabilities,
      totalCapabilities,
      loading,
      filterRequest,
    },
  ] = useCapabilities();
  const { search } = useLocation();
  const [prevRequest, setPrevRequest] = useState<
    GetCapabilitiesRequest | undefined
  >();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    if (!isEqual(prevRequest, filterRequest)) {
      fetchCapabilities();
      setPrevRequest(filterRequest);
    }
  }, [filterRequest]);

  const handleCellClick = (capabilityId: string) => {
    routeToAddOrEditCapability(
      false,
      capabilityId,
      capabilities?.find((cap) => cap.capabilityId == capabilityId)
        ?.capabilityText
    );
  };

  useEffect(() => {
    const params: any = queryString.parse(search);
    if (!isEmpty(params)) {
      setCapabilityFilter(params);
    } else {
      setCapabilityFilter(initialCapabilityFilter);
    }
  }, [search]);

  return (
    <>
      <CapabilityFilters />
      <TableStyles>
        {!!totalCapabilities && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalCapabilities}
            skipcount={filterRequest.skipCount}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}
        <DataTable
          columns={columns}
          data={capabilities}
          loading={loading}
          cellClickFunc={handleCellClick}
          idKey="capabilityId"
          hiddenColumns={['subcategory']}
        />
        {!!totalCapabilities && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalCapabilities}
            skipcount={filterRequest.skipCount}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}
      </TableStyles>
    </>
  );
};

export default Capabilities;

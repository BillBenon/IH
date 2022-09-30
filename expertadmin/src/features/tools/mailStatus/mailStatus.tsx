import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { Paginator } from 'components/Paginator';
import { TableStyles } from 'components/TableStyles';
import EmailStatusFilter from 'containers/ToolsFilter/EmailStatusFilters';
import React from 'react'
import { useSelector } from 'react-redux';
import { DefaultPaginationCount } from 'utils/constants';
import { setPaginationFilter } from '../toolsSlice';

const MailStatus = () => {

    const tools = useSelector((state: RootState) => state.tools);
    const dispatch = useAppDispatch();

    const setPaginationFilters = (skipCount: number) => {
        dispatch(setPaginationFilter({ skipCount }))
    }

    return (
        <>
            <EmailStatusFilter />
            <TableStyles>
                {tools.mailStatus.totalEmails > 0 && <Paginator
                    count={DefaultPaginationCount}
                    total={tools.mailStatus.totalEmails}
                    skipcount={tools.mailStatus.filterRequest.skipCount}
                    onAction={setPaginationFilters}
                    loading={tools.loading}
                />}

                {tools.mailStatus.totalEmails > 0 && <Paginator
                    count={DefaultPaginationCount}
                    total={tools.mailStatus.totalEmails}
                    skipcount={tools.mailStatus.filterRequest.skipCount}
                    onAction={setPaginationFilters}
                    loading={tools.loading}
                />}
            </TableStyles>
        </>
    )
}

export default MailStatus;
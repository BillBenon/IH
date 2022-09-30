import { LoaderStyles } from 'components/LoaderStyles';
import { BoldSpan } from 'components/CommonStyles';
import React, { FC } from 'react';
import { BeatLoader } from 'react-spinners';
import { useTable } from 'react-table';

interface DataTableProps {
  tdClassName?: string;
  trStyle?: Object;
  columns: any;
  data: any;
  loading: boolean;
  cellClickFunc?: Function;
  idKey: string;
  hiddenColumns: string[];
  hideHeading?: boolean;
}

export const DataTable: FC<DataTableProps> = ({
  tdClassName,
  trStyle,
  columns,
  data,
  loading,
  cellClickFunc,
  idKey,
  hiddenColumns,
  hideHeading,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    initialState: { hiddenColumns },
  });

  return (
    <table {...getTableProps()}>
      {!hideHeading && <thead>
        {headerGroups.map((headerGroup: any, inx: number) => (
          <tr key={inx} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any, ix: number) => (
              <th style={column.style} key={ix} {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>}
      <tbody {...getTableBodyProps()}>
        {loading ? (
          <BeatLoader
            css={LoaderStyles}
            color={'#3694D7'}
            loading={loading}
          ></BeatLoader>
        ) : rows.length ? (
          rows.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr style={trStyle} key={i} {...row.getRowProps()}>
                {row.cells.map((cell: any, ix: number) => {
                  return (
                    <td
                      className={tdClassName}
                      key={ix}
                      onDoubleClick={() =>
                        cellClickFunc && cellClickFunc(cell?.row?.values[idKey], i)
                      }
                      onClick={() =>
                        cell.column.id === idKey &&
                        cellClickFunc &&
                        cellClickFunc(cell?.row?.values[idKey], i)
                      }
                      {...cell.getCellProps()}
                    >
                      {' '}
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })
        ) : (
          <BoldSpan className="text-center position-absolute w-100">
            {'No Data'}
          </BoldSpan>
        )}
      </tbody>
    </table>
  );
};

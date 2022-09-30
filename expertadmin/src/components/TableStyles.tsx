import styled from 'styled-components';

export const TableStyles = styled.div`
  padding: 0 1rem;
  font-size: 14px;
  table {
    border-spacing: 0;
    width: 100%;
    table-layout: fixed;
    thead {
      background: rgba(91, 148, 227, 0.2);
    }

    thead {
      th {
        height: 40px;
      }
    }

    tbody {
      tr {
        height: 72px;
      }
    }

    th,
    td {
      padding: 16px;
    }

    th {
      font-weight: 600;
      font-size: 14px;
      line-height: 120%;
      color: rgba(0, 0, 0, 0.6);
    }

    td {
      margin: 0;
      border-bottom: 1px solid rgba(91, 148, 227, 0.2);

      :last-child {
        border-right: 0;
      }
    }
  }
`;

import styled from 'styled-components';

export const SettingsTablStyles = styled.div`
  padding: 0 1rem;
  font-size: 14px;
  table {
    border: 1px solid rgba(91, 148, 227, 0.2);
    border-spacing: 0;
    width: 100%;
    table-layout: fixed;
    thead {
      background: rgba(91, 148, 227, 0.2);
    }

    thead {
      th {
        height: 20px;
      }
    }

    tbody {
      tr {
        height: 20px;
        vertical-align: top;
      }
    }

    th,
    td {
      padding: 5px;
    }

    th {
      font-weight: 600;
      font-size: 14px;
      line-height: 120%;
      color: rgba(0, 0, 0, 0.6);
      :last-child {
        justify-content: center;
        display: flex;
      }
    }

    td {
      margin: 0;
      padding: 5px;
      border-bottom: 1px solid rgba(91, 148, 227, 0.2);
    }
  }
`;

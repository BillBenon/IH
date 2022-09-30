import React from 'react';
import styled from 'styled-components';

export const LoginContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  min-width: 538px;
  margin: auto;
  .form {
    width: 100%;
  }
  .form > div,
  .form > button {
    margin-bottom: 10px;
  }
`;
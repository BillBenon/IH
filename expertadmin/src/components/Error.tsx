import * as React from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.p`
  text-align: left;
  font-size: 10px;
  margin-bottom: 0;
  text-align: left;
  color: #ff0000;
`;

export const Error: React.FC<{ errorMessage: string | undefined }> = ({
  errorMessage,
}) => <ErrorMessage>{errorMessage}</ErrorMessage>;

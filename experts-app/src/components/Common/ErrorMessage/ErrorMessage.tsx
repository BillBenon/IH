import * as React from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
  text-align: center;
  margin-top: 10px;
  color: #ff0000;
`;

export const ErrorMessageContainer: React.FC<{ errorMessage: string | null }> = ({
  errorMessage
}) => <ErrorMessage>{errorMessage}</ErrorMessage>
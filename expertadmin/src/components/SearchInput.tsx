import { Search } from '@styled-icons/boxicons-regular';
import React from 'react';
import styled from 'styled-components';

const SearchIcon = styled(Search)`
  padding: 0.5rem;
  grid-row: 1;
  z-index: 2;
  margin-right: 16px;
  fill: #8f8f8f;
  align-self: center;
`;

const InputContainer = styled.div`
  display: grid;
  margin: 0.75rem 0;
  grid-template-columns: 1.5rem 4fr 1fr;
  border-radius: 5px;
  overflow: hidden;
  border-radius: 2px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.2);
  &:focus-within svg {
    display: none;
  }
  &:focus-within input {
    grid-column: 1/4;
  }
  &:focus-within input::placeholder {
    color: transparent;
  }
`;

export const Input = styled.input.attrs({
  placeholder: 'Search',
  type: 'search',
})`
  background: #fff;
  font-size: 14px;
  border: 0;
  padding: 0.5rem;
  grid-column: 1/4;
  grid-row: 1;
  outline: none;
`;

export const SearchInput = () => {
  return (
    <>
      <InputContainer>
        <SearchIcon />
        <Input />
      </InputContainer>
    </>
  );
};

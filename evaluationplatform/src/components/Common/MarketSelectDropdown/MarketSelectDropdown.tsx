import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from 'formik';

const StyledMarketListSelect = styled.select`
  padding: 10px;
  font-family: Lato;
  border: 1px solid gray;
  font-size: 20px;
  height: 55px;
  width: 100%;
  border: 1px solid #b0b0b0;
  box-sizing: border-box;
  border-radius: 5px;
  ::placeholder {
    color: #b0b0b0;
  }
`;

type IProps = {
  marketList: Array<any>;
  handleChange: any;
  value: string;
};

export const MarketSelectDropdown: React.FC<IProps> = ({ marketList, handleChange, value }) => {
  return (
    <>
      <StyledMarketListSelect value={value} name="marketId" onChange={handleChange}>
        <option value="" label="Select Market" />
        {marketList.map((option: any) => (
          <option key={option.marketId} value={option.marketId} label={option.name} />
        ))}
      </StyledMarketListSelect>
      <span className="error">
        <ErrorMessage name="marketId" />
      </span>
    </>
  );
};

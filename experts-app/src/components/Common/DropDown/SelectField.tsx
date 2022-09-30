import React from "react";
import styled from "styled-components";

type IProps = {
  id?: string;
  placeholder?: string;
  className?: string;
  name?: string;
  signup?: boolean;
  markets: { marketId: string, name: string }[];
  msg?: string;
  handleChange: any;
  value: string;
};


const StyledDropDown = styled.div`
  margin-bottom: 10px;
`;

const ErrorText = styled.div`
  text-align: left;
  color: #ff0000;
  margin-top: 5px;
  small {
    text-color: red;
  }
`;

const StyledSelectBox = styled.select<{ signup?: boolean }>`
  padding: 10px;
  border: 1px solid #b0b0b0;
  box-sizing: border-box;
  border-radius: 5px;
  width: 22rem;
  ::placeholder {
    color: #b0b0b0;
  }

  ${({ signup }) => signup && `
    width: 40rem;
    height: 3.5rem;
    margin-bottom: 12px;
  `}
`;

export const SelectField: React.FC<IProps> = (props) => {
  const { className, placeholder, signup, markets, handleChange } = props;

  return (
    <StyledDropDown>
      <StyledSelectBox
        className={className || ''}
        placeholder={placeholder || ''}
        signup={signup}
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={props.value}
      >
        <option value="" label={placeholder || ''} />
        {markets?.map((option) => (
          <option key={option.marketId} value={option.marketId} label={option.name} />
        ))}
      </StyledSelectBox>
      <ErrorText>
        <div>{props.msg}</div>
      </ErrorText>
    </StyledDropDown>
  );
};

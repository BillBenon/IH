import Select from 'react-select'

import styled from 'styled-components';

export const StyledSelectSearch = styled(Select)`
& .Select__indicator Select__dropdown-indicator {
    border-color: transparent transparent red;
    background:black
  }
`;

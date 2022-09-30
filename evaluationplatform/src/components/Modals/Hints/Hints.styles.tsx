import styled from 'styled-components';
import { ChevronThinLeft } from '@styled-icons/entypo/ChevronThinLeft';
import { ChevronThinRight } from '@styled-icons/entypo/ChevronThinRight';

export const StyledIcon = styled.div`
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  &:hover {
    opacity: 0.4;
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
    background: #dbdbdb;
  }
`;

export const StyledPrevIcon = styled(StyledIcon)`
  cursor: ${(props) => (props.theme.hidePrevIcon ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.theme.hidePrevIcon ? 'none' : '')};
  opacity: ${(props) => (props.theme.hidePrevIcon ? '0.4' : '')};
`;

export const StyledNextIcon = styled(StyledIcon)`
  cursor: ${(props) => (props.theme.hideNextIcon ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.theme.hideNextIcon ? 'none' : '')};
  opacity: ${(props) => (props.theme.hideNextIcon ? '0.4' : '')};
`;

export const PreviousIcon = styled(ChevronThinLeft)`
  color: #5b94e3;
  width: 30px;
  height: 30px;
  &:hover {
    color: black;
  }
`;

export const NextIcon = styled(ChevronThinRight)`
  color: #5b94e3;
  width: 30px;
  height: 30px;
  &:hover {
    color: black;
  }
`;

export const StyledHintHeader = styled.h4`
  margin-top: 10px;
  margin-bottom: ;
  text-align: center;
`;

export const StyledHintPagination = styled.div`
  text-align: right;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  position: absolute;
  right: 0px;
  top: 6px;
`;
export const StyledHintBody = styled.div`
  .ql-disabled{
    background: white !important;
  }
  .ql-editor{
    padding-left: 0;
    min-height: auto !important;
  }
  margin: 1rem 4rem 4rem;
  max-height: 24rem;
  overflow: auto;
  text-align: left;
`;

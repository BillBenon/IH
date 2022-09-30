import styled from 'styled-components';
import { ChevronLeft } from '@styled-icons/fa-solid/ChevronLeft';
import { ChevronRight } from '@styled-icons/fa-solid/ChevronRight';

export const StyledIcon = styled.div`
  margin: 0 1rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  align-self: center;
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
  opacity: ${(props) => (props.theme.hidePrevIcon ? '0.4' : 'unset')};
`;

export const StyledNextIcon = styled(StyledIcon)`
  cursor: ${(props) => (props.theme.hideNextIcon ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.theme.hideNextIcon ? 'none' : '')};
  opacity: ${(props) => (props.theme.hideNextIcon ? '0.4' : 'unset')};
`;

export const PreviousIcon = styled(ChevronLeft)`
  color: #5b94e3;
  width: 30px;
  height: 30px;
  &:hover {
    color: black;
  }
`;

export const NextIcon = styled(ChevronRight)`
  color: #5b94e3;
  width: 30px;
  height: 30px;
  &:hover {
    color: black;
  }
`;

export const StyledHintsHeader = styled.h4`
  margin-top: 1rem;
  flex: 0 100%;
  text-align: center;
`;

export const StyledHintsBody = styled.div`
  margin: 1rem;
  max-height: 20rem;
  overflow: auto;
  text-align: left;
`;

export const StyledHints = styled.div`
  margin: 1rem;
`;

export const StyledSolutions = styled.div`
  .ql-disabled{
    background: white !important;
  }
  .ql-editor{
    padding-left: 0;
    min-height: auto !important;
  }
  width: 100%;
  text-align: left;
`;

export const StyledSampleModal = styled.div`
  display: flex;
`;

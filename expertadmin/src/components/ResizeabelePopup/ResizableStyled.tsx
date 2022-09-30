import styled from 'styled-components';

export const RndWrapper = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 1;
  pointer-events: none;

  .react-draggable {
    box-shadow: 0px -4px 8px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    top: unset !important;
    bottom: 0;
    transform: ${({ isOpen }: { isOpen: Boolean }) =>
      isOpen ? 'translate(0, 0) !important' : 'translate(0, 100%) !important'};
    transition: transform 0.4s ease-out;
    background: #fff;
    pointer-events: all;
    overflow-y: auto;
  }
`;

export const HandleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 4px;
  transform: translateX(-50%);
  svg:last-child {
    margin-top: -24px;
  }
`;

export const CloseButton = styled.div`
  position: absolute;
  right: 8px;
  top: 5px;
  cursor: pointer;
`;

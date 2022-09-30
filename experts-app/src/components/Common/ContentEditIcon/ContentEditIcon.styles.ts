import styled from 'styled-components';
import { Pencil } from '@styled-icons/icomoon/Pencil';

export const StyledPencilIcon = styled.div`
    right: 1rem;
    top: 1rem;
    display: flex;
    flex-direction: column;
    height: -webkit-fill-available;
    justify-content: space-between;
    align-items: center;
    width:1.5rem;
    position:absolute;
`;

export const BluePencil = styled(Pencil)`
  color: #5b94e3;
  cursor: pointer;
  position: absolute;
  &:hover {
    background: #b9b9b9;
  }
`;
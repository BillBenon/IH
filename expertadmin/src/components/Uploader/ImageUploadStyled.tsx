import styled, { css } from 'styled-components';

const FlexCenterCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DnDWrapper = styled.div`
  height: 130px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='1' stroke-dasharray='6%2c 14' stroke-dashoffset='3' stroke-linecap='square'/%3e%3c/svg%3e");
  .file-drop {
    height: 100%;
    width: 100%;
    margin: 0 auto;
    cursor: pointer;
  }

  .file-drop-target {
    ${FlexCenterCenter};
    flex-direction: column;
    position: relative;
    display: flex;
    height: 100%;
    align-items: center;
  }

  .file-drop > .file-drop-target.file-drop-dragging-over-frame {
    height: 100%;
    width: 100%;
    border: none;
    background-color: rgba(0, 0, 0, 0.08);
    color: rgba(0, 0, 0, 0.7);
  }

  input {
    display: none;
  }
`;

export const FileNameWrapper = styled.div`
  bottom: -21px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Font18 = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.48);
  margin: 0 0 12px;
`;

export const Font14 = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.68);
  margin: 0;
`;

export const Button = styled.button`
  font-weight: 400;
  font-size: 14px;
  color: ${(props: any) => props.theme.color};
  padding: 12px 16px;
  background: transparent;
  border: 1px solid ${(props: any) => props.theme.color};
  border-radius: 4px;
  outline: none;
  &:hover {
    background-color: rgba(0, 0, 0, 0.18);
  }
  &:disabled {
    pointer-events: none;
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
export const ImageWrapper = styled.div`
  flex: 0.2;
  padding-left: 20px;
  display: flex;
`;

export const UploadWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

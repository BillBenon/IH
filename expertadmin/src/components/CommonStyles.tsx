import styled from 'styled-components';
import { DragIndicator } from '@styled-icons/material/DragIndicator';

export const SmallSpan = styled.span`
  font-size: 10px;
  font-weight: 600;
  color: rgba(22, 22, 22, 0.48);
`;

export const BoldSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #161616;
`;

export const LighSpan = styled.span`
  color: #a8a8a8;
  font-size: 14px;
`;

export const BigSpan = styled.span`
  font-size: 20px;
  color: #161616;
`;

export const NormalSpan = styled.span`
  display: flex;
  color: rgba(22, 22, 22, 1);
  font-size: 14px;
`;

export const ChipWrapper = styled.div`
  padding-top: 0.3em;
`;

export const EllipsedSpan = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
  p{
    margin-bottom: 0px !important;
  }
`;

export const DragIndicatorIcon = styled(DragIndicator)`
  fill: rgba(0, 0, 0, 0.6);
  width: 24px;
  height: 24px;
  margin-top: 8px;
`;

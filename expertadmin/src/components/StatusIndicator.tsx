import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { State } from 'utils/constants';

import { NormalSpan } from './CommonStyles';

interface ChipProps {
  variant: string;
  text: string;
}

const Dot = styled.span`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  font-size: 12px !important;
  background-color: ${(props: any) => props.theme.color};
`;

export const StatusIndicator: FC<ChipProps> = (props) => {
  const [color, setColor] = useState<string>('#16AB6B');

  useEffect(() => {
    switch (props.variant) {
      case State.COMPLETED:
        setColor('#16AB6B');
        break;
      case State.DISABLED:
        setColor('#FF0000');
        break;
      case State.INPROGRESS:
        setColor('#FFBF00');
        break;
      case State.PUBLISHED:
        setColor('#16AB6B');
        break;
      default:
        setColor('#FFB266');
        break;
    }
  }, [props.variant]);

  return (
    <div className="d-flex align-items-center p-0">
      <Dot theme={{ color }}></Dot>
      <NormalSpan>{props.text}</NormalSpan>
    </div>
  );
};

import React, { FC, ReactNode, useEffect, useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';

import { ChipButton } from './ChipButton';

interface ChipProps {
  variant: 'Market' | 'Track' | 'Capability' | 'TrackType';
  text: string;
  clamp?: boolean;
  hoverContent?: ReactNode;
}

export const Chip: FC<ChipProps> = (props) => {
  const [color, setColor] = useState<string>('#000');
  const [backgroundcolor, setBackgroundcolor] = useState<string>('#E5E0DF');

  const popover = props.hoverContent && (
    <Popover id={props.variant}>
      <Popover.Content>{props.hoverContent}</Popover.Content>
    </Popover>
  );

  useEffect(() => {
    switch (props.variant) {
      case 'Market':
        setColor('#fff');
        setBackgroundcolor('#6929C4');
        break;
      case 'Track':
        setColor('#fff');
        setBackgroundcolor('#009D9A');
        break;
      case 'Capability':
        setBackgroundcolor('#CFD8DC');
        break;
      case 'TrackType':
        setColor('#fff');
        setBackgroundcolor('#1E88E5');
        break;
    }
  }, [props.variant]);

  return (
    <>
      {popover ? (
        <OverlayTrigger
          trigger={'click'}
          placement={'bottom'}
          rootClose={true}
          overlay={popover}
        >
          <ChipButton theme={{ backgroundcolor, color, clamp: props.clamp }}>
            {' '}
            {props.text}
          </ChipButton>
        </OverlayTrigger>
      ) : (
        <ChipButton theme={{ backgroundcolor, color, clamp: props.clamp }}>
          {' '}
          {props.text}
        </ChipButton>
      )}
    </>
  );
};

import React from 'react';

interface IProps {
  fill?: string;
}

export default (props: IProps) => (
  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9.5" cy="9.5" r="9" fill={props.fill || '#7E7E7E'} stroke="#7E7E7E" />
  </svg>
);

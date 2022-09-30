import React from 'react';

interface IProps {
  fill?: string;
}

export default (props: IProps) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6.5" cy="6.5" r="6.5" fill={props.fill || '#7E7E7E'} />
  </svg>
);

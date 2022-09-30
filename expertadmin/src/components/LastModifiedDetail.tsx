import { BoldSpan, SmallSpan } from 'components/CommonStyles';
import moment from 'moment';
import React, { FC } from 'react';

interface LastModifiedDetailProps {
  by: string;
  datetime: string;
}

export const LastModifiedDetail: FC<LastModifiedDetailProps> = (props) => {
  const { by, datetime } = props;
  return (
    <div>
      <SmallSpan>{'Last modified by '}</SmallSpan>
      <BoldSpan>{by}</BoldSpan>
      <SmallSpan>{' on '}</SmallSpan>
      <BoldSpan>{moment(datetime).format('HH:mm, DD MMM, YYYY')}</BoldSpan>
    </div>
  );
};

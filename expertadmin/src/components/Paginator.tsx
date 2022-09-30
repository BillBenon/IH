import { ChevronLeft, ChevronRight } from '@styled-icons/boxicons-regular';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import styled from 'styled-components';

import { ThemedIcon } from './ThemedIcon';

interface PaginatorProps {
  count: number;
  skipcount: number;
  total: number;
  onAction: Function;
  loading: boolean;
}

export const PaginatorWrapper = styled.div`
  margin-left: auto;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
`;

export const PaginationText = styled.span`
  color: rgba(23, 23, 23, 0.6);
  font-size: 14px;
`;

export const Paginator = forwardRef((props: PaginatorProps, ref) => {
  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState(0);

  const handleStartvalue = () => {
    setStartValue(props.skipcount + 1);
  };

  const handleEndvalue = () => {
    const endval = props.skipcount + props.count;
    setEndValue(endval < props.total ? endval : props.total);
  };

  useImperativeHandle(ref, () => ({
    goBack() {
      back();
    },
    goNext() {
      next();
    },
  }));

  const back = () => {
    startValue != 1 &&
      props.onAction(
        props.skipcount - props.count < 0 ? 0 : props.skipcount - props.count
      );
  };

  const next = () => {
    endValue != props.total &&
      props.onAction(
        props.skipcount + props.count > props.total
          ? props.total
          : props.skipcount + props.count
      );
  };

  useEffect(() => {
    handleStartvalue();
    handleEndvalue();
  }, [props]);

  return (
    <PaginatorWrapper>
      <PaginationText>
        {(props.total ? startValue : props.total) +
          ' - ' +
          endValue +
          ' of ' +
          props.total}
      </PaginationText>
      <ThemedIcon
        onClick={back}
        theme={{ disabled: startValue == 1 }}
        icon={ChevronLeft}
      />
      <ThemedIcon
        onClick={next}
        theme={{ disabled: endValue == props.total }}
        icon={ChevronRight}
      />
    </PaginatorWrapper>
  );
});

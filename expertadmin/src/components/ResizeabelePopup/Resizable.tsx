import { HorizontalRule } from '@styled-icons/material-outlined/HorizontalRule';
import { NormalSpan } from 'components/CommonStyles';
import React, { useState } from 'react';
import { Rnd } from 'react-rnd';

import { CloseButton, HandleWrapper, RndWrapper } from './ResizableStyled';

const handle = () => (
  <HandleWrapper>
    <HorizontalRule size={20} />
    <HorizontalRule size={20} />
  </HandleWrapper>
);

interface Props {
  width?: string | number;
  height?: string | number;
  minHeight?: string | number;
  isOpen: Boolean;
  children?: React.ReactElement<any>;
  style?: object;
  onClose: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Resizable = ({
  width = '100%',
  height = 320,
  minHeight = 220,
  isOpen,
  children,
  style,
  onClose,
}: Props) => {
  const [widthValue, setWidthValue] = useState<string | number>(width);
  const [heightValue, setHeightValue] = useState<string | number>(height);
  const size = { width: widthValue, height: heightValue };
  const enable = {
    top: true,
  };
  const handleComponent = {
    top: handle(),
  };

  return (
    <RndWrapper onClick={onClose} isOpen={isOpen}>
      <Rnd
        style={style}
        disableDragging
        minHeight={minHeight}
        maxHeight={'80vh'}
        size={size}
        enableResizing={enable}
        resizeHandleComponent={handleComponent}
        onResize={(e: any, direction: any, ref: any) => {
          setWidthValue(ref.offsetWidth);
          setHeightValue(ref.offsetHeight);
        }}
      >
        {children}
        <CloseButton onClick={onClose}>
          <NormalSpan style={{ color: 'red' }}>{'Close'}</NormalSpan>
        </CloseButton>
      </Rnd>
    </RndWrapper>
  );
};
export default Resizable;

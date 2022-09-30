import React, { useState } from 'react';

type ImageCircleProps = {
  imageWidth?: number;
  imageHeight?: number;
  roundedSize?: number;
  roundedColor?: string;
  hoverColor?: string;
  image?: string;
  initials?: string;
  borderRadius?: number;
  style?: any;
};

export const ImageCircle = ({
  image,
  initials,
  imageWidth = 48,
  imageHeight = 48,
  roundedSize = 5,
  roundedColor = '#FFF',
  hoverColor = '',
  borderRadius = 50,
  style
}: ImageCircleProps) => {
  const [isHover, setIsHover] = useState<boolean>();
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      style={{
        background: `${!!image && !image.startsWith('logo')
            ? isHover && hoverColor != ''
              ? hoverColor
              : roundedColor
            : 'rgba(0, 0, 0, 0.16)'
          }`,
        width: `${imageWidth}px`,
        height: `${imageHeight}px`,
        borderRadius: `${borderRadius}%`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.5s ease',
        color: 'rgba(0, 0, 0, 0.48)',
        ...style
      }}
    >
      {!!image && !image.startsWith('logo') ? (
        <img
          style={{
            width: `${imageWidth - roundedSize}px`,
            height: `${imageHeight - roundedSize}px`,
            borderRadius: `${borderRadius - roundedSize / 2}px`,
          }}
          src={image}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

import { MinusCircle } from '@styled-icons/boxicons-regular/MinusCircle';
import { BoldSpan, SmallSpan } from 'components/CommonStyles';
import { IconContainer } from 'components/IconContainer';
import { ImageCircle } from 'components/ImageCircle';
import React from 'react';
import { Col } from 'react-bootstrap';

import { Card, TitleWrapper } from './SmallCardStyled';

interface Props {
  id?: string | number;
  image?: string;
  title: string;
  subTitle?: string;
  onDelete?: Function;
  onClick?: Function;
  disabled?: boolean;
}

const SmallCard = ({
  id,
  image,
  title,
  subTitle,
  onDelete,
  onClick,
  disabled,
}: Props) => {
  return (
    <Col
      xs={12}
      md={6}
      lg={4}
      className="pb-3"
      style={{ cursor: !id ? 'pointer' : 'default' }}
      onClick={() => !disabled && onClick && onClick()}
    >
      <Card key={id}>
        <div className="d-flex">
          <ImageCircle image={image} initials={id ? title.charAt(0) : '+'} />
          <TitleWrapper>
            <BoldSpan>{title}</BoldSpan>
            {subTitle && <SmallSpan>{subTitle}</SmallSpan>}
          </TitleWrapper>
        </div>
        {onDelete && id && (
          <IconContainer
            color={'rgba(0, 0, 0, 0.6)'}
            icon={MinusCircle}
            onClick={() => onDelete(id)}
          ></IconContainer>
        )}
      </Card>
    </Col>
  );
};

export default SmallCard;

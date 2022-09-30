import { CaretRightFill } from '@styled-icons/bootstrap';
import { CloseCircle } from '@styled-icons/ionicons-solid/CloseCircle';
import { StyledIcon } from '@styled-icons/styled-icon';
import React, { FC } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AddCircle } from '@styled-icons/ionicons-sharp/AddCircle';
import { Pencil } from '@styled-icons/boxicons-solid/Pencil';
import { EyeFill } from '@styled-icons/bootstrap/EyeFill';
import { IconContainer } from './IconContainer';
import { EllipsedSpan } from './CommonStyles';

const IconButton = styled.div`
  cursor: pointer;
`;

const IconText = styled.div`
  font-style: normal;
  font-weight: ${(props) => (props.theme.isActive ? '600' : 'normal')};
  color: ${(props) =>
    props.theme.isActive ? '#171717' : ' rgba(23, 23, 23, 0.6)'};
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  width: 100%;
  height: 74px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) =>
    props.theme.isActive ? '#5B94E3' : 'rgba(59, 59, 59, 0.6)'};
  &:hover {
    color: #5b94e3;
    text-decoration: none;
  }
`;

const SideIndicator = styled.div`
  width: 16px;
  position: absolute;
  height: 73px;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: rgba(91, 148, 227, 0.16);
  &:hover {
    background: rgba(91, 148, 227, 0.48);
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid
    hsla(214.85294117647058, 70.83333333333331%, 62.35294117647059%, 0.16);
`;

const SubmenuList = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  color: rgba(59, 59, 59, 0.6);
  font-size: 16px;
  cursor: pointer;
  padding: 5px 5px 5px 12px;
  &:hover {
    background-color: #f1f1f170;
  }
`;

const SubmenuListWrapper = styled.div`
  margin: -12px;
`;

const SubmenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

interface MenuItemProps {
  icon: StyledIcon;
  to: string;
  isActive: boolean;
  text: string;
  recentItems?: {
    icon: 'Add' | 'Edit' | 'View';
    name: string;
    param: string;
  }[];
  onSubmenuClose?: (param: string) => void;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  const Icon = props.icon;
  const history = useHistory();

  const handleMenuClose = (event: any, param: string) => {
    props.onSubmenuClose && props.onSubmenuClose(param);
    event.stopPropagation();
  };

  const popover = (
    <Popover id={'menusubitem'} show={true}>
      <Popover.Content>
        <SubmenuListWrapper>
          {props.recentItems?.map((rr) => (
            <SubmenuList
              key={rr.param}
              onClick={() => history.push(`${props.to}/${rr.param}`)}
            >
              <SubmenuItem>
                <IconContainer
                  disableHover={true}
                  icon={
                    rr.icon == 'Add'
                      ? AddCircle
                      : rr.icon == 'Edit'
                      ? Pencil
                      : EyeFill
                  }
                />
                <EllipsedSpan title={rr.name} className="pr-4 pl-2 w-100">
                  {rr.name}
                </EllipsedSpan>
                <IconContainer
                  color="#E25252"
                  icon={CloseCircle}
                  onClick={(e: any) => handleMenuClose(e, rr.param)}
                />
              </SubmenuItem>
            </SubmenuList>
          ))}
        </SubmenuListWrapper>
      </Popover.Content>
    </Popover>
  );

  return (
    <Wrapper>
      <StyledLink to={props.to} theme={{ isActive: props.isActive }}>
        <IconButton theme={props.isActive}>
          <Icon width="30px" style={{ alignSelf: 'center' }} />
          <IconText theme={{ isActive: props.isActive }}>{props.text}</IconText>
        </IconButton>
      </StyledLink>
      {props.recentItems && !!props.recentItems.length && (
        <OverlayTrigger
          trigger={'click'}
          placement={'right'}
          rootClose={true}
          overlay={popover}
        >
          <SideIndicator>
            <IconContainer
              color={'#000000'}
              height={'10px'}
              icon={CaretRightFill}
            />
          </SideIndicator>
        </OverlayTrigger>
      )}
    </Wrapper>
  );
};

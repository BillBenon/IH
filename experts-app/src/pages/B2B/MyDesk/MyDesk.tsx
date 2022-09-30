import React from "react";
import OuterDiv from "components/Common/OuterDivComponent";
import { useMenuVisibility } from "providers/menuVisibilityProvider";
import styled from "styled-components";
import { Header } from '../Components';
import { MyDeskContainer } from './MyDeskContainer';

const Wrapper = styled.div`
  margin-left: 34px;
  margin-right: 34px;
  margin-top: 40px;
`;

export const MyDeskPage = () => {
    const { isMenuVisible } = useMenuVisibility()!;

    return (
        <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
            <Wrapper>
                <Header title="My Desk" />
                <MyDeskContainer />
            </Wrapper>
        </OuterDiv>
    );
};

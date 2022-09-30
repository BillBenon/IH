import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex
    align-items: center;
`;

const Title = styled.div`
    font-size: 36px;
    font-family: 'Poppins';
`;

type Props = {
    title: string;
}

const Header = ({ title }: Props) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
        </Wrapper>
    )
};

export default Header;
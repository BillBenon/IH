import React from 'react';
import styled from "styled-components";


const Wrapper = styled.div`
    width: 330px;
    box-shadow: 0px 0px 20px rgba(92,111,139,0.12);
    margin: 1em;
    padding: 2em;
`;
const DivBanner = styled.a`
    height: auto;
`;
const BannerHeading = styled.a`
    width: 227px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 32px;
    margin: 10px 0;
    color: #5B94E3;
    text-decoration: none;
`;
const BannerDescription = styled.div`
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: rgba(0,0,0,0.74);
    clear: right;
    word-wrap: normal;
`;

const BannerCTA = styled.a`
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 18px;
    color: #5B94E3;
    float: left;
    text-decoration: none;
`;

export function ImageCard({ children, title, description, link, leadText }) {
    return (<Wrapper>
        {children}
        <DivBanner>
            <BannerHeading href={link}>{title}</BannerHeading>
            <BannerDescription>{description}</BannerDescription>
            <BannerCTA href={link}>{leadText}</BannerCTA>
        </DivBanner>
    </Wrapper>);
}



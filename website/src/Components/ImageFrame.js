import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from "styled-components";


const Wrapper = styled.a`
    height: 235px;
    width: 282px;
`;

export function ImageFrame(props){
    return(<Wrapper href={props.link}>
        
        <img data-tip={props.title} href={props.link} src={props.svg} alt="Behavior interview coaching"></img>
        <ReactTooltip />
    </Wrapper>);
}
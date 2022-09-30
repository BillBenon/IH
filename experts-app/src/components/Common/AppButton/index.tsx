import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const AppButton = styled(Button)`
    display: flex;
    width: 192px;
    height: 45px;
    border: 1px solid #5B94E3;
    box-sizing: border-box;
    border-radius: 48px;
    color: #5B94E3;
    background: #FFFF;
    font-size: 15px;
    justify-content: center;
    line-height: 30px;
    &:hover{
        background: #5B94E3;
        line-height: 30px;
        background: #5B94E3;
        color: #FFFF;
    }
`;
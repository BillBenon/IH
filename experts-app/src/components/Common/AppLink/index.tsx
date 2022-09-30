import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

export const AppLink = styled(Button)`
    padding: 0 10px;
    font-size: 12px;
    text-decoration: underline;
    &:focus {
        outline: 0;
        box-shadow: 0;
    }
`;
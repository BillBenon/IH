import React from 'react';
import { StyledAddQueryButton } from './AddQueryTab.styles';

export const AddQueryTab = (props: { handleAdd: any }) => {
    return (
        <StyledAddQueryButton onClick={() => props.handleAdd()}>
            {'+ Add Tab'}
        </StyledAddQueryButton>
    )
}
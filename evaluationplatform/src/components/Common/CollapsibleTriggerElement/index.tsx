import React from 'react';
import styled from 'styled-components';
import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';
import { ChevronUp } from '@styled-icons/boxicons-regular/ChevronUp';

const CollapsibleHead = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    color: ${(props) => props.theme.colors.primary};
    font-size: 20px;
    font-weight: bold;
}
`;

export const TriggerElm = ({ heading, open }: any) => (
    <CollapsibleHead>
        <div>
            {heading}
        </div>
        {!open && <ChevronDown width="40px" />}
        {open && <ChevronUp width="40px" />}
    </CollapsibleHead>
)
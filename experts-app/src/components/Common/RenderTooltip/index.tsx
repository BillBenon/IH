import React from "react";

import { Tooltip, TooltipProps } from 'react-bootstrap';

export default function RenderTooltip(props: TooltipProps) {

    return (
        <Tooltip {...props}>
            Simple tooltip
        </Tooltip >
    );
}
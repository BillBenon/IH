import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { LeftIcon, RightIcon } from '../../containers/Feedback/TabContent/Submissions/SubmissionDetail/SubmissionDetail.styles';

interface PaginatorProps {
    count: number; // records count at a time
    skipcount: number; // page number starting from 0
    total: number; // total pages
    onAction: Function; // on change page
}

export const PaginatorWrapper = styled.div`
    margin-left: auto;
    text-align: right;
`;

export const PaginationText = styled.span`
    color: rgba(23, 23, 23, 0.6);
    font-size: 14px;
`;

export const Paginator: React.FC<PaginatorProps> = (props) => {
    const [startValue, setStartValue] = useState(0);
    const [endValue, setEndValue] = useState(0);


    const handleStartvalue = () => {
        setStartValue(props.skipcount + 1);
    }

    const handleEndvalue = () => {
        let endval = (props.skipcount + props.count);
        setEndValue(endval < props.total ? endval : props.total);
    }

    useEffect(() => { handleStartvalue(); handleEndvalue(); }, [props]);

    return (
        <PaginatorWrapper>
            <PaginationText>{startValue + ' - ' + endValue + ' of ' + props.total}</PaginationText>
            <LeftIcon
                onClick={() => startValue != 1 && props.onAction(props.skipcount - props.count < 0 ? 0 : props.skipcount - props.count)}
                theme={{ disabled: startValue == 1 }}
            />
            <RightIcon
                onClick={() => endValue != props.total && props.onAction(props.skipcount + props.count > props.total ? props.total : props.skipcount + props.count)}
                theme={{ disabled: endValue == props.total }} />
        </PaginatorWrapper>
    )
}


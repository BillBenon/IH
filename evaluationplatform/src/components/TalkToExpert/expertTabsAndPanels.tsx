import { Badge } from '@material-ui/core';
import Box3d from 'components/Common/ProductBox';
import React from 'react';
import styled from 'styled-components';

const StyledBox3d = styled(Box3d)`
    box-shadow: none !important;
    border-radius: 0.25rem !important;
`;

export const ExpertTab = ({ name, badgeCount }: any) => (
    <Badge badgeContent={badgeCount} color="primary">
            <div className="mx-2 font-weight-bold">{name}</div>
    </Badge>
)

export const MeetingProduct = ({ prop, btnHandler, btnLabel, tag }: any) => (
    <div className="wrap-flexitem flex-justify-center">
        <StyledBox3d    
            className="card"
            id={prop.id}
            title={prop.displayName}
            description={prop.displayDescription}
            btnLabel={btnLabel}
            icon={'http://assets.interviewhelp.io/INTERVIEW_HELP/icons/humanLaptopDark.svg'}
            clickHandler={() => btnHandler(prop.id, prop.price / 100, prop.displayName)}
            tag={tag}
            tagCss={{ fontSize: '14px', letterSpace: '1px', fontWeight: '500' }}
            isBought={prop.meetingPaidButNotScheduled}
            style={{background: prop.meetingPaidButNotScheduled ? "#007bff17": "#FFF", isBought: prop.meetingPaidButNotScheduled}}
        />
    </div>
)
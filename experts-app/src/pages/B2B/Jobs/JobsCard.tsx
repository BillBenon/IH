import React, { useState } from "react";
import styled from "styled-components";
import { Row, Table } from 'react-bootstrap';
import { CardWrapper } from "./JobsContainer";
import { jobTypes } from "containers/HiringManager/Jobs.util";
import { AttributeEntity } from "types/Jobs";
import { ChevronDoubleRight } from '@styled-icons/bootstrap/ChevronDoubleRight';
import { SubmitButton } from "./Jobs.styled";
import { theme } from "../constants";
import { CapabilitiesModal, CapabilityLink } from './CapabilitiesModal';

type Props = {
    jobId: string;
    title: string;
    jobType: string;
    openPositions: string;
    closePositions?: string;
    attributes: AttributeEntity[];
    handleCheckCandidates: (jobId: string) => void;
}

const CardBody = styled.div`
    .row {
        margin-bottom: 12px;
    }

    .title {
        font-size: 14px;
        .value {
            color: #6F6F6F;
        }
    }
`;

const CardFooter = styled.div``;

export const JobsCard = ({ jobId, title, jobType, openPositions, closePositions, attributes, handleCheckCandidates }: Props) => {
    const [showCapabilites, setShowCapabilites] = useState<boolean>(false);

    const handleShowCapabilities = () => setShowCapabilites(true);

    const handleHideCapabilities = () => setShowCapabilites(false);

    return (
        <CardWrapper className="job-card">
            <CardBody>
                <Row style={{ marginBottom: '20px', marginRight: '15px' }} className="mb--20 font-weight-bold">
                    {title}
                </Row>
                <Row className="title">
                    <span className="font-weight-bold">Total Open Positions:&nbsp;</span>
                    <span className="value">{openPositions} openings</span>
                </Row>
                <Row className="title">
                    <span className="font-weight-bold">Job Type:&nbsp;</span>
                    <span className="value">{jobTypes.find(o => o.key === jobType)?.value}</span>
                </Row>
                <Row>
                    <CapabilityLink>
                        <div onClick={handleShowCapabilities}>
                            View Capabilities
                            <ChevronDoubleRight />
                        </div>
                        <CapabilitiesModal attributes={attributes} show={showCapabilites} handleClose={handleHideCapabilities} />
                    </CapabilityLink>
                </Row>
                {closePositions && (
                    <Row className="title">
                        <span className="font-weight-bold">Total Matched Positions:&nbsp;</span>
                        <span className="value">{closePositions} positions</span>
                    </Row>
                )}
            </CardBody>
            <CardFooter style={{ width: '100%' }}>
                <Row style={{ width: '100%', justifyContent: 'center' }}>
                    <SubmitButton onClick={() => handleCheckCandidates(jobId)}>
                        Check Candidates
                    </SubmitButton>
                </Row>
            </CardFooter>
        </CardWrapper>
    )
};
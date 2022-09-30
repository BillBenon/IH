import { ChevronDown } from '@styled-icons/boxicons-regular/ChevronDown';
import { ChevronUp } from '@styled-icons/boxicons-regular/ChevronUp';
import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import styled from 'styled-components';
import AccordionToggle from '../../../../../components/Common/AccordionToggleHook';
import RichTextEditor from '../../../../../components/Common/Editors/RichTextEditor';

interface GuidelinesProps {
    capabilities: CapabilitiyHint[];
}

interface CapabilitiyHint {
    id: string;
    name: string;
    hints: string[];
}

const CustomCard = styled.div`
    border: 0;
    border-bottom: 1px solid #BDBDBD;
    border-radius: 0;
`;

const CardHeading = styled.div`
    border: 0;
    background: transparent;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.32px;
    color: #525252;
    padding: 0.75rem 0;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    align-items: center;
`;

const CustomCardBody = styled.div`
`;

const CustomDropdownIcon = styled(ChevronDown)`
    color: #525252;
    height: 24px;
    line-height: 18px;
`;

const CustomDropupIcon = styled(ChevronUp)`
    color: #525252;
    height: 24px;
    line-height: 18px;
`;

const Paragraph = styled.p`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.32px;
    color: #000000;
`;

export const Guidelines: React.FC<GuidelinesProps> = (props) => {
    return (
        <Accordion defaultActiveKey={props.capabilities[0].id}>
            {props.capabilities.map((cap: CapabilitiyHint) =>
                <CustomCard key={cap.id}>
                    <Accordion.Toggle as={CardHeading} className="pt-0" eventKey={cap.id}>
                        {cap.name}
                        <AccordionToggle eventKey={cap.id} />
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={cap.id}>
                        <CustomCardBody className="mb-2">
                            {cap.hints.map((hint: string, index: number) =>
                                <Paragraph key={index} className="pb-2">
                                    <RichTextEditor
                                        disabled={true}
                                        id={`guidLine-${cap.id}.${index}`}
                                        value={index + 1 + '. ' + hint}
                                        customStyles={{ height: 'auto', boxShadow: 'none', resize: 'none', background: 'white', minHeight: 'auto' }} />
                                </Paragraph>
                            )}
                        </CustomCardBody>
                    </Accordion.Collapse>
                </CustomCard>)}
        </Accordion>
    )
}
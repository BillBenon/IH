import { ChevronDownCircle, ChevronUpCircle } from "@styled-icons/boxicons-solid";
import { IconContainer } from 'components/Common/IconContainer';
import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import styled from 'styled-components';
import { getQuillContent } from 'utilities/helperFunctions';
import RichTextEditor from "../../components/Common/Editors/RichTextEditor";
import { talkToExpertService } from "services/talkToExpert";
import { DEFAULT_TOKEN } from "utilities/constants";

const StyledMeetingNotes = styled.div<any>`
    padding: 0 1rem 1rem 1rem;
    text-align: left;
    cursor: pointer;

    & .quill {
        cursor: default;
    } 
`;

const MeetingNotes = (props: any) => {
    const { id } = props.meetingDetails;
    const [value, setvalue] = useState<string>(props.value);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(false);
    const [rteExpanded, setRteExpanded] = useState(false);

    const handleSendToExpert = async () => {
        const payload = {
            token: DEFAULT_TOKEN,
            meetingDetailId: id,
            candidateNotes: value
        };
        setShowSpinner(true);
        await talkToExpertService.updateMeetingInfo(payload);
        setShowSuccess(true);
        setShowSpinner(false);
        props.onCTASuccess && props.onCTASuccess();
    }

    useEffect(() => {
        if (showSuccess) {
            setTimeout(() => {
                setShowSuccess(false)
            }, 2000)
        }
    }, [showSuccess])

    return (
        <>
            <StyledMeetingNotes className="col-12 p-0 mb-3">
                <div
                    onClick={() => setRteExpanded(!rteExpanded)}
                    className="mb-2 d-flex align-items-center">
                    <b>Your Questions & Notes to expert{getQuillContent(props.value) ? `°` : " "}</b>
                    <IconContainer icon={rteExpanded ? ChevronDownCircle : ChevronUpCircle} tooltip={rteExpanded ? "Collapse" : "Expand"} />
                </div>
                {rteExpanded && <>
                    <RichTextEditor
                        disabled={false}
                        placeholder="Add Notes to expert..."
                        value={value}
                        onChange={
                            (value: any, oldValue: string, source: any) => { setvalue(value); }}
                        id={'meetingrte' + id}
                        customStyles={{ background: 'white', height: '150px' }}
                    />
                    <div className="w-100 d-flex justify-content-start">
                        <Button disabled={props.value === value} className="btn-sm m-1" variant="primary" onClick={handleSendToExpert}>
                            <div className="d-flex align-items-center">{showSpinner && <Spinner size="sm" animation="grow" className="mr-2" />}<div>{'Send to Expert'}</div></div>
                        </Button>
                    </div>
                </>}
            </StyledMeetingNotes>
        </>);
}

export default MeetingNotes;
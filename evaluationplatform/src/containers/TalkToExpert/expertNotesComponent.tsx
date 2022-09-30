import React, { useState } from 'react';
import { ChevronDownCircle, ChevronUpCircle } from "@styled-icons/boxicons-solid";
import styled from 'styled-components';
import { getQuillContent } from 'utilities/helperFunctions';
import RichTextEditor from "components/Common/Editors/RichTextEditor";
import { useLoader } from 'context/loaderDots';
import { talkToExpertService } from "services/talkToExpert";
import { FeedBackStatus } from 'utilities/constants';
import { IconContainer } from 'components/Common/IconContainer';

const StyledMeetingNotes = styled.div<any>`
    padding: 0 1rem 1rem 1rem;
    text-align: left;
    cursor: pointer;

    & .quill {
        cursor: default;
    } 
`;

const ExpertNotesComponent = (props: any) => {
    const [rteExpanded, setRteExpanded] = useState(false);
    const loader = useLoader();

    const handleExpertNoteModal = async () => {
        setRteExpanded(!rteExpanded);
        if (!rteExpanded && props.meetingDetails.id && props.meetingDetails.feedbackStatus !== FeedBackStatus.candidateViewedFeedBack) {
            loader.showLoader();
            await talkToExpertService.candidateViewedExpertNote({ meetingDetailId: props.meetingDetails.id, type: "CANDIDATE" });
            props.getMeeting && props.getMeeting("PAST");
            loader.hideLoader();
        }
    }

    return (
        <StyledMeetingNotes className="col-12 p-0 mb-3">
            <div
                onClick={() => handleExpertNoteModal()}
                className={"mb-2 d-flex align-items-center"}>
                <b>Expert Feedback{getQuillContent(props.notes) ? `°` : " "}</b>
                <IconContainer icon={rteExpanded ? ChevronDownCircle : ChevronUpCircle} tooltip={rteExpanded ? "Collapse" : "Expand"}/>
            </div>
            {rteExpanded && <RichTextEditor
                disabled={true}
                placeholder="Expert Feedback here..."
                value={props.value}
                onChange={() => { }}
                id={'expertNote'}
                customStyles={{ background: 'white', height: '150px', border: '1px solid #ccc', boxShadow: 'none' }}
            />}
        </StyledMeetingNotes>);
}

export default ExpertNotesComponent;
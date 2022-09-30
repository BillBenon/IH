import React, { useState } from 'react'
import { IconContainer } from '../../../../components/Common/IconContainer/IconContainer';
import { ChevronDownCircle, ChevronUpCircle } from "@styled-icons/boxicons-solid";
import RichTextEditor from '../../../../components/Common/Editors/RichTextEditor';

interface ICandidateNotesComponent {
    meeting: any;
}
const CandidateNotesComponent = (props: ICandidateNotesComponent) => {
    const [rteExpanded, setRteExpanded] = useState(false);

    const toggleCandidateFeedback = async () => {
        setRteExpanded(!rteExpanded);
    }

    return (
        <div>
            <div
                onClick={() => toggleCandidateFeedback()}
                className="mb-2 d-flex align-items-center">
                <b>{'Candidate Questions & Notes to You'}</b>
                <IconContainer icon={rteExpanded ? ChevronDownCircle : ChevronUpCircle} tooltip={rteExpanded ? "Collapse" : "Expand"} />
            </div>
            {rteExpanded && <RichTextEditor
                disabled={true}
                placeholder="Notes.."
                value={props.meeting.candidateNotes}
                onChange={() => { }}
                id={'candidateNote'}
                customStyles={{ background: 'white', height: '150px', border: '1px solid #ccc', boxShadow: 'none' }}
            />
            }
        </div>
    )
}

export default CandidateNotesComponent;

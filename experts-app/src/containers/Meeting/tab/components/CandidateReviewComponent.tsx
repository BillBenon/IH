import { ChevronDownCircle, ChevronUpCircle } from "@styled-icons/boxicons-solid";
import React, { useState } from 'react';
import Rating from "react-rating";
import styled from 'styled-components';
import RichTextEditor from '../../../../components/Common/Editors/RichTextEditor';
import { IconContainer } from '../../../../components/Common/IconContainer/IconContainer';
import { meetingService } from '../../../../services/meeting';
import { ReviewStatus } from "../../../../utilities/constants";
const Main = styled.div<any>`
`;

const CandidateReviewComponent = (props: any) => {
    const [rteExpanded, setRteExpanded] = useState(false);

    const toggleCandidateFeedback = async () => {
        setRteExpanded(!rteExpanded);
        if (!rteExpanded && props.meeting.reviewStatus === ReviewStatus.candidateGivesReview) {
            await meetingService.expertViewedCandidateReview({ meetingDetailId: props.meeting.meetingDetailId, type: "EXPERT" });
            await props.getMeetings();
        }
    }

    return (
        <Main>
            <div
                onClick={() => toggleCandidateFeedback()}
                className="mb-2 d-flex align-items-center">
                <b>{'Candidate review for the Meeting'}</b>
                <IconContainer icon={rteExpanded ? ChevronDownCircle : ChevronUpCircle} tooltip={rteExpanded ? "Collapse" : "Expand"} />
            </div>
            {rteExpanded &&
                <div className="mt-4">
                    <div className="small font-weight-bold">{'Candidate Overall Meeting Experience:'}</div>
                    <div className="mb-2">
                        <Rating
                            emptySymbol={<img height={'30px'} width="30px" src={require("../icons/star-empty.png")}/>}
                            fullSymbol={<img height={'30px'} width="30px" src={require("../icons/star-fill.png")}/>}
                            readonly={true}
                            initialRating={props.meeting.candidateFeedback?.rating || 0}
                        />
                    </div>
                    <div className="small font-weight-bold">{'Candidate views about you:'}</div>
                    <RichTextEditor
                        disabled={true}
                        placeholder="Notes.."
                        value={props.meeting.candidateFeedback?.comment}
                        onChange={() => { }}
                        id={'candidateNote'}
                        customStyles={{ background: 'white', height: '150px', border: '1px solid #ccc', boxShadow: 'none' }}
                    />
                </div>
            }
        </Main>
    )
}
export default CandidateReviewComponent;
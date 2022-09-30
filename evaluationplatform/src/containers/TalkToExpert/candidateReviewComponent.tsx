import React, { useState, useEffect, useRef } from 'react';
import { Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import RichTextEditor from "components/Common/Editors/RichTextEditor";
import { useLoader } from 'context/loaderDots';
import { debounce } from 'lodash';
import { Button } from 'react-bootstrap';
import { talkToExpertService } from "services/talkToExpert";
import styled from 'styled-components';
import { ReviewStatus } from 'utilities/constants';
import { ChevronDownCircle, ChevronUpCircle } from "@styled-icons/boxicons-solid";
import { IconContainer } from 'components/Common/IconContainer';

const StyledMeetingNotes = styled.div<any>`
    padding: 0 1rem 1rem 1rem;
    text-align: left;
    cursor: pointer;
    & .quill {
        cursor: default;
    } 
`;

interface ICandidateReviewComponent {
    meetingDetails: any;
    value: IValue;
    getMeeting: Function;
}

interface IValue {
    rating: number | undefined; comment: string | undefined;
}

export const CandidateReviewComponent = (props: ICandidateReviewComponent) => {
    const [rteExpanded, setRteExpanded] = useState(false);
    const [showToaster, setShowToaster] = useState<boolean>(false);
    const [rating, setRating] = useState<number | undefined>(props.value?.rating);
    const [comment, setComment] = useState<string | undefined>(props.value?.comment);
    const isFirstRun = useRef(true);

    const debouncedChange = useRef(
        debounce(async (rating, comment) => {
            handleSubmitToExpert(false, rating, comment);
        }, 1000)
    ).current;

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        debouncedChange(rating, comment);
    }, [rating, comment, debouncedChange])

    useEffect(() => {
        if (showToaster) {
            setTimeout(() => {
                setShowToaster(false)
            }, 2000)
        }
    }, [showToaster])

    const loader = useLoader();
    let showSubmitButton = !props.meetingDetails.candidateFeedbackProvided || props.meetingDetails.reviewStatus === ReviewStatus.candidateGivingReview;

    const toggleCandidateReview = async () => {
        setRteExpanded(!rteExpanded);
    }

    const handleSubmitToExpert = async (isSubmit: boolean, rating: number, comment: string) => {
        if (props.meetingDetails.id && showSubmitButton) {
            loader.showLoader();
            await talkToExpertService.submitMeetingFeedback({ meetingDetailId: props.meetingDetails.id, type: "CANDIDATE", feedback: { rating, comment }, submit: isSubmit });
            if (!isSubmit) setShowToaster(true);
            props.getMeeting && props.getMeeting("PAST");
            loader.hideLoader();
        }
    }

    const title = showSubmitButton ? 'Write a meeting review' : "Your meeting review";

    return (
        <StyledMeetingNotes className="col-12 p-0 mb-3">
            <div
                onClick={() => toggleCandidateReview()}
                className="mb-2 d-flex align-items-center">
                <b>{title}</b>
                <IconContainer icon={rteExpanded ? ChevronDownCircle : ChevronUpCircle} tooltip={rteExpanded ? "Collapse" : "Expand"} />
            </div>
            {rteExpanded && <>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name={`rating${props.meetingDetails.id}`}
                    value={rating}
                    disabled={!showSubmitButton}
                    onChange={(event: any, newValue: number | null) => {
                        if (newValue)
                            setRating(newValue);
                    }}
                />
                <Typography className="mt-2" component="legend">Comments</Typography>
                <RichTextEditor
                    disabled={!showSubmitButton}
                    placeholder="Write your review for expert"
                    value={comment || ""}
                    onChange={(value: any) => { setComment(value); }}
                    id={`expertNote${props.meetingDetails.id}`}
                    customStyles={{ background: 'white', height: '150px', border: '1px solid #ccc', boxShadow: 'none' }}
                />
                {showToaster && <div className='d-flex align-items-center justify-content-center text-success'>{'Your message is saved'}</div>}
                {showSubmitButton && <div className="w-100 d-flex justify-content-start">
                    <Button className="btn-sm m-1" variant="primary" onClick={() => handleSubmitToExpert(true, rating || 0, comment || "")}>{'Submit review to Expert'}</Button>
                </div>}
            </>}
        </StyledMeetingNotes>
    );
}

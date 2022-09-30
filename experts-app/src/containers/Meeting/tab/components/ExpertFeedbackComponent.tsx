import { ChevronDownCircle, ChevronUpCircle } from "@styled-icons/boxicons-solid";
import { debounce } from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import RichTextEditor from '../../../../components/Common/Editors/RichTextEditor';
import { IconContainer } from '../../../../components/Common/IconContainer/IconContainer';
import { useLoader } from "../../../../context/loaderContext";
import { meetingService } from '../../../../services/meeting';
import { FeedBackStatus, MeetingStatus } from '../../../../utilities/constants';

interface ICandidateFeedbackComponent {
    meeting: any;
    getMeetings?: () => void
}

const ExpertFeedbackComponent = ({ meeting, getMeetings }: ICandidateFeedbackComponent) => {
    const [rteExpanded, setRteExpanded] = useState(false);
    const [comment, setComment] = useState<string>(meeting.expertFeedback?.comment);
    const [showToaster, setShowToaster] = useState<false | "submit" | "save">(false);
    const Loader = useLoader();
    const isFirstRun = useRef(true);

    const debouncedChange = useRef(
        debounce(async (comment: string) => {
            submitFeedback(false, comment);
        }, 1000)
    ).current;

    const submitFeedback = async (isSubmit: any, comment: string) => {
        if (meeting.meetingDetailId) {
            Loader.showLoader();
            await meetingService.submitMeetingFeedback({ meetingDetailId: meeting.meetingDetailId, type: "EXPERT", feedback: { comment }, submit: isSubmit });
            setShowToaster(isSubmit ? "submit" : "save");
            getMeetings && getMeetings();
            Loader.hideLoader();
        }
    }

    useEffect(() => {
        if (showToaster) {
            setTimeout(() => {
                setShowToaster(false);
            }, 2000)
        }
    }, [showToaster])

    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        debouncedChange(comment);
    }, [comment, debouncedChange])

    const toggleCandidateFeedback = async () => {
        setRteExpanded(!rteExpanded);
    }

    const showSubmitBtn = meeting.meetingStatus !== MeetingStatus.COMPLETED && meeting.feedbackStatus !== FeedBackStatus.expertGivesFeedBack;

    return (
        <div className="w-100">
            <div
                onClick={() => toggleCandidateFeedback()}
                className="mb-2 d-flex align-items-center">
                <b>{'Feedback & Notes for Candidate'}</b>
                <IconContainer icon={rteExpanded ? ChevronDownCircle : ChevronUpCircle} tooltip={rteExpanded ? "Collapse" : "Expand"} />
            </div>
            {rteExpanded &&
                <>
                    <RichTextEditor
                        value={comment}
                        disabled={meeting.feedbackStatus === FeedBackStatus.expertGivesFeedBack}
                        onChange={(data: string) => setComment(data)}
                        id={meeting.zoomMeetingId}
                        placeholder='Enter your feedback here...'
                        customStyles={{ height: '70px' }}
                    />
                    {showToaster && <div className='d-flex align-items-center justify-content-center text-success'>{showToaster === "submit" ? 'Your feedback is submitted to candidate' : "Your message is saved"}</div>}
                    {showSubmitBtn && <div className="w-100 d-flex justify-content-start">
                        <Button className="btn-sm m-1" variant="primary" onClick={() => submitFeedback(true, comment || "")}>{'Send Feedback to Candidate'}</Button>
                    </div>}
                </>}
        </div>
    )
}
export default ExpertFeedbackComponent;

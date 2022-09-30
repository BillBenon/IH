import { Share, ShareScreenStop } from "@styled-icons/fluentui-system-filled";
import { IconContainer } from 'components/Common/IconContainer';
import { ModalComponent } from 'components/Common/Modal/Modal';
import React, { useState, useMemo } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { evaluationPlatformService } from 'services/evaluationPlatform';
import { RootState } from 'store';

interface IShareQuestion {
    questionId: string
    onShare?: () => void;
    answers: any;
}

export const ShareQuestion = ({ questionId, onShare, answers }: IShareQuestion) => {
    const candidateTrackId = getValueBrowserStorage('candidateTrackId')
    const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
    const [showStopConfirmation, setShowStopConfirmation] = useState<boolean>(false);
    const [showLoading, setShowLoading] = useState<boolean>(false);
    const { sharedQuestionIds } = useSelector((state: RootState) => state.evaluationPlatform);

    const handleShare = () => {
        setShowConfirmation(true);
    }

    const handleStopShare = () => {
        setShowStopConfirmation(true);
    }

    const handleAnswerShare = async (share: boolean) => {
        if (questionId && candidateTrackId) {
            const payload = {
                questionId,
                candidateTrackId,
                share
            }
            setShowLoading(true);
            await evaluationPlatformService.shareAnswerAndFeedback(payload);
            setShowLoading(false);
            share ? setShowConfirmation(false) : setShowStopConfirmation(false);
            onShare && onShare();
        }
    }

    const handleClose = () => {
        setShowConfirmation(false);
    }

    const handleCloseStopShare = () => {
        setShowStopConfirmation(false);
    }

    const renderModalFooter = () => {
        return <div className="d-flex">
            <Button variant="secondary" className="mr-2" onClick={handleClose}>{'Cancel'}</Button>
            <Button onClick={() => handleAnswerShare(true)}>{showLoading && <Spinner
                className="mr-2"
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />}{'Share'}</Button>
        </div>
    }

    const renderStopModalFooter = () => {
        return <div className="d-flex">
            <Button variant="secondary" className="mr-2" onClick={handleCloseStopShare}>{'Cancel'}</Button>
            <Button onClick={() => handleAnswerShare(false)}>{showLoading && <Spinner
                className="mr-2"
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
            />}{'Yes'}</Button>
        </div>
    }

    const renderShareIcon = useMemo(() => { //5f9735f0a022d50dc0564266
        const isAlreadyShared = () => {
            const sharedQuestion = sharedQuestionIds.find(q => q.questionId === questionId);
            return sharedQuestion && sharedQuestion.candidateShared
        }

        const isShared = isAlreadyShared();
        const hasFeedback = answers.find((a: any) => !!a.feedbacks?.length);
        if (hasFeedback) {
            return isShared ?
                <Button variant="link" className="d-flex align-items-center" onClick={handleStopShare} ><IconContainer icon={ShareScreenStop} tooltip={'Remove your shared answer'} />{'Remove your shared answer'}</Button>
                : <Button variant="link" className="d-flex align-items-center" onClick={handleShare} ><IconContainer icon={Share} tooltip={'Share your answers and feedback with community'} />{'Share your answers and feedback with community'}</Button>
        }
    }, [answers, questionId, sharedQuestionIds])


    return (
        <div>
            <div className="w-100 d-flex justify-content-end">
                {renderShareIcon}
            </div>
            {showConfirmation && <ModalComponent
                handleClose={handleClose}
                show={showConfirmation}
                header={'You are sharing answers, feedbacks, drawings, evaluations, audios, videos and other attachments with the community'}
                footer={renderModalFooter()}
            ></ModalComponent>}
            {showStopConfirmation && <ModalComponent
                handleClose={handleClose}
                show={showStopConfirmation}
                header={'Are you sure you want to remove sharing?'}
                footer={renderStopModalFooter()}
            ></ModalComponent>}
        </div>
    )
}

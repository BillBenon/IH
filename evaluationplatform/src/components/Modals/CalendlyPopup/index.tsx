import React, { useEffect } from 'react';
import { CalendlyEventListener, closePopupWidget, InlineWidget, openPopupWidget } from 'react-calendly';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Modal from 'react-modal';
import { getModalDefaultSettings } from 'utilities';
import { CALENDLY_URL } from 'utilities/constants';

export const CalendlyPopup = ({ open, onClose, onConfirm, details, customAnswers }: IProps) => {
    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const modalStyle = getModalDefaultSettings('50%');

    return (
        <div>
            <Modal
                isOpen={open}
                onRequestClose={onClose}
                style={modalStyle}>
                <InlineWidget
                    url={details.cUrl}
                    prefill={{
                        name: details?.name ?? candidateInfo?.fullname,
                        email: details?.email ?? candidateInfo?.email,
                        customAnswers: customAnswers
                    }}
                    pageSettings={{
                        hideLandingPageDetails: true
                    }}
                    styles={{
                        height: '650px',
                        maxHeight: '650px',
                    }}
                />
                <CalendlyEventListener onEventScheduled={(e: any) => onConfirm(e)} />
            </Modal>
        </div>
    );
}

interface IProps {
    open: boolean;
    onClose: any;
    onConfirm: (e: any) => void;
    details: {
        name?: string;
        email?: string;
        cUrl: string;
    }
    customAnswers?: {
        a1: string;
    }
}
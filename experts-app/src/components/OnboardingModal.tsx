import React, { useState } from 'react'
import { ModalComponent } from './Modals/Modal'
import { Button } from 'react-bootstrap';

interface OnboardingModal {
    onMarkDone: any;
    goToVideo: any;
}

export const OnboardingModal = ({ onMarkDone, goToVideo }: OnboardingModal) => {
    const [showOnboardingModal, setshowOnboardingModal] = useState<boolean>(true);
    return (
        <>
            <ModalComponent
                handleClose={() => setshowOnboardingModal(false)}
                show={showOnboardingModal}
                showCloseIcon={true}
                header={'Welcome to your Interviewhelp Expert account'}
                footer={
                    <div>
                        <Button type="button" variant="secondary" className="mx-2" onClick={onMarkDone}>{'Mark as Done'}</Button>
                        <Button type="button" onClick={goToVideo}>{'Go to Video'}</Button>
                    </div>
                }
            >
                <div>{'Please click `Go to Video` to learn about the following.'}</div>
                <br />
                <ul>
                    <li className="py-2">{'How to set up Zoom account (Required for setting up meeting sessions with candidates).'}</li>
                    <li className="py-2">{'How to set up Calendly account (Required to set your availability schedule).'}</li>
                </ul>
            </ModalComponent>
        </>
    )
}
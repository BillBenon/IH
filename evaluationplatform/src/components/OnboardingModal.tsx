import React, { useState } from 'react'
import { ModalComponent } from './Modals/VideoInstructionModel'
import { Button, Modal } from 'react-bootstrap';


interface OnboardingModal {
    onMarkDone: any;
    goToVideo: any;
}

const modalHeaderStyle = {
    padding: "10px 25px 10px 25px",
    color: "#5b94e3"
  };

const modalTitleStyle = {
    padding: "10px 10px 5px 10px",
    borderBottom: "2px solid #dee2e6"
}

export const OnboardingModal = ({ onMarkDone, goToVideo }: OnboardingModal) => {
    const [showOnboardingModal, setshowOnboardingModal] = useState<boolean>(true);
    return (
        <>
            <ModalComponent
                handleClose={() => setshowOnboardingModal(false)}
                show={showOnboardingModal}
                showCloseIcon={true}
                header={'Welcome to InterviewHelp Platform.'}
                headerStyle={modalHeaderStyle}
                titleStyle={modalTitleStyle}
                footer={
                    <div>
                        <Button type="button" variant="secondary" className="mx-2" onClick={onMarkDone}>{'Mark as Done'}</Button>
                        <Button type="button" onClick={goToVideo}>{'Go to Video'}</Button>
                    </div>
                }
                
            >
                <div>{'Please watch the videos for'}</div>
                <br />
                <ol>
                    <li className="py-2">{'How to effectively and efficiently use the platform'}</li>
                    <li className="py-2">{'Benefits of InterviewHelp'}</li>
                    <li className="py-2">{'Checkout some useful information & customer testimonials etc'}</li>
                </ol>
                
            </ModalComponent>

        </>
    )
}
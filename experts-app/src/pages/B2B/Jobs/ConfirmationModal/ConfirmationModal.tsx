import React from "react";
import { Modal } from 'react-bootstrap'
import { Header, Wrapper, Body, Footer, CancelButton, SubmitButton, CandidateName } from "./ConfirmationModal.styled";

export type ConfirmationProps = {
    show: boolean;
    buttonText?: string;
    candidateName?: string;
    onSuccess?: () => void;
    onReject?: () => void;
}

const ConfirmationModal = ({ show, buttonText, candidateName, onSuccess, onReject }: ConfirmationProps) => {
    return (
        <Modal
            show={show}
            onHide={() => onReject?.()}
            centered
        >
            <Wrapper>
                <Modal.Header className="border-0" closeButton={true}>
                    <Header>Confirmation</Header>
                </Modal.Header>
                <Modal.Body>
                    <Body>
                        <div>Are you sure you want to {buttonText}?</div>
                        <CandidateName>
                            <span>Candidate Name</span>:&nbsp;
                            <span>{candidateName}</span>
                        </CandidateName>
                    </Body>
                </Modal.Body>
                <Modal.Footer>
                    <Footer>
                        <CancelButton onClick={() => onReject?.()}>
                            Cancel
                        </CancelButton>
                        <SubmitButton onClick={() => onSuccess?.()}>
                            Yes, Proceed
                        </SubmitButton>
                    </Footer>
                </Modal.Footer>
            </Wrapper>
        </Modal>
    )
};

export default ConfirmationModal;
import React from 'react';
import { Col, Row, Toast } from 'react-bootstrap';
import { NotificationWrapper } from './ToastNotification.styled';

type Props = {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    status: string;
}

const AutoHideNotification = ({ show, setShow, status }: Props) => {
    const message = status === 'REJECTED_CANDIDATE' ?
        'Candidate is Rejected' :
        'Email sent successfully';

    return (
        <NotificationWrapper>
            <Row>
                <Col>
                    <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                        <Toast.Header>
                            <strong className="me-auto">{message}</strong>
                        </Toast.Header>
                    </Toast>
                </Col>
            </Row>
        </NotificationWrapper>
    );
}

export default AutoHideNotification;
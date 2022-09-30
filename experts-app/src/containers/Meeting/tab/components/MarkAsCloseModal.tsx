import React, { useState } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap';
import { ModalComponent } from '../../../../components/Modals/Modal';
import RichTextEditor from '../../../../components/Common/Editors/RichTextEditor';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { meetingService } from '../../../../services/meeting';
import { MeetingStatusNew } from '../../../../utilities/constants';

interface IMarkAsCloseModal {
    setShowMarkAsCloseModal: (show: boolean) => void;
    showMarkAsClose: boolean;
    meetingId: string;
    onSubmitSuccess: Function;
}

export const MarkAsCloseModal = (props: IMarkAsCloseModal) => {
    const { setShowMarkAsCloseModal, showMarkAsClose, meetingId, onSubmitSuccess } = props;
    const expertId = useSelector((state: RootState) => state.auth.user.expertId);
    const [reason, setReason] = useState<string | undefined>();
    const [isShowReason, setIsShowReason] = useState<boolean>(false);
    const [meetingStatus, setMeetingStatus] = useState<string>();
    const [showSpinner, setShowSpinner] = useState<boolean>(false);

    const onSubmit = async () => {
        if (meetingStatus) {
            setShowSpinner(true);
            await meetingService.completeMeeting({ expertId, meetingDetailId: meetingId, meetingStatus, remarks: reason });
            setShowSpinner(false);
            setShowMarkAsCloseModal(false);
            onSubmitSuccess();
        }
    }

    const renderfooter = () => {
        return <div>
            <Button type="button" variant="secondary" className="mx-2" onClick={() => setShowMarkAsCloseModal(false)}>
                {'Cancel'}
            </Button>
            <Button type="button" disabled={!meetingStatus || (meetingStatus === MeetingStatusNew.CLOSED && !reason)} onClick={onSubmit}>
                <div className="d-flex align-items-center">
                    {showSpinner && <Spinner style={{ height: '20px', width: '20px' }} animation='grow' className="mr-2" />}
                    <div>{'Submit'}</div>
                </div>
            </Button>
        </div>
    }
    return (
        <ModalComponent
            handleClose={() => setShowMarkAsCloseModal(false)}
            show={showMarkAsClose}
            showCloseIcon={true}
            header={'Meeting Status'}
            footer={renderfooter()}
        >
            <Form>
                <div className="mb-3">
                    <Form.Check
                        type="radio"
                        label={'Did you and candidate attended the meeting and completed?'}
                        id={'meeting_completed'}
                        checked={meetingStatus === MeetingStatusNew.COMPLETED}
                        onChange={() => { setMeetingStatus(MeetingStatusNew.COMPLETED); setIsShowReason(false); setReason(undefined); }}
                    />
                    <Form.Check
                        type="radio"
                        label={'Meeting did not happen'}
                        id={'meeting_closed'}
                        checked={meetingStatus === MeetingStatusNew.CLOSED}
                        onChange={() => { setMeetingStatus(MeetingStatusNew.CLOSED); setIsShowReason(true); }}
                    />
                    {isShowReason && <>
                        <div className="small font-weight-bold mt-2">{'Please submit the reason here'}</div>
                        <textarea
                            placeholder='Enter your reason here...'
                            className="w-100"
                            rows={3}
                            id={'reason'}
                            disabled={!isShowReason}
                            onChange={(event: any) => setReason(event.target.value)}
                            value={reason || ""}
                        />
                    </>}
                    <div className="position-absolute fixed-bottom text-info small ml-4">
                        {'Please submit this information carefully as your invoice depend upon this'}
                    </div>
                </div>
            </Form>
        </ModalComponent>
    )
}

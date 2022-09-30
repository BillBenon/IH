import AudioRecorder from "components/AudioRecorder";
import { IconContainer } from "components/Common/IconContainer";
import { ModalComponent } from 'components/Common/Modal/Modal';
import React from 'react';
import { WindowMinimize } from "styled-icons/fa-regular";

interface IVoiceRecorderModal {
    isOpen: boolean,
    onClose: Function,
    directory: string;
    isReadOnly?: boolean;
    candidateTrackId?: string;
    setMinimizeRecording?: Function;
    minimizedModelIndex?: string;
    currModelIndex?: string;
}

export const VoiceRecorderModal = (props: IVoiceRecorderModal) => {

    const handleClose = () => {
        props.onClose(true);
    }

    const handleSubmit = (cantainRecording?: boolean) => {
        props.onClose(undefined, cantainRecording);
    }

    return (
        <ModalComponent
            isStatic={true}
            handleClose={handleClose}
            show={props.isOpen}
            modelClassName={`${props.currModelIndex == props.minimizedModelIndex ? 'd-none' : ''}`}
            backdropClassname={`${props.currModelIndex == props.minimizedModelIndex ? 'd-none' : ''}`}
            headerComponent={
                <div className="w-100 h4 d-flex justify-content-center align-items-start flex-column">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <span>{'Audio/Video Recorder'}</span>
                        <IconContainer tooltip="Minimize" icon={WindowMinimize} onClick={() => props.setMinimizeRecording && props.setMinimizeRecording()} />
                    </div>
                    <div className="h6 mt-2 text-muted"><strong>{'Tip: '}</strong>{'You may need to optimize your recordings if it exceeds 3 minutes'}</div>
                </div>}
        >
            <AudioRecorder isReadOnly={props.isReadOnly} handleCancel={handleClose} handleSubmit={handleSubmit} directory={props.directory}
                candidateTrackId={props.candidateTrackId ? props.candidateTrackId : ''} />
        </ModalComponent>
    )
}

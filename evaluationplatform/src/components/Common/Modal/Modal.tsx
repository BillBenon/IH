import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components';
import Draggable from 'react-draggable';
import ModalDialog from 'react-bootstrap/ModalDialog'

const Subheader = styled.span`
    text-align: left;
    bottom: 0;
    display: flex;
    align-items: flex-end;
    color: #8D8D8D;
    font-size: 14px;
    padding-left: 10px;
`;

export interface ModalProps {
    header?: string;
    headerComponent?: any | undefined;
    body?: string | undefined;
    footer?: any;
    showCloseIcon?: boolean | undefined;
    handleClose?: any;
    show: boolean;
    isStatic?: boolean | undefined;
    subheader?: string;
    className?: string;
    modelClassName?: string;
    backdropClassname?: string;
}

const DraggableModalDialog = (props: any) => {
    return (<Draggable allowAnyClick={false} cancel="stop-drag" handle=".modal-content"><ModalDialog {...props} /></Draggable>);
}

export const ModalComponent: React.FC<ModalProps> = (props) => {
    return (
        <Modal dialogClassName={props.className} dialogAs={DraggableModalDialog} show={props.show}
            className={props.modelClassName}
            backdropClassName={props.backdropClassname}
            onHide={props.handleClose}
            backdrop={props.isStatic ? 'static' : true}
            keyboard={props.isStatic ? false : true}>
            {(props.headerComponent || props.header || props.subheader) && <Modal.Header className="border-0" closeButton={props.showCloseIcon}>
                {!props.headerComponent &&
                    <>
                        <Modal.Title className={'h5'}>{props.header}</Modal.Title>
                        {!!props.subheader && <Subheader style={{ lineHeight: '30px' }}>({props.subheader})</Subheader>}
                    </>}
                {props.headerComponent}
            </Modal.Header>}
            <Modal.Body className="pt-1">
                {props.body}
                {props.children}
            </Modal.Body>
            {props.footer && <Modal.Footer>
                {props.footer}
            </Modal.Footer>}
        </Modal>
    )
}

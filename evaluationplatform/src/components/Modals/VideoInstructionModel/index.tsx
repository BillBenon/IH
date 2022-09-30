import React from 'react'
import { Modal } from 'react-bootstrap'
import styled from 'styled-components';

export interface ModalProps {
    header?: string;
    headerStyle?: any;
    titleStyle?: any;
    headerComponent?: any | undefined;
    body?: string | undefined;
    footer?: any;
    showCloseIcon?: boolean | undefined;
    handleClose?: any;
    show: boolean;
    isStatic?: boolean | undefined;
}

export const ModalComponent: React.FC<ModalProps> = (props) => {
    return (
        <Modal show={props.show}
            onHide={props.handleClose}
            backdrop={props.isStatic ? "static" : true}
            keyboard={props.isStatic ? false : true}>
            
            <Modal.Header style={props.titleStyle} closeButton={props.showCloseIcon}>
                {!props.headerComponent &&
                    <>
                        <Modal.Title className={'h5'} style={props.headerStyle}>{props.header}</Modal.Title>
                    </>}
                {props.headerComponent}
            </Modal.Header>
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

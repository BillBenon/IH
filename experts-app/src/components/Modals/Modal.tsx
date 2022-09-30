import React from 'react'
import { Modal } from 'react-bootstrap'
import { Subheader } from '../../containers/Feedback/TabContent/Submissions/Submissions.styles'

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
    backdropClassName?: string;
    size?: 'sm' | 'lg' | 'xl';
    dialogClassName?: string;
    children?: any;
}

export const ModalComponent: React.FC<ModalProps> = ({
    show,
    body,
    children,
    className,
    backdropClassName,
    isStatic,
    showCloseIcon,
    headerComponent,
    header,
    subheader,
    size,
    footer,
    handleClose,
    dialogClassName
}: ModalProps) => {
    return (
        <Modal
            show={show}
            className={className}
            onHide={handleClose}
            backdropClassName={backdropClassName}
            backdrop={isStatic ? "static" : true}
            keyboard={isStatic ? false : true}
            size={size}
            dialogClassName={dialogClassName}
        >
            <Modal.Header className="border-0" closeButton={showCloseIcon}>
                {!headerComponent && (
                    <>
                        <Modal.Title className={'h5'}>{header}</Modal.Title>
                        {!!subheader && <Subheader style={{ lineHeight: '30px' }}>({subheader})</Subheader>}
                    </>
                )}
                {headerComponent}
            </Modal.Header>
            <Modal.Body className="pt-1">
                {body}
                {children}
            </Modal.Body>
            {footer && (
                <Modal.Footer>
                    {footer}
                </Modal.Footer>
            )}
        </Modal>
    )
}

import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export interface ModalProps {
  header?: string;
  headerComponent?: any | undefined;
  body?: string | undefined;
  footer?: any;
  showCloseIcon?: boolean | undefined;
  handleClose?: Function | undefined;
  show: boolean;
  isStatic?: boolean | undefined;
  subheader?: string;
  
  width?: string;
}

export const Subheader = styled.span`
  text-align: left;
  bottom: 0;
  display: flex;
  align-items: flex-end;
  color: #8d8d8d;
  font-size: 14px;
  padding-left: 10px;
`;

export const StyledModal = styled(Modal)`
  .modal-dialog {
    max-width: initial;
  }
  .modal-content {
    width: ${(props) => props.width ?? '589px !important'};
    margin: 0 auto;
  }
`;

export const ModalComponent: React.FC<ModalProps> = (props) => {
  return (
    <StyledModal
      width={props.width}
      show={props.show}
      onHide={props.handleClose}
      backdrop={props.isStatic ? 'static' : true}
      keyboard={props.isStatic ? false : true}
    >
      {(props.showCloseIcon || !!props.subheader) && (
        <Modal.Header className="border-0" closeButton={props.showCloseIcon}>
          {!props.headerComponent && (
            <>
              <Modal.Title className={'h5'}>{props.header}</Modal.Title>
              {!!props.subheader && (
                <Subheader style={{ lineHeight: '30px' }}>
                  ({props.subheader})
                </Subheader>
              )}
            </>
          )}
          {props.headerComponent}
        </Modal.Header>
      )}
      <Modal.Body className="pt-1">
        {props.body}
        {props.children}
      </Modal.Body>
      {props.footer && <Modal.Footer>{props.footer}</Modal.Footer>}
    </StyledModal>
  );
};

import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { BadgeCheck } from '@styled-icons/boxicons-regular/BadgeCheck'
import { CircleWithCross } from '@styled-icons/entypo/CircleWithCross';
import { MessagePopupType } from '../../../context/messagePopContext';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/core';
import { InfoCircle } from '@styled-icons/boxicons-regular/InfoCircle';
import { Question } from '@styled-icons/octicons/Question';
import { getModalDefaultSettings } from '../../../utilities';

const Content = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
  button{
    outline: none;
    margin: 0;
    padding: 8px 16px;
    border-radius: 5px;
    font-size: 20px;
    background: #5b94e3;
    color: #fff;
    border-color: #5b94e3;
    border-style: solid;
  }
  button.text--white{
    background: #fff;
    color: #5b94e3;
  }
  text-align: center;
`;

const StyledBadgeCheck = styled(BadgeCheck)`
    color: ${(props) => props.theme.colors.primary};
    width: 100px;
`;

const iconCss = css`
    width: 100px;
    height: 100px;
    color: #3694D7;
`;

const StyledInfoCircle = styled(InfoCircle)`
    color: ${(props) => props.theme.colors.primary};
    width: 100px;
`;

const SmallText = styled.h5`
    font-size: 1rem;
`;

const ConfirmFooter = styled.div`
    display: flex;
    margin: 0 1rem;
    justify-content: space-around;
`;

export const MessageModal = ({ open, onClose, popupType, text, onConfirm }: IProps) => {

    const [modalStyle, setModalStyle] = useState<any>();

    useEffect(() => {
        const style = getModalDefaultSettings('350px', 9999);
        setModalStyle({ ...style });
    }, []);

    useEffect(() => {
        if (open && popupType != MessagePopupType.CONFIRM) {
            const newStyle = { ...modalStyle };
            newStyle.content.height = '260px';
            setModalStyle(newStyle);
        }
    }, [open]);

    function renderFooter(type: MessagePopupType) {
        switch (type) {
            case MessagePopupType.CONFIRM:
                return (<ConfirmFooter>
                    <button type="button"
                        onClick={onClose}
                        className="text--white">
                        {'Close'}
                    </button>
                    <button type="button"
                        onClick={onConfirm}>
                        {'Proceed'}
                    </button>
                </ConfirmFooter>)
            case MessagePopupType.LOADER:
                return (<h5>{text}</h5>)
            default:
                return (<button type="button"
                    onClick={onClose}
                    className="text--white text--bold payment-btn">
                    {'OK'}
                </button>)
        }
    }

    return (
        <Modal 
            ariaHideApp={false}
            isOpen={open}
            onRequestClose={onClose}
            style={modalStyle}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
        >
            <Content>
                {popupType === MessagePopupType.SUCCESS &&
                    <div>
                        <StyledBadgeCheck />
                        <h5>{text}</h5>
                    </div>}
                {popupType === MessagePopupType.FAIL &&
                    <div>
                        <CircleWithCross width="100" fill="#e25252" />
                        <h5>{text}</h5>
                    </div>}
                {popupType === MessagePopupType.INFO &&
                    <div>
                        <StyledInfoCircle theme={{ colors: { primary: '00a2ff' } }} />
                        <h5>{text}</h5>
                    </div>}
                {popupType === MessagePopupType.LOADER &&
                    <div>
                        <ClipLoader css={iconCss} color='#3694D7' loading={true} />
                    </div>}
                {popupType === MessagePopupType.CONFIRM &&
                    <div>
                        <Question width="100" color='#3694D7' />
                        <SmallText>{text}</SmallText>
                    </div>}
            </Content>
            <Footer>
                {renderFooter(popupType)}
            </Footer>
        </Modal>
    );
}

interface IProps {
    open: boolean;
    onClose: any;
    popupType: MessagePopupType;
    text: string;
    onConfirm: any;
}
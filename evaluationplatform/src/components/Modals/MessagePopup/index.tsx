import { css } from '@emotion/core';
import { BadgeCheck } from '@styled-icons/boxicons-regular/BadgeCheck';
import { InfoCircle } from '@styled-icons/boxicons-regular/InfoCircle';
import { CircleWithCross } from '@styled-icons/entypo/CircleWithCross';
import { Question } from '@styled-icons/octicons/Question';
import { MessagePopupType } from 'context/messagePopup';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ClipLoader from 'react-spinners/ClipLoader';
import styled from 'styled-components';
import { StyledIcon } from 'styled-icons/types';
import { getModalDefaultSettings } from 'utilities';
import { IconContainer } from '../../Common/IconContainer';

const Content = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.div`
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
    strong {
        color: #000080;
        font-weight: 800;
    }
`;

const ConfirmFooter = styled.div`
    display: flex;
    margin: 0 1rem;
    justify-content: space-around;
`;

export const MessageModal = ({ open, onClose, popupType, text, onConfirm, logo }: IProps) => {

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
                        className="text--white text--bold default-btn">
                        {'Close'}
                    </button>
                    <button type="button"
                        onClick={onConfirm}
                        className="text--white text--bold payment-btn">
                        {'Proceed'}
                    </button>
                </ConfirmFooter>)
            case MessagePopupType.LOADER:
                return (<h5>{text}</h5>)
            default:
                return (<button type="button"
                    onClick={MessagePopupType.SUCCESS == type ? onConfirm : onClose}
                    className="text--white text--bold payment-btn">
                    {'OK'}
                </button>)
        }
    }

    return (
        <Modal isOpen={open}
            onRequestClose={onClose}
            style={modalStyle}
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
        >
            <Content>
                {popupType == MessagePopupType.SUCCESS &&
                    <div>
                        <StyledBadgeCheck />
                        <h5>{text}</h5>
                    </div>}
                {popupType == MessagePopupType.FAIL &&
                    <div>
                        <CircleWithCross width="100" fill="#e25252" />
                        <h5>{text}</h5>
                    </div>}
                {popupType == MessagePopupType.INFO &&
                    <div>
                        <StyledInfoCircle />
                        <h5>{text}</h5>
                    </div>}
                {popupType == MessagePopupType.LOADER &&
                    <div>
                        <ClipLoader css={iconCss} color='#3694D7' loading={true} />
                    </div>}
                {popupType === MessagePopupType.CONFIRM &&
                    <div>
                        {logo ? <IconContainer icon={logo} height="4rem" style={{ paddingBottom: '.5rem'}} /> :
                            <Question width="100" color='#3694D7' />}
                        <SmallText dangerouslySetInnerHTML={{ __html: text }}></SmallText>
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
    logo?: StyledIcon;
}
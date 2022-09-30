import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft';
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { useMessagePopup } from 'context/messagePopup';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { notEmpty } from 'utilities';

const RightIcon = styled(ChevronRight)`
    height: 24px;
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

const LeftIcon = styled(ChevronLeft)`
    height: 24px;
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

const HintHeader = styled.span`
    line-height: 16px;
    color: #525252;
`;


interface IProps {
    hints: any,
}
const Hints = ({ hints }: IProps) => {
    const [currentHintIndex, setCurrentHintIndex] = useState(0);
    const [hidePrevIcon, setHidePrevIcon] = useState(false);
    const [hideNextIcon, setHideNextIcon] = useState(false);
    const message = useMessagePopup();

    useEffect(() => {
        if (currentHintIndex === 0) setHidePrevIcon(true)
        else setHidePrevIcon(false);
        if (currentHintIndex === hints.length - 1) setHideNextIcon(true)
        else setHideNextIcon(false);
    }, [currentHintIndex])

    const handlePreviousHint = () => {
        setCurrentHintIndex(currentHintIndex - 1);
    };
    const handleNextHint = () => {
        setCurrentHintIndex(currentHintIndex + 1);
    };
    return (
        <div>
            { notEmpty(hints) && (<>
                <Row className="mb-1 mt-1">
                    <Col xs="10">
                        <HintHeader className="mb-2 mt-2 pr-2 h6"> {hints[currentHintIndex]?.title}</HintHeader>
                    </Col>
                    <Col xs="2" className={'d-inline text-right pr-2'}>
                        <LeftIcon
                            onClick={handlePreviousHint}
                            theme={{ disabled: hidePrevIcon }}
                        />
                        <RightIcon
                            onClick={handleNextHint}
                            theme={{ disabled: hideNextIcon }}
                        />
                    </Col>
                </Row>
                <Row className={'mb-2'}>
                    <Col style={{ letterSpacing: '0.32px' }} className={'h6 small'}>
                        <RichTextEditor
                            doNotAllowCopy={true}
                            disabled={true}
                            id={`hintsRTE-${currentHintIndex}`}
                            value={hints[currentHintIndex]?.description}
                            customStyles={{ height: 'auto', resize: 'none', boxShadow: 'none' }}
                        />
                    </Col>
                </Row>
            </>)}
            { !notEmpty(hints) && message.info('No hints available')}
        </div>
    )
};

export default Hints;

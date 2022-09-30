import 'react-tabs/style/react-tabs.css';

import { ChevronLeft } from '@styled-icons/boxicons-regular/ChevronLeft';
import { ChevronRight } from '@styled-icons/boxicons-regular/ChevronRight';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import styled from 'styled-components';

import { StyledHints } from './SampleSolutions.styles';

const HintsDiv = styled.div`
.tabs{
  max-height: 130px;
  overflow: auto;
  }
`;

const SampleSolutionHeader = styled.span`
    line-height: 16px;
    letter-spacing: 0.32px;
    color: #525252;
`;

const RightIcon = styled(ChevronRight)`
    height: 24px;
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

const LeftIcon = styled(ChevronLeft)`
    height: 24px;
    pointer-events: ${(props) => props.theme.disabled ? 'none' : 'all'};
    color: ${(props) => props.theme.disabled ? 'rgba(0, 0, 0, 0.16)' : '#171717'};
    cursor: pointer;
    &:hover{
        background: ${(props) => props.theme.disabled ? 'transparent' : 'rgba(0, 0, 0, 0.08)'};
    }
`;

interface IProps {
  sampleSolutions: any;
}
const SampleSolutions = ({ sampleSolutions }: IProps) => {
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState(0);
  const [hidePrevIcon, setHidePrevIcon] = useState(false);
  const [hideNextIcon, setHideNextIcon] = useState(false);

  const HintPanel = ({ hints }: { hints: any }) => {
    return (
      <StyledHints>
        <Tabs>
          <TabList>
            {hints?.map((hint: string, hintIdx: number) => {
              return <Tab key={hintIdx}>Hint #{hintIdx + 1}</Tab>;
            })}
          </TabList>
          <HintsDiv>
            {hints?.map((hint: string, hintIdx: number) => {
              return (
                <TabPanel key={hintIdx}>
                  <div className={'tabs'} key={`tabpanel-${hintIdx}`}>
                    <RichTextEditor
                      doNotAllowCopy={true}
                      disabled={true}
                      id={`hintRTE-${currentSolutionIndex}`}
                      value={hint}
                      customStyles={{ height: 'auto', resize: 'none', boxShadow: 'none' }}
                    />
                  </div>
                </TabPanel>
              );
            })}
          </HintsDiv>
        </Tabs>
      </StyledHints>
    );
  };

  useEffect(() => {
    if (currentSolutionIndex === 0) setHidePrevIcon(true);
    else setHidePrevIcon(false);
    if (currentSolutionIndex === sampleSolutions.length - 1) setHideNextIcon(true);
    else setHideNextIcon(false);
  }, [currentSolutionIndex, sampleSolutions]);

  const handlePreviousHint = () => {
    setCurrentSolutionIndex(currentSolutionIndex - 1);
  };
  const handleNextHint = () => {
    setCurrentSolutionIndex(currentSolutionIndex + 1);
  };
  return (
    <>
      <Row className="mb-1 mt-1">
        <Col xs="10">
          <SampleSolutionHeader className="mb-2 mt-2 pr-2 h6">{sampleSolutions[currentSolutionIndex]?.title}</SampleSolutionHeader>
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
            id={'sampleSolutionRTE'}
            value={sampleSolutions[currentSolutionIndex]?.description}
            customStyles={{ height: 'auto', resize: 'none', boxShadow: 'none' }}
          />
        </Col>
      </Row>
      <HintPanel hints={sampleSolutions[currentSolutionIndex]?.hints} />
    </>
  );
};

export default SampleSolutions;

import { ButtonsBar } from 'components/Common/ButtonsBar';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { ClassAndTrackMapping, AirtableClassMapping, Classes, DefaultButtons} from 'utilities/constants';
import { useLoader } from 'context/loaderDots';

const StyledClassesContainer = styled.div`
  padding-top: 20px;
  padding-left: ${(props) => props.theme.isMaximizeContent ? '0px' : '78px'};
  transition: 1s;
  margin-top: 57px;
  .frame {
    background: transparent;
    border: 1px solid #ccc;;
    height: 80vh;
    width: 100%;
  }

  .report-message{
    font-size: 18px;
    color: grey;
  }
`;

const getPageButtons = (trackName: string) => {
    const buttonList = ClassAndTrackMapping[trackName] || Object.values(DefaultButtons);
    return buttonList?.map((c: string) => { return { label: c, value: c } }) || [];
}

export const ClassesContainer = (props: any) => {
    const loader = useLoader();

    const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
    const trackName = candidateInfo?.lastCandidateSavedSetting?.lastCandidateTrackWorkedOn;
    let reportUrl = useSelector((state: RootState) => state.evaluationPlatform?.currentTrack?.candidateTrack?.[0].reportUrl);
    if(reportUrl){
      reportUrl = new URL(reportUrl);
      reportUrl.pathname = `embed${reportUrl.pathname}`;
      reportUrl = reportUrl.toString();
    }

    const PageButtons = getPageButtons(trackName);

    const [selectedButton, setSelectedButton] = useState<string>(PageButtons[0]?.value);
  
    const btnSelectHandler = (button: string) => {
        setSelectedButton(button);
        showHideLoader();
    }

    const showHideLoader = () => {
        loader.showLoader();
        setTimeout(() => {
            loader.hideLoader();
        }, 4000);
    }

    const urlsuffix = "?backgroundColor=yellow&viewControls=on";

    const getIframeMeta =  () => {
      let isShow = trackName; 
      let src = reportUrl;
      if(selectedButton !== DefaultButtons.CF){
        isShow = isShow && ClassAndTrackMapping[trackName];
        src = AirtableClassMapping[selectedButton] + urlsuffix
      }
      return {
        isShow : isShow && src,
        src
      }
    }

    useEffect(() => {
        showHideLoader();
    }, [])

   const {isShow, src} = getIframeMeta();
    return (
        <StyledClassesContainer {...props}>
            <ButtonsBar
                buttonsInfo={PageButtons}
                selectedPage={selectedButton}
                handleClick={btnSelectHandler}
            />
            <div className="frame-container">
                {isShow ?
                    <iframe
                        id="Classes"
                        title="Classes"
                        src={src}
                        frameBorder="0"
                        className="frame">
                    </iframe> :
                    <span className="report-message">Talk to your class instructors for your feedback report.</span>}
            </div>
        </StyledClassesContainer>
    )
}

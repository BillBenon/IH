import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { VideoPlayer } from '../../components/VideoPlayer';
import { RootState } from '../../store';
import { post, notEmpty } from '../../utilities';
import { ConfigTypes, CONFIG_URL_PREFIX, DEFAULT_TOKEN } from '../../utilities/constants';
import styled from 'styled-components';
import TabsIH from '../../components/Common/Tabs';
import { useLoader } from 'context/loaderDots';

const StyledContainer = styled.div`
  .description-text {
    font-size: 18px;
    color: grey;
    padding: 20px;
  }

  .video-player .my-2.border {
    margin: 0 auto;
  }

  .video-player {
    text-align: left;
  }

  ul.react-tabs__tab-list {
    text-align: left !important;
    margin: 10px 0px 0px 5px;
  }

  .react-tabs {
    margin: 0 10px;
  }

  .video-player .my-2.border {
    margin-left: 0px !important;
  }

  .react-tabs__tab-panel {
    padding-top: 10px;
  }

  .border-bottom {
    border-bottom: none !important;
  }

  .coming-soon-text {
    margin: 100px;
  }

  .title-text{
    padding: 10px;
    font-weight: bolder;
`;

export const OnboardingPage = () => {
  const loader = useLoader();
  const candidate = useSelector((state: RootState) => state.evaluationPlatform.candidate);
  const { currentTrack } = useSelector((state: RootState) => state.evaluationPlatform);
  const [selectedPanel, setSelectedPanel] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [videos, setVideos] = useState<string[]>([]);

  const [videoTabList, setVideosTabList] = useState<JSX.Element[]>([]);
  const [videoTabPanels, setVideoTabPanels] = useState<JSX.Element[]>([]);
  const videoTabs = ['Introduction Videos', 'Track Videos'];

  useEffect(() => {
    const videosTab = videoTabs.map((videoTab) => <div>{videoTab}</div>);
    setVideosTabList(videosTab);
  }, []);

  const getEmptyPanels = () => {
    const panels: JSX.Element[] = [];
    panels.length = 2;
    panels.fill(<></>);
    return panels;
  };

  useEffect(() => {
    loader.showLoader();
    getVideoConfig();
  }, [candidate]);

  const getVideoConfig = async () => {
    if (candidate && candidate._id) {
      const { output } = await post(CONFIG_URL_PREFIX + 'getConfig', {
        token: DEFAULT_TOKEN,
        candidateId: candidate._id,
        type: ConfigTypes.CANDIDATE_ON_BOARDING_VIDEO_INFO,
      });
      loader.hideLoader();
      setLoading(false);
      if (output?.values?.length) {
        setVideos(output.values);
      } else {
        setVideoTabData();
      }
    }
  };

  React.useEffect(() => {
    setVideoTabData();
  }, [videos, loading]);

  const setVideoTabData = () => {
    const panels = getEmptyPanels();
    const onboardingVideosUrl = videos.map((item: any, index) => <VideoPlayer key={index} url={item.url} />);

    const trackVideosUrl = currentTrack?.candidateTrack[0].videos?.map((item: any, index: number) => (
      <div>
        <div className="title-text">{item.title}</div>
        <div className="description-text">{item.description}</div>
        <VideoPlayer key={index} url={item.url} />
      </div>
    ));

    const ComingSoonText = <div className="coming-soon-text">Coming soon...</div>;
    panels[0] = <div>{notEmpty(onboardingVideosUrl) ? onboardingVideosUrl : !loading && ComingSoonText}</div>;
    panels[1] = <div>{notEmpty(trackVideosUrl) ? trackVideosUrl : !loading && ComingSoonText}</div>;
    setVideoTabPanels(panels);
  };

  return (
    <StyledContainer>
      <div className="video-player">
        <div className="description-text">Please watch these videos for effective & efficient use of the portal</div>

        <TabsIH
          items={videoTabList}
          panels={videoTabPanels}
          onSelectHandler={(index: number) => setSelectedPanel(index)}
          selectedIndex={selectedPanel}
        />
      </div>
    </StyledContainer>
  );
};

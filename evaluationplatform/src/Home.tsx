import { MainHeader, Sidebar } from 'containers';
import { CareerConsultancy } from 'pages/CareerConsultancy';
import { DiscoursePage } from 'pages/CommunityPage';
import { ResumeReviewPage } from 'pages/ResumeReview';
import React, { useState } from 'react';
import styled from 'styled-components';
import { PrivateRoute } from 'utilities/routers/PrivateRoute';
import { PublicRoute } from 'utilities/routers/PublicRoute';
import {
    DashboardPage, NotFoundPage, QuestionPage, SettingsPage, TalkToExpertPage, TrackPage
} from './pages';

const StyledPage = styled.div`
  display: flex;
  height: 100%;
  flex-direction: row;
  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    z-index: 100;
    position: fixed;
    width: 100%;
  }
  .main {
    padding-top: 20px;
    padding-left: ${(props) => props.theme.isMaximizeContent ? '0px' : '78px'};
    margin-top: 57px;
    display: flex;
    transition: 1s;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 80px);
  }
  
  .page-title {
    margin-left: 20px;
    color: #5b94e3;
    font-size: 20px;
    font-weight: bold;
  }
  .main-content {
    height: 100%;
  }
`;

export const Home = () => {
    let [isMaximizeContent, setMaximizeContent] = useState(false);

    const handleMaximizeContent = () => {
        setMaximizeContent(!isMaximizeContent);
    };

    return (
        <StyledPage theme={{ isMaximizeContent }}>
            <Sidebar isMaximizeContent={isMaximizeContent} />
            <div className="content">
                <div className="header">
                    <MainHeader color="#315cd5" isMaximizeContent={isMaximizeContent} handleMaximizeContent={handleMaximizeContent} />
                </div>
                <div className="main">
                    <PrivateRoute path="/meetings" component={TalkToExpertPage} exact />
                    <PrivateRoute path="/consultancy" component={CareerConsultancy} exact />
                    <PrivateRoute path="/settings" component={SettingsPage} />
                    <PrivateRoute path="/dashboard" component={DashboardPage} exact />
                    <PrivateRoute path="/question" component={QuestionPage} exact />
                    <PrivateRoute path="/tracks" component={TrackPage} exact />
                    <PrivateRoute path="/community" component={DiscoursePage} exact />
                    <PrivateRoute path="/resume-review" component={ResumeReviewPage} exact />
                    <PublicRoute component={NotFoundPage} />
                </div>
            </div>
        </StyledPage>
    )
}

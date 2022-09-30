import React from 'react';
import styled from 'styled-components';

const StyledCommunityContainer = styled.div`
padding-top: 20px;
padding-left: ${(props) => props.theme.isMaximizeContent ? '0px' : '78px'};
transition: 1s;
margin-top: 57px;
.heading2 {
    font-weight: 600!important;
    font-size: calc(1.325rem + .9vw)!important;
}
.para {
    color: #b5b5c3!important;
    font-weight: 500!important;
    font-size: 1.25rem!important;
    padding-top: 1.75rem!important;
    padding-bottom: 1.75rem!important;
}
.card-title {
    color: #3f4254!important;
    line-height: 1.75!important;
    font-size: 1.75rem;
    font-weight: bold;
}
.center-image {
    border-bottom-left-radius: .625rem;
    border-bottom-right-radius: .625rem;
    flex-grow: 1!important;
    height: 6rem;
    width: 6rem;
    background-size: contain;
    background-position-x: center;
    background-repeat: no-repeat;
}
.discourse-img {
    background-image: url("Discourse.png");
}
.slack-img {
    background-image: url("Slack.png");
}
.discord-img {
    background-image: url("Discord.png");
}
`;

export const CommunityContainer: React.FC<any> = (props) => {
    return (
        <StyledCommunityContainer theme={{ isMaximizeContent: props.isMaximizeContent }}>
            <div>
                <h2 className="heading2 mb-0">{'Discuss, Collaborate and Share'}</h2>
                <p className="para">{'Connect the like minded individuals on the same goal to crack FAANG interviews'}
                    <br />
                    <i><small>{'(Solve Questions, Discuss Papers, Work together to Crack FAANG Interview)'}</small></i>
                </p>
            </div>
            <div className="d-flex align-items-center justify-content-center">
                <div className="card mx-3">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <div className="mb-2">
                            <span className="card-title">{'Discourse'}</span>
                            <div className="center-image m-3 d-flex align-items-center justify-content-center discourse-img"></div>
                        </div>
                        <div className="text-center">
                            <a href='http://discourse.interviewhelp.io' rel="noopener noreferrer" target="_blank" className="btn btn-sm btn-primary mx-3">Discuss Now</a>
                        </div>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <div className="mb-2">
                            <span className="card-title">Slack</span>
                            <div className="center-image m-3 d-flex align-items-center justify-content-center slack-img">
                            </div>
                        </div>
                        <div className="text-center">
                            <a href='https://interviewhelpiogroup.slack.com/join/shared_invite/zt-dcrkvyuv-g8sY1HxexCvHU9Xbi~PUUw' rel="noopener noreferrer" target="_blank" className="btn btn-sm btn-primary mx-3">Join Now</a>
                        </div>
                    </div>
                </div>
                <div className="card mx-3">
                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <div className="mb-2">
                            <span className="card-title">Discord</span>
                            <div className="center-image m-3 d-flex align-items-center justify-content-center discord-img"></div>
                        </div>
                        <div className="text-center">
                            <a href='https://discord.gg/vgNZ4Nfb' rel="noopener noreferrer" target="_blank" className="btn btn-sm btn-primary mx-3">Connect Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </StyledCommunityContainer>
    );
};

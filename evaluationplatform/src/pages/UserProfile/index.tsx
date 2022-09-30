import { MainHeader, Sidebar } from 'containers';
import { ResumeReview } from 'containers/ResumeReview';
import { connect } from 'react-redux';
import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { RootState } from 'store';
import styled from 'styled-components';

const ProfilePage = styled.div`
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
    width: 80%;
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

const ProfileRow = (props: any) => {
    return (
        <Row className='text-left mb-4'>
            <Col sm={2}>
                <h4 className='d-inline'>{props.label} </h4>
            </Col>
            <Col sm={10}>
                <span className='d-inline'>{props.content} </span>
            </Col>
        </Row>
    )
}

const ProfileInfo = (props: { fullName: string, email: string }) => {
    const { fullName, email } = props
    return (
        <>
            <ProfileRow label={'Name:'} content={fullName} />
            <ProfileRow label={'Email:'} content={email} />
            <Row className="flex-column">
                <h4 className='d-inline'>{'Resumes'} </h4>
                <ResumeReview resumeUrl={""} setResumeUrl={() => { }} />
            </Row>
        </>
    )
}

const _UserProfile = (props: any) => {
    return (
        <ProfilePage>
            <Sidebar />
            <div className="content">
                <div className="header">
                    <MainHeader color="#315cd5" />
                </div>
                <div className="main mx-auto">
                    <ProfileInfo fullName={props.candidate?.fullname} email={props.candidate?.email} />
                </div>
            </div>
        </ProfilePage>
    )
}

const mapStateToProps = (state: RootState) => ({
    candidate: state.evaluationPlatform.candidate,
});

export const UserProfile = connect(mapStateToProps, null)(_UserProfile);
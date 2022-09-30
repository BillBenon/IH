import { css } from '@emotion/core';
import { HorizontalCard } from 'components';
import { useMessagePopup } from 'context/messagePopup';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { evaluationPlatformService } from 'services';
import { getValueBrowserStorage, setValueBrowserStorage } from 'services/browserStorageService';
import { createCandidateTrackForCandidate, getDetailsForCandidatebyCandidateTrackId, saveCandidateLastActivity } from 'store/evaluationPlatform';
import { setTrackInfoForPayment } from 'store/payment';
import styled from 'styled-components';
import { Candidate_Id, Candidate_Track_Id, DEFAULT_TOKEN, PlanType, TrackEnrollType } from 'utilities/constants';
import { isPlacementTrack } from 'utilities/helperFunctions';

const Wrapper = styled.div`
    background-color: #f5f8fa;
    padding: 1rem;
    .card {
        border: 0;
        box-shadow: 0 0 20px 0 rgb(76 87 125 / 2%);
        height: 18rem;
    }
    .border-hover-primary: hover {
        border-color: #009ef7!important;
    }
    .symbol {
        display: inline-block;
        flex-shrink: 0;
        position: relative;
        border-radius: 0.475rem;
    }
    .symbol > img {
        width: 50px;
        height: 50px;
    }
    .w-50px {
        width: 50px!important;
        background-color: rgba(245,248,250,1)!important
    }
    .card-toolbar {
        display: flex;
        align-items: center;
        margin: 0.5rem 0;
        flex-wrap: wrap;
    }
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: stretch;
        flex-wrap: wrap;
        min-height: 70px;
        padding: 0 2.25rem;
        background-color: transparent;
    }
    .img-title {
        width: 50px;
        height: 50px;
    }
    .p-9 {
        padding: 2.25rem!important;
    }
    .pt-9 {
        padding-top: 2.25rem!important;
    }
    .title {
        font-weight: 600!important;
        font-size: 1.35rem!important;
        color: #181c32!important;
    }
    .card-text {
        height: 5rem;
        overflow: auto;
    }
    .welcome__text {
        margin-top: 24px;
        text-align: left;
        font-family: Khula;
        font-style: normal;
        font-weight: normal;
        font-size: 20px;
        line-height: 26px;
        color: #161616;
    }
`;

const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  display: block;
`;

export const _Jobs = (props: any) => {
    const [tracksNotTaken, setTracksNotTaken] = useState<any>([]);
    const [trackTaken, setTrackTaken] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const messagePopup = useMessagePopup();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getTracks();
    }, [])

    const getTracks = () => {
        getPlacementTrackData();
    }

    const getPlacementTrackData = async () => {
        setLoading(true);
        const savedCandidateId = getValueBrowserStorage('candidateId');
        let responce: any;
        if (savedCandidateId !== null && savedCandidateId !== 'undefined') {
            responce = await evaluationPlatformService.getTracksForCandidate({
                token: DEFAULT_TOKEN,
                candidateId: savedCandidateId,
                trackEnrollTypes: [TrackEnrollType.FORPLACEMENT]
            });
        } else {
            responce = await evaluationPlatformService.getTracksForCandidate({
                token: DEFAULT_TOKEN,
                candidateId: props.candidate?._id,
                trackEnrollTypes: [TrackEnrollType.FORPLACEMENT]
            });
        }
        upDateTracks(responce?.output.trackTaken, responce?.output.trackNotTaken);
        setLoading(false);
    }

    const upDateTracks = (trackTaken: any, trackNotTaken: any) => {
        setTrackTaken(trackTaken);
        if (trackNotTaken) {
            trackNotTaken = trackNotTaken;
        }
        setTracksNotTaken((prevTracks: any) => [
            ...prevTracks,
            ...trackNotTaken
        ]);
    }

    const showConfirmBox = (fun: Function) => {
        messagePopup.confirm(`Are you sure you want to change your track? <br />
        You can again change your track from <i><strong>Settings -> Manage Track </strong></i>`,
            () => {
                fun();
            })
    }

    const updatePayment = (trackId: string, trackName: string) => {
        props.setTrackInfoForPayment({
            trackId,
            trackPlan: PlanType.Placement,
            trackName,
            planState: "active"
        });
    }

    const redirectToQuestions = () => {
        props.history.push('/question');
    }

    const handleAddOrGetDetailOfTrack = (addOrGetDetailFunction: Function, payload: any, isViewMode?: boolean) => {
        setLoading(true);
        addOrGetDetailFunction(payload)
            .then((res: any) => {
                if (res.payload?.apiStatus === 'SUCCESS') {
                    props.saveCandidateLastActivity({});
                    setValueBrowserStorage(Candidate_Track_Id, res.payload.output.candidateTrack[0].candidateTrackId);
                    updatePayment(res.payload.output.candidateTrack[0].trackId, res.payload.output.candidateTrack[0].title);
                    !isViewMode && getTracks();
                } else {
                    enqueueSnackbar(res.error?.message, { variant: 'error', autoHideDuration: 2500, });
                }
                setLoading(false);
                if (isViewMode) {
                    redirectToQuestions();
                }
            })
            .catch((err: any) => {
                enqueueSnackbar(err?.message, { variant: 'error', autoHideDuration: 2500, });
                setLoading(false);
            });
    };

    const handleAddTrack = (selectedTrackId: string) => {
        showConfirmBox(async () => {
            const candidateId = getValueBrowserStorage(Candidate_Id);
            const payload = {
                token: DEFAULT_TOKEN,
                trackId: selectedTrackId,
                candidateId
            };
            handleAddOrGetDetailOfTrack(props.createCandidateTrackForCandidate, payload);
        })
    }

    const handleChangeTrack = (candidateTrackId: string, isViewMode: boolean) => {
        const payload = {
            token: DEFAULT_TOKEN,
            candidateTrackId,
        };
        if (isViewMode) {
            handleAddOrGetDetailOfTrack(props.getDetailsForCandidatebyCandidateTrackId, payload, isViewMode);
            return;
        }
        showConfirmBox(() => {
            handleAddOrGetDetailOfTrack(props.getDetailsForCandidatebyCandidateTrackId, payload);
        })
    }

    if (loading) {
        return (<BeatLoader css={override} color={'#3694D7'} loading={props.loading} />);
    }
    return (
        <Wrapper>
            <div className="welcome__text mb-2">
                {trackTaken?.length != 0 ? "Job(s) you have enrolled in." : "You are not enrolled in any Job"}
            </div>
            <Row className='ml-0 mb-4'>
                {trackTaken?.map((track: any, index: number) =>
                    <HorizontalCard
                        key={track.title + track.description + index}
                        icon={track.logo}
                        title={track.title}
                        video={track.videos?.length > 0 ? track.videos?.[0].url : ''}
                        detailsDescription={track.description}
                        item={track}
                        isPlacementView={true}
                        handleClick={(isViewMode: boolean) => handleChangeTrack(track.candidateTrackId, isViewMode)} />
                )}
            </Row>
            <div className="welcome__text mb-2">
                {tracksNotTaken?.length != 0 ? "Job(s) you can apply" : "No Job available"}
            </div>
            <Row className='ml-0 mb-4'>
                {tracksNotTaken?.map((track: any, index: number) =>
                    <HorizontalCard
                        key={track.title + track.description + index}
                        icon={track.logo}
                        title={track.title}
                        video={track.videos?.length > 0 ? track.videos?.[0].url : ''}
                        detailsDescription={track.description}
                        item={track}
                        isPlacementView={true}
                        handleClick={() => handleAddTrack(track.trackId)} />
                )}
            </Row>
        </Wrapper>
    )
}

const mapStateToProps = (state: any) => ({
    candidate: state.evaluationPlatform.candidate,
});

const mapDispatchToProps = {
    createCandidateTrackForCandidate,
    saveCandidateLastActivity,
    getDetailsForCandidatebyCandidateTrackId,
    setTrackInfoForPayment,
};

export const Jobs = connect(mapStateToProps, mapDispatchToProps)(_Jobs);
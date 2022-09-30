import { css } from '@emotion/core';
import { HorizontalCard } from 'components';
import { useLoader } from 'context/loaderDots';
import { useMessagePopup } from 'context/messagePopup';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BeatLoader from 'react-spinners/BeatLoader';
import { setValueBrowserStorage } from 'services/browserStorageService';
import { saveCandidateLastActivity } from 'store/evaluationPlatform';
import { setTrackInfoForPayment } from 'store/payment';
import styled from 'styled-components';
import { notEmpty } from 'utilities';
import { DEFAULT_TOKEN, PlanType, TrackEnrollType } from 'utilities/constants';
import { useTrackPanel } from './useTrackPanel';


const override = css`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  display: block;
`;

const StyledTracksPanel = styled.div`
  padding-bottom: 20px;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  .welcome__title {
    margin-top: 10px;
    text-align: left;
    font-family: Khula;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 26px;
    color: #161616;
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
  .vertical__bar .cards {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    margin-top: 16px;
    margin-bottom: 50px;
  }
  .horizontal_bar {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
  }
  .track-container {
    padding: 10px;
  }
`;

interface IProps {
  className?: string;
  tracksData?: any;
  createCandidateTrackForCandidate?: any;
  changeCandidateTrackPlan?: any;
  getDetailsForCandidatebyCandidateTrackId?: any;
  history?: any;
  loading?: boolean;
  candidate?: any;
  disable: boolean;
  enrollAfterPaymentTrackId: string;
}

export const TracksPanel: React.FC<IProps> = (props) => {
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const trackTaken = props.tracksData?.trackTaken;
  const trackNotTaken = props.tracksData?.trackNotTaken;
  const { getEvaluationProductId, continueToCheckoutPage, changeCandidateTrackPlan } = useTrackPanel();
  const loader = useLoader();
  const messagePopup = useMessagePopup();

  useEffect(() => {
    if (notEmpty(props.enrollAfterPaymentTrackId)) {
      handleAddTrack(props.enrollAfterPaymentTrackId, TrackEnrollType.canEnroll);
    }
  }, [props.enrollAfterPaymentTrackId]);

  const handleAddOrGetDetailOfTrack = (addOrGetDetailFunction: Function, payload: any) => {
    loader.showLoader();
    addOrGetDetailFunction(payload)
      .then((res: any) => {
        if (res.payload?.apiStatus === 'SUCCESS') {
          dispatch(saveCandidateLastActivity({}));
          setValueBrowserStorage('candidateTrackId', res.payload.output.candidateTrack[0].candidateTrackId);
          if (payload.trackId && props.enrollAfterPaymentTrackId === payload.trackId) {
            dispatch(setTrackInfoForPayment({
              trackId: payload.trackId,
              trackPlan: PlanType.Evaluation,
              trackName: res.payload.output.candidateTrack[0].title,
              planState: "active"
            }));
            goToQuestionPage();
          } else {
            goToQuestionPage();
          }
        } else {
          enqueueSnackbar(res.error?.message, {
            variant: 'error',
            autoHideDuration: 2500,
          });
          loader.hideLoader();
        }
      })
      .catch((err: any) => {
        enqueueSnackbar(err?.message, {
          variant: 'error',
          autoHideDuration: 2500,
        });
        loader.hideLoader();
      });
  };

  const goToQuestionPage = () => {
    props.history.push('/question');
    loader.hideLoader();
    messagePopup.close();
  }

  const handleAddTrack = async (trackId: string, trackEnrollType: string) => {
    loader.showLoader();
    switch (trackEnrollType) {
      case TrackEnrollType.FORPLACEMENT:
      case TrackEnrollType.canEnroll:
        const payload = {
          token: DEFAULT_TOKEN,
          trackId,
          candidateId: props.candidate._id,
        };
        handleAddOrGetDetailOfTrack(props.createCandidateTrackForCandidate, payload);
        break;
      case TrackEnrollType.mustBuy:
        try {
          const productId = await getEvaluationProductId(trackId);
          if (notEmpty(productId)) {
            continueToCheckoutPage(productId, trackId).catch(err => {
              enqueueSnackbar(err, {
                variant: 'error',
                autoHideDuration: 2500,
              });
              loader.hideLoader();
            });
          }
          else {
            enqueueSnackbar("Product not found", {
              variant: 'error',
              autoHideDuration: 2500,
            });
            loader.hideLoader();
          }
        }
        catch (err: any) {
          enqueueSnackbar(err?.message, {
            variant: 'error',
            autoHideDuration: 2500,
          });
          loader.hideLoader();
        }
        break;
    }
  };

  const handleGetDetailOfTrack = (candidateTrackId: string) => {
    const payload = {
      token: DEFAULT_TOKEN,
      candidateTrackId,
    };
    handleAddOrGetDetailOfTrack(props.getDetailsForCandidatebyCandidateTrackId, payload);
  };
  return (
    <StyledTracksPanel>
      {(!trackNotTaken || !trackTaken) ? (
        <BeatLoader css={override} color={'#3694D7'} loading={props.loading} />
      ) : (
        <div className="track-container">
          <div className="welcome__title">Hi {props.candidate?.fullname},</div>
          {!props.disable && (trackTaken !== null && trackTaken?.length > 0) ? (
            <div className="horizontal__bar">
              <div className="welcome__text">Track(s) you have enrolled in.</div>
              <div className="cards mt--30">
                <div className="horizontal_bar">
                  {trackTaken?.map((item: any) => {
                    return (
                      <HorizontalCard
                        key={item.trackId}
                        icon={item.logo}
                        title={item.title}
                        video={item.videos?.length > 0 ? item.videos?.[0].url : ''}
                        detailsDescription={item.detailsDescription}
                        handleClick={() => handleGetDetailOfTrack(item.candidateTrackId)}
                        item={item}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
          <div className="vertical__bar">
            <div className="welcome__text mt--30">
              {!props.disable ? 'Track(s) you can enroll in' : 'Enroll in a track to start your journey.'}
            </div>
            <div className="cards">
              {trackNotTaken !== null && trackNotTaken?.length > 0 ? (
                trackNotTaken?.map((item: any) => {
                  return (
                    <HorizontalCard
                      key={item.trackId}
                      icon={item.logo}
                      title={item.title}
                      video={item.videos?.length > 0 ? item.videos?.[0].url : ''}
                      detailsDescription={item.detailsDescription}
                      handleClick={async () => await handleAddTrack(item.trackId, item.trackEnrollType)}
                      item={item}
                    />
                  );
                })
              ) : (
                <h3 className="error w--100">No tracks found!</h3>
              )}
            </div>
          </div>
        </div>
      )}
    </StyledTracksPanel>
  );
};

import React, { useCallback, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { TracksPanel } from '../../containers';
import {
  getTracksForCandidate,
  createCandidateTrackForCandidate,
  getDetailsForCandidatebyCandidateTrackId,
} from 'store/evaluationPlatform';
import { DEFAULT_TOKEN, Flowtype, FLOW_TYPE, Plan_Session_Id, TrackEnrollType } from 'utilities/constants';
import { SuccessPayment } from 'containers/PlanAndPayment/PaymentAcknowledgement/successPayment';
import { useMessagePopup } from 'context/messagePopup';
import { notEmpty } from 'utilities';
import { useLoader } from 'context/loaderDots';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { setTrackInfoForPayment } from 'store/payment';

const TrackPage = (props: any) => {
  const loader = useLoader();
  const [enrollAfterPaymentTrackId, setEnrollAfterPaymentTrackId] = useState('');
  const { completePaymentAcknowledgement } = SuccessPayment();
  const message = useMessagePopup();
  const dispatch = useDispatch();
  // const [shouldUpdate, setShouldUpdate] = useState(false);

  const checkAndEnrolFreeTrack = useCallback(() => {
    loader.showLoader();
    const candidateId = getValueBrowserStorage('candidateId');
    const trackId = getValueBrowserStorage('trackId');
    const request = { candidateId, trackId, token: DEFAULT_TOKEN };
    const trackNotTaken = props.tracksData?.trackNotTaken || [];
    const isMustBuy = trackNotTaken.find((trackObj: any) => trackObj.trackId === trackId && trackObj.trackEnrollType === TrackEnrollType.mustBuy);
    if (isMustBuy) {
      message.fail('Oh no! Payment Failed');
      loader.hideLoader();
    } else {
      props.createCandidateTrackForCandidate(request).then((createResponse: any) => {
        loader.hideLoader();
        props.getTracksForCandidate({
          token: DEFAULT_TOKEN,
          candidateId: candidateId,
          trackEnrollTypes: [TrackEnrollType.canEnroll, TrackEnrollType.mustBuy]
        });
      });
    };
  }, [loader, props]);

  const completeOngoingPayment = useCallback(() => {
    completePaymentAcknowledgement(Plan_Session_Id).then((prodData: any) => {
      if (notEmpty(prodData)) {
        message.load('Payment Successful... Enrolling you in');
        const trackId = prodData.responseJson.metadata.track;
        const flowType = getValueBrowserStorage(Flowtype);
        if (flowType === FLOW_TYPE.buy) {
          const trackNotTaken = props.tracksData?.trackNotTaken || [];
          const isTrackNotTaken = trackNotTaken.find((trackObj: any) => trackObj.trackId === trackId);
          if (isTrackNotTaken) {
            setEnrollAfterPaymentTrackId(trackId);
          } else {
            dispatch(setTrackInfoForPayment({
              trackPlan: prodData.responseJson.metadata.subscriptionProduct == "true"
                ? "SUBSCRIPTION" : prodData.responseJson.metadata.contractProduct == "true" ? "UNLIMITED" : "FREE"
            }));
          }
        } else {
          setEnrollAfterPaymentTrackId(trackId);
        }

      }
    }).catch((error: any) => {
      if (error.type === FLOW_TYPE.buy) {
        checkAndEnrolFreeTrack();
      }
    })
  }, [completePaymentAcknowledgement, message, props.tracksData, dispatch, checkAndEnrolFreeTrack]);

  useEffect(() => {
    if (notEmpty(props.tracksData))
      completeOngoingPayment();
  }, [props.tracksData, completeOngoingPayment]);

  useEffect(() => {
    const savedCandidateId = getValueBrowserStorage('candidateId');
    if (savedCandidateId !== null && savedCandidateId !== 'undefined') {
      props.getTracksForCandidate({
        token: DEFAULT_TOKEN,
        candidateId: savedCandidateId,
        trackEnrollTypes: [TrackEnrollType.canEnroll, TrackEnrollType.mustBuy]
      });
    } else {
      props.getTracksForCandidate({
        token: DEFAULT_TOKEN,
        candidateId: props.candidate?._id,
        trackEnrollTypes: [TrackEnrollType.canEnroll, TrackEnrollType.mustBuy]
      });
    }
  }, []);

  return (
    <TracksPanel
      createCandidateTrackForCandidate={props.createCandidateTrackForCandidate}
      getDetailsForCandidatebyCandidateTrackId={props.getDetailsForCandidatebyCandidateTrackId}
      candidate={props.candidate}
      tracksData={props.tracksData}
      className="dashboard"
      history={props.history}
      disable={!!props?.history?.location?.state?.disable}
      enrollAfterPaymentTrackId={enrollAfterPaymentTrackId}
    />
  );
};

const mapStateToProps = (state: any) => ({
  candidate: state.evaluationPlatform.candidate,
  tracksData: state.evaluationPlatform.tracksData,
  loading: state.evaluationPlatform.loading,
});

const mapDispatchToProps = {
  getTracksForCandidate,
  createCandidateTrackForCandidate,
  getDetailsForCandidatebyCandidateTrackId,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackPage);

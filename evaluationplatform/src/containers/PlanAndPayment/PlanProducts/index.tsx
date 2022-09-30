import { TriggerElm } from 'components/Common/CollapsibleTriggerElement';
import { useLoader } from 'context/loaderDots';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { setTrackInfoForPayment } from 'store/payment';
import styled from 'styled-components';
import { IProductsForCandidate } from 'types/Payments';
import { notEmpty } from 'utilities';
import { Plan_Session_Id } from 'utilities/constants';
import { SuccessPayment } from '../PaymentAcknowledgement/successPayment';
import { PaymentHistory } from './paymentHistory';
import { TrackProducts } from './trackProducts';
import { usePlanProducts } from './usePlanProducts';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useMessagePopup } from 'context/messagePopup';

const ProductsAndHistory = styled.div`
  padding: 2rem;

  .trackInfo {
    font-size: 1rem;
    text-align: left;
    margin-bottom: 1rem;
  }

  .trackInfo form {
    display: inline-block;
  }

  .react-tabs__tab-panel{
    display: flex !important
  }
  .react-tabs{
    width: 100% !important
  }
  .react-tabs__tab:hover{
    background: rgb(227, 227, 227);
  }
  .react-tabs__tab--selected{
    border-radius: 0;
    border:0;
    border-bottom: ${props => `2px solid ${props.theme.colors.primary} !important`};
  }
  .react-tabs__tab{
    border-bottom: 1px solid #aaa;
  }
  .react-tabs__tab-list{
    border-bottom: 0;
    text-align: center;
  }

  .Collapsible {
    margin-bottom: 1rem;
  }
`;

export const PlanProducts = () => {
  const { getProductForCandidate } = usePlanProducts();
  const { enqueueSnackbar } = useSnackbar();
  const { getAllTakenTracks, prepareHistoryData } = usePlanProducts();
  const loader = useLoader();
  const [tracks, setTracks] = useState<any[]>([]);
  const [trackProductInfo, setTrackProductInfo] = useState<IProductsForCandidate | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState('');
  const { trackId, trackName, trackPlan } = useSelector((state: RootState) => state.payment);
  const dispatch = useDispatch();
  const { completePaymentAcknowledgement } = SuccessPayment();
  const candidateInfo = useSelector((state: RootState) => state.evaluationPlatform.candidate);
  const [planHistoryList, setPlanHistoryList] = useState<any[]>([]);
  const [questionHistoryList, setQuestionHistoryList] = useState<any[]>([]);
  const [expertMeetingHistoryList, setExpertMeetingHistoryList] = useState<any[]>([]);
  const message = useMessagePopup();

  useEffect(() => {
    completePayment();
    // if (notEmpty(candidateInfo?._id) && notEmpty(trackId)) {
    //   loadTracks();
    // }
  }, []);// eslint-disable-line


  useEffect(() => { getModifiedHistoryData()}, [trackProductInfo]) // eslint-disable-line

  useEffect(() => {
    if (notEmpty(candidateInfo?._id) && notEmpty(trackId)) {
      loadTracks();
    }
  }, [candidateInfo, trackId]);// eslint-disable-line

  useEffect(() => {
    notEmpty(selectedTrackId) && loadProducts();
    !notEmpty(selectedTrackId) && resetAll();
  }, [selectedTrackId]);// eslint-disable-line

  const completePayment = () => {
    completePaymentAcknowledgement(Plan_Session_Id).then((prodData: any) => {
      if (notEmpty(prodData)) {
        message.success('Voila! Payment Successful');
        dispatch(setTrackInfoForPayment({
          trackPlan: prodData.responseJson.metadata.subscriptionProduct == "true"
            ? "SUBSCRIPTION" : prodData.responseJson.metadata.contractProduct == "true" ? "UNLIMITED" : "FREE"
        }));
      }
    });
  }

  async function loadTracks() {
    loader.showLoader(true);
    try {
      const tracks = await getAllTakenTracks();
      setTracks(tracks);
      setSelectedTrackId(trackId);
      loader.hideLoader();
    }
    catch {
      loader.hideLoader();
      enqueueSnackbar('Error fetching tracks', {
        variant: 'error',
        autoHideDuration: 2500,
      })
    }
  }

  const onTrackSelect = (trackId: string) => {
    setSelectedTrackId(trackId);
  }

  const loadProducts = () => {
    loader.showLoader();

    getProductForCandidate(selectedTrackId)
      .then(p => {
        setTrackProductInfo(p);
        loader.hideLoader();
      })
      .catch(err => {
        enqueueSnackbar(err?.message, {
          variant: 'error',
          autoHideDuration: 2500,
        })
        loader.hideLoader();
      });
  }

  const resetAll = () => {
    setTrackProductInfo(null);
  }

  const getTrackName = (trackId: string): string => {
    const track = tracks.find(t => t.trackId == trackId);
    return notEmpty(track) ? track.title : '';
  }

  const updateTrackInfoOnPayment = (plan: string) => {
    if (trackId == selectedTrackId) {
      dispatch(setTrackInfoForPayment({
        trackId,
        trackName,
        trackPlan: plan,
      }))
    }
  }

  async function getModifiedHistoryData() {
    loader.showLoader();
    try {
      const { plans, questionExperts, expertMeetings } = await prepareHistoryData(trackProductInfo as IProductsForCandidate);
      setPlanHistoryList(plans);
      setQuestionHistoryList(questionExperts);
      setExpertMeetingHistoryList(expertMeetings);
      loader.hideLoader();
    }
    catch {
      loader.hideLoader();
      console.log("Error fetching history data");
    }
  }

  const getSelectedIndex = (): number => {
    if (notEmpty(tracks)) {
      return tracks.findIndex(t => t.trackId === selectedTrackId);
    } else {
      return -1;
    }
  }

  return (
    <div>
      {notEmpty(selectedTrackId) && (<ProductsAndHistory>
        <div className="trackInfo">
          <Tabs onSelect={(index) => onTrackSelect(tracks[index].trackId)} selectedIndex={getSelectedIndex()}>
            <TabList>
              {notEmpty(tracks) &&
                tracks.map((track, index) => (
                  <Tab key={index}>{track.title}</Tab>
                ))}
            </TabList>
            {notEmpty(tracks) &&
              tracks.map((track, index) => (
                <TabPanel key={index}></TabPanel>
              ))}
          </Tabs>
        </div>
        <Collapsible
          trigger={<TriggerElm heading={'Plans'} />}
          triggerWhenOpen={<TriggerElm heading={'Plans'} open={true} />}
          open={notEmpty(trackProductInfo) ? true : false}
        >
          <TrackProducts
            productInfo={trackProductInfo}
            loadProducts={loadProducts}
            trackId={selectedTrackId}
            trackName={getTrackName(selectedTrackId)}
            updateTrackPlan={updateTrackInfoOnPayment}
            reloadProducts={loadProducts}
            trackPlan={trackPlan} />
        </Collapsible>
        <Collapsible
          trigger={<TriggerElm heading={'Payment History'} />}
          triggerWhenOpen={<TriggerElm heading={'Payment History'} open={true} />}
          onOpen={async () => await getModifiedHistoryData()}>
          <PaymentHistory
            planHistoryList={planHistoryList}
            questionHistoryList={questionHistoryList}
            expertMeetingHistoryList={expertMeetingHistoryList} />
        </Collapsible>
      </ProductsAndHistory>)}
    </div>
  );
};
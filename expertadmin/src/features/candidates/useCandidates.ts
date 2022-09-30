import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { Candidates, UpdateCandidatePlan } from 'types';

import {
  getCandidatesAssociatedByExpert, getUpdateCandidatePlan
} from './candidatesActions';
import {
  getTrackList,
  reset,
  getTrackListForUpgrade,
} from './candidatesSlice';

export const useCandidates = () => {
  const expert = useSelector((state: RootState) => state.auth.expert);
  const {
    loading,
    candidates,
    candidateUpdatePlan,
    trackList,
    upgradeCandidateTrackList,
    detailFilterRequest,
  } = useSelector((state: RootState) => state.candidates);
  const dispatch = useAppDispatch();
  const { expertId } = expert!;

  const getAllCandidatesAssociatedByExpert = () => {
    const interactionTypes = ["ALL"];
    dispatch(getCandidatesAssociatedByExpert({ expertId, interactionTypes }));
  };

  const getAllUpdateCandidatePlan = async (
    candidatePlans: UpdateCandidatePlan
  ) => {
    const result = await dispatch(getUpdateCandidatePlan(candidatePlans));
    return result;
  };

  const initializeCapability = () => {
    dispatch(reset());
  };

  const getCandidateTrackList = (candidate: Candidates) => {
    dispatch(getTrackList(candidate));
  };

  const getUpgradeCandidateTrackList = (candidate: Candidates) => {
    dispatch(getTrackListForUpgrade(candidate));
  };

  const resetTrackList = () => {
    dispatch(reset());
  };


  return [
    {
      getAllCandidatesAssociatedByExpert,
      getAllUpdateCandidatePlan,
      initializeCapability,
      getCandidateTrackList,
      getUpgradeCandidateTrackList,
      resetTrackList,
      loading,
      detailFilterRequest,
      candidateUpdatePlan,
      candidates,
      trackList,
      upgradeCandidateTrackList,
    },
  ];
};

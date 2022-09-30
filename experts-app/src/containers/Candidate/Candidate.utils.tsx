import { useDispatch, useSelector } from 'react-redux';

import { getCandidatesAssociatedByExpert } from '../../actions/expert/query/candidate/candidateActions';
import { getTrackList, reset } from '../../actions/expert/query/candidate/candidateSlice';
import { RootState } from '../../store';
import { Candidates } from './ICandidate';

const useCandidate = () => {
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);
  const dispatch = useDispatch();
  const {
    loading,
    meetingCandidates,
    feedbackCandidates,
    trackList,
    detailFilterRequest
  } = useSelector((state: RootState) => state.candidate);

  
  const getAllCandidatesAssociatedByExpert = () => {
    const interactionTypes = ["ALL"];
    dispatch(getCandidatesAssociatedByExpert({ expertId, interactionTypes }));
  };

  const initializeCapability = () => {
    dispatch(reset());
  };

  const getCandidateTrackList = (candidate: Candidates) => {
    dispatch(getTrackList(candidate));
  }

  const resetTrackList = () => {
    dispatch(reset());
  }
  
  return [{
    getAllCandidatesAssociatedByExpert,
    initializeCapability,
    getCandidateTrackList,
    resetTrackList,
    loading,
    detailFilterRequest,
    meetingCandidates,
    feedbackCandidates,
    trackList,
    expertId,
  }];
}

export default useCandidate;
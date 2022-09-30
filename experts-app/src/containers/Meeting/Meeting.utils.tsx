import { useDispatch, useSelector } from 'react-redux';

import { getMeetingList, saveExpertNotesForCandidate, completeMeeting } from '../../actions/expert/query/meeting/meetingActions';
import { resetMeeting } from '../../actions/expert/query/meeting/meetingSlice';
import { RootState } from '../../store';
import { GetMeetingRequest } from './IMeeting';

const useMeeting = () => {
  const expertId = useSelector((state: RootState) => state.auth.user.expertId);
  const dispatch = useDispatch();
  const {
    loading,
    markingComplete,
    meetings,
  } = useSelector((state: RootState) => state.meeting);
  
  const getAllMeetingList = (formObj: GetMeetingRequest) => {
    dispatch(getMeetingList(formObj));
  };

  const resetMeetingList = () => {
    dispatch(resetMeeting());
  }

  const saveExpertNotes = (expertId: string, meetingId: string, expertNotes: string) => {
    dispatch(saveExpertNotesForCandidate({ expertId, meetingId, expertNotes }));
  }

  const completeMeetingForCandidate = (expertId: string, meetingDetailId: string, meetingStatus: string, remarks?: string) => {
    dispatch(completeMeeting({ expertId, meetingDetailId, meetingStatus, remarks }));
  }

  return [{
    meetingLoading:loading,
    meetings,
    markingComplete,
    resetMeetingList,
    getAllMeetingList,
    saveExpertNotes,
    completeMeetingForCandidate,
  }];
}

export default useMeeting;
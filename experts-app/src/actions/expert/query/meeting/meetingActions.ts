import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetMeetingRequest, ISaveExpertNotes, ICompleteMeeting } from '../../../../containers/Meeting/IMeeting';
import { meetingService } from '../../../../services/meeting';

export const getMeetingList = createAsyncThunk(
    `meetings/getMeetings`,
    async (getMeetingRequest: GetMeetingRequest) => {
      const response = await meetingService.getMeetingList(
        getMeetingRequest
      );
      return response;
    }
  );

export const saveExpertNotesForCandidate = createAsyncThunk(
  `meetings/saveExpertNotes`,
  async (getMeetingRequest: ISaveExpertNotes) => {
    const response = await meetingService.saveExpertNotes(
      getMeetingRequest
    );
    return response;
  }
);


export const completeMeeting = createAsyncThunk(
  `meetings/saveExpertNotes`,
  async (completeMeetingRequest: ICompleteMeeting) => {
    const response = await meetingService.completeMeeting(
      completeMeetingRequest
    );
    return response;
  }
);
  
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetCandidateRequest } from '../../../../containers/Candidate/ICandidate';
import { candidateService } from '../../../../services/candidate';

export const getCandidatesAssociatedByExpert = createAsyncThunk(
    `candidates/getCandidates`,
    async (getCategoriesRequest: GetCandidateRequest) => {
      const response = await candidateService.getCandidatesAssociatedByExpert(
        getCategoriesRequest
      );
      return response;
    }
  );
  
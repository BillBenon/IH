import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSkipCount } from '../../../../actions/auth/authSlice';
import { setHighlightedCard, updateFilterCount, updateSubmissionStatus } from '../../../../actions/expert/query/queriesSlice';
import { setActiveCardOnHighlight } from '../../../../actions/expert/query/submission/submissionSlice';

import { RootState } from '../../../../store';
import { CandidateInfo, Market, Question, TrackId } from '../../IFeedback';

const useSubmissions = () => {
    const dispatch = useDispatch();
    const lastActivity = useSelector((state: RootState) => state.auth.user.lastActivity);
    const { activeTab,
        totalResultCount,
        candidateInfo,
        submissions,
        tracks,
        markets,
        questions,
        highlightedCards,
        error,
        success,
    } = useSelector((state: RootState) => state.expertFeedbackQueries);
    const getCandidateNameById = (id: string) => {
        return candidateInfo?.find((candidate: CandidateInfo) => candidate.id == id)?.name;
    }

    const getTrackByTrackId = (id: string) => {
        return tracks?.find((track: TrackId) => track.id == id);
    }

    const getMarketByMarketId = (id: string) => {
        return markets?.find((market: Market) => market.id == id);
    }

    const getQuestionByQuestionId = (id: string) => {
        return questions?.find((question: Question) => question.id == id)?.description;
    }

    const getQuesDetailsByQuestionId = (id: string) => {
        return questions?.find((question: Question) => question.id == id);
    }

    const getQuestionTitleByQuestionId = (id: string) => {
        return questions?.find((question: Question) => question.id == id)?.name;
    }

    const setSkipCount = (skipCount: number) => {
        dispatch(updateSkipCount({ index: activeTab, skipCount }));
    }

    const setSubmissionStatus = (questionAnswerId: string, status: string) => {
        dispatch(updateSubmissionStatus({ questionAnswerId: questionAnswerId, status }));
    }

    const setFilterCount = (prevFilter: string, newFilter: string) => {
        dispatch(updateFilterCount({ prevFilter, newFilter }));
    }

    const handleHighlightedCard = (questionAnswerId: string) => {
        dispatch(setHighlightedCard({ questionAnswerId }));
        dispatch(setActiveCardOnHighlight({ questionAnswerId }));
    }

    return [{
        activeTab,
        lastActivity,
        candidateInfo,
        submissions,
        totalResultCount,
        highlightedCards,
        setFilterCount,
        handleHighlightedCard,
        setSubmissionStatus,
        setSkipCount,
        getCandidateNameById,
        getTrackByTrackId,
        getMarketByMarketId,
        getQuestionByQuestionId,
        getQuesDetailsByQuestionId,
        getQuestionTitleByQuestionId,
    }];
}

export default useSubmissions;
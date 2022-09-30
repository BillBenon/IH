import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    getSubmissionDetail,
    saveFeedback,
    submitFeedback,
} from '../../../../../actions/expert/query/submission/submissionActions';
import {
    expandCollapseCard,
    setActiveCard,
    setActiveEval,
    setActiveEvaluatedCapabilities,
    setActiveSubmission,
    setCommentValue,
    setInvalidSubmission,
    setSketchValue,
    setSliderValue,
    setTextareaValue,
} from '../../../../../actions/expert/query/submission/submissionSlice';
import BrowserCacheService from '../../../../../services/browser-cache';
import { RootState } from '../../../../../store';
import { ButtonTypes, DEFAULT_TOKEN, FEEDBACK_TYPES, FilterKeys } from '../../../../../utilities/constants';
import { Capability } from '../../../IFeedback';
import {
    AnswerContainer,
    AnswerWithActive,
    DetailedSubmissionInput,
    NameIdPair,
    SaveFeedbackInput,
} from './ISubmissionDetail';
import marked from 'marked';
import { toast } from 'react-toastify';
import { DefaultToastSettings } from '../../../../../utilities/defaults';
import useQueryFilters from '../../TabContent.utils';

const useSubmissionDetail = () => {
    const dispatch = useDispatch();
    const [showCapabilityModal, setShowCapabilityModal] = useState(false);
    const [{ setQuery }] = useQueryFilters()
    const [currentCapability, setCurrentCapability] = useState<Capability | undefined>();
    const expert = useSelector((state: RootState) => state.auth.user);
    const { capabilities, activeTab } = useSelector((state: RootState) => state.expertFeedbackQueries);
    const {
        loading,
        loadingSubmissionDetails,
        invalidSubmission,
        detailedSubmission,
        expandedCards,
        activeCard,
        currentQuery,
    } = useSelector((state: RootState) => state.submission);

    const getDetailedSubmissions = async (questionId: string, trackId: string) => {
        if (expert.expertId) {
            var input: DetailedSubmissionInput = {
                token: DEFAULT_TOKEN,
                expertId: expert.expertId,
                candidateTrackId: trackId,
                questionId: questionId
            }
            let res: any = await dispatch(getSubmissionDetail(input));
            if(res.type.includes('fulfilled') && res.payload?.output?.isAnswerUpdated){
                toast.error(res.payload.apiMessage, DefaultToastSettings)
                setQuery(ButtonTypes.NEW())
            }
        }
    }

    const handleTabClick = (e: any, index: number, questionAnswerId: string) => {
        dispatch(setActiveSubmission({ index, questionAnswerId }));
    }

    const getCapabilityByCapabilityId = (id: string) => {
        return capabilities?.find((capability: any) => capability.id === id);
    }

    const handleSaveFeedback = (input: SaveFeedbackInput) => {
        if (input.feedback.trim()) {
            dispatch(saveFeedback({ ...input, token: DEFAULT_TOKEN, feedbackId: input._id }));
        }
    }

    const unsetInvalidSubmission = () => {
        handleInvalidSubmission({ feedback: [], eval: [] });
    }

    const handleSubmitFeedback = (input: SaveFeedbackInput) => {
        const getQuillContent = (str: string) => str.replace(/<(.|\n)*?>/g, '').trim()
        let invalidfeedback: any[] = [];
        if (!getQuillContent(input.feedback)) {
            invalidfeedback = [input.questionAnswerId];
        }
        let invalideval: any = [];
        // below logic can be uncommented if the dev have a requirment for enabling comments mandatory with score between
        // 0 and 10 for each evaluation.
        // input.evaluatedCapabilities.forEach((cap: EvaluatedCapability) => {
        //     cap.evals.forEach((evaluation: Eval) => {
        //         if (evaluation.evalMetricsFeedbackValue > 0 && evaluation.evalMetricsFeedbackValue < 10 && !getQuillContent(evaluation.evalTextFeedback)) {
        //             invalideval.push(evaluation.evalId);
        //         }
        //     })
        // });
        handleInvalidSubmission({ [input.questionAnswerId]: { feedback: invalidfeedback, eval: invalideval } });
        if (!invalidfeedback.length && !invalideval.length && !!input.feedback.trim())
            dispatch(submitFeedback({ ...input, token: DEFAULT_TOKEN, feedbackId: input._id }))
    }

    const updateSliderValue = (value: number, capabilityId: string, evalId: string) => {
        dispatch(setSliderValue({ value, capabilityId, evalId }));
    }

    const updateCommentValue = (value: string, capabilityId: string, evalId: string) => {
        dispatch(setCommentValue({ value, capabilityId, evalId }));
    }

    const updateTextareaValue = (value: string,) => {
        dispatch(setTextareaValue({ value }));
    }

    const updateSketchValue = (value: string,) => {
        dispatch(setSketchValue({ value }));
    }

    const handleActiveCard = (questionAnswerId: string) => {
        BrowserCacheService.getItem('auth', (value: any) => {
            dispatch(setActiveCard({ activeTab, questionAnswerId, currentQuery: value.lastActivity?.saveQueries[activeTab].fixedQuery, expertId: expert.expertId }));
        });
    }

    const handleExpandedEvaluationCapability = (capabilityId: string, value: boolean) => {
        dispatch(setActiveEvaluatedCapabilities({ capabilityId, value }));
    }

    const handleExpandedEval = (capabilityId: string, evalId: string | undefined, value: boolean) => {
        dispatch(setActiveEval({ capabilityId, evalId, value }));
    }

    const handleLastThreeTabs = (answers: AnswerWithActive[]) => {
        let selectedanswer = answers;
        switch (expert.lastActivity?.saveQueries[activeTab]?.fixedQuery) {
            case FilterKeys.FEEDBACKSENT:
                selectedanswer = answers?.filter(
                    (ans: AnswerContainer) =>
                        ans.feedbacks[0].feedbackStatus !== FEEDBACK_TYPES.EXPERT_REVIEWING_RESPONSE ||
                        ans.feedbacks[0].feedbackStatus !== FEEDBACK_TYPES.RESPONSE_IS_SUBMITTED_TO_EXPERT)
        }
        if (answers?.length > 3) {
            let selectedarr = selectedanswer?.filter((a: AnswerContainer, inx: number) => inx < 3);
            let selectedarrwithparentindex: any[] = [];
            answers.forEach((answer: AnswerContainer, pindex: number) => {
                if (selectedarr.some((ans: AnswerContainer) => ans.answer._id === answer.answer._id)) {
                    selectedarrwithparentindex.push(pindex);
                }
            })
            return selectedarrwithparentindex;
        }
        else {
            return selectedanswer?.map((answer: AnswerContainer) => {
                let parentinx = answers.findIndex((ans: AnswerContainer) => ans.answer._id === answer.answer._id);
                return parentinx;
            });
        }
    }

    const getExpertByExpertId = (expertId: string, questionAnswerId: string) => {
        return detailedSubmission[questionAnswerId]?.experts?.find((ex: NameIdPair) => ex.id == expertId)?.name;
    }

    const handleCurrentCapability = (id: string) => {
        setCurrentCapability(getCapabilityByCapabilityId(id) as any);
        setShowCapabilityModal(true);
    }

    const handleInvalidSubmission = (value: any) => {
        dispatch(setInvalidSubmission({ invalidSubmission: value }));
    }

    const handleCardExpandCollapse = (questionAnswerId: string) => {
        dispatch(expandCollapseCard({ questionAnswerId }))
    }

    const handleMarkedText = (text: string) => {
        return text ? marked(text) : ''
    }

    return [{
        handleCardExpandCollapse,
        unsetInvalidSubmission,
        handleLastThreeTabs,
        getDetailedSubmissions,
        handleTabClick,
        getCapabilityByCapabilityId,
        updateTextareaValue,
        updateSketchValue,
        updateSliderValue,
        handleSaveFeedback,
        handleSubmitFeedback,
        handleActiveCard,
        updateCommentValue,
        getExpertByExpertId,
        handleCurrentCapability,
        setShowCapabilityModal,
        handleInvalidSubmission,
        handleExpandedEval,
        handleExpandedEvaluationCapability,
        handleMarkedText,
        expandCollapseCard,
        showCapabilityModal,
        currentCapability,
        loading,
        loadingSubmissionDetails,
        expert,
        activeTab,
        invalidSubmission,
        detailedSubmission,
        expandedCards,
        activeCard,
        currentQuery,
    }];
}

export default useSubmissionDetail;
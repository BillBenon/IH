import { IGetEvalautions, IGetHintsAndSampleSolution } from 'types';
import { post } from '../utilities';
const API_PREFIX = 'evaluationPlatform';

const getHintsByQuestion = (payload: IGetHintsAndSampleSolution) => {
    return post(`${API_PREFIX}/getHints`, payload);
}

const getSampleSolutionsByQuestion = (payload: IGetHintsAndSampleSolution) => {
    return post(`${API_PREFIX}/getSampleSolutions`, payload);
}

const getEvaluations = (payload: IGetEvalautions) => {
    return post(`${API_PREFIX}/getEvaluations`, payload);
  }

export const HintsAndSampleSolutionService = {
    getEvaluations,
    getHintsByQuestion,
    getSampleSolutionsByQuestion
}
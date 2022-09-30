interface IStatusButtonColors {
  [key: string]: string;
}

interface IQuestionStatusColors {
  [key: string]: string;
}

export const STATUS_BUTTON_COLORS: IStatusButtonColors = {
  UNANSWERED: '#5F5F5F',
  ANSWERED: '#FFA700',
  SEND_FOR_REVIEW: '#04B700',
  UNDER_REVIEW: '#5B94E3',
  FEEDBACK_RECEIVED: '#5B94E3',
  All: '#000000',
};

export const QUESTION_STATUS_COLORS: IQuestionStatusColors = {
  UNANSWERED: '#7E7E7E',
  ANSWERED: '#FFA700',
  SUBMITTED_FOR_REVIEW: '#04B700',
  FEEDBACK_VIEWED: '#5B94E3',
};

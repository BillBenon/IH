import YellowCircleIcon from 'assets/icons/questionStatusIcons/yellowCircleIcon.svg';
import marked from 'marked';
import { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useLocation } from 'react-router';
import { IProductsInfo } from 'types/Payments';
import { GreyCircleIcon } from '../assets';
import store from '../store';
import { IMarket, ISaveCandidateDataOptions, ISaveCandidateLastActivity } from '../types';
import { DEFAULT_TOKEN, PlanType, QUESTION_STATUS_TEXT, TrackEnrollType } from './constants';

export const selectQuestionStatusIcon = (status: string): string => {
  switch (status) {
    case 'UNANSWERED':
      return GreyCircleIcon;
    case 'ANSWERED':
      return YellowCircleIcon;
    case 'Progress':
      return GreyCircleIcon;
    case 'Submitted':
      return GreyCircleIcon;
    case 'Review':
      return GreyCircleIcon;
    case 'Feedback':
      return GreyCircleIcon;
    default:
      return GreyCircleIcon;
  }
};

export const getValidMarket = (market: IMarket | null, defaultMarket: IMarket): IMarket => {
  let { name, logo, theme } = defaultMarket;
  if (market !== null) {
    name = market?.name;
    theme = market?.theme;
    if (
      market?.logo?.match(
        /^(?:([a-z0-9+.-]+):\/\/)(?:\S+(?::\S*)?@)?(?:(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/
      )
    ) {
      logo = market.logo;
    }
  }
  return {
    name,
    logo,
    theme,
  };
};

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

/**
 * This function will give the answer object reference deep into an array/object
 * @param object recursive object in which the target object is to find
 * @param key target object key
 */
export function getObjectFromTrack(object: any, column: string, _id: string) {
  let result: Object | undefined;
  if (object instanceof Array) {
    for (var i = 0; i < object.length; i++) {
      result = getObjectFromTrack(object[i], column, _id);
      if (result) {
        break;
      }
    }
  }
  else {
    for (var prop in object) {
      if (prop === column) {
        if (object[column]["_id"] === _id) {
          return object;
        }
      }
      if (object[prop] instanceof Object || object[prop] instanceof Array) {
        result = getObjectFromTrack(object[prop], column, _id);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}

export function getLastSavedActivityPayload({ incCapId, incQueId, incQueAnsId }: ISaveCandidateDataOptions) {

  const { selectedCapabilityId, currentQuestionId, currentAnsVersionId, currentTrack: { candidateTrack: [CT] } } = store.getState().evaluationPlatform;
  const { candidateTrackId } = CT
  const data: ISaveCandidateLastActivity = {
    token: DEFAULT_TOKEN,
    candidateTrackId,
    candidateTrackLastActivity: {
      key1: 'TRACK',
      value1: '',
      key2: 'CAPABILITY_ID',
      value2: incCapId ? selectedCapabilityId : '',
      key3: 'QUESTION_ID',
      value3: incQueId ? currentQuestionId : '',
      key4: 'QUESTION_ANSWER_ID',
      value4: incQueAnsId ? currentAnsVersionId : '',
    }
  }
  return data

}

export const camelize = (str = '') => str.split(' ')
  .map(n => n ? `${n[0]?.toUpperCase()}${n?.substring(1, n.length).toLowerCase()}` : '')
  .join(' ')

export const getAnsStatusText = (qStatus: string) => {
  switch (qStatus) {
    case QUESTION_STATUS_TEXT.UNANSWERED:
      return 'Unanswered'
    case QUESTION_STATUS_TEXT.ANSWERED:
      return 'In Progress'
    case QUESTION_STATUS_TEXT.SUBMITTED_FOR_REVIEW:
      return 'Submitted'
    case QUESTION_STATUS_TEXT.UNDER_REVIEW:
      return 'Under Review'
    case QUESTION_STATUS_TEXT.FEEDBACK_RECEIVED:
      return 'Feedback Received'
    case QUESTION_STATUS_TEXT.FEEDBACK_VIEWED:
      return 'Feedback Viewed'
    default:
      return qStatus
  }
}

export const getExpertName = (expertId: string) => {
  if (!expertId) return '';
  let expertList = store.getState().evaluationPlatform?.currentTrack?.candidateTrack[0]?.experts;
  let expert = expertList?.find((exp: any) => exp._id === expertId);
  return expert ? expert.fullname : ''
}

export const getDateTimeInLocalFormat = (date: string) => {
  let dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  let myDate = new Date(date);
  return myDate.toLocaleDateString('en-US', dateOptions);
}

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

export const notEmpty = (val: any): boolean => {
  return !!(val && (val != '' || (val.length && val.length > 0)));
}

export const handleMarkedText = (text: string) => {
  return text ? marked(text) : '';
}

export const getCurrentDomainUrl = () => {
  return window.location.origin;
}

export const getQuillContent = (str: string) => str ? str.replace(/<(.|\n)*?>/g, '').trim() : ''

export const getModalDefaultSettings = (width: string, zIndex = 999) => {
  const modalStyle: Modal.Styles | undefined = {
    overlay: {
      background: 'rgba(0, 0, 0, 0.44)',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      position: 'fixed',
      zIndex
    },
    content: {
      position: 'absolute',
      background: 'white',
      borderRadius: '10px',
      padding: '1em 2em',
      margin: 'auto',
      width: width,
      height: 'fit-content',
      overflow: 'none',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0',
      zIndex
    },
  }

  return modalStyle;
}

export const getSketchDataCopyFromArray = (answers: Array<any>) => {
  if (!answers?.length) return []
  return answers.slice(1).reduce((acc, currVal, idx) => {
    const { questionId, capabilityIds, _id: questionAnswerId, sketchAvailable: userSketchAvailable } = currVal?.answer
    let version = answers.length - 1 - idx;
    if (userSketchAvailable) {
      acc.push({
        name: `Answer V ${version}`,
        value: {
          capabilityIds,
          questionAnswerId,
          questionId
        }
      })
    }
    const { expertId, _id: feedbackId, sketchAvailable: expertSketchAvailable } = currVal?.feedbacks[0] || {};
    if (expertSketchAvailable) {
      acc.push({
        name: `Feedback V ${version}`,
        value: {
          feedbackId,
          expertId,
          questionAnswerId,
          questionId
        }
      })
    }
    return acc
  }, [])?.sort((a: any, b: any) => a.name > b.name ? 1 : -1)
}

export const scrollWindowToElement = (elementId: string) => {
  setTimeout(() => {
    var element = document.getElementById(elementId);
    var headerOffset = 60;
    if (element) {
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
}

export function getUniqueId(length: number) {
  var result = [];
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return result.join('');
}

export function getEnrollmentType() {
  const { currentTrack } = store.getState().evaluationPlatform
  return currentTrack?.candidateTrack[0]?.trackEnrollType
}

export function IsunSubscribable(product: IProductsInfo) {
  return product.planName === PlanType.Evaluation || product.planName === PlanType.Placement
}

function preg_quote(str: string) {
  return (str + '')
    .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&')
}

export function highlight(str: string, searchTerm: string) {
  return str.replace(new RegExp("(" + preg_quote(searchTerm) + ")", 'gi'), "<mark>$1</mark>");
}

export function isPlacementTrack(plan?: string) {
  let currTrackPlan = plan;
  if (!currTrackPlan) currTrackPlan = getEnrollmentType();
  if (!currTrackPlan) return true;
  return compareIgnoreCase(currTrackPlan!, TrackEnrollType.FORPLACEMENT);
}

export function compareIgnoreCase(str1: string, str2: string) {
  return str1?.trim()?.toLowerCase() === str2?.trim()?.toLowerCase();
}
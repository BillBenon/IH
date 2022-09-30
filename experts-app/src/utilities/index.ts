import Modal from 'react-modal';

export { get, post, put, del } from './api';

export const getModalDefaultSettings = (width: string,  zIndex = 999) => {
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
  return answers.reduce((acc, currVal, idx) => {
    const { capabilityIds, _id: questionAnswerId, sketchAvailable: userSketchAvailable } = currVal?.answer
    const { expertId, _id: feedbackId, sketchAvailable: expertSketchAvailable, questionId } = currVal?.feedbacks[0]

    let version = answers.length - idx;
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
    if (expertSketchAvailable && !currVal.isActive) {
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
  }, []).sort((a: any, b: any) => a.name > b.name ? 1 : -1)
}

export const notEmpty = (val: any): boolean => {
  return !!(val && (val != '' || (val.length && val.length > 0)));
}
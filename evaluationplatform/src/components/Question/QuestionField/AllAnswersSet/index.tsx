import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { evalMetricsValueMapper, evaluationMetricConstants } from 'utilities/constants';
import { getDateTimeInLocalFormat, getExpertName } from 'utilities/helperFunctions';
import ReactTooltip from 'react-tooltip';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';

const StyledAllAnswerSet = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
border: none;
border-radius: 5px;
box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
width: -webkit-fill-available;
font-size: 16px;
font-family: Lato;
font-style: normal;
font-weight: normal;
color: #000000;
padding: 25px 29px;
min-height: 191px;
max-height: 420px;
overflow-y: auto;
height: auto;
box-sizing: border-box;
background: #f3f3f3;
&::placeholder {
  color: #949494;
  opacity: 1;

}

.version-block {
    border-radius: 2px;
    border: 2px solid rgb(118,118,118);
    border-style: outset;
    height: 27px;
    padding: 0 5px;
    width: 35px;
    text-align: center;
}

.version-info {
    border-bottom: 1px solid #D3D3D3;
}
.EvalFeedback{
    width: 97%;
}
.profile-icon {
    top: 12px;
    width: 1.8rem;
    background-color: #5B94E3;
    display: inline-block;
    font-size: 16px;
    font-weight: 500;
    color: white;
    position: relative;
    text-align: center;
    height: 28px;
    border-radius: 100%;
    overflow: hidden;
    padding: 4px;
  }
`;

interface IProps {
    answers: any;
    capabilityId: any;
    candidate: any;
    communityVersion?: boolean;
}

export const AllAnswersSet: React.FC<IProps> = (props) => {
    const getFeedBack = (answer: any) => {
        const feedbackIdx = _.findIndex(answer?.feedbacks, (feedbackItem: any) => {
            return feedbackItem.questionAnswerId === answer?.answer?._id;
        });
        return answer?.feedbacks[feedbackIdx];
    }

    const getEvals = (feedback: any) => {
        const evaluatedCapabilityIdx = _.findIndex(feedback?.evaluatedCapabilities, (evaluatedCapabilityItem: any) => {
            return evaluatedCapabilityItem.capabilityId === props.capabilityId;
        });
        return feedback?.evaluatedCapabilities[evaluatedCapabilityIdx]?.evals;
    }
    return (
        <StyledAllAnswerSet>
            {props.answers.map((answer: any, index: number, ansArr: any) => {
                const feedback = getFeedBack(answer);
                const expertName = getExpertName(answer?.feedbacks[0]?.expertId)
                const evals = getEvals(feedback);
                const ansDate = getDateTimeInLocalFormat(answer?.answer?.updateAt)
                return (<div key={answer.answer._id} className="version-info pb-3 mb-2 w-100 text-left">
                    <div className="d-flex mb-3">
                        <div className="version-block">{(ansArr.length - index === ansArr.length && !props.communityVersion) ? `C` : `V${ansArr.length - index}`}</div>
                        <div className="pl-2">
                            {!props.communityVersion && <div>
                                <small className='text-secondary font-italic pl-2'>
                                    {answer.feedbacks.length > 0 ? answer?.feedbacks[0]?.feedbackStatus === 'RESPONSE_IS_SUBMITTED_TO_EXPERT' ?
                                        `Submitted for Review ${expertName ? `to ${expertName}` : ''} on ${ansDate}` :
                                        `You responded on ${getDateTimeInLocalFormat(answer.answer.updateAt)}, feedback received on ${getDateTimeInLocalFormat(feedback?.feedbackAt)}, provided by ${expertName}`
                                        : ` ${getDateTimeInLocalFormat(answer.answer.updateAt)}`}
                                </small>
                            </div>}
                        </div>
                    </div>
                    <div className="d-flex mb-3">
                        <div className='profile-icon ml-1' data-for='cName' data-tip={props.candidate?.fullname}>{props.candidate?.fullname?.charAt(0).toUpperCase()}</div>
                        <ReactTooltip id='cName' type="dark" />
                        <div className="EvalFeedback pl-2">
                            <div className="ml-2">
                                <div className="pt-1">
                                    <RichTextEditor
                                        customStyles={{
                                            resize: 'none',
                                            boxShadow: 'none',
                                            height: 'auto',
                                        }}
                                        value={answer.answer.answer}
                                        disabled={true}
                                        id={answer?.answer?._id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {feedback && <div className="d-flex mb-3">
                        <div className='profile-icon ml-1' data-for='exName' data-tip={expertName}>E</div>
                        <ReactTooltip id='exName' type="dark" />
                        <div className="EvalFeedback pl-2">
                            <div className="ml-2">
                                <div className="pt-1">
                                    <RichTextEditor
                                        customStyles={{
                                            resize: 'none',
                                            boxShadow: 'none',
                                            height: 'auto',
                                        }}
                                        value={feedback?.feedback || ''}
                                        disabled={true}
                                        id={answer?.answer?._id}
                                    />
                                    </div>
                            </div>
                            {evals && <ol className="mt-3">
                                {evals.map((item: any) => item.evalMetricsFeedback !== evaluationMetricConstants.NOT_EVALUATED && (
                                    <li key={item.evalId} className="pb-2">
                                        <div className="d-flex justify-content-between">
                                            <div>{item.evalText}</div>
                                            <div>{evalMetricsValueMapper[item.evalMetricsFeedback]}</div>
                                        </div>
                                        {item.evalTextFeedback && <RichTextEditor
                                            disabled={true}
                                            id={item.evalId}
                                            value={`Comments ${item.evalTextFeedback}`}
                                            customStyles={{ resize: 'none', boxShadow: 'none', height: 'auto' }}
                                        />}
                                    </li>
                                ))}
                            </ol>}
                        </div>
                    </div>}
                </div>)
            })}
        </StyledAllAnswerSet>
    );
};

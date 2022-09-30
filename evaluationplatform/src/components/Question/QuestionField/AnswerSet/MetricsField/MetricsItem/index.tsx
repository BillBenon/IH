import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { evalMetricsValueMapper } from 'utilities/constants';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { Badge } from 'react-bootstrap';
import { getQuillContent } from 'utilities/helperFunctions';

const StyledMetricsItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  font-family: Khula;
  font-style: normal;
  font-size: 16px;
  .metric__item__index {
    font-weight: normal;
  }
  .metric__item__main {
    text-align: left;
    display: flex;
    justify-content: space-between;
  }
  .metric__item__question{
    font-size: 16px;
  }
  .metric__item__comment {
    .ql-editor{
      overflow-y: auto;
      white-space: pre-wrap;
      display: block;
      padding: 0.5rem;
      background: #e8e8e8;
      resize: vertical;
    }
    margin-top: 5px;
    font-weight: normal;
    text-align: left;
  }
  .metric__item__comment a {
    font-weight: bold;
  }
  .metric__item__comment>span{
    color: #5b94e3;
  }
  .metric__item__comment>div{
    white-space: pre-wrap;
    display: block;
  }
  .left-section {
    display: flex;
    flex-direction: row;
    width: 100%;
    font-size: 16px;
    margin: 0 10px 16px;
  }
  .right-section {
    display: flex;
    flex-direction: row;
  }
  .metric__item__answer {
    margin-left: 10px;
    color: #5b94e3;
    .badge{
      padding-top: 4px;
      padding-bottom: 0.5px;
      font-size:65%;
      background-color: #5b94e3 !important;
    }
  }
  .metric_item_content {
    width: 100%;
    margin-left: 10px;
  }
`;

interface IProps {
  idx: number;
  isShowAllComments: boolean;
  value: {
    evalMetricsFeedback: boolean;
    evalId: string;
    evalText: string;
    evalTextFeedback: string;
    hint: string;
    level: number;
    order: number;
    point: number;
  };
}



const QuestionAndCommentsSection: React.FC<any> = ({ value, idx, isShowComment, setShowComment }) => (
  <div className="left-section">
    <div className="metric__item__index">{idx + 1}.</div>
    <div className="metric_item_content">
      <div className="metric__item__main">
        <div className="metric__item__question">{value.evalText}</div>
        <div className="metric__item__answer">
          {evalMetricsValueMapper[value.evalMetricsFeedback]}{`  `}
          <Badge pill variant="primary">
            {`${evalMetricsValueMapper[value.evalMetricsFeedback] === evalMetricsValueMapper.PARTIALLY_KNOWS ? value.evalMetricsFeedbackValue :
              evalMetricsValueMapper[value.evalMetricsFeedback] === evalMetricsValueMapper.KNOWS ? 10 : 0}/10`}
          </Badge>
        </div>
      </div>
      <div className="metric__item__comment">
        {value.evalTextFeedback !== '' && isShowComment ? (<>
          {getQuillContent(value.evalTextFeedback) !== '' && (<><span>Comments: </span>
            <RichTextEditor
              disabled={true}
              id={`evalCommentRTE${value.evalId}`}
              value={value.evalTextFeedback || ''}
              customStyles={{ height: 'auto', boxShadow: 'none' }}
            /></>)}
        </>) : null}
      </div>
    </div>
  </div>
);

export const MetricsItem: React.FC<IProps> = (props) => {
  const [isShowComment, setShowComment] = useState(true);
  useEffect(() => {
    setShowComment(props.isShowAllComments);
  }, [props.isShowAllComments]);
  return (
    <StyledMetricsItem>
      <QuestionAndCommentsSection {...props} isShowComment={isShowComment} setShowComment={setShowComment} />
    </StyledMetricsItem>
  );
};

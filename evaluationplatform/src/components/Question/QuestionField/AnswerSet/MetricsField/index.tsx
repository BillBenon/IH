import { CollapseIcon, ExpandIcon } from 'assets';
import { MetricsItem } from 'components';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { evaluationMetricConstants } from 'utilities/constants';
import { talkToExpertService } from "services/talkToExpert";

const StyledMetrics = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: none;
  border-radius: 5px;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.25);
  width: -webkit-fill-available;
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  color: #000000;
  padding: 12px 15px;
  min-height: 191px;
  height: auto;
  box-sizing: border-box;
  background: #f3f3f3;
  &::placeholder {
    color: #949494;
    opacity: 1;
  }
  &:-ms-input-placeholder {
    color: #949494;
  }
  &::-ms-input-placeholder {
    color: #949494;
  }
  .metrics__header {
    margin-bottom: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
  .metrics__header div {
    font-family: Khula;
    font-style: normal;
    font-weight: bold;
    font-size: 25px;
    color: #000000;
  }
  .capability__feedback{
    width: 100%;
    margin-bottom: 16px;
  }
  .metrics__header button {
    background: #5b94e3;
    font-family: Khula;
    font-weight: bold;
    font-size: 15px;
    height: 36px;
    padding: 9px 15px;
    border-radius: 20px;
    margin-right: 100px;
  }
  .eval__capability__name{
    text-align: left;
    font-size: 1rem;
    font-family: Khula;
    margin-bottom: 10px
  }
  .eval__capability__name>img{
    margin-left: 10px;
    width: 12px;
    cursor: pointer;
  }
`;

interface IProps {
  feedback: any;
  capabilityId: string;
  isMeetingView?: boolean;
}

interface ICollapsibleCapabilityMetricProps {
  capabilityId: string,
  evals: Array<any>,
  isShowAllComments: boolean,
  isMeetingView?: boolean,
}

export const CollapsibleCapabiltyMetrics: React.FC<ICollapsibleCapabilityMetricProps> = ({ capabilityId, evals, isShowAllComments, isMeetingView }) => {
  const [isCapabilityMetricOpen, setIsCapabilityMetricOpen] = useState(false)
  const [capabiltyInfo, setCapabilityInfo] = useState<any>();
  const capabilities = useSelector((state: any) => state.evaluationPlatform?.currentTrack?.candidateTrack[0].capabilities);

  const getCapabilityInfo = (capabilityId: string) => {
    talkToExpertService.getCapabilityDetails(capabilityId).then((response: any) => setCapabilityInfo(response.output));
  }

  useEffect(() => {
    if (capabilityId) {
      if (isMeetingView) {
        getCapabilityInfo(capabilityId)
      } else {
        const cap = capabilities?.find((c: any) => c.capabilityId === capabilityId);
        setCapabilityInfo(cap);
      }
    }
  }, [capabilityId, isMeetingView])

  return evals.length > 0 ? (<div className="capability__feedback">
    <div className="eval__capability__name">
      {capabiltyInfo?.capabilityName || capabiltyInfo?.capabilityText}<img
        onClick={() => setIsCapabilityMetricOpen(!isCapabilityMetricOpen)}
        src={isCapabilityMetricOpen ? CollapseIcon : ExpandIcon}
        alt="description__icon"
      />
    </div>
    {isCapabilityMetricOpen && evals.map((item: any, idx: number) => (
      <MetricsItem value={item} key={idx} idx={idx} isShowAllComments={isShowAllComments} />)
    )}
  </div>) : null
}

export const MetricsField: React.FC<IProps> = (props) => {
  const [isShowAllComments, setShowAllComments] = useState(true);
  let filteredEvalMets = [];
  let collapsibleMetrics = props.feedback?.evaluatedCapabilities.map((cap: any, idx: any) => {
    filteredEvalMets = cap.evals.filter((ev: any) => ev?.evalMetricsFeedback !== evaluationMetricConstants.NOT_EVALUATED);
    return <CollapsibleCapabiltyMetrics
      key={idx}
      capabilityId={cap.capabilityId}
      isShowAllComments={isShowAllComments}
      evals={filteredEvalMets}
      isMeetingView={props.isMeetingView}
    />
  })
  if (!filteredEvalMets.length) {
    return null;
  }
  return (
    <StyledMetrics>
      <div className="metrics__header">
        <div>Evaluation Metrics</div>
        {/* <Button className="text--white text--bold" onClick={() => setShowAllComments(!isShowAllComments)}>
          {isShowAllComments ? 'Hide' : 'Show'} All Comments
        </Button> */}
      </div>
      {collapsibleMetrics}
    </StyledMetrics>
  );
};

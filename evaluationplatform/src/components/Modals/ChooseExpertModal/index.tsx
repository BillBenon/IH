import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { useQuestions } from 'components/Question/useQuestions';
import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { notEmpty } from 'utilities';
import { isProd } from 'utilities/constants';

const ChooseExpertModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .expertPlanFooter {
    font-size: 10px;
    color: ${props => props.theme.colors.secondary}
  }
`;
const ExpertCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  overflow: auto !important;

  max-height: 250px;
  width: 100%;

  border-style: solid;
  padding-left: 5px;
  border-color: #e5e5e5;
  border-width: 1px;

&::-webkit-scrollbar {
  width: 8px;
}
&::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}
&::-webkit-scrollbar-thumb {
  background: #888; 
  border-radius: 4px;

}
&::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  .toggle_profile_details {
    color: #5b94e3;
    font-size: 10px;
    position: absolute;
    right: 24px;
    font-family: Khula;
    bottom: 8px;
    cursor: pointer;
    z-index: 10;
  }
`;
const StyledExpertCard = styled.div`
  position: relative;
  width: 98%;
  background: white;
  padding: ${(props: any) => (!props.isExpanded ? '15px 15px 20px;' : '15px 15px 30px')};
  cursor: pointer;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  transition: 0.5s;
  flex-wrap: wrap;
  border: 1px solid #c3c3c3;
  .profile-icon {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    background-color: #5B94E3;
    display: inline-block;
    font-size: 20px;
    font-weight: 500;
    color: white;
    position: relative;
    text-align: center;
    border-radius: 100%;
    overflow: hidden;
    padding: 4px;
  }
  &:hover {
    opacity: 0.8;
    box-shadow: ${(props: any) => !props.isSelected && `0px 4px 15px rgba(0, 0, 0, 0.25)`};
  }

  ${(props: any) => props.isSelected && `box-shadow: inset 0px 0px 14px #5B94E3;`}

  .expert {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .primary {
      display: flex;
      align-items: center;

      .expert_company {
        font-size: 12px;
        color: ${props => props.theme.colors.secondary};
      }
    }

    .expert_profile_price {
      text-align: center;
    }

    .expert_profile_price .price {
      color: ${props => props.theme.colors.primary};
      font-weight: bold;
    }

    .expert_profile_price .price_info {
      font-size: 10px;
    }
    .expert_profile_price .price_iterations {
      font-size: 8px;
    }
  }

    .expert_profile_icon {
    }
    .expert_profile_icon img {
      width: 50px;
      height: auto;
      margin-right: 20px;
      margin-left: 10px;
    }
    .expert_profile_description {
      padding-bottom: 5px;
    }
  
    .expert_name {
      font-weight: bold;
    }
    .expert_description {
    }
  
    .expert_email {
      font-size: 13px;
    }
    .expert_profile_details {
      line-height: 16px;
      font-size: 14px;
      flex-basis: 100%;
      text-align: center;
      margin-top: 4px;
      padding-left: 35px;
      ${(props: any) =>
    !props.isExpanded
      ? `max-height:0px; transition: max-height .3s ease-in, opacity .4s ease-in;overflow:hidden;opacity:0;`
      : `max-height:300px;transition: max-height .3s ease-in, opacity .4s ease-in;opacity:1;`}
    }
`;
const StyledContentContainer = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
`;

const StyledFooterContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 15px 0;

  .cancel_btn {
    background: white;
    border-radius: 12px;
    border: 1px solid #ccc;
    margin-right: 10px;
    width: 100px;
    height: 30px;
    line-height: 0;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  }

  .submit_btn {
    background: white;
    border-radius: 12px;
    border: 1px solid #5b94e3;
    color: ${(props: any) => (props.selectedExpertId ? '#5b94e3' : 'white')};
    width: 104px;
    height: 30px;
    box-shadow: 0 1px 4px #5b94e3;
    &:hover{
      background: #5b94e3;
      color: white;
    }
    ${(props: any) =>
    !props.selectedExpertId &&
    `pointer-events:none;
      background:white;
      color: #838383;
      border:1px solid #838383;
      box-shadow:none;
      cursor:not-allowed;`}
  }

  .expertPlanFooter {
    font-size: 12px;
  }
`;

export const ChooseExpertModal = (props: any) => {
  const Modal = props.Modal;
  const [selectedExpertId, setSelectedExpertId] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const { isFullAccessPlan } = useQuestions();
  const [expertPlanInfo, setExpertPlanInfo] = useState('');

  const handleChooseExpert = (item: any) => {
    setScrollPosition(document.getElementById('expertContainer')?.scrollTop || 0)
    setSelectedExpertId(selectedExpertId === item._id ? '' : item._id);
    if (!isFullAccessPlan()) {
      if (item.priceInfo && item.ProductId && !item.paid) {
        setExpertPlanInfo(selectedExpertId === item._id ? '' : `*You will only be charged once per question and expert combination`);
      }
      else if (item.priceInfo && item.ProductId && item.paid) {
        setExpertPlanInfo('*You will not be charged for this question and expert');
      }
      else {
        setExpertPlanInfo('');
      }
    }
  }

  const handleSubmitResponse = () => {
    const expertIndex = props.experts.findIndex((e: any) => e._id === selectedExpertId);
    if (expertIndex >= 0) {
      if (!isFullAccessPlan()) {
        props.handleSubmitResponseToExpert(
          props.experts[expertIndex].ProductId,
          selectedExpertId,
          props.experts[expertIndex].priceInfo,
          props.experts[expertIndex].paid);
      } else {
        props.handleSubmitResponseToExpert(null, selectedExpertId, null, null);
      }
    }
  }

  const ChooseExpertHeader = () => {
    return (
      <StyledContentContainer>
        Select an Expert to get feedback for your response.
      </StyledContentContainer>
    );
  };

  const ExpertCard = (props: any) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div style={{ position: 'relative', margin: '8px 0', padding: '0 5px' }}>
        <StyledExpertCard {...props} isExpanded={isExpanded}>
          <div className="expert">
            <div className="primary">
              <div className="expert_profile_icon">
                <div className='profile-icon ml-1'>
                  {props.expert.fullname?.charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="expert_profile_description">
                <div className="expert_name">{props.expert.fullname}</div>
                {notEmpty(props.expert.workingAt) && <div className="expert_company">{`@${props.expert.workingAt}`}</div>}
              </div>
            </div>
            <div className="expert_profile_price">
              {props.expert.priceInfo
                && props.expert.ProductId
                && !props.expert.paid && <div className="expert-price">
                  <div className="price">{`$${props.expert.priceInfo}`}</div>
                  <div className="price_info">{`per question`}</div>
                  <div className="price_iterations">{`(for 2 iterations)`}</div>
                </div>
              }
            </div>
          </div>
          <div className="expert_profile_details">
            <RichTextEditor
              doNotAllowCopy={true}
              disabled={true}
              id={`expRTE-${props.expert.fullname}`}
              value={props.expert.profile}
              customStyles={{ background: 'white', height: 'auto', resize: 'none', boxShadow: 'none', minHeight: '0' }}
            />
            <br />
            {!isProd() && (
              <div className="expert_email">{props.expert.email}</div>
            )}
          </div>
        </StyledExpertCard>
        <div className="toggle_profile_details" onClick={() => {
          if (isExpanded)
            document.getElementById('expertContainer')?.scrollTo(0, scrollPosition)
          setIsExpanded(!isExpanded)
        }}>
          {isExpanded ? 'Close' : 'View'} Details
        </div>
      </div>
    );
  };

  const ChooseExpertContent = (childprops: any) => {
    useLayoutEffect(() => {
      document.getElementById('expertContainer')?.scrollTo(0, scrollPosition)
    }, [selectedExpertId])// eslint-disable-line
    return (
      <>
        { notEmpty(props.experts) && <ExpertCardContainer id="expertContainer">
          {props.experts?.map((item: any, idx: number) => {
            return (
              <ExpertCard
                key={idx}
                expert={item}
                onClick={(e: any) => handleChooseExpert(item)}
                isSelected={selectedExpertId === item._id}
              />
            );
          })}
        </ExpertCardContainer>}
      </>
    );
  };

  const ChooseExpertFooter = (props: any) => {
    return (
      <div>
        <div>
          <StyledFooterContainer {...props}>
            <button className="cancel_btn" onClick={closeExpertModal}>
              Cancel
        </button>
            <button
              className="submit_btn"
              onClick={() => {
                closeExpertModal();
                handleSubmitResponse();
              }}
            >
              Submit
        </button>
          </StyledFooterContainer>
        </div>
        <div>
          <span className="expertPlanFooter">{expertPlanInfo}</span>
        </div>
      </div>
    );
  };

  const closeExpertModal = () => {
    resetExpertModalData();
    props.hideChooseExpert();
  }

  const resetExpertModalData = () => {
    setSelectedExpertId('');
    setExpertPlanInfo('');
  }

  return (
    <Modal
      isOpen={props.openModal}
      onRequestClose={closeExpertModal}
      contentLabel="Choose Expert Modal"
      style={{
        overlay: {
          background: 'rgba(0, 0, 0, 0.44)',
          width: '100%',
          height: '100%',
          top: '0',
          left: '0',
          position: 'fixed',
        },
        content: {
          position: 'absolute',
          background: 'white',
          borderRadius: '10px',
          padding: '1em 2em',
          margin: 'auto',
          width: '450px',
          height: 'fit-content',
          overflow: 'none',
          top: '0',
          left: '0',
          bottom: '0',
          right: '0',
        },
      }}
    >
      <ChooseExpertModalContainer>
        <ChooseExpertHeader />
        <ChooseExpertContent
          handleSubmitResponseToExpert={props.handleSubmitResponseToExpert}
          hideChooseExpert={closeExpertModal}
        />
        <ChooseExpertFooter {...props} selectedExpertId={selectedExpertId} />
        {/* <ChooseExpertButton hideChooseExpert={props.hideChooseExpert} setShowHint={props.setShowHint} /> */}
      </ChooseExpertModalContainer>
    </Modal>
  );
};

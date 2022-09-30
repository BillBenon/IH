import { PatchCheckFill } from "@styled-icons/bootstrap/PatchCheckFill";
import { UserCircle } from "@styled-icons/boxicons-solid";
import { LocationPin } from "@styled-icons/entypo";
import { Email } from "@styled-icons/evaicons-solid";
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import React from 'react';
import { Button } from "react-bootstrap";
import styled from 'styled-components';

const ExpertCard = styled.div`
  .symbol {
    display: inline-block;
    flex-shrink: 0;
    position: relative;
    border-radius: 0.475rem
  }
  .text-hover-primary {
    transition: color .2s ease,background-color .2s ease;
    color: #009ef7!important;
    font-size: 1.5rem!important;
    font-weight: 600!important;
    margin-right: 0.25rem!important;
  }
  .svg-icon-primary {
    height: 1.2rem!important;
    width: 1.2rem!important;
    color: #009ef7;
  }
  .svg-icon {
    line-height: 1;
    color: #6c757d !important;
    font-size: 15px;
  }
  .text-gray-400 
    color: #b5b5c3!important;
    font-size: 15px;
  }
  .expert_profile {
    margin-right: 3rem !important;
    background-color: #dee2e6 !important;
    font-size: 3rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 160px;
    height: 160px;
    min-width: 160px;
    border-radius: 0.475rem;
  }
  .ql-editor {
    padding: 0px !important;
  }
    }
`;

type StyleType = {
  boxShadow: string;
  border?: string;
}

type ExpertCardType = {
  priceInfo?: string;
  ProductId?: string;
  paid?: boolean;
  isProfileExpanded: boolean;
  hoverEffect?: boolean;
  customStyle?: StyleType;
  photoURL?: string;
  expertCategory?: string;
  email?: string;
  expertId?: string;
  fullname: string;
  profile: string;
  roleType?: string;
  workingAt: string;
  onCtaAction?: any;
  ctaText?: string;
  ctaDisabled?: boolean;
}

const ExpertInfo = (props: ExpertCardType) => {

  return (
    <div style={{ position: 'relative', margin: '8px 0', padding: '0 5px' }}>
      <ExpertCard className="card mb-3 border-0">
        <div className="card-body">
          <div className="d-flex flex-wrap flex-sm-nowrap">
            {props.photoURL ? <img src={props.photoURL} alt={props.fullname} className="expert_profile" /> : <div className="expert_profile mr-5 mb-4">
              {props.fullname?.charAt(0).toUpperCase()}
            </div>}
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-hover-primary">{props.fullname}</div>
                    <span className="svg-icon-primary">
                      <PatchCheckFill />
                    </span>
                  </div>
                  <div className="d-flex flex-wrap fw-bold fs-6 mb-2 pr-3">
                    {props.expertCategory && <div className="d-flex align-items-center text-gray-400 mr-2 mb-2">
                      <span className="svg-icon mr-1">
                        <UserCircle height={"20px"} width={"20px"} className="mr-1" />
                        {props.expertCategory}
                      </span>
                    </div>}
                    {props.workingAt && <div className="d-flex align-items-center text-gray-400 mr-2 mb-2">
                      <span className="svg-icon mr-2">
                        <LocationPin height={"20px"} width={"20px"} className="mr-1" />
                        {props.workingAt}
                      </span>
                    </div>}
                    {props.email && <div className="d-flex align-items-center text-gray-400 mb-2">
                      <span className="svg-icon mr-2">
                        <Email height={"20px"} width={"20px"} className="mr-1" />
                        {props.email}
                      </span>
                    </div>}
                  </div>
                </div>
              </div>
              <div className="d-flex flex-wrap flex-stack">
                <RichTextEditor
                  doNotAllowCopy={true}
                  disabled={true}
                  id={`expRTE-${props.fullname}`}
                  value={props.profile}
                  customStyles={{ background: 'white', height: 'auto', resize: 'none', boxShadow: 'none', minHeight: '0' }}
                />
              </div>
              <div className="d-flex justify-content-end mt-2">
                {!!props.onCtaAction && !!props.ctaText && <Button disabled={props.ctaDisabled} onClick={props.onCtaAction}>{props.ctaText}</Button>}
              </div>
            </div>
          </div>
        </div>
      </ExpertCard>
    </div>
  );
};

export default ExpertInfo;
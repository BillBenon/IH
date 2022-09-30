import React from 'react';
import styled from 'styled-components';
import Tooltip from 'react-tooltip-lite';
import RichTextEditor from 'components/Common/Editors/RichTextEditor';
import { TrackEnrollType } from 'utilities/constants';

const StyledViewDetailContainer = styled.div`
  .ql-snow{
    background: white;
  }
`;

const StyledHeaderContainer = styled.div`
  font-size: 25px;
  font-weight: bold;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  position: relative;

  .modal_close_button {
    position: absolute;
    top: -11px;
    right: 0;
    cursor: pointer;
  }
  .modal_logo_img {
    width: 92px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16px;

    img {
      width: 100%;
      height: auto;
      font-size: 8px;
    }
  }

  .title {
    font-family: Khula;
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 26px;
    color: #000000;
  }
`;

const StyledDescription = styled.div`
  width: 100%;
  font-family: Khula;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.32px;
  color: #000000;
  margin-bottom: 16px;
`;

const StyledDetail = styled.div`
  width: 100%;
  font-family: Khula;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.32px;
  color: #000000;
  margin-bottom: 24px;
`;

const StyledCapabilityCapsule = styled.div`
  height: 24px;
  width: fit-content;
  background: #e5e0df;
  border-radius: 12px;
  font-family: IBM Plex Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 24px;
  letter-spacing: 0.62px;
  color: #000000;
  margin-right: 8px;
  margin-bottom: 8px;
  padding: 0 10px;
`;

const StyledCapabilities = styled.div`
  width: 100%;
  min-height: 50px;

  .capabilities_heading {
    font-family: Khula;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 0.16px;
    color: #000000;
    margin-bottom: 20px;
  }

  .capabilities_body {
    display: flex;
    flex-wrap: wrap;
  }
`;

export const ViewDetailModal = (props: any) => {
  const Modal = props.Modal;

  const ViewDetailHeader = (props: any) => {
    return (
      <StyledHeaderContainer>
        <div className="modal_close_button" onClick={props.onRequestClose}>
          &#10799;
        </div>
        <div className="modal_logo_img">
          <img src={props.icon || props.item?.logo} alt={props.item?.trackType || 'logo'} />
        </div>
        <div className="title">{props.item?.title || 'Dummy Title'}</div>
      </StyledHeaderContainer>
    );
  };

  const ViewDetailDescription = (props: any) => {
    return <StyledDescription>
      <RichTextEditor
        doNotAllowCopy={true}
        disabled={true}
        id={`tracksdetailRTE-${props.item?.trackId}`}
        value={props?.item?.description}
        customStyles={{ height: 'auto', resize: 'none', boxShadow: 'none' }}
      />
    </StyledDescription>;
  };

  const ViewDetailDetailed = (props: any) => {
    return <StyledDetail>
      <RichTextEditor
        doNotAllowCopy={true}
        disabled={true}
        id={`tracksdescRTE-${props.item?.trackId}`}
        value={`${props?.item?.detailsDescription}`}
        customStyles={{ height: 'auto', resize: 'none', boxShadow: 'none' }}
      />
    </StyledDetail>;
  };
  const CapabilityCapsule = (props: any) => {
    return (
      <Tooltip
        content={<RichTextEditor
          doNotAllowCopy={true}
          disabled={true}
          id={`capsuleDescRTE-${props.id}`}
          value={props.description}
          customStyles={{
            minHeight:'10px',
            maxHeight: '200px',
            height: 'auto',
            resize: 'none',
            boxShadow: 'none',
            background: '#222',
            color: '#fff'
          }}
        />}>
        <StyledCapabilityCapsule >
          {props.name || 'Sample'}
        </StyledCapabilityCapsule>
      </Tooltip>
    );
  };

  const ViewDetailCapabilities = (props: any) => {
    return (
      <StyledCapabilities>
        <div className="capabilities_heading">Capabilities you will be evaluated for</div>
        <div className="capabilities_body">
          {props.item?.capabilities?.map((capability: any) => (
            <CapabilityCapsule
              key={capability.id}
              id={capability.id}
              name={capability.name}
              description={capability.description}
            />
          ))}
        </div>
      </StyledCapabilities>
    );
  };

  return (
    <Modal
      isOpen={props.isShowViewModal}
      onRequestClose={props.setIsShowViewModal}
      contentLabel="Detailed Description"
      style={{
        overlay: {
          position: 'fixed',
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)',
        },
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          bottom: 'unset',
          border: '1px solid rgb(204, 204, 204)',
          background: 'white',
          overflow: 'auto',
          borderRadius: '8px',
          outline: 'none',
          height: '446px',
          width: '589px',
          padding: '24px',
        },
      }}
    >
      {' '}
      <StyledViewDetailContainer>
        <ViewDetailHeader item={props.item} onRequestClose={props.setIsShowViewModal} icon={props.icon} />
        <ViewDetailDescription item={props.item} />
        <ViewDetailDetailed item={props.item} />
        {props.item.trackEnrollType !== TrackEnrollType.mustBuy && <ViewDetailCapabilities item={props.item} />}
      </StyledViewDetailContainer>
    </Modal>
  );
};

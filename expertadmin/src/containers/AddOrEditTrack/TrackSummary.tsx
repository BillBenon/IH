import { Check } from '@styled-icons/boxicons-regular/Check';
import { AddButton } from 'components/AddButton';
import { BreadcrumbsContent } from 'components/Breadcrumbs';
import { ColShrink } from 'components/ColShrink';
import { BigSpan, NormalSpan, SmallSpan } from 'components/CommonStyles';
import { DisableButton } from 'components/DisableButton';
import { Heading } from 'components/Heading';
import { IconContainer } from 'components/IconContainer';
import { LoaderStyles } from 'components/LoaderStyles';
import { SearchButton } from 'components/SearchButton';
import { StatusIndicator } from 'components/StatusIndicator';
import { StyledLinkText } from 'components/StyledLinkText';
import { SuccessButton } from 'components/SuccessButton';
import { useAppHistory } from 'context/appHistory';
import { useAddOrEditTrack } from 'features/addOrEditTrack/useAddOrEditTrack';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { TrackErrors } from 'types';
import { isNumeric } from 'utils/commonutils';
import { ColorCode, Entity, MenuItems, Routes, View } from 'utils/constants';

const ValidationWrapper = styled(Row).attrs({
  className: 'pb-1',
})`
  border-bottom: 1px solid rgba(91, 148, 227, 0.2);
  height: 42px;
  align-items: flex-end;
`;

const SummaryFooter = styled.div`
  position: absolute;
  bottom: 0;
  right: 1rem;
  width: 100%;
  background: #fff;
`;

const SummaryWrapper = styled.div`
  overflow-y: auto;
  height: calc(100% - 3rem) !important;
`;

type TrackSummaryProps = {
  setActiveView: Function;
};

export const TrackSummary = ({ setActiveView }: TrackSummaryProps) => {
  const [waitForUpdateHierarchy, setWaitForUpdateHierarchy] = useState<boolean>(
    false
  );
  const { deleteHistory } = useAppHistory()!;
  const history = useHistory();
  const {
    params,
    trackSummary,
    getTrackSummary,
    updatingHierarchySuccess,
    updateBreadcrumbs,
    updateHierarchy,
    validateTrack,
    validatingTrack,
    validateTrackSuccess,
    validateTrackErrors,
    publishTrack,
    publishingTrack,
    publishTrackSuccess,
    initializeValidation,
  } = useAddOrEditTrack();
  const [errorCount, setErrorCount] = useState<number>(0);

  useEffect(() => {
    if (!isNumeric(params.id)) getTrackSummary();
    initializeValidation();
  }, [params.id]);

  const handleResolve = (entity: string, id: string) => {
    switch (entity) {
      case Entity.TRACK:
        setActiveView(View.TRACK);
        break;
      case Entity.QUESTION:
        setActiveView(View.EDITQUESTION, undefined, undefined, undefined, id);
        prepareOverviewBreadCrumb('Edit Question');
        break;
      case Entity.CAPABILITY:
        setActiveView(View.EDITCAPABILITY, undefined, undefined, id);
        prepareOverviewBreadCrumb('Edit Capability');
        break;
      case Entity.CATEGORY:
        if (!id) {
          setActiveView(View.CATEGORY);
          return;
        }
        setActiveView(View.SUBCATEGORY, id);
        prepareOverviewBreadCrumb('View Category');
        break;
      case Entity.SUBCATEGORY:
        setActiveView(View.VIEWSUBCATEGORY, undefined, id);
        prepareOverviewBreadCrumb('View Subcategory');
        break;
      default:
        setActiveView(View.TRACK);
        break;
    }
  };

  const prepareOverviewBreadCrumb = (title: string) => {
    const brcb: BreadcrumbsContent[] = [
      {
        title: 'Track Overview',
        action: () => setActiveView(View.TRACKSUMMARY),
      },
      { title },
    ];
    updateBreadcrumbs(brcb);
  };

  const checkAndValidateTrack = () => {
    if (updatingHierarchySuccess) {
      validateTrack();
    } else {
      setWaitForUpdateHierarchy(true);
      updateHierarchy();
    }
  };

  const handleClose = () => {
    deleteHistory(MenuItems.tracks, params.id);
    history.push(Routes[MenuItems.tracks]);
  };

  const setTrackComplete = () => {
    if (!validateTrackSuccess) return;
    publishTrack();
  };

  useEffect(() => {
    setErrorCount(
      validateTrackErrors
        ?.map((v) => v.errorMessage)
        ?.reduce((a, b) => {
          return a.concat(b);
        })?.length ?? 0
    );
  }, [validateTrackErrors]);

  useEffect(() => {
    if (updatingHierarchySuccess && waitForUpdateHierarchy) {
      validateTrack();
      setWaitForUpdateHierarchy(false);
    }
  }, [updatingHierarchySuccess]);

  return (
    <Row className="m-0 h-100">
      <Col className="pt-3 pb-3 pl-4 pr-4 h-100">
        <SummaryWrapper>
          <div className="mb-3 d-flex justify-content-between align-items-center">
            <Heading>{'Track Overview'}</Heading>
            {!!trackSummary?.state && (
              <StatusIndicator
                variant={trackSummary.state}
                text={trackSummary.state}
              />
            )}
          </div>
          <BeatLoader css={LoaderStyles} color={'#3694D7'} loading={false} />
          <div>
            <Row className="m-0 pb-3">
              <Col className="pl-0 pr-0">
                <div className="h3">{trackSummary?.title}</div>
                <SmallSpan
                  dangerouslySetInnerHTML={{
                    __html: trackSummary?.description ?? '',
                  }}
                ></SmallSpan>
              </Col>
            </Row>
            <Row className="m-0 pb-3">
              <ColShrink>
                <Col className="pl-0 pr-0">
                  <BigSpan>{trackSummary?.totalCapability}</BigSpan>
                </Col>
                <Col className="mt-1 pl-0 pr-0">
                  <SmallSpan>{'Capabilities attached'}</SmallSpan>
                </Col>
              </ColShrink>
              <ColShrink>
                <Col className="pl-0 pr-0">
                  <BigSpan>{trackSummary?.totalQuestion}</BigSpan>
                </Col>
                <Col className="mt-1 pl-0 pr-0">
                  <SmallSpan>{'Questions attached'}</SmallSpan>
                </Col>
              </ColShrink>
            </Row>
            <Row
              className="m-0 pb-3"
              style={{ borderTop: '1px solid rgba(91, 148, 227, 0.2)' }}
            >
              <Col className="pt-3 pb-3 pl-0 pr-0">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="h5 mb-0">{'Validate Track'}</div>
                    <SmallSpan>
                      {'Check track for any kind of errors'}
                    </SmallSpan>
                  </div>
                  <div className="mt-3 mb-3">
                    {!validateTrackSuccess &&
                      !(validateTrackErrors && validateTrackErrors.length) && (
                        <AddButton
                          style={{ marginRight: '.5rem' }}
                          type="button"
                          onClick={() => checkAndValidateTrack()}
                        >
                          {validatingTrack && (
                            <Spinner
                              className="mr-2"
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          )}
                          {validatingTrack ? 'Validating...' : 'Validate'}
                        </AddButton>
                      )}
                    {validateTrackSuccess &&
                      !(validateTrackErrors && validateTrackErrors.length) && (
                        <SuccessButton onClick={() => checkAndValidateTrack()}>
                          {validatingTrack && (
                            <Spinner
                              className="mr-2"
                              as="span"
                              animation="grow"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          )}
                          {validatingTrack && 'Validating...'}
                          {!validatingTrack && (
                            <IconContainer
                              style={{ fontSize: '20px' }}
                              color={'#16AB6B'}
                              icon={Check}
                            />
                          )}
                          {!validatingTrack && 'Validated'}
                        </SuccessButton>
                      )}
                    {validateTrackErrors && !!validateTrackErrors.length && (
                      <DisableButton onClick={() => checkAndValidateTrack()}>
                        {validatingTrack && (
                          <Spinner
                            className="mr-2"
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                        {validatingTrack ? 'Validating...' : 'Validate'}
                      </DisableButton>
                    )}
                  </div>
                </div>
                {validateTrackErrors && validateTrackErrors.length && (
                  <div className="h6 mb-0">{`Errors (${errorCount})`}</div>
                )}
                {validateTrackErrors?.map((error: TrackErrors) =>
                  error.errorMessage?.map((message) => (
                    <ValidationWrapper className="ml-0 mr-0" key={message}>
                      <Col
                        className="d-flex pl-0 pr-0 justify-content-between"
                        xs={12}
                      >
                        <div className="d-flex align-items-center">
                          {error.name && (
                            <NormalSpan
                              className="mr-2"
                              style={{ color: ColorCode[error.entity] }}
                            >
                              {error.name}
                            </NormalSpan>
                          )}
                          {error.name && <div className="mr-2 pb-1">{'|'}</div>}
                          <NormalSpan>{message}</NormalSpan>
                        </div>
                        <StyledLinkText
                          className="pr-2"
                          size={12}
                          color={'rgba(91, 148, 227, 1)'}
                          onClick={() => handleResolve(error.entity, error.id)}
                        >
                          {'Resolve'}
                        </StyledLinkText>
                      </Col>
                    </ValidationWrapper>
                  ))
                )}
              </Col>
            </Row>
          </div>
        </SummaryWrapper>
        <SummaryFooter>
          <Row className="m-0 mt-3">
            <Col className="pl-0 pr-0">
              <Col className="p-0 pb-3 d-flex flex-row-reverse">
                {!publishTrackSuccess && (
                  <SearchButton
                    onClick={() => setTrackComplete()}
                    disabled={
                      !(validateTrackSuccess && updatingHierarchySuccess)
                    }
                    type="button"
                    style={{ width: '138px', height: '48px' }}
                  >
                    {publishingTrack && (
                      <Spinner
                        className="mr-2"
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    )}
                    {publishingTrack ? 'Publishing...' : 'Publish Track'}
                  </SearchButton>
                )}
                {publishTrackSuccess && (
                  <SuccessButton style={{ pointerEvents: 'none' }}>
                    <IconContainer
                      style={{ fontSize: '20px' }}
                      color={'#16AB6B'}
                      icon={Check}
                    />
                    {'Published'}
                  </SuccessButton>
                )}
                <DisableButton
                  style={{ marginRight: '.5rem' }}
                  onClick={() => handleClose()}
                >
                  {'Close'}
                </DisableButton>
              </Col>
            </Col>
          </Row>
        </SummaryFooter>
      </Col>
    </Row>
  );
};

export default TrackSummary;
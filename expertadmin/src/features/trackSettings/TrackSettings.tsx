import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { BoldSpan, NormalSpan, SmallSpan } from 'components/CommonStyles';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { Grid } from 'components/Grid';
import { ImageCircle } from 'components/ImageCircle';
import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import { StatusIndicator } from 'components/StatusIndicator';
import { QuestionCardsView } from 'containers/Question/QuestionCardsView';
import { TrackSettingsFilters } from 'containers/TrackSettings/TrackSettingsFilters';
import { useAppHistory } from 'context/appHistory';
import { getAllTracks } from 'features/trackSettings/trackSettingsActions';
import { isEqual } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { GetResultForTrackSettingsRequest } from 'types';
import { DefaultPaginationCount, trackEnrollTypes, MenuItems, Routes } from 'utils/constants';
import { setPaginationFilter, setTrackLandingPagedetails } from './trackSettingsSlice';


const Card = styled(QuestionCardsView)``;

const EditLink = styled(Col).attrs({
  className: 'text-right',
})`
  display: none;
  ${Card}:hover & {
    display: block;
  }
`;

const TrackSettings: FC = () => {
  const dispatch = useAppDispatch();
  const { pushHistory } = useAppHistory();
  const history = useHistory();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const { expertId } = expert!;

  const { loading, tracks, totalTracks, filterRequest } = useSelector(
    (state: RootState) => state.trackSettings
  );

  const [prevRequest, setPrevRequest] = useState<
    GetResultForTrackSettingsRequest | undefined
  >();

  const setPaginationFilters = (skipCount: number) => {
    dispatch(setPaginationFilter({ skipCount }));
  }

  useEffect(() => {
    if (!isEqual(prevRequest, filterRequest)) {
      dispatch(getAllTracks({ ...filterRequest, expertId }));
      setPrevRequest(filterRequest);
    }
  }, [filterRequest]);

  const routeToAddOrEditTrack = (
    trackId: string,
    title: string
  ) => {
    pushHistory(MenuItems.trackSettings, trackId, { title });
    history.push(Routes[MenuItems.trackSettings] + `/${trackId}`);
  };

  const handleCellClick = (trackId: string) => {
    const track = tracks?.find((t: any) => t.trackId == trackId);
    if (!track) return;
    routeToAddOrEditTrack(
      trackId,
      track.title
    );
  };

  useEffect(() => {
    dispatch(setTrackLandingPagedetails())
  }, [])

  return (
    <>
      <TrackSettingsFilters />
      <Col>
        {!!totalTracks && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalTracks}
            skipcount={filterRequest.skipCount}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}
        {tracks?.map((track: any) => (
          <Card key={track.trackId}>
            <Row
              className="align-items-center"
              onDoubleClick={() => handleCellClick(track.trackId)}
            >
              <Col xs={5}>
                <div className="d-flex">
                  <div className="mr-3">
                    <ImageCircle
                      image={track.logo}
                      initials={track.title.charAt(0)}
                    />
                  </div>
                  <Grid>
                    <BoldSpan>{track.title}</BoldSpan>
                    <NormalSpan style={{ height: '45px', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: track.description }}></NormalSpan>
                  </Grid>
                </div>
              </Col>
              <Col xs={7}>
                <Row>
                  <Col xs={11}>
                    <Row>
                      <Col>
                        <StatusIndicator
                          variant={track.state}
                          text={track.state}
                        />
                        <SmallSpan>{'Status'}</SmallSpan>
                      </Col>
                      <Col>
                        <NormalSpan>{trackEnrollTypes[track.trackEnrollType]}</NormalSpan>
                        <SmallSpan>{'Entrollment Type '}</SmallSpan>
                      </Col>
                      <Col>
                        <NormalSpan>{track.visible ? 'Visible' : 'Hidden'}</NormalSpan>
                        <SmallSpan>{'Landing Page Visibility'}</SmallSpan>
                      </Col>
                      <Col>
                        <NormalSpan>
                          <Moment fromNow>{track.updatedDate}</Moment>
                        </NormalSpan>
                        <SmallSpan>{'Last modified'}</SmallSpan>
                      </Col>
                    </Row>
                  </Col>
                  <EditLink className="p-0" xs={1}>
                    <CustomStyledIcon
                      onClick={() => handleCellClick(track.trackId)}
                      height={'20px'}
                      color={'#5B94E3'}
                      icon={EditAlt}
                    />
                  </EditLink>
                </Row>
              </Col>
            </Row>
          </Card>
        ))}
        {!(tracks && tracks.length) && (
          <div className="h4 w-100 d-flex align-items-center justify-content-center">
            {'No Data'}
          </div>
        )}
        {!!totalTracks && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalTracks}
            skipcount={filterRequest.skipCount}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}
      </Col>
      <BeatLoader
        css={LoaderStyles}
        color={'#3694D7'}
        loading={loading}
      ></BeatLoader>
    </>
  );
};

export default TrackSettings;

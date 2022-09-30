import { EditAlt } from '@styled-icons/boxicons-solid/EditAlt';
import { Chip } from 'components/Chip';
import {
  BoldSpan,
  ChipWrapper,
  NormalSpan,
  SmallSpan,
} from 'components/CommonStyles';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { Grid } from 'components/Grid';
import { ImageCircle } from 'components/ImageCircle';
import { ImageGroup } from 'components/ImageGroup';
import { LoaderStyles } from 'components/LoaderStyles';
import { Paginator } from 'components/Paginator';
import { StatusIndicator } from 'components/StatusIndicator';
import { QuestionCardsView } from 'containers/Question/QuestionCardsView';
import { TrackFilters } from 'containers/Track/TrackFilters';
import { isEmpty, isEqual } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Moment from 'react-moment';
import { useLocation } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';
import { GetResultForTrackRequest, Track } from 'types';
import { DefaultPaginationCount } from 'utils/constants';
import { initialTrackFilter } from 'utils/defaults';

import { useTracks } from './useTracks';

const Card = styled(QuestionCardsView)``;

const EditLink = styled(Col).attrs({
  className: 'text-right',
})`
  display: none;
  ${Card}:hover & {
    display: block;
  }
`;

const Tracks: FC = () => {
  const [
    {
      fetchTracks,
      setPaginationFilters,
      setTrackFilter,
      tracks,
      totalTracks,
      loading,
      filterRequest,
      routeToAddOrEditTrack,
    },
  ] = useTracks();
  const { search } = useLocation();
  const [prevRequest, setPrevRequest] = useState<
    GetResultForTrackRequest | undefined
  >();
  useEffect(() => {
    if (!isEqual(prevRequest, filterRequest)) {
      fetchTracks();
      setPrevRequest(filterRequest);
    }
  }, [filterRequest]);

  const handleCellClick = (trackId: string) => {
    routeToAddOrEditTrack(
      false,
      trackId,
      tracks?.find((cap) => cap.trackId == trackId)?.title
    );
  };

  useEffect(() => {
    const params: any = queryString.parse(search);
    if (!isEmpty(params)) {
      setTrackFilter(params);
    } else {
      setTrackFilter(initialTrackFilter);
    }
  }, [search]);

  return (
    <>
      <TrackFilters />
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
        {tracks?.map((track: Track) => (
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
                    <ChipWrapper>
                      <Chip
                        key={track.market}
                        variant={'Market'}
                        text={track.market}
                      />
                      <Chip
                        key={track.trackType}
                        variant={'TrackType'}
                        text={track.trackType}
                      />
                    </ChipWrapper>
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
                        <NormalSpan>
                          <ImageGroup
                            images={track.expertIds.map((e) => {
                              return {
                                id: e.expertId,
                                url: e.logo,
                                text: e.fullname,
                              };
                            })}
                          />
                        </NormalSpan>
                        <SmallSpan>{'Experts Attached'}</SmallSpan>
                      </Col>
                      <Col>
                        <NormalSpan>{track.createdBy}</NormalSpan>
                        <SmallSpan>{'Created by'}</SmallSpan>
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

export default Tracks;

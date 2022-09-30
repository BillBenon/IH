import { AddButton } from 'components/AddButton';
import { FilterInput } from 'components/FilterInput';
import { SearchButton } from 'components/SearchButton';
import { useAppHistory } from 'context/appHistory';
import { useTracks } from 'features/tracks/useTracks';
import { isEmpty } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GetResultForTrackRequest } from 'types';
import { MenuItems, Routes } from 'utils/constants';
import { initialTrackFilter } from 'utils/defaults';

export const TrackFilters: FC = () => {
  const history = useHistory();
  const { pushHistory } = useAppHistory();
  const { search } = useLocation();
  const [{ loading, filterRequest, routeToAddOrEditTrack }] = useTracks();
  const {
    handleSubmit,
    register,
    setValue,
  } = useForm<GetResultForTrackRequest>({
    defaultValues: filterRequest,
  });

  useEffect(() => {
    let params: any = queryString.parse(search);
    params = isEmpty(params) ? initialTrackFilter : params;
    Object.keys(params).forEach((key: string) => {
      setValue(
        key,
        params[key] === 'true'
          ? true
          : params[key] === 'false'
          ? false
          : params[key]
      );
    });
  }, [search]);

  const handleTrackFilter = (request: GetResultForTrackRequest) => {
    const { title, description, detailsDescription } = request;
    const param = `?title=${title ?? ''}&description=${
      description ?? ''
    }&detailsDescription=${detailsDescription ?? ''}`;
    history.push(Routes[MenuItems.tracks] + `${param}`);
    pushHistory(MenuItems.tracks, param, '');
  };

  return (
    <Form
      style={{ padding: '10px' }}
      onSubmit={handleSubmit(handleTrackFilter)}
    >
      <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
        <Col md={6} lg={6} sm={12} className="d-flex pl-0">
          <Col className="mr-0 pr-0" xl={5}>
            <FilterInput
              ref={register}
              name="title"
              type="text"
              placeholder="Search Track"
            />
          </Col>
          <Col xl={2}>
            <SearchButton
              disabled={loading}
              type="submit"
              style={{ width: '90px' }}
            >
              {'Search'}
            </SearchButton>
          </Col>
        </Col>
        <Col md={6} lg={6} sm={12} className="d-flex flex-row-reverse pr-0">
          <AddButton
            style={{ marginRight: '.5rem' }}
            disabled={loading}
            type="button"
            onClick={() => routeToAddOrEditTrack(true)}
          >
            {'+ Add Track'}
          </AddButton>
        </Col>
      </Row>
    </Form>
  );
};

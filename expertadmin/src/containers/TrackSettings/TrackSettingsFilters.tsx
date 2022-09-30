import { Plus } from '@styled-icons/boxicons-regular';
import { RootState } from 'app/rootReducer';
import { useAppDispatch } from 'app/store';
import { FilterInput } from 'components/FilterInput';
import { IconContainer } from 'components/IconContainer';
import { SearchButton } from 'components/SearchButton';
import { StyledSelect } from 'components/StyledSelect';
import { useAppHistory } from 'context/appHistory';
import { createTrackLandingPageDetail, getTracksForComboBox } from 'features/trackSettings/trackSettingsActions';
import { setTrackInputFilter } from 'features/trackSettings/trackSettingsSlice';
import { isEmpty } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { GetResultForTrackSettingsRequest, TrackSettingsFilter } from 'types';
import { MenuItems, Routes } from 'utils/constants';
import { initialTrackSettingsFilter } from 'utils/defaults';

export const TrackSettingsFilters: FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<string>();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { pushHistory } = useAppHistory();
  const expert = useSelector((state: RootState) => state.auth.expert);
  const { expertId } = expert!;
  const { search } = useLocation();
  const { loading, tracksForCombobox, filterRequest } = useSelector(
    (state: RootState) => state.trackSettings
  );

  const {
    handleSubmit,
    register,
    setValue,
  } = useForm<GetResultForTrackSettingsRequest>({
    defaultValues: filterRequest,
  });

  const setTrackFilter = (request: TrackSettingsFilter) => {
    const { textToSearch, description, detailsDescription } = request;
    dispatch(setTrackInputFilter({ textToSearch, description, detailsDescription }));
  };

  useEffect(() => {
    let params: any = queryString.parse(search);
    params = isEmpty(params) ? initialTrackSettingsFilter : params;
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

  const createTrackLandingPage = async () => {
    if (!selectedTrack) return;
    const output: any = await dispatch(createTrackLandingPageDetail({ trackId: selectedTrack, expertId }));
    output?.payload?.data?.output && routeToAddOrEditTrack(output.payload.data.output.trackId, output.payload.data.output.title.value)
  }

  const routeToAddOrEditTrack = (
    trackId: string,
    textToSearch: string
  ) => {
    pushHistory(MenuItems.trackSettings, trackId, { textToSearch });
    history.push(Routes[MenuItems.trackSettings] + `/${trackId}`);
  };

  const handleTrackFilter = (request: GetResultForTrackSettingsRequest) => {
    const { textToSearch, description, detailsDescription } = request;
    const param = `?textToSearch=${textToSearch ?? ''}&description=${description ?? ''
      }&detailsDescription=${detailsDescription ?? ''}`;
    history.push(Routes[MenuItems.trackSettings] + `${param}`);
    pushHistory(MenuItems.tracks, param, '');
  };

  useEffect(() => {
    const params: any = queryString.parse(search);
    if (!isEmpty(params)) {
      setTrackFilter(params);
    } else {
      setTrackFilter(initialTrackSettingsFilter);
    }
  }, [search]);

  useEffect(() => {
    dispatch(getTracksForComboBox({ expertId }));
  }, []);

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
              name="textToSearch"
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
          <SearchButton
            style={{ marginLeft: '.5rem', paddingLeft: '1rem', paddingRight: '1rem' }}
            disabled={loading}
            type="button"
            onClick={() => createTrackLandingPage()}
          >
            <IconContainer color={'#FFF'} icon={Plus} />
          </SearchButton>
          <StyledSelect
            custom
            defaultValue={""}
            placeholder={'Add New Tracks In Landing Page'}
            name={'Tracks'}
            onChange={(event: any) => setSelectedTrack(event.target.value)}
          >
            <option value={undefined || ''}>{'Add New Tracks In Landing Page'}</option>
            {tracksForCombobox?.length &&
              tracksForCombobox.map((opt: any) => (
                <option key={opt.trackId} value={opt.trackId}>
                  {opt.title}
                </option>
              ))}
          </StyledSelect>
        </Col>
      </Row>
    </Form>
  );
};

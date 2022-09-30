import { AddButton } from 'components/AddButton';
import { FilterInput } from 'components/FilterInput';
import { SearchButton } from 'components/SearchButton';
import { useAppHistory } from 'context/appHistory';
import { useExperts } from 'features/experts/useExperts';
import { isEmpty } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import {
  GetExpertsRequest, GetResultsForExpertSearchReq,
} from 'types';
import { MenuItems, RoleType, Routes } from 'utils/constants';
import { initialExpertFilter } from 'utils/defaults';

export const ExpertFilters: FC = () => {
  const history = useHistory();
  const { pushHistory } = useAppHistory();
  const { search } = useLocation();
  const [
    {
      loading,
      filterRequest,
      // experts,
      routeToAddOrEditExpert,
    },
  ] = useExperts();
  const {
    handleSubmit,
    register,
    setValue,
  } = useForm<GetExpertsRequest>({
    defaultValues: filterRequest,
  });

  useEffect(() => {
    let params: any = queryString.parse(search);
    params = isEmpty(params) ? initialExpertFilter : params;
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

  const handleExpertFilter = (request: GetResultsForExpertSearchReq) => {
    const {
      fullname,
      email,
      roleType
    } = request;
    const param = `?fullname=${fullname}&email=${email}&roleType=${roleType}`;
    history.push(Routes[MenuItems.experts] + `${param}`);
    pushHistory(MenuItems.experts, param, '');
  };
  return (
    <Form
      style={{ padding: '10px' }}
      onSubmit={handleSubmit(handleExpertFilter)}
    >
      <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
        <Col md={9} lg={9} sm={12} className="d-flex pl-0">
          <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
            <FilterInput
              ref={register}
              name="fullname"
              type="text"
              placeholder="Expert full name"
            />
          </Col>
          <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
            <FilterInput
              ref={register}
              name="email"
              type='text'
              placeholder="Expert email"/>
          </Col>
          <Col className="mr-0 pr-0" md={2} lg={2} sm={5}>
            <FilterInput
              ref={register}
              name="roleType"
              as="select"
              placeholder="Exprt Role Type"
            >
              <option value={''}>{'RoleType'}</option>
              {RoleType?.map(
                (data) => (
                  <option key={data.label} value={data.value}>
                    {data.label}
                  </option>
                )
              )}
            </FilterInput>
          </Col>
          <Col md={2} lg={2} sm={2}>
            <SearchButton
              disabled={loading}
              type="submit"
              style={{ width: '90px' }}
            >
              {'Search'}
            </SearchButton>
          </Col>
        </Col>
        <Col md={3} lg={3} sm={12} className="d-flex flex-row-reverse pr-0">
          <AddButton
            style={{ marginRight: '.5rem' }}
            disabled={loading}
            type="button"
            onClick={() => routeToAddOrEditExpert(true)}
          >
            {'+ Add Expert'}
          </AddButton>
        </Col>
      </Row>
    </Form>
  );
};
import { ViewList } from '@styled-icons/heroicons-outline/ViewList';
import { VerticalSplit } from '@styled-icons/material-rounded/VerticalSplit';
import { AddButton } from 'components/AddButton';
import { CustomStyledIcon } from 'components/CustomStyledIcon';
import { FilterInput } from 'components/FilterInput';
import { SearchButton } from 'components/SearchButton';
import { StyledRadio } from 'components/StyledRadio';
import { useAppHistory } from 'context/appHistory';
import { SmallSpan } from 'components/CommonStyles';
import { useQuestions } from 'features/questions/useQuestions';
import { isEmpty } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GetResultForQuestionRequest } from 'types';
import { LastModifiedDates, MenuItems, Routes } from 'utils/constants';
import { initialQuestionFilter } from 'utils/defaults';

export const QuestionFilters: FC = () => {
  const history = useHistory();
  const { pushHistory } = useAppHistory();
  const { search } = useLocation();
  const [
    { routeToAddOrEditQuestion, updateView, loading, view, filterRequest },
  ] = useQuestions();
  const {
    handleSubmit,
    register,
    setValue,
  } = useForm<GetResultForQuestionRequest>({
    defaultValues: filterRequest,
  });

  useEffect(() => {
    let params: any = queryString.parse(search);
    params = isEmpty(params) ? initialQuestionFilter : params;
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

  const handleQuestionFilter = (request: GetResultForQuestionRequest) => {
    const {
      textToSearch,
      searchInTitle,
      searchInDescription,
      updatedDateFrom,
    } = request;
    const param = `?textToSearch=${textToSearch}&searchInTitle=${searchInTitle}&searchInDescription=${searchInDescription}&updatedDateFrom=${updatedDateFrom}`;
    history.push(Routes[MenuItems.questions] + `${param}`);
    pushHistory(MenuItems.questions, param, '');
  };

  return (
    <Form
      style={{ padding: '10px' }}
      onSubmit={handleSubmit(handleQuestionFilter)}
    >
      <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
        <Col md={6} lg={6} sm={12} className="d-flex pl-0">
          <Col className="mr-0 pr-0" md={5} lg={5} sm={5}>
            <FilterInput
              ref={register}
              name="textToSearch"
              type="text"
              placeholder="Search"
            />
          </Col>
          <Col className="mr-0 pr-0" md={5} lg={5} sm={5}>
            <FilterInput
              ref={register}
              name="updatedDateFrom"
              as="select"
              placeholder="Last Modified"
            >
              <option value={''}>{'All'}</option>
              {LastModifiedDates?.map((data: any) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
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
        <Col
          md={6}
          lg={6}
          sm={12}
          className="d-flex flex-row-reverse align-items-center"
        >
          <AddButton
            style={{ marginRight: '.5rem' }}
            disabled={loading}
            type="button"
            onClick={() => routeToAddOrEditQuestion(true)}
          >
            {'+ Add Question'}
          </AddButton>
          <Col className="d-flex justify-content-end align-items-center">
            <SmallSpan>{'View: '}</SmallSpan>
            <CustomStyledIcon
              onClick={() => updateView('list')}
              color={view === 'list' ? '#5B94E3' : '#C4C4C4'}
              icon={ViewList}
              text={'List'}
            />
            <CustomStyledIcon
              onClick={() => updateView('side')}
              color={view === 'side' ? '#5B94E3' : '#C4C4C4'}
              icon={VerticalSplit}
              text={'Side by side'}
            />
          </Col>
        </Col>
      </Row>
      <Row className="d-flex pl-0 mr-0 ml-0">
        <Col md={4} lg={4} sm={12} className="d-flex pl-0 small">
          <Col
            md={2}
            lg={2}
            sm={6}
            className="mr-2"
            style={{ lineHeight: '23px' }}
          >
            <StyledRadio className="mr-4"
              color="red"
              style={{ color: 'rgba(0, 0, 0, 0.56)' }}
              aria-setsize={30}
              ref={register}
              name="searchInTitle"
              type="checkbox"
              label="Title"
            />
          </Col>
          <Col
            md={2}
            lg={2}
            sm={3}
            className="mr-2"
            style={{ lineHeight: '23px' }}
          >
            <StyledRadio className="mr-4"
              style={{ color: 'rgba(0, 0, 0, 0.56)' }}
              ref={register}
              name="searchInDescription"
              type="checkbox"
              label="Description"
            />
          </Col>
        </Col>
      </Row>
    </Form>
  );
};

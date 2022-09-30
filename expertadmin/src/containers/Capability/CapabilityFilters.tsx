import { AddButton } from 'components/AddButton';
import { FilterInput } from 'components/FilterInput';
import { SearchButton } from 'components/SearchButton';
import { StyledRadio } from 'components/StyledRadio';
import { useAppHistory } from 'context/appHistory';
import { useCapabilities } from 'features/capabilities/useCapabilities';
import { isEmpty } from 'lodash';
import queryString from 'query-string';
import React, { FC, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import {
  GetCapabilitiesRequest,
  SubCategory,
  GetAllCategoriesAndSubCategoriesResponse,
} from 'types';
import { LastModifiedDates, MenuItems, Routes } from 'utils/constants';
import { initialCapabilityFilter } from 'utils/defaults';

export const CapabilityFilters: FC = () => {
  const history = useHistory();
  const { pushHistory } = useAppHistory();
  const { search } = useLocation();
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [
    {
      loading,
      filterRequest,
      categorySubcategoryList,
      capabilities,
      getAllCategoriesAndSubCategories,
      routeToAddOrEditCapability,
    },
  ] = useCapabilities();
  const {
    handleSubmit,
    register,
    setValue,
    getValues,
  } = useForm<GetCapabilitiesRequest>({
    defaultValues: filterRequest,
  });

  useEffect(() => {
    let params: any = queryString.parse(search);
    params = isEmpty(params) ? initialCapabilityFilter : params;
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

  const handleCapabilityFilter = (request: GetCapabilitiesRequest) => {
    const {
      textToSearch,
      searchInTitle,
      searchInDescription,
      updatedDateFrom,
      categoryId,
      subCategoryId,
      subcategoryCheck,
    } = request;
    const param = `?textToSearch=${textToSearch}&searchInTitle=${searchInTitle}&searchInDescription=${searchInDescription}&updatedDateFrom=${updatedDateFrom}&categoryId=${categoryId}&subCategoryId=${subCategoryId}&subcategoryCheck=${subcategoryCheck}`;
    history.push(Routes[MenuItems.capabilities] + `${param}`);
    pushHistory(MenuItems.capabilities, param, '');
  };

  useEffect(() => getAllCategoriesAndSubCategories(), []);

  useEffect(() => {
    if (categorySubcategoryList?.length) {
      const subcategories = categorySubcategoryList
        .map((cat) => cat.subCategories)
        .reduce((cat1, cat2) => cat1.concat(cat2));
      setSubCategories(subcategories);
    }
  }, [categorySubcategoryList]);

  useEffect(() => {
    const categoryId = getValues('categoryId');
    const subCategoryId = getValues('subCategoryId');
    !categoryId && setValue('categoryId', filterRequest.categoryId);
    !subCategoryId && setValue('subCategoryId', filterRequest?.subCategoryId);
  }, [capabilities]);

  const handleCategoryChange = () => {
    const categoryId = getValues('categoryId');
    const subCategories = categorySubcategoryList.find(
      (cat) => cat.categoryId == categoryId
    )?.subCategories;
    if (subCategories?.length) setSubCategories(subCategories);
  };

  return (
    <Form
      style={{ padding: '10px' }}
      onSubmit={handleSubmit(handleCapabilityFilter)}
    >
      <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
        <Col md={9} lg={9} sm={12} className="d-flex pl-0">
          <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
            <FilterInput
              ref={register}
              name="textToSearch"
              type="text"
              placeholder="Search"
            />
          </Col>
          <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
            <FilterInput
              ref={register}
              name="updatedDateFrom"
              as="select"
              placeholder="Last Modified"
            >
              <option value={''}>{'Last Modified'}</option>
              {LastModifiedDates?.map((data: any) => (
                <option key={data.id} value={data.id}>
                  {data.name}
                </option>
              ))}
            </FilterInput>
          </Col>
          <Col className="mr-0 pr-0" md={2} lg={2} sm={5}>
            <FilterInput
              ref={register}
              name="categoryId"
              as="select"
              placeholder="Category"
              onChange={handleCategoryChange}
            >
              <option value={''}>{'Category'}</option>
              {categorySubcategoryList?.map(
                (data: GetAllCategoriesAndSubCategoriesResponse) => (
                  <option key={data.categoryId} value={data.categoryId}>
                    {data.title}
                  </option>
                )
              )}
            </FilterInput>
          </Col>
          <Col className="mr-0 pr-0" md={2} lg={2} sm={5}>
            <FilterInput
              ref={register}
              name="subCategoryId"
              as="select"
              placeholder="Sub-Category"
            >
              <option value={''}>{'Sub-Category'}</option>
              {subCategories?.map((data: SubCategory, index: number) => (
                <option
                  key={data?.subCategoryId + index}
                  value={data?.subCategoryId}
                >
                  {data.title}
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
        <Col md={3} lg={3} sm={12} className="d-flex flex-row-reverse pr-0">
          <AddButton
            style={{ marginRight: '.5rem' }}
            disabled={loading}
            type="button"
            onClick={() => routeToAddOrEditCapability(true)}
          >
            {'+ Add Capability'}
          </AddButton>
        </Col>
      </Row>
      <Row className="d-flex pl-0 mr-0 ml-0">
        <Col md={5} lg={5} sm={12} className="d-flex pl-0 small">
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
            md={3}
            lg={3}
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
          <Col
            md={5}
            lg={5}
            sm={3}
            className="mr-2"
            style={{ lineHeight: '23px' }}
          >
            <StyledRadio className="mr-4"
              style={{ color: 'rgba(0, 0, 0, 0.56)' }}
              ref={register}
              name="subcategoryCheck"
              type="checkbox"
              label="Match Subcategory"
            />
          </Col>
        </Col>
      </Row>
    </Form>
  );
};

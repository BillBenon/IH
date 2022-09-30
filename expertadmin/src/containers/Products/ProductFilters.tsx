import { AddButton } from "components/AddButton";
import { FilterInput } from "components/FilterInput";
import { SearchButton } from "components/SearchButton";
import { useProducts } from "features/products/useProducts";
import { useAppHistory } from "context/appHistory";

import React, { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ProductFilter, ProductRequest } from "types";
import { subProductTypes, productTypes } from "utils/constants";
import { MenuItems, Routes } from "utils/constants";

export const ProductFilters: FC = () => {
  const history = useHistory();
  const { pushHistory } = useAppHistory();

  const [
    {
      loading,
      filterRequest,
      productType,
      // experts,
      routeToAddOrEditProduct,
      setPaginationFilters,
      changeProductTypeD,
    },
  ] = useProducts();
  const { handleSubmit, register } = useForm<ProductRequest>({
    defaultValues: filterRequest,
  });

  const handleProductFilter = (request: ProductFilter) => {
    setPaginationFilters(0);
    const { productName, subProductType, productType } = request;
    const param = `?productName=${productName}&subProductType=${subProductType}&productType=${productType}`;
    history.push(Routes[MenuItems.products] + `${param}`);
    pushHistory(MenuItems.products, param, "");
    // fetchProductsSearch({...request,offset:0,limit:10});
  };
  return (
    <Form
      style={{ padding: "10px" }}
      onSubmit={handleSubmit(handleProductFilter)}
    >
      <Row className="mt-2 d-flex pl-0 mr-0 ml-0">
        <Col md={9} lg={9} sm={12} className="d-flex pl-0">
          <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
            <FilterInput
              ref={register}
              name="productName"
              type="text"
              placeholder="Product  Name"
            />
          </Col>

          <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
            <FilterInput
              ref={register}
              name="productType"
              as="select"
              placeholder="Product Type"
              onChange={(event: any) => changeProductTypeD(event.target.value)}
            >
              <option value="">{'Product Type'}</option>
              {productTypes?.map((data) => (
                <option key={data.label} value={data.value}>
                  {data.label}
                </option>
              ))}
            </FilterInput>
          </Col>

          <Col className="mr-0 pr-0" md={3} lg={3} sm={5}>
            <FilterInput
              ref={register}
              name="subProductType"
              as="select"
              placeholder=" Sub Product Type"
            >
              <option value="none">{'Sub-Product Type'}</option>
              {subProductTypes
                .filter((ele: any) => ele.parent === productType)
                .map((opt: any) => (
                  <option key={opt.label} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
            </FilterInput>
          </Col>
          <Col md={2} lg={2} sm={2}>
            <SearchButton
              disabled={loading}
              type="submit"
              style={{ width: "90px" }}
            >
              {"Search"}
            </SearchButton>
          </Col>
        </Col>

        <Col md={3} lg={3} sm={12} className="d-flex flex-row-reverse pr-0">
          <AddButton
            style={{ marginRight: ".5rem" }}
            disabled={loading}
            type="button"
            onClick={() => routeToAddOrEditProduct(true)}
          >
            {"+ Add Product"}
          </AddButton>
        </Col>
      </Row>
    </Form>
  );
};

import { EditAlt } from "@styled-icons/boxicons-solid/EditAlt";
import { EllipsedSpan } from "components/CommonStyles";
import { CustomStyledIcon } from "components/CustomStyledIcon";
import { TableStyles } from "components/TableStyles";
import { DataTable } from "containers/Common/DataTable";
import { ProductFilters } from "containers/Products/ProductFilters";
import { Paginator } from "components/Paginator";
import { isEmpty } from "lodash";
import queryString from "query-string";
import React, { FC, useEffect } from "react";
import { useProducts } from "./useProducts";
import { useLocation } from "react-router-dom";

export const DefaultPaginationCount = 10;

const columns = [
  {
    Header: "Display Name",
    accessor: "displayName",
    Cell: function cell(data: any) {
      return <EllipsedSpan>{data.cell.value}</EllipsedSpan>;
    },
    style: {
      width: "24%",
    },
  },
  {
    Header: "Display Description",
    accessor: "displayDescription",
    Cell: function cell(data: any) {
      return (
        <EllipsedSpan>
          {data.cell.value.replace(/<\/?[^>]+(>|$)/g, "")}
        </EllipsedSpan>
      );
    },
    style: {
      width: "20%",
    },
  },
  {
    Header: "Plan-Name",
    accessor: "planName",
  },
  {
    Header: "Product-Type",
    accessor: "productType",
  },
  {
    Header: "Sub-Type",
    accessor: "subProductType",
  },
  {
    Header: "Status",
    accessor: "active",
    Cell: (field: any) => {
      if (field.value) return "ACTIVE";

      return "INACTIVE";
    },
  },
  {
    Header: "Edit",
    accessor: "id",
    Cell: () => {
      return (
        <CustomStyledIcon height={"20px"} color={"#5B94E3"} icon={EditAlt} />
      );
    },
    style: {
      width: "5%",
    },
  },
];

const Products: FC = () => {
  const { search } = useLocation();

  const [
    {
      loading,
      fetchProducts,
      products,
      setPaginationFilters,
      totalProducts,
      filterRequest,
      routeToAddOrEditProduct,
      fetchProductsSearch,
    },
  ] = useProducts();

  const handleCellClick = (Id: string) => {
    routeToAddOrEditProduct(
      false,
      Id,
      products?.find((cap) => cap.id == Id)?.displayName
    );
  };
  /*
  useEffect(() => {
    fetchProducts();
  }, [filterRequest]);
  */

  useEffect(() => {
    const params: any = queryString.parse(search);
    if (!isEmpty(params)) {
      fetchProductsSearch(params);
    } else {
      fetchProducts();
    }
  }, [search, filterRequest]);

  return (
    <>
      <ProductFilters />
      <TableStyles>
        {!!totalProducts && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalProducts}
            skipcount={filterRequest.offset}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}

        <DataTable
          columns={columns}
          data={products}
          loading={loading}
          cellClickFunc={handleCellClick}
          idKey="id"
          hiddenColumns={[]}
        />

        {!!totalProducts && (
          <Paginator
            count={DefaultPaginationCount}
            total={totalProducts}
            skipcount={filterRequest.offset}
            onAction={setPaginationFilters}
            loading={loading}
          />
        )}
      </TableStyles>
    </>
  );
};

export default Products;

import React from 'react';
import { EditProductData } from "types";

type ProductListContainerType = {
    productList: EditProductData[]
}

export const ProductListContainer = (props: ProductListContainerType) => {
    const { productList } = props;
    return <>{(productList.length > 0 ? productList.map((ele: any) => (
        <ul key={ele._id} style={{ border: "1px solid black" }}>
            <li style={{ display: "flex" }}><span style={{ fontSize: "10px" }}><strong> Product Name:</strong> {ele.displayName}  </span>  <br></br>
            </li>
            <li style={{ display: "flex" }}><span style={{ fontSize: "10px", marginRight: "5px" }}><strong>
                ProductType:</strong> {ele.productType}  </span> <span style={{ fontSize: "10px" }}>
                    <strong> SubProductType:</strong> {ele.subProductType}
                </span> <br></br>
            </li>
            <li style={{ display: "flex" }}><span style={{ fontSize: "10px", marginRight: "5px" }}><strong> Description:</strong> {ele.description}  </span>
            </li>
            <li style={{ display: "flex" }}><span style={{ fontSize: "10px", marginRight: "5px" }}><strong> Status:</strong> {ele.active ? "ACTIVE" : "INACTIVE"}  </span>
            </li>
        </ul>
    )) : <h3>No Product Found</h3>)}</>
}
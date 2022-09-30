import { createAsyncThunk } from '@reduxjs/toolkit';
import { products } from 'api/products';
import { ProductFilter } from 'types';


export const getAllProducts = createAsyncThunk(
  `/products/getProducts`,
  async (productFilter:ProductFilter) => {
    const response = await products.getAllProducts(productFilter);
    return response;
  }
);

